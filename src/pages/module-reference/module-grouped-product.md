---
title: GroupedProduct
description: N/A
---

# Magento_GroupedProduct module

This module introduces new product type in the Magento application named Grouped Product.
It provides ability to offer several standalone products for sale as a group on the same Product Detail page.
It can offer variations of a product, or group them by season or theme to create a coordinated set.
Products can be purchased separately or as a set.
Each product purchased appears in the Shopping Cart as a separate item.

This module extends the existing functionality of Magento_Catalog module by adding new product type.

## Installation details

Before installing this module, note that the Magento_GroupedProduct module is dependent on the following modules:

- `Magento_Catalog`
- `Magento_CatalogInventory`
- `Magento_Sales`
- `Magento_Quote`

Before disabling or uninstalling this module, note that the following modules depends on this module:

- `Magento_GroupedCatalogInventory`
- `Magento_GroupedProductGraphQl`
- `Magento_MsrpGroupedProduct`

For information about a module installation in Magento 2, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

## Structure

`Pricing/` - the directory that contains solutions for grouped product price.

For information about a typical file structure of a module in Magento 2, see [Module file structure](https://developer.adobe.com/commerce/php/development/build/component-file-structure/#module-file-structure).

## Extensibility

Extension developers can interact with the Magento_GroupedProduct module. For more information about the Magento extension mechanism, see [Magento plugins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_GroupedProduct module.

### Layouts

This module introduces the following layouts in the `view/frontend/layout`, `view/adminhtml/layout` and `view/base/layout` directories:

- `view/adminhtml/layout`:
    - `catalog_product_grouped`
    - `catalog_product_new`
    - `catalog_product_view_type_grouped`
    - `groupedproduct_edit_popup`
    - `groupedproduct_popup_grid`
    - `sales_order_creditmemo_new`
    - `sales_order_creditmemo_updateqty`
    - `sales_order_creditmemo_view`
    - `sales_order_invoice_new`
    - `sales_order_invoice_updateqty`
    - `sales_order_invoice_view`
    - `sales_order_view`
- `view/frontend/layout`:
    - `catalog_product_rss_feed_renderer_list`
    - `catalog_product_view_type_grouped`
    - `checkout_cart_item_renderers`
    - `checkout_onepage_review_item_renderers`
    - `sales_email_order_creditmemo_renderers`
    - `sales_email_order_invoice_renderers`
    - `sales_email_order_renderers`
    - `sales_guest_invoice`
    - `sales_order_creditmemo_renderers`
    - `sales_order_invoice_renderers`
    - `sales_order_item_renderers`
    - `sales_order_print_creditmemo_renderers`
    - `sales_order_print_renderers`
- `view/base/layout`:
    - `catalog_product_prices`

For more information about a layout in Magento 2, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

You can extend a grouped product listing updates using the configuration files located in the `view/adminhtml/ui_component` directory:

- `grouped_product_listing`

This module extends widgets ui components the configuration files located in the `view/frontend/ui_component` directory:

- `widget_recently_compared`
- `widget_recently_viewed`

For information about a UI component in Magento 2, see [Overview of UI components](https://developer.adobe.com/commerce/frontend-core/ui-components/).

### Public APIs

- `\Magento\GroupedProduct\Api\Data\GroupedOptionsInterface`
    - represents `product item id with qty` of a grouped product

For information about a public API in Magento 2, see [Public interfaces & APIs](https://developer.adobe.com/commerce/php/development/components/api-concepts/).

## Additional information

For more information about creating grouped product, see [Creating Grouped Product](https://experienceleague.adobe.com/en/docs/commerce-admin/catalog/products/types/product-create-grouped).

<InlineAlert slots="text" />
The version of this module is 100.4.8.
