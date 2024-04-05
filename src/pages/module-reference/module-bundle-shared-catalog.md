---
title: BundleSharedCatalog
description: N/A
---

# Magento_BundleSharedCatalog module

The Magento_BundleSharedCatalog module enables bundle products to be added to a shared catalog in an B2B environment. This module extends Magento_SharedCatalog module and Magento_Bundle module.

The Magento_BundleSharedCatalog module provides the following features:

* Display and manage prices for bundle products within a shared catalog.

* Control the visibility of bundle products in quotes and orders. Only those bundle products that have been added to a shared catalog will be available for searches via the "Add by SKU" feature in quotes and orders.

## Installation details

This module has a dependency on the Magento_SharedCatalog and Magento_Bundle, which must be installed and enabled first.

The Magento_BundleSharedCatalog module does not create any backward incompatible changes and can be uninstalled at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_BundleSharedCatalog module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_BundleSharedCatalog module.

### Layouts

You can extend and override layouts in the `Magento\BundleSharedCatalog\view\adminhtml\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directory contains extensible UI components:

* `Magento\BundleSharedCatalog\view\adminhtml\ui_component` - renderer for pricing and structure listings

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).
