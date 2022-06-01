---
title: Object Manager | Commerce PHP Extensions
description: Optimize your Adobe Commerce an Magento Open Source extension development skills by mastering the ObjectManagerInterface.
---

# Object manager

Large applications, such as the Adobe Commerce and Magento Open Source applications, use an object manager to avoid boilerplate code when composing objects during instantiation.

In Adobe Commerce and Magento Open Source, the implementation of the [`ObjectManagerInterface`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/ObjectManagerInterface.php) performs the duties of an object manager.

<InlineAlert variant="warning" slots="text"/>

The application prohibits the direct use of the `ObjectManager` in your code because it hides the real dependencies of a class.
See [usage rules](#usage-rules).

## Responsibilities

The object manager has the following responsibilities:

-  Object creation in factories and proxies
-  Implementing the singleton pattern by returning the same shared instance of a class when requested
-  Dependency management by instantiating the preferred class when a constructor requests its interface
-  Automatically instantiating parameters in class constructors

## Configuration

The [`di.xml`](../../build/dependency-injection-file.md) file configures the object manager and tells it how to handle [dependency injection](../dependency-injection.md).

This file specifies the preferred implementation class the object manager generates for the interface declared in a class constructor.
The file also specifies whether the object manager should create an object for every request or treat the object as a singleton.

## Usage rules

Adobe Commerce and Magento Open Source use the `ObjectManager` to generate and inject the classes declared in your constructor.
Classes should not ask for the `ObjectManager` itself as a constructor dependency.

You do not call the object manager directly because the framework handles this automatically.
Direct use of the `create` function prevents type validation and type hinting that a [factory](../factories.md) class provides.

Object creation is also a separate responsibility that should be moved to a dedicated class such as a [factory](../factories.md) or [proxy](../proxies.md).
In most cases, the framework generates these classes automatically during code compilation.

<InlineAlert variant="warning" slots="text"/>

You may notice in the Adobe Commerce and Magento Open Source codebase that some core classes still call the `ObjectManager` directly.
This code needs porting or exist for backward compatibility purposes.
They are not tacit endorsements of using the `ObjectManager` directly.

### Exceptions

You can depend on and use the `ObjectManager` class in the following scenarios:

-  You can use the object manager in static magic methods like `__wakeup()`, `__sleep()`, etc.
   -  An example can be found in the `__wakeup()` method in the [`Magento/Eav/Model/Entity/Attribute/AbstractAttribute`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Eav/Model/Entity/Attribute/AbstractAttribute.php) class.
-  You can use the `ObjectManager` to maintain backward compatibility for a constructor.
-  In a global scope, like in fixtures of integration tests, you can use the object manager.
-  The object manager can be a dependency in classes used for creating objects such as factories or proxies.

### Programmatic product updates

If the Access Control List (ACL) rules contain incorrect settings, scripts that update products will fail validation.
This results in products assigned to the wrong store view with the wrong status.

To skip ACL validations, use the `ObjectManager` to set a dynamic dependency injection preference for `Magento\Framework\Authorization\PolicyInterface`.

``` php
$objectManager = $bootstrap->getObjectManager();
$objectManager->configure([
    'preferences' => [
        'Magento\Framework\Authorization\PolicyInterface' => 'Magento\Framework\Authorization\Policy\DefaultPolicy'
    ]
]);
```
