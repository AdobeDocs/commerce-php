---
title: Dependency Injection | Commerce PHP Extensions
description: Learn how to declare dependencies to external objects when developing Adobe Commerce and Magento Open Source extensions.
keywords:
  - Extensions
---

# Dependency injection

Adobe Commerce and Magento Open Source use [Dependency Injection] to replace functionality provided by the `Mage` class in Magento 1.x.

Dependency injection is a design pattern that allows an object A to declare its dependencies to an external object B that supplies those dependencies.
The dependencies declared by A are usually class interfaces and the dependencies B provides are concrete implementations for those interfaces.

This allows for loose coupling of code because object A no longer needs to be concerned with initializing its own dependencies.
Object B decides which implementations to provide to object A based on a configuration or desired behavior.

This is an important concept to understand for extension developers because it forms the basis of how Adobe Commerce and Magento Open Source compose classes.

## Dependency inversion principle

Follow the [dependency inversion principle] and use abstractions in your code to reduce code dependencies.
This means that your high level classes should use the interfaces of low level classes instead of working with them directly.

Using interfaces in your code reduces the risk of incompatibility bugs when Adobe changes the underlying implementation of those interfaces.
It also lets you focus on what a class does instead of how its implemented.

Since the codebase follows this principle, you can map your own implementation of an interface to a dependent class or service using the [`di.xml`] file.

## Object manager

The [`ObjectManager`] is an Adobe Commerce and Magento Open Source service class that instantiates objects at the beginning of the bootstrapping process.

The application uses class constructor signatures to retrieve information about an object's constructor dependencies.
When a class is constructed, the object manager injects the class's dependencies, defined in the `di.xml` file, into the class constructor.

Since the object manager provides its service indirectly, your class should not depend on the `ObjectManager` object itself.
The only exceptions are custom factories with complex logic and integration tests that need environment setup.

## Compiling dependencies

The application uses its [code compiler tool] to collect all class dependency information and stores it in files.
During the class creation process, the object manager uses this information to create concrete objects in the application.

Service classes that do not exist in the codebase, such as [proxies], [factories], and [interceptors] that are declared in code or in a configuration, are generated with the help of the compiler.

## Injection types

The following code sample highlights the two types of dependency injections used in Adobe Commerce and Magento Open Source:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace Magento\Backend\Model\Menu;

use Magento\Backend\Model\Menu\Builder\AbstractCommand;
use Magento\Backend\Model\Menu\Item\Factory;

class Builder
{
    /**
     * @var Factory
     */
    private $_itemFactory;

    /**
     * @param Factory $menuItemFactory
     */
    public function __construct(
        Factory $menuItemFactory,  // Service dependency
    ) {
        $this->_itemFactory = $menuItemFactory;
    }

    /**
     * @param AbstractCommand
     */
    public function processCommand(AbstractCommand $command) // API param
    {
        // processCommand Code
    }
}

```

### Constructor injection

In the code sample, the `Builder` class declares its dependency on the `Factory` class in its constructor.
The application uses the `di.xml` file to determine which implementations to inject into the `Builder` class.

#### Optional dependencies

Optional dependencies are objects that your class uses for specific methods and scenarios.
If a class is expensive to instantiate and your class does not always use it, consider using a [proxy].

You must use constructor dependency injection for all optional and required dependencies of an object.

### Method injection

In the code sample, the `Builder` class is also dependent on the `AbstractCommand` class for its `processCommand()` method.

Method injection involves passing in a dependency as a method parameter to use it in the class logic.
When an object needs to perform actions on a dependency that cannot be injected, use method injection.

## Dependency types

### Injectable

Injectable objects are singleton service objects obtained through dependency injection.
The object manager uses the configuration in the `di.xml` file to create these objects and inject them into constructors.

Injectable objects can depend on other injectable objects in their constructor as long as the dependency chain does not circle back to the original injectable object.

### Newable/non-injectable

Newable, or non-injectable, objects are objects that cannot be injected.
They are obtained by creating a new class instance every time they are needed.

Transient objects, such as those that require external input from the user or database, fall into this category.
If you attempt to inject these objects, you will either receive an incomplete, incorrect object or an error that the object could not be created.

For example, you cannot depend on a model object, such as [`Product`], because you need to provide a product id or explicitly request a new, empty instance to get a `Product` object.
Since you cannot specify this data in the constructor signature, the application cannot inject this object.

To get around this limitation, injectable objects can depend on [factories] that produce newable objects.

[Dependency Injection]: https://en.wikipedia.org/wiki/Dependency_injection
[dependency inversion principle]: https://www.oodesign.com/dependency-inversion-principle
[`di.xml`]: ../build/dependency-injection-file.md
[`ObjectManager`]: object-manager/index.md
[code compiler tool]: https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/code-compiler
[proxies]: proxies.md
[proxy]: proxies.md
[factories]: factories.md
[interceptors]: plugins.md
[`Product`]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/Model/Product.php
