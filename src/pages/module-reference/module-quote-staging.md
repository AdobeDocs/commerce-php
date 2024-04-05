---
title: QuoteStaging
description: N/A
---

# Magento_QuoteStaging module

The Magento_QuoteStaging module is a part of the staging functionality in Magento EE. It`s connect Magento_Quote module with Magento_Staging module.

## Implementation details

The Magento_QuoteStaging module adds StagingApplier post processor to recollect quotes that items product prices changed during staging update.

## Dependencies

You can find the list of modules that have dependencies on the Magento_QuoteStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

You can interact with the Magento_QuoteStaging module using the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_QuoteStaging module.
