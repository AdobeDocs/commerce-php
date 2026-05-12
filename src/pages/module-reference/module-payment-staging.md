---
title: PaymentStaging
description: N/A
---

# Magento_PaymentStaging module

This module is a part of the staging functionality in Adobe Commerce. It extends the Magento_Payment module for the staging preview functionality.

## Implementation details

This module restricts the functionality of the Magento_Payment module in the staging preview mode. It shows only offline payment methods that are enabled.

## Dependencies

You can find the list of modules that have dependencies on the Magento_PaymentStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_PaymentStaging module. For more information about the Magento extension mechanism, see [Plugins](https://developer.adobe.com/commerce/php/development/components/plugins).

[The dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection) enables you to override the functionality of the Magento_PaymentStaging module.

<InlineAlert slots="text" />
The version of this module is 100.4.6.
