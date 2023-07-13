---
title: GiftWrappingStaging
description: README.md contents of the module from the source code
---

# Magento_GiftWrappingStaging module

The Magento_GiftWrappingStaging module is a part of the staging functionality in Magento EE. It allows to stage value of 'Allow Gift Wrapping' flag and price of the wrapping for each product update.

## Implementation details

The Magento_GiftWrappingStaging module adds to the Schedule Update form of a product the following functionality:

- Enable/disable gift wrapping ("Allow Gift Wrapping" field)
- Set a price for the gift wrapping ("Price for Gift Wrapping" field).

## Dependencies

You can find the list of modules that have dependencies on the Magento_GiftWrappingStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_GiftWrappingStaging module.
