---
title: CheckoutStaging
description: N/A
---

# Magento_CheckoutStaging module

The Magento_CheckoutStaging module is a part of the staging functionality in Magento EE.
It extends the checkout functionality and enables you to use it in the staging preview mode.

## Implementation details

The Magento_CheckoutStaging module extends the following Magento_Checkout module functionality to be used in the staging preview mode:

- Disables an order creation
- Creates a demo quote
- Deletes the demo quote using cron

Configuration options:

- The `preview_quota_lifetime` parameter in the `Magento/CheckoutStaging/etc/config.xml` sets the lifetime of the demo quote.
- The `schedule` parameter in the `Magento/CheckoutStaging/etc/crontab.xml` sets a launch schedule of the cron.

### Installation details

The Magento_CheckoutStaging module makes irreversible changes in a database during installation. You cannot uninstall this module.

## Dependencies

You can find the list of modules that have dependencies on the Magento_CheckoutStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_CheckoutStaging module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_CheckoutStaging module.

<InlineAlert slots="text" />
The version of this module is 100.4.7.
