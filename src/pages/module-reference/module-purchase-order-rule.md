---
title: PurchaseOrderRule
description: N/A
---

# Magento_PurchaseOrderRule

​

## Overview

​
The PurchaseOrderRule module contains functionality for creating and enforcing approval rules for purchase orders. Companies in a B2B environment can use these rules to enforce purchasing guidelines and limits.
​
With this module installed, you may create rules such as:
​

-  Purchase orders over $X require approvals from a manager.
-  Purchase orders containing more than $Y unique products require approval.
-  Purchase orders with shipping charges greater than $Z require approval.
​

## Installation details

​
The PurchaseOrderRule module has dependencies on the following modules:
​

-  Magento_Company
-  Magento_Customer
-  Magento_Directory
-  Magento_Payment
-  Magento_PurchaseOrder
-  Magento_Quote
-  Magento_Rule
-  Magento_SalesRule
-  Magento_Shipping
-  Magento_Theme
-  Magento_Ui
​

which must be installed and enabled first. This module does not create any backward incompatible changes. It can be uninstalled or deactivated at any time.
​

## Structure

​
[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).
​

## Extensibility

​Extension developers can interact with the Magento_PurchaseOrderRule module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_PurchaseOrderRule module.

### Layouts

This module introduces the following layouts and layout handles in the `view/frontend/layout` directory:

- `purchaseorderrule_create_index`
- `purchaseorderrule_edit_index`
- `purchaseorderrule_form`
- `purchaseorderrule_index_index`
​

### UI components

​
You can extend the purchase order rule listings using the `purchase_order_rule_listing.xml` and `require_my_approval_purchaseorder_listing.xml` configuration files.

## Additional information

​
Check the [B2B release notes](https://experienceleague.adobe.com/docs/commerce-admin/b2b/release-notes.html) for more information on new changes.

<InlineAlert slots="text" />
The version of this module is 100.4.0.
