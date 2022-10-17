---
title: SharedCatalog
description: README.md contents of the module from the source code
---

## Overview

The Magento_SharedCatalog modules defines the visibility of products as well as product prices in the catalog and in B2B quotes for different company accounts. 

The module allows a merchant to create multiple shared catalogs, link them to one or more company accounts, and set different product prices. Shared catalogs also control the visibility of products and categories for a company in the storefront. The shared catalog type (public or custom) defines the scope of products and prices available for guest users vs logged-in users. The system can have only one public and any number of custom shared catalogs.

The module relies on the CatalogPermissions module, in that the visibility of categories for a customer group is defined by category permissions for this customer group. Once a shared catalog is enabled in B2B features, the category permissions are automatically enabled. Adding a product or a category to a shared catalog enables appropriate category permissions for the customer groups linked to this shared catalog.

The module provides web APIs and can be integrated with third-party solutions to manage shared catalogs in Magento.

## Installation details

The module heavily depends on the Magento_Company module, which must be installed and enabled first. Category permissions must be enabled for shared catalogs to work properly. Price configuration for a shared catalog requires the start of a message queue consumer `sharedCatalogUpdatePrice`.

The module does not create any backward incompatible changes. It can be deactivated and uninstalled at any time.

When the module is uninstalled, the other [ProductType]SharedCatalog modules won't work.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Shared catalogs are using message queues to save prices. For more information about queues, see [Message Queues](https://developer.adobe.com/commerce/php/development/components/message-queues/).

Extension developers can interact with the Magento_SharedCatalog module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_SharedCatalog module.

### Layouts

You can extend and override layouts in the `Magento\SharedCatalog\view\adminhtml\layout` directory.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The `Magento\SharedCatalog\view\adminhtml\ui_component` directory contains extensible UI components.

* Forms: Company, catalog rule, catalog rule staging, product, sales rule, sales rule staging update, shared catalog, shared catalog tier price.

* Listings: Company, product, shared catalog company, shared catalog, shared catalog product pricing, shared catalog product listing.

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/) and [UI Form Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/form/).

