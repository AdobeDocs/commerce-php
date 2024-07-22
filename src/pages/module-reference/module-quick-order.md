---
title: QuickOrder
description: N/A
---

# Magento_QuickOrder

The Magento_QuickOrder module allows customers to improve their user experience by creating a new order from a list of multiple SKUs.

Multiple items can be sent to the shopping cart from a CSV file, by copy-pasting multiple SKUs from another source, or by manually entering SKUs one-by-one into the Quick Order form. This feature is available for both logged-in users and guests.

## Installation details

The module does not create any backward incompatible changes. It heavily depends on the Magento_AdvancedCheckout module and cannot work without it. Can be deactivated and uninstalled at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_QuickOrder module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_QuickOrder module.

### Layouts

You can extend and override layouts in the `Magento\QuickOrder\view\frontend\layout` directory.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

<InlineAlert slots="text" />
The version of this module is 100.4.0.
