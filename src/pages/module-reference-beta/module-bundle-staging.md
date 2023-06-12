---
title: BundleStaging
description: README.md contents of the module from the source code
---

# Magento_BundleStaging module

The Magento_BundleStaging module is a part of the staging functionality in Magento EE. This new functionality enables you to stage a bundle product in the Schedule Update form of the product.

## Implementation Details

The Magento_BundleStaging module extends the functionality of the Magento_Bundle module. When you schedule an update for a bundle product, all bundle item options for that concrete product are available and can be edited. All the bundle product attributes can be staged.

### Installation Details

The Magento_BundleStaging module makes irreversible changes in a database during installation. It means, that you cannot uninstall this module.

## Dependencies

You can find the list of modules that have dependencies with the Magento_BundleStaging module in the `require` object of the `composer.json` file. The file is located in the same directory as this `README` file.

## Extension Points

Extension points enable extension developers to interact with the Magento_BundleStaging module. You can interact with the Magento_BundleStaging module using the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_BundleStaging module.

### UI components

You can extend Bundle updates product listing using  the grid UI component located in the `Magento/BundleStaging/view/adminhtml/ui_component/bundle_update_product_listing.xml`. For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

## Additional information

For more Magento 2 developer documentation, see [Magento 2 Developer Documentation](https://devdocs.magento.com).
