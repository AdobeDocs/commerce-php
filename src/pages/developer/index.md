---
title: Extensions | Commerce PHP Extensions
description: placeholder 
---

# Introduction

The [PHP](https://glossary.magento.com/php) Developer Guide contains information for developers who want to know more about developing or modifying Adobe Commerce and Magento Open Source components. With this knowledge you can extend or customize any of the existing components. You can also create components that introduce new functionality and distribute them to merchants.

## Components

The Adobe Commerce and Magento Open Source applications are made up of *Modules*, *Themes*, and *Language Packages*:

*  [**Modules**](https://devdocs.magento.com/guides/v2.4/architecture/archi_perspectives/components/modules/mod_intro.html) interact with other parts of the application to accomplish a particular business function or provide a feature. A [module](https://glossary.magento.com/module) can contain a user interface for displaying information or interacting with the user. It can also contain application interfaces that another module or code chunk might call.

*  [**Themes**](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/themes/theme-overview.html) provide a personalized touch for each Adobe Commerce or Magento Open Source installation by changing the look and feel of the [storefront](https://glossary.magento.com/storefront) or [Admin](https://glossary.magento.com/admin). Two themes are already available within the default code structure: Blank theme and Luma theme. Refer to these default themes when creating custom themes.

*  [**Language packages**](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/translations/xlate.html) assist in internationalization(i18n) and localization by providing translations for strings that display on the storefront and Admin.

<InlineAlert variant="info" slots="text"/>

You must follow a [PSR-4 compliant](http://www.php-fig.org/psr/psr-4/) structure when building a module.
