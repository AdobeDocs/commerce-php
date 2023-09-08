---
title: Composer integration | Commerce PHP Extensions
description: Integrate Composer with your Adobe Commerce and Magento Open Source components.
keywords:
  - Extensions
---

# Composer integration

Adobe Commerce and Magento Open Source use [Composer][0], a PHP dependency manager, to package components and product editions.

Composer reads a `composer.json` file in the application's root directory to download third-party dependencies listed in the file.

We recommend you include `composer.json` in your component's root directory even if you do not intend to distribute it externally.

<InlineAlert variant="info" slots="text"/>

Adobe Commerce and Magento Open Source do not support the [`path`][3] repository pointing to a folder outside of the application's root directory.

Here is an example of the `composer.json` file.

 ```json
  {
    "name": "mycompany/sample-module-minimal",
    "description": "A module that creates a page in the admin area",
    "type": "magento2-module",
    "version": "1.0.0",
    "license": [
      "OSL-3.0",
      "AFL-3.0"
    ],
    "require": {
      "php": "~7.3.0||~7.4.0"
    },
    "autoload": {
      "files": [ "registration.php" ],
      "psr-4": {
        "MyCompany\\ExampleAdminNewPage\\": ""
      }
    }
  }
 ```

## Composer binary location

Adobe Commerce and Magento Open Source use the Composer binary in the `<Application root>/vendor/composer` directory instead of a globally installed composer.

Keep this in mind while customizing, updating, or troubleshooting Composer while working with Adobe Commerce and Magento Open Source.

## Project vs product

In Composer, a "project" package is a template used by the [`composer create-project`][9] to set up the project structure.
The [installation instructions for system integrators][10] use the Magento Open Source and Adobe Commerce project packages to set up the directory structure.

A "product" package is the actual application pointed to by the `composer.json` file after you download and install the project package using `composer create-project`.

## Types of Composer files

The following components and product editions use a `composer.json` file.

### Root

**Location:** `composer.json`

**Name:** `magento/magento2ce`

**Type:** `project`

This is the main `composer.json` file, which declares dependencies and third-party components.

Other root `composer.json` files use this file as a template.

---

### Magento Open Source project

**Location:** `composer.json`

**Name:** `magento/project-community-edition`

**Type:** `project`

System integrators use this `composer.json` file to deploy the Magento Open Source product and its dependencies.

---

### Adobe Commerce project

**Location:** `composer.json`

**Name:** `magento/product-enterprise-edition`

**Type:** `metapackage`

System integrators use this `composer.json` file to deploy the Adobe Commerce product and its dependencies.

---

### Commerce framework

**Location:** `lib/internal/Magento/Framework/composer.json`

**Name:** `magento/framework`

**Type:** `magento2-library`

The Adobe Commerce and Magento Open Source applications uses this `composer.json` file for its framework packages.

---

### Module

**Locations:**

*  `app/code/<vendor-name>/<module-name>/composer.json`
*  `vendor/<vendor-name>/<module-name>/composer.json`

**Name:** `<vendor-name>/<package-name>`

**Type:** `magento2-module`

The `composer.json` file for a module extension declares external dependencies that it needs to function.

---

### Theme

**Locations:**

*  `app/design/frontend/<vendor-name>/<theme-name>/composer.json`
*  `app/design/adminhtml/<vendor-name>/<theme-name>/composer.json`

**Name:** `<vendor-name>/<package-name>`

**Type:** `magento2-theme`

The `composer.json` file for a theme component contains parent theme dependencies the extension needs to inherit.

---

### Language package

**Location:**
`app/i18n/<vendor-name>/<language-code>/composer.json`

**Name:** `<vendor-name>/<package-name>`

**Type:** `magento2-language`

For language packages, you must use the correct [ISO code][4] for the language code in the `composer.json` file.

---

## Magento-specific package types

Extensions can be any of the following types:

*  `magento2-module` for modules
*  `magento2-theme` for themes
*  `magento2-language` for language packages
*  `magento2-component` for general extensions that do not fit any of the other types

The extension type tells the system where to install the directories and files of each extension in the directory structure.

## Naming conventions

Since the namespace of a Composer package is global within a package repository, e.g. [packagist.org][2], use the following format when naming your package:

`<vendor-name>/<package-name>`

Using the Composer naming convention helps distinguish packages from different vendors with a low risk of overlapping.

### vendor-name

All letters in the vendor name must be in lowercase.
For example, the vendor name format for extensions released by Adobe is `magento`.

#### Commerce Marketplace extensions

Commerce Marketplace uses `vendor-name` to match an extension to a vendor during the extension submission process.
If you plan to submit your extension to the [Commerce Marketplace][7], you *must* use the unique Vendor Name created or assigned to you when you created your marketplace account.

In the `composer.json` file, use the value of 'Vendor Name' in your profile for the `vendor-name` part of the extension name.

Please see the [Marketplace Documentation][5] for more information about your unique vendor name.

### package-name

All letters in the `package-name` must be in lowercase.

If the name contains more than one word, the Composer specification recommends separating them with dashes.

The convention for Magento package names is the following

`magento/<type-prefix>-<suffix>[-<suffix>]...`

Where:

:`type-prefix` is any of the extension types:

*  `module-` for module extensions
*  `theme-` for theme extensions
*  `language-` for language extensions
*  `product-` for [metapackages][8] such as Magento Open Source or Adobe Commerce

: `suffix` is a unique identifier for extensions of that type.

## Versioning

Components have the following types of versions:

*  Marketing version; in other words, the version the merchant interacts with.

   Your initial version might be 1.0.0 or 2.0.0, for example. You should follow [our versioning policy](../versioning/index.md) guidelines when setting your version.

*  Composer version; in other words, the version of each module, theme, language package, third-party package, and dependencies.

Using Adobe Commerce and Magento Open Source code as an example, marketing version 2.0.0 includes component versions such as 100.0.1, 100.0.2, and so on. These versioning strategy prevents collisions between the marketing version and component versions.

[0]: https://getcomposer.org/
[2]: https://packagist.org/
[3]: https://getcomposer.org/doc/05-repositories.md#path
[4]: https://www.iso.org/iso-639-language-codes.html
[5]: https://developer.adobe.com/commerce/marketplace/guides/sellers/profile-company/
[6]: https://marketplace.magento.com/
[7]: https://marketplace.magento.com
[8]: ../package/component.md#metapackage-example
[9]: https://getcomposer.org/doc/03-cli.md#create-project
[10]: https://devdocs.magento.com/guides/v2.4/install-gde/composer.html
