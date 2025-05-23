---
title: InventoryInStorePickupShippingApi
description: N/A
---

# InventoryInStorePickupShippingApi module

The `InventoryInStorePickupShippingApi` module provides service contracts for "In-Store Pickup Delivery Method" implementation of In-Store Pickup functionality.

This module is part of the new inventory infrastructure. The
[Inventory Management overview](https://developer.adobe.com/commerce/webapi/rest/inventory/index.html)
describes the MSI (Multi-Source Inventory) project in more detail.

## Installation details

This module is installed as part of Magento Open Source. Unless a custom implementation for `InventoryInStorePickupShippingApi`
is provided by a 3rd-party module, the module cannot be deleted or disabled.

## Extensibility

The `InventoryInStorePickupShippingApi` module contains extension points and APIs that 3rd-party developers
can use to provide customization of In-Store Pickup functionality

### Public APIs

Public APIs are defined in the `Api` and `Api/Data` directories.

### REST endpoints

The `etc/webapi.xml` file defines endpoints for configuring in store pickup for sources.

<InlineAlert slots="text" />
The version of this module is 1.1.4.
