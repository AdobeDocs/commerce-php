---
title: MsrpStaging
description: N/A
---

# Magento_MsrpStaging module

The Magento_MsrpStaging module is a part of the staging functionality in Magento EE. It enables you to stage the manufacturer's suggested retail price.

## Implementation details

The Magento_MsrpStaging module extends the Magento_Msrp module to be used in staging. It adds the following fields in the Advice Pricing form:

- Manufacturer's Suggested Retail Price
- Display Actual Price

## Dependencies

You can find the list of modules that have dependencies on the Magento_MsrpStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_MsrpStaging module.

<InlineAlert slots="text" />
The version of this module is 100.4.6.
