---
title: InventoryCatalog
description: N/A
---

# InventoryCatalog

The `InventoryCatalog` module integrates inventory management business logic into Magento's catalog logic.

This module is part of the new inventory infrastructure. The
[Inventory Management overview](https://developer.adobe.com/commerce/webapi/rest/inventory/index.html)
describes the MSI (Multi-Source Inventory) project in more detail.

## Installation details

This module is installed as part of Magento Open Source. Unless a custom implementation for `InventoryCatalogApi`
is provided by a 3rd-party module, the module cannot be deleted or disabled.

## Extension points and service contracts

All public interfaces related to this module are located in the `InventoryCatalogApi` module.
Use the interfaces defined in `InventoryCatalogApi` to extend this module.

<InlineAlert slots="text" />
The version of this module is 1.3.2.
