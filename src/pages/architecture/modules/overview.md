---
title: Module Overview | Commerce PHP Extensions
description: Learn about the critical role that modules play in the Commerce framework.
keywords:
  - Extensions
---

# Module overview

A *module* is a logical group -- that is, a directory containing blocks, controllers, helpers, models -- that are related to a specific business feature. In keeping with Adobe's commitment to optimal modularity, a module encapsulates one feature and has minimal dependencies on other modules.

Modules and themes are the units of customization in Commerce. Modules provide business features, with supporting logic,  while themes strongly influence user experience and storefront appearance. Both components have a life cycle that allows them to be installed, deleted, and disabled. From the perspective of both merchants and extension developers, modules are the central unit of Adobe Commerce and Magento Open Source framework (Commerce framework) organization.

The Commerce framework provides a set of core logic: PHP code, libraries, and the basic functions that are inherited by the modules and other components.

## Purpose of a module

The purpose of a module is to provide specific product features by implementing new functionality or extending the functionality of other modules. Each module is designed to function independently, so the inclusion or exclusion of a particular module does not typically affect the functionality of other modules.

## Module components

A module is a directory that contains the PHP and XML files (blocks, controllers, helpers, models) that are related to a specific business feature, such as Shipping. Specifically, a module is composed of the following software components:

-  [Themes](https://developer.adobe.com/commerce/frontend-core/guide/themes/)
-  [Libraries](libraries.md)
-  [Language packs](https://developer.adobe.com/commerce/frontend-core/guide/translations/#language-packages)

## Module locations

Modules typically live in the `vendor` directory of an Adobe Commerce or Magento Open Source installation, in a directory with the following PSR-0 compliant format: `vendor/<vendor>/<type>-<module-name>`, where `<type>` can be one of the following values:

-  **`module`** - for modules (`module-customer-import-export`)
-  **`theme`** - for frontend and admin themes (`theme-frontend-luma` or `theme-adminhtml-backend`)
-  **`language`** - for language packs (`language-de_de`)

For example, the Customer Import/Export module can be found at `vendor/magento/module-customer-import-export`.

If you are creating a new module for distribution, create the `app/code/<vendor>/<type>-<module-name>` directory and the required directories within it.

Inside this folder, you will find all the code related to this module, including the `etc/module.xml` file, which contains the name and version of the module, as well as any dependencies.

### Module location conventions

The following table shows the *recommended* location within the file system for specific components.

(A module must include a `registration.php` file in its root folder.)

We refer to a component's root directory as the top-level directory in which you develop component code. Typically, this directory is located in one of the following directories relative to your Adobe Commerce or Magento Open Source root directory:

|Entity|Location|
|---|---|
|Code base of your custom module|`/app/code/<Vendor>/<Module>`|
|Custom theme files (storefront)|`/app/design/frontend/<Vendor>/<theme>`|
|Custom theme files (modules)|`<Module>/<theme>`|
|If you want to use a library|`/lib/<Vendor_Library>`|

## Working with modules

Developers, administrators, and anyone building an Adobe Commerce or Magento Open Source website will want to review all relevant topics surrounding their particular goals and use cases.

See [PHP Developer Guide](/development/) for specific instructions on extending modules.

See [Frontend Developer Guide](https://developer.adobe.com/commerce/frontend-core/guide/) for information on implementing themes and other components.
