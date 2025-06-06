---
title: CatalogImportExportStaging
description: N/A
---

# Magento_CatalogImportExportStaging module

The Magento_CatalogImportExportStaging module is a part of the staging functionality in Magento EE. It extends the Magento_CatalogImportExport module functionality to be used in staging mode.

## Implementation Details

The Magento_CatalogImportExportStaging module:

- adds plugin on `Magento\CatalogImportExport\Model\Import\Product::saveProductEntity` to add version and sequence information to product entity
- listens to `catalog_product_import_bunch_delete_commit_before` event to delete values from sequence table when products being deleted

## Dependencies

You can find the list of modules that have dependencies on Magento_CatalogImportExportStaging module, in the `require` section of the `composer.json` file located in the same directory as this `README.md` file.

## Extension Points

The Magento_CatalogImportExportStaging module does not provide any specific extension points. You can extend it using the Magento extension mechanism.

For more information about Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/) and [Magento dependency injection](https://developer.adobe.com/commerce/php/development/components/dependency-injection/).

## Additional information

For more Magento 2 developer documentation, see [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/).

<InlineAlert slots="text" />
The version of this module is 100.4.5.
