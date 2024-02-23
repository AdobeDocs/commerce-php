---
title: Application Server | Commerce PHP Extensions
description: Learn about the PHP Application Server architecture and how to ensure compatibility with custom extensions.
keywords:
  - Extensions
---

# PHP Application Server

The goal of this document is to provide all the necessary details for extension developers about PHP application server architecture, recommendations and instructions for extension vendors on how they make sure that their code is compatible with application server.

## Challenges to consider

- **Resources Management**

  In environments using php-fpm, SQL connections, file handles, and other resources are automatically closed or reset at the conclusion of each HTTP request, ensuring that each new request starts with a clean slate. This mechanism helps prevent memory leaks and resource exhaustion, which can lead to degraded performance or application failure. Recognizing the importance of this, for our Application Server, we have implemented a cleanup process. This process is triggered after a response is dispatched, guaranteeing that all resources are properly released or reset, thereby maintaining the application's performance and reliability over time.

- **Memory and resource leaks**

  Memory and resource management in PHP code can often be overlooked due to the stateless nature of HTTP request handling, where resources are automatically freed up at the end of each request. However, in long-running scripts or applications, such as those using Swoole, proper management becomes crucial to prevent leaks and ensure efficient operation. Such leaks occur when the application fails to release memory or resources that are no longer needed, leading to increased memory consumption and potential degradation of performance or even application failure over time.

- **Cookie/Session/Superglobals**

  Usage of cookies, sessions, and superglobals coule be a challenge due to Swoole's asynchronous, long-running server environment, which differs significantly from the traditional, stateless PHP-FPM model. Since Swoole keeps the PHP application in memory across requests, traditional PHP superglobals like $_GET, $_POST, and $_SESSION do not automatically reset between requests, potentially leading to data leakage or incorrect data being served to users. Additionally, implementing session management and cookie handling requires careful consideration to ensure thread safety and data isolation among concurrent requests, posing a significant challenge in preserving the state and security of a Swoole application.

- **Debugging/Testing**

  Traditional debugging tools and techniques designed for synchronous PHP scripts may not work as expected, as they might not properly handle the concurrency and parallel execution of tasks within Swoole. Developers need to adopt or develop tools that are capable of understanding and interacting with asynchronous operations, as well as establish testing environments that can simulate the concurrent execution of multiple requests. This requires a shift in approach to both debugging and testing, with an emphasis on asynchronous logic, coroutine lifecycle management, and the potential for shared-state issues, making the process more challenging than in traditional PHP environments.

## Common reasons for extensions incompatibility

1. Not following Technical Guide https://developer.adobe.com/commerce/php/coding-standards/technical-guidelines/

  - 2.9. Service classes (ones that provide behavior but not data, like EventManager) SHOULD NOT have a mutable state. To make extensions codebase compliant with Technical Guide mutable state should be removed from Service classes. Sometime it could be a property cache introduced for better performance when dealing with data-intensive operations, such as database queries, API calls, or complex calculations, that do not need to be executed repeatedly within the same request. However it brings issues with Application Server as property cache would be used in a consequent requests and it should be reseted after each request.

  - 2.14. Temporal coupling MUST be avoided. Changed state at one point in time can inadvertently affect the behavior of subsequent operations, requiring a specific order of execution for the application to function correctly. This coupling makes the code harder to understand and maintain, as the correct operation of the system becomes dependent on the sequence in which state-modifying actions are performed.

1. Superglobals and native PHP functions usage for header, session, cookie.

  Usage of PHP Superglobals like $_GET, $_POST, and $_SESSION and native PHP functions for header, session and cookie instead of utilizing interfaces and service contracts trough dependency injection.
  
## How to execute PHP Application server tests

### Integration tests

