---
title: GiftCardSharedCatalog
description: N/A
---

# Magento_GiftCardSharedCatalog

The Magento_GiftCardSharedCatalog module enables gift cards to be added to a shared catalog in an B2B environment. This module extends Magento_SharedCatalog and Magento_GiftCard modules.

The Magento_GiftCardSharedCatalog module provides the following features:

* Display and manage prices for gift cards within a shared catalog.

* Control the visibility of gift cards in quotes and orders. Only those gift card products that have been added to a shared catalog will be available for searches via the "Add by SKU" feature in quotes and orders.

## Installation details

The Magento_GiftCardSharedCatalog module has a dependency on the Magento_SharedCatalog and Magento_GiftCard modules, which must be installed and enabled first. This module does not create any backward incompatible changes. It can be uninstalled or deactivated at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_GiftCardSharedCatalog module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_GiftCardSharedCatalog module.

### Layouts

You can extend and override layouts in the `Magento\GiftCardSharedCatalog\view\adminhtml\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directory contains extensible UI components:

* `Magento\GiftCardSharedCatalog\view\adminhtml\ui_component` - renderer for pricing and structure listings

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

## Additional information

You can track [backward incompatible changes made in a Magento B2b mainline after the Magento 2.2 release](https://experienceleague.adobe.com/docs/commerce-admin/b2b/release-notes.html).

<InlineAlert slots="text" />
The version of this module is 100.4.0.
