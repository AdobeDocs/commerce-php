---
title: Introduction to Composer
description:
---

# Introduction to Composer

We use [Composer](https://getcomposer.org/) to manage Magento components and their dependencies. Using Composer to get the Magento software [metapackage](https://glossary.magento.com/metapackage) provides the following advantages:

-  Reuse third-party libraries without bundling them with source code
-  Reduce extension conflicts and compatibility issues by using a component-based architecture with robust dependency management
-  Adhere to [PHP-Framework Interoperability Group (FIG)](https://www.php-fig.org/) standards
-  Repackage Magento Open Source with other components
-  Use the Magento software in a production environment

<InlineAlert variant="info" slots="text"/>

You can also [download](https://magento.com/tech-resources/download) an archive file for a specific version of Magento in either ZIP or TAR format. Installing Magento from an archive lacks the advantages of using Composer. Contributing developers should use the [git-based](https://developer.adobe.com/commerce/contributor/guides/install/) installation method.

## Links to Magento code

The key to developing any [Magento component](https://glossary.magento.com/magento-component) is its [`composer.json`](https://getcomposer.org/doc/04-schema.md), which specifies version and dependency information for a component, among other things. You can look at Magento 2 code, such as:

-  Metapackage, look at `<magento_root>/composer.json`.
-  [Customer module](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/composer.json)
-  [Luma theme](https://github.com/magento/magento2/blob/2.4/app/design/frontend/Magento/luma/composer.json)
-  [en_us language package](https://github.com/magento/magento2/blob/2.4/app/i18n/Magento/en_US/composer.json)

## For more information

For more information about Composer, see the [Composer documentation](https://getcomposer.org/doc/00-intro.md).