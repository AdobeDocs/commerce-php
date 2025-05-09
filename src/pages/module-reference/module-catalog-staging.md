---
title: CatalogStaging
description: N/A
---

# Magento_CatalogStaging module

The Magento_CatalogStaging module is a part of the staging functionality in Magento EE. It enables you to create new catalog updates or add new changes to the existing store updates. In other words, you can modify the category and product entity attributes in updates. These updates are shown on the content dashboard.

## Implementation Details

The Magento_CatalogStaging module extends the Magento_Catalog module functionality. It changes a category and product creation page, and related database tables to make them compatible with the Magento Staging Framework.

The following fields are removed from the Magento_Catalog module forms:

- Category form:
  - Schedule design update from
  - Schedule design update to

- Product form:
  - Set as new from
  - Set as new to
  - Schedule design update from
  - Schedule design update to
  - Special price from
  - Special price to

They are all related to the time period attributes, and now can be set using staging functionality, when you schedule a new update as:

- Special price
- Schedule design update
- Set product as new

### Category Staging

The Magento_CatalogStaging module enables you to stage the following category attributes:

- Enable/disable Category
- Include in Menu
- Category Name
- Content
  - Category Image
  - Description
  - CMS Blocks
- Display Settings
  - Display Mode
  - Anchor
  - Product Sorting
  - Layered Navigation Price Step
- Search Engine Optimization
  - Meta Title
  - Meta Keywords
  - Meta Description
- Design
  - Layout
  - Layout Update XML
  - New Theme

The following category attributes cannot be staged:

- Assignment of Products to a Category
- URL

### Product Staging

The Magento_CatalogStaging module enables you to stage the following product attributes:

- Attribute Set
- Product Name
- Price
- Weight attributes
- Visibility
- New(flag)
- Country of Manufacture
- Description
- Websites(assignment)
- Design
  - Layout
  - Display Product Options In
  - Layout Update XML
- Related Products, Up-Sells, and Cross-Sells

Also, you can stage any other attribute added in Admin.

The following product attributes cannot be staged:

- Quantity
- URL Key
- SKU

### Installation Details

The Magento_CatalogStaging module makes irreversible changes in a database during installation. It means, that you cannot uninstall this module.

## Dependencies

You can find the list of modules that have dependencies with the Magento_CatalogStaging module in the `require` object of the `composer.json` file. The file is located in the same directory as this `README` file.

## Extension Points

Extension points enable extension developers to interact with the Magento_CatalogStaging module. You can interact with the Magento_CatalogStaging module using the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_CatalogStaging module.

### UI components

You can extend product and category updates using the UI components located in the `Magento\CatalogStaging\view\adminhtml\ui_component` directory. For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

### Layouts

You can extend and override layouts in the `Magento\CatalogStaging\view\adminhtml\layout` directory.
For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### Events

You can use the following events:

- `catalog_category_prepare_save` event in the `\Magento\CatalogStaging\Model\Category\Hydrator::hydrate()` method. Parameters:
  - `category` is a category to be saved (`\Magento\Catalog\Model\Category` class).
  - `request` is a request object with the `\Magento\Framework\App\RequestInterface` interface.
- `controller_action_catalog_product_save_entity_after` event in the `\Magento\CatalogStaging\Model\Product\Hydrator::hydrate()` method. Parameters:
  - `controller` is a hydrator object (`\Magento\CatalogStaging\Model\Product\Hydrator`).
  - `product` is a product object (`\Magento\Catalog\Model\Product` class.

## Additional information

For more Magento 2 developer documentation, see [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/).

<InlineAlert slots="text" />
The version of this module is 100.4.8.
