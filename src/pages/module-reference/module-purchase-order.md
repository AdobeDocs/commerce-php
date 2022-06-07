---
title: PurchaseOrder
description: README.md contents of the module from the source code
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
[Learn about a typical file structure for a Magento 2 module](https://devdocs.magento.com/guides/v2.4/extension-dev-guide/build/module-file-structure.html).
​
## Extensibility
​​Extension developers can interact with the Magento_PurchaseOrder module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://devdocs.magento.com/guides/v2.4/extension-dev-guide/plugins.html).
  
[The Magento dependency injection mechanism](https://devdocs.magento.com/guides/v2.4/extension-dev-guide/depend-inj.html) enables you to override the functionality of the Magento_PurchaseOrder module.

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
Check the [B2B release notes](https://devdocs.magento.com/guides/v2.4/release-notes/b2b-release-notes.html) for more information on new changes.
