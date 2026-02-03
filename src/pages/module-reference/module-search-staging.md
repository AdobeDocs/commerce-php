---
title: SearchStaging
description: N/A
---

# Magento_SearchStaging module

The Magento_SearchStaging module is a part of the staging functionality in Magento EE.
It restricts functionality of the Magento_SearchStaging module in the staging preview mode.

## Implementation details

The Magento_SearchStaging module disables the Magento_Search module functionality in the staging preview mode.

## Dependencies

You can find the list of modules that have dependencies on the Magento_SearchStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_SearchStaging module. [The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_SearchStaging module.

### Layouts

You can extend and override layouts in the `Magento/SearchStaging/view/frontend/layout/` directory.
For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

<InlineAlert slots="text" />
The version of this module is 100.4.6.
