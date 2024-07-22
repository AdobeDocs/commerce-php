---
title: Inventory
description: N/A
---

# Inventory module

The `Inventory` module is part of the new inventory infrastructure,
which replaces the legacy `CatalogInventory` module with new and expanded features and APIs for Inventory Management.  

The [Inventory Management overview](https://developer.adobe.com/commerce/webapi/rest/inventory/index.html)
describes the MSI (Multi-Source Inventory) project in more detail.

All Inventory Management modules follow the
[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).
[Inventory management architecture](https://developer.adobe.com/commerce/php/architecture/modules/inventory-management/)
provides additional insight about the overall structure of these modules.

## Installation details

This module is installed as part of Magento Open Source. Unless a custom implementation for `InventoryApi` is provided
by a 3rd-party module, the module cannot be deleted or disabled.

## Extension points and service contracts

Magento does not recommend using or referring to classes and other entities in the `Inventory` module. All public
interfaces and extension points related to this module are located in the `InventoryApi` module.
Use the interfaces and extension points defined in `InventoryApi` to extend this module.

<InlineAlert slots="text" />
The version of this module is 1.2.5.
