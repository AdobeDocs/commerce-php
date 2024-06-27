---
title: ProductVideoStaging
description: N/A
---

# Magento_ProductVideoStaging module

The Magento_ProductVideoStaging module is a part of the staging functionality in Magento EE. It enables you to add or remove a video to a product update.

## Implementation details

The Magento_ProductVideoStaging module extends the Magento_ProductVideo functionality to be used in staging. It adds an "Add Video" button to the Schedule Update form and supports a New Video form in staging mode.

## Dependencies

You can find the list of modules that have dependencies on the Magento_ProductVideoStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_ProductVideoStaging module. [The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_ProductVideoStaging module.

### Layouts

You can extend and override layouts in the `app/code/Magento/ProductVideoStaging/view/adminhtml/layout` directory.
For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

<InlineAlert slots="text" />
The version of this module is 100.4.4.