- **GraphQlStateTests**

  It finds state in shared objects that shouldn't be reused for multiple requests. It currently runs against 67 different GraphQL requests which could be extended.
  
  GraphQlStateTest is a test that looks for state changes in service objects created by ObjectManager. It does this by running a GraphQL query twice, and comparing the state of the service objects before and after the second query. There are two files used to filter and skip classes that are safe to be reused in a stateful application. These two files are dev/tests/integration/testsuite/Magento/GraphQl/_files/state-skip-list.php and dev/tests/integration/testsuite/Magento/GraphQl/_files/state-filter-list.php. There are similar files in magento2ee repositories for classes that are specific to magento2ee. Other repositories can use their own files similar to how we've done so in magento2ee repository. The state-skip-list.php file is for skipping the comparison of objects by their class name or vitual name (as defined in di.xml). The state-filter-list.php file is for filtering out which properties should be compared.

  In state-filter-list.php, there are 3 different types of filtering. The "all" section will filter these property names from all of the service objects. For the "parents" section, a comparison is done first for the service object being compared to the specified class or interface using the `instanceof` operator. If it returns true, then those filters are applied. For the 'services' section, it checks for direct match of the serviceName. The serviceName can either be the class name, or virtual type of preferences (as defined in di.xml files) before applying the properties filter.

  If you are working on a failure and it doesn't look like it is safe to add to skip or filter list,  then consider if the class can be refactored in backwards compatible way [2] to use Factories of the service classes that have mutable state. If if is the class itself that has mutable state, then try to rewrite it in a way to avoid mutable state. If the mutable state is required for performance reasons, then implement ResetAfterRequestInterface and use _resetState() to reset the object back to its initial constructed state.

  If the class is failing because of a "Typed property $x must not be accessed before initialization", then the problem is because the property isn't initialized by the constructor. This is a form of temporal coupling, because the object can't be used after it is initially constructed. This happens even if the property is private because the Collector that gets the data from the properties using PHP's reflection feature. In this case,  one of the best things to do is to refactor the class to avoid temporal coupling, and also to avoid mutable state. If that doesn't work, the property can change its type to a nullable type and be initialized to null. Or if the property is an array, it may be okay to initialize the property as an empty array.

  Command to run test:

  ```bash
  vendor/bin/phpunit -c $(pwd)/dev/tests/integration/phpunit.xml dev/tests/integration/testsuite/Magento/GraphQl/App/GraphQlStateTest.php
  ```

- ResetAfterRequestTest

  Finds all classes that implement ResetAfterRequestInterface and verifies that the `_resetState()` method returns the state of the object to the same state as it was right after being constructed by ObjectManager. It does this by creating a service object with ObjectManager, then cloning that object, then calling `_resetState()`, and then comparing it. It doesn't call any methods in between object instantiation and `_resetState()`, so it doesn't confirm resetting any mutable state. It does find problems where a bug or typo in `_resetState()` may set the state to something different than what it was originally.

  If this test is failing, then you should check to see if you've changed a class in a way where the object after construction has different values in properties than after the `_resetState()` method is called. If the class that you are working on doesn't have `_resetState()` method itself, then check the class hierarchy for a superclass that is implementing it.

  If the class is failing because of a "Typed property $x must not be accessed before initialization", please see the discussion about this problem in the GraphQlStateTest section.

  Command to run test:

  ```bash
  vendor/bin/phpunit -c $(pwd)/dev/tests/integration/phpunit.xml dev/tests/integration/testsuite/Magento/Framework/ObjectManager/ResetAfterRequestTest.php
  ```

## How to fix test failures, with examples

### Local setup and debug

Install Swoole extension:

```bash
pecl install swoole
```

Route all GraphQL requests to the Application Server (nginx example):

```php
location /graphql {
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 
    proxy_pass http://127.0.0.1:9501/graphql;
}
```

Launch the Application Server with CLI command:

```bash
bin/magento server:run
```

Execute GraphQL mutations against Application Server and debug with xDebug if needed.

## Example of mutable state in code

Example with the `Magento\Catalog\Model\Product\Image\Cache` class.

```php
/**
  * @var array
  */
 protected $data = [];
```

We can see that $data property is used as a 

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

There are several challenges we may face for refactoring the code with mutable state. Those included but not limited to:

- Backwards compatibility
- Performance efficiency
- Lack of time

In our example with the `Magento\Catalog\Model\Product\Image\Cache` class, we can see performance benefits of reusing `$data` property in context of a single request but we should reset the state after reqest.

For this purpose we should implement:

```php
class Cache implements ResetAfterRequestInterface
```

And add implementation of `_resetState()` method with overriding $data property to its initial state - empty array:

```php
/**
 * @inheritDoc
 */
public function _resetState(): void
{
    $this->data = [];
}
```
