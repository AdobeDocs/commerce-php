---
title: ReviewStaging
description: N/A
---

# Magento_ReviewStaging module

The Magento_ReviewStaging module is a part of the staging functionality in Magento EE. It displays the Product Reviews grid on the Schedule Update form.

## Implementation details

The Magento_ReviewStaging module extends the following Magento_Review module functionality to be used in staging mode:

- Adds Product Reviews grid on the Schedule Update form.

NOTE You cannot create an update for a product review.

## Dependencies

You can find the list of modules that have dependencies on the Magento_ReviewStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_ReviewStaging module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_ReviewStaging module.

### Layouts

You can extend and override layouts in the `Magento\ReviewStaging\view\adminhtml\layout` directory.
For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

<InlineAlert slots="text" />
The version of this module is 100.4.5.
