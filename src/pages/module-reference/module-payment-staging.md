---
title: PaymentStaging
description: N/A
---

# Magento Magento_PaymentStaging Module

The Magento_PaymentStaging module is a part of the staging functionality in Magento EE. It extends the Magento_Payment module for the staging preview functionality.

## Implementation details

The Magento_PaymentStaging module restricts functionality of the Magento_Payment module in the staging preview mode. It shows only offline payment methods that are enabled.

## Dependencies

You can find the list of modules that have dependencies on the Magento_PaymentStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_PaymentStaging module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_PaymentStaging module.

<InlineAlert slots="text" />
The version of this module is 100.4.5.
