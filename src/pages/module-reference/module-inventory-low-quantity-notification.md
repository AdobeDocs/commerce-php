---
title: InventoryLowQuantityNotification
description: N/A
---

# InventoryLowQuantityNotification module

The `InventoryLowQuantityNotification` module integrates Inventory Management business logic into Magento's low quantity notification logic.

This module is part of the new inventory infrastructure. The
[Inventory Management overview](https://developer.adobe.com/commerce/webapi/rest/inventory/index.html)
describes the MSI (Multi-Source Inventory) project in more detail.

## Installation details

This module is installed as part of Magento Open Source. Unless a custom implementation for
`InventoryLowQuantityNotificationApi` is provided by a 3rd-party module, the module cannot be deleted or disabled.

## Extension points and service contracts

All public interfaces related to this module are located in the `InventoryLowQuantityNotificationApi` module.
Use the interfaces defined in `InventoryLowQuantityNotificationApi` to extend this module.

<InlineAlert slots="text" />
The version of this module is 1.2.4.
