---
title: RequisitionList
description: N/A
---

# Magento_RequisitionList

The Magento_RequisitionList module allows a customer to create multiple lists of frequently-purchased items and use those lists for order placement. This feature is available for both logged-in users and guests.

RequisitionList functionality is similiar to wish lists, but it has the following differences:

* A requisition list is not purged after sending items to the shopping cart. It can be used to place multiple orders.

* The UI for requisition lists has been modified to a compact view in order to display large number of items.

The merchant can configure maximum number of requisition lists per customer.

## Installation details

The module does not create any backward incompatible changes. It can be deactivated and uninstalled in any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_RequisitionList module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_RequisitionList module.

### Layouts

You can extend and override layouts in the `Magento\RequisitionList\view\frontend\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directories contain extensible UI components:

* `Magento\RequisitionList\view\frontend\ui_component` - requisition list listing

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

<InlineAlert slots="text" />
The version of this module is 100.5.1.
