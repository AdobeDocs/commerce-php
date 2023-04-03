---
title: Code Generation | Commerce PHP Extensions
description: Learn about Adobe Commerce and Magento Open Source code generation.
---

# Code generation

The Adobe Commerce and Magento Open Source applications generate code to create non-existent classes. As an example, look at the [Magento/Customer/Model/Resource/AddressRepository](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/Model/ResourceModel/AddressRepository.php) constructor. A snippet follows:

```php
...
public function __construct(
    \Magento\Customer\Model\AddressFactory $addressFactory,
...
```

The first constructor parameter has a type of `Magento\Customer\Model\AddressFactory`. However, this class does not exist in `\Magento\Customer\Model` in the codebase. The application *generates* this class because its name uses a recognized convention (in this case, because the name ends with `Factory`).

Unlike some other languages or libraries, you can look at the generated code on the file system to see what really happens and still debug the code.

## When is code generated?

Provided that the application is not set to [production mode](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/setup/application-modes.html#production-mode), code is generated when the application cannot find a class when executing code.

In particular,

*  A factory class creates instances of a type. See [Factories](factories.md) for more information. Factories are directly referenced within application code.

*  You can designate a Proxy to be generated for a type in order to ensure the type is not instantiated until it is needed. See [Proxies](proxies.md) for more information. Proxies are directly referenced within dependency injection configuration.

*  Interceptor classes are automatically generated to facilitate Magento's plugin system. An interceptor class extends a type and is returned by the Object Manager to allow multiple plugin classes to inject logic into different methods. Interceptors work behind the scenes and are *not* directly referenced in application code.

You can also use the [code compiler](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/code-compiler.html) to generate code at any time. "Compiling" your application means performing code generation for any eligible class encountered by the configuration/code scanner, as well as performing a number of different dependency injection optimizations.

## Why should you regenerate code?

Suppose a Proxy class for a Customer class is generated, and the Customer class has new methods added to it. Because a Proxy exists on the file system, it is not regenerated. However, the Proxy implementation is now incomplete because it does not have the new Customer class methods. In this case, you must regenerate the Proxy class.

If the code generator implementation itself is changed, you must regenerate all the classes. This is rare, however.

### Advantages

Code generation is required in Adobe Commerce and Magento Open Source. Generating code assures you of the following:

*  The code is correct. You don’t have to worry that the generated code is delegating to the wrong method or forgetting a semicolon, and you don’t have to write tests for the generated code.
*  Code generation writes the boilerplate code to enable you to write more challenging and interesting code.
*  Consistent implementation.

   All generated Factories work the same way. After you know how one Factory works, you know how they all work.

## Object manager responsibility

When code changes as discussed in the preceding section, the Object Manager compiles it.

The code compiler creates the `generated/metadata/global.php` file, which is a PHP serialized map of all constructor definitions mixed with object linking configuration defined in di.xml. The `di.xml` file is the dependency injection configuration. There is a global `app/etc/di.xml` file, and there can also be a `di.xml` file for every module.
