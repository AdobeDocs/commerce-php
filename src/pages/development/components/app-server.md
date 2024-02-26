---
title: Application Server | Commerce PHP Extensions
description: Learn about the Application Server architecture and how to ensure compatibility with custom extensions.
keywords:
  - Extensions
edition: ee
---

<InlineAlert variant="info" slots="text" />

Available in [2.4.7-beta](https://experienceleague.adobe.com/docs/commerce-operations/release/notes/adobe-commerce/2-4-7.html) only.

# Application Server for GraphQL APIs

The [Application Server for GraphQL APIs](https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/performance-best-practices/application-server.html) enables Adobe Commerce to maintain state among GraphQL API requests. The Application Server, which is built on the Open Swoole extension, operates as a process with worker threads that handle request processing. By preserving a bootstrapped application state among GraphQL API requests, the Application Server enhances request handling and overall product performance. API requests become significantly more efficient.

The Application Server is supported on [Cloud Starter](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/architecture/starter-architecture.html) deployments only. It is not available for Cloud Pro projects during Beta. It is not available for deployments of the Magento Open Source code base.

## Challenges to consider

Ensuring compatibility between your extension and the Application Server can be challenging without the right information.

This page provides all of the details that you need to make sure that your code is compatible with with the Application Server, including recommendations and testing instructions. Key concepts include:

- Resource management
- Memory and resource leaks
- Cookies, sessions, and superglobals
- Testing and debugging

### Resources Management

In environments using `php-fpm`, SQL connections, file handles, and other resources are automatically closed or reset at the conclusion of each HTTP request, ensuring that each new request starts with a clean slate. This mechanism helps prevent memory leaks and resource exhaustion, which can lead to degraded performance or application failure. The Application Server contains a cleanup process. This process is triggered after a response is dispatched, guaranteeing that all resources are properly released or reset, thereby maintaining the application's performance and reliability over time.

### Memory and resource leaks

Memory and resource management in PHP can often be overlooked due to the stateless nature of HTTP request handling, where resources are automatically released at the end of each request. However, in long-running scripts or applications, such as those using Swoole, proper management becomes crucial to prevent leaks and ensure efficient operation. Leaks occur when the application fails to release memory or resources that are no longer needed, leading to increased memory consumption and potential degradation of performance or even application failure over time.

### Cookies, sessions, and superglobals

Using cookies, sessions, and superglobals can be a challenge due to Swoole's asynchronous, long-running server environment, which differs significantly from the traditional, stateless PHP-FPM model. Since Swoole keeps the PHP application in memory across requests, traditional PHP superglobals like `$_GET`, `$_POST`, and `$_SESSION` do not automatically reset between requests, potentially leading to data leakage or incorrect data being served to users.

Additionally, implementing session management and cookie handling requires careful consideration to ensure thread safety and data isolation among concurrent requests, posing a significant challenge in preserving the state and security of a Swoole application.

### Testing and debugging

Traditional debugging tools and techniques designed for synchronous PHP scripts may not work as expected, as they might not properly handle the concurrency and parallel execution of tasks within Swoole. Developers must adopt or develop tools that are capable of understanding and interacting with asynchronous operations, as well as establish testing environments that can simulate the concurrent execution of multiple requests. This requires a shift in approach to both debugging and testing, with an emphasis on asynchronous logic, co-routine lifecycle management, and the potential for shared-state issues, making the process more challenging than in traditional PHP environments.

## Common reasons for incompatibility

1. [Not following technical guidelines](../../coding-standards/technical-guidelines.md)

  - 2.9. Service classes (ones that provide behavior but not data, like EventManager) SHOULD NOT have a mutable state. To make extensions codebase compliant with technical guidelines mutable state should be removed from Service classes. Sometime it could be a property cache introduced for better performance when dealing with data-intensive operations, such as database queries, API calls, or complex calculations, that do not need to be executed repeatedly within the same request. However it brings issues with Application Server as property cache would be used in a consequent requests and it should be reseted after each request.

  - 2.14. Temporal coupling MUST be avoided. Changed state at one point in time can inadvertently affect the behavior of subsequent operations, requiring a specific order of execution for the application to function correctly. This coupling makes the code harder to understand and maintain, as the correct operation of the system becomes dependent on the sequence in which state-modifying actions are performed.

1. Superglobals and native PHP functions usage for header, session, cookie.

  Usage of PHP Superglobals, like `$_GET`, `$_POST`, and `$_SESSION`, and native PHP functions for header, session, and cookie instead of utilizing interfaces and service contracts through dependency injection.
  
## Integration testing

This section describes integration tests that you can use when developing your extension to ensure compatibility with the Application Server.

### GraphQlStateTests

This test finds state in shared objects that should not be reused for multiple requests. It currently runs against 67 different GraphQL requests, which could be extended.
  
GraphQlStateTest is a test that looks for state changes in service objects created by ObjectManager. It does this by running a GraphQL query twice, and comparing the state of the service objects before and after the second query.

There are two files used to filter and skip classes that are safe to be reused in a stateful application:

- `dev/tests/integration/testsuite/Magento/GraphQl/_files/state-skip-list.php`—Skips the comparison of objects by their class name or virtual name (as defined in the `di.xml` file).
- `dev/tests/integration/testsuite/Magento/GraphQl/_files/state-filter-list.php`—Filters out that properties that should be compared.

<InlineAlert variant="info" slots="text" />

There are similar files in the `magento/magento2ee` GitHub repository for classes that are specific to `magento2ee`. Other repositories can use their own files in a similar way.

In the `state-filter-list.php` file, there are three different types of filtering:
  
- The `all` section filters these property names from all of the service objects.
- The `parents` section first compares the service object to the specified class or interface using the `instanceof` operator. If it returns true, then those filters are applied.
- The `services` section checks for direct matches of the `serviceName`. The `serviceName` can either be the class name, or virtual type of preferences (as defined in `di.xml` files) before applying the properties filter.

If you are working on a failure and it does not look like it is safe to add to the skip or filter list, then consider if you can refactor the class in a [backwards-compatible](https://developer.adobe.com/commerce/contributor/guides/code-contributions/backward-compatibility-policy/) way to use Factories of the service classes that have mutable state. If it is the class itself that has mutable state, then try to rewrite it in a way to avoid mutable state. If the mutable state is required for performance reasons, then implement `ResetAfterRequestInterface` and use `_resetState()` to reset the object back to its initial constructed state.

If the class is failing because of a `Typed property $x must not be accessed before initialization` error, then the problem is because the property is not initialized by the constructor. This is a form of temporal coupling, because the object cannot be used after it is initially constructed. This happens even if the property is private because the Collector that gets the data from the properties using PHP's reflection feature. In this case, one of the best things to do is to refactor the class to avoid temporal coupling, and also to avoid mutable state. If that does not work, the property can change its type to a nullable type and be initialized to null. Or if the property is an array, it may be okay to initialize the property as an empty array.

Command to run test:

```bash
vendor/bin/phpunit -c $(pwd)/dev/tests/integration/phpunit.xml dev/tests/integration/testsuite/Magento/GraphQl/App/GraphQlStateTest.php
```

### ResetAfterRequestTest

Finds all classes that implement `ResetAfterRequestInterface` and verifies that the `_resetState()` method returns the state of the object to the same state as it was right after being constructed by ObjectManager. It does this by creating a service object with ObjectManager, cloning that object, then calling `_resetState()` and comparing it. It does not call any methods in between object instantiation and `_resetState()`, so it does not confirm resetting any mutable state. It does find problems where a bug or typo in `_resetState()` may set the state to something different than what it was originally.

If this test fails, then you should check to see if you have changed a class in a way where the object after construction has different values in properties than after the `_resetState()` method is called. If the class that you are working on does not have `_resetState()` method itself, then check the class hierarchy for a superclass that is implementing it.

If the class is failing because of a `Typed property $x must not be accessed before initialization` error, see the discussion about this problem in the [GraphQlStateTest](#graphqlstatetests) section.

Command to run test:

```bash
vendor/bin/phpunit -c $(pwd)/dev/tests/integration/phpunit.xml dev/tests/integration/testsuite/Magento/Framework/ObjectManager/ResetAfterRequestTest.php
```

## How to fix test failures

To set up local testing and debugging:

1. Install the Swoole extension:

   ```bash
   pecl install swoole
   ```

1. Route all GraphQL requests to the Application Server (nginx example):

   ```php
   location /graphql {
       proxy_set_header Host $http_host;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 
       proxy_pass http://127.0.0.1:9501/graphql;
   }
   ```

1. Run the Application Server with the CLI command:

   ```bash
   bin/magento server:run
   ```

1. Execute GraphQL mutations against Application Server and debug with xDebug if needed.

## Example of mutable state in code

Example with the `Magento\Catalog\Model\Product\Image\Cache` class.

```php
/**
  * @var array
  */
 protected $data = [];
```

We can see that the `$data` property is used as a 

```php
   protected function getData()
   {
       if (!$this->data) {
           foreach ($this->themeCollection->loadRegisteredThemes() as $theme) {
               $config = $this->viewConfig->getViewConfig([
                   'area' => Area::AREA_FRONTEND,
                   'themeModel' => $theme,
               ]);
               $images = $config->getMediaEntities('Magento_Catalog', ImageHelper::MEDIA_TYPE_CONFIG_NODE);
               foreach ($images as $imageId => $imageData) {
                   $this->data[$theme->getCode() . $imageId] = array_merge(['id' => $imageId], $imageData);
               }
           }
       }
       return $this->data;
   }
```

### How to fix mutable state

There are several challenges you may face for refactoring the code with mutable state, including, but not limited to:

- Backwards compatibility
- Performance efficiency
- Lack of time

In the example with the [`Magento\Catalog\Model\Product\Image\Cache`](#example-of-mutable-state-in-code) class, we can see performance benefits of reusing the `$data` property in context of a single request, but we should reset the state after the request.

For this purpose we should implement the following:

```php
class Cache implements ResetAfterRequestInterface
```

Add the implementation of the `_resetState()` method with overriding `$data` property to its initial state - empty array:

```php
/**
 * @inheritDoc
 */
public function _resetState(): void
{
    $this->data = [];
}
```
