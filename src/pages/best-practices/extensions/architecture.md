---
title: Working with the Architecture | Commerce PHP Extensions
description: Review best practices for working with the Adobe Commerce and Magento Open Source architecture.
---

# Working with the architecture

In addition to understanding fundamental programming designs/concepts, you are encouraged to learn how the MVC architecture works in our code and how to work with generated code and factories.

## Avoid modification of the Core

The core code is the default code that comes with the application. You should never edit the core code because code changes occur between version upgrades and any changes you make will get overwritten. Try achieving your desired behavior with plugins, overriding interface preferences, and [event](https://glossary.magento.com/event) observers.

If you feel that the application can be improved with your core code changes, please consider [contributing via Git](https://developer.adobe.com/commerce/contributor/guides/code-contributions/).

## Learn the architecture

To create the optimum module, you should get to know the application architecture. Start off by familiarizing yourself with the [Admin Pattern Library](https://developer.adobe.com/commerce/admin-developer/pattern-library/), the core [components](../../development/index.md), and our [service contracts](../../development/components/service-contracts/index.md) and [APIs](https://developer.adobe.com/commerce/webapi/get-started/).

## Check your extension configurations

Make sure your [extension](https://glossary.magento.com/extension) is configured correctly in each of your extension's configuration files. Invalid or unexpected values will cause your extension to behave incorrectly.

## Know and leverage the application framework

There have been some significant changes from Magento 1. Be sure to study the capabilities and standards of the application framework.

For example:

-  Instead of creating custom validators from scratch, implement the [`\Magento\Framework\Validator\ValidatorInterface`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Validator/ValidatorInterface.php).
-  Instantiating a database connection can be expensive and unnecessary. The application provides resource models for performing SQL commands. (See [Persistence Layer](../../architecture/layers/persistence.md))
-  Consider using framework conventions instead of low-level or [PHP](https://glossary.magento.com/php) functionality.
-  Use the  [`Magento\Framework\Data\Collection`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Data/Collection.php) class to retrieve a collection of filtered objects instead of directly querying the database.

## Use dependency injection

Direct class instantiation is not recommended because the class can be rewritten. If the class is created directly, any rewrites will not be applied and it breaks class rewrite capability. We encourage you to become familiar with how we use [dependency injection](../../development/components/dependency-injection.md) to get an instance of a class.

## Follow Model-View-Control (MVC) pattern

Make sure your extension adheres to the MVC Pattern, and that it does not violate any of its principles.

Some important things to check in your extensions:

-  Make sure your Business Logic, Configuration, and SQL are implemented in the correct places.
-  Make sure that CSS, JavaScript, HTML, and [XML](https://glossary.magento.com/xml) code are all in the appropriate files (i.e. they should not be inline).
-  Use appropriate logic in a Block, Helper, Template, Controller, or Model.
-  Ensure correct [module](https://glossary.magento.com/module) design.

## Use the PHP_CodeSniffer tool

[PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) is a set of PHP scripts that checks your code for violations of a particular coding standard. It can be used in conjunction with the [Coding Standard](https://github.com/magento/magento-coding-standard) to check your code for some of the more common application and PHP problems. Using these two tools will ensure that your extension code meets many of [coding standards](../../coding-standards/index.md). It also has the added benefits of keeping your code clean and maintainable.
