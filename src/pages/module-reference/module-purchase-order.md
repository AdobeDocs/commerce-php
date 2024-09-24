---
title: PurchaseOrder
description: N/A
---

# Magento_PurchaseOrder

​

## Overview

​
The PurchaseOrder module contains functionality for creating purchase orders in a B2B environment. When enabled, all orders created within the company will be created as purchase orders.  This allows B2B users to enforce purchasing rules and worflows within a Magento store.
​

## Installation details

​
The PurchaseOrder module has dependencies on the following modules:
​

-  Module_Authorization
-  Module_Catalog
-  Module_Checkout
-  Module_Company
-  Module_Customer
-  Module_Directory
-  Module_Msrp
-  Module_Negotiable_Quote
-  Module_Payment
-  Module_Quote
-  Module_Sales
-  Module_Sales_Sequence
-  Module_Store
-  Module_Tax
-  Module_Theme
-  Module_Ui

​
which must be installed and enabled first. This module does not create any backward incompatible changes. It can be uninstalled or deactivated at any time.
​

## Structure

​
[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).
​

## Extensibility

​​Extension developers can interact with the Magento_PurchaseOrder module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).
  
[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_PurchaseOrder module.

### Layouts

​This module introduces the following layouts and layout handles in the `view/frontend/layout` directory:

- `email_purchaseorder_details`
- `purchaseorder_purchaseorder_index`
- `purchaseorder_purchaseorder_success`
- `purchaseorder_purchaseorder_view`

### UI components

​
You can extend the purchase order listings using the `company_purchaseorder_listing.xml` and `my_purchaseorder_listing.xml` configuration files.

## Additional information

​
Check the [B2B release notes](https://experienceleague.adobe.com/docs/commerce-admin/b2b/release-notes.html) for more information on new changes.

<InlineAlert slots="text" />
The version of this module is 100.4.1.
