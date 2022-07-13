---
title: Reservations | Commerce PHP Extensions
description: Learn about the Reservations systems that run in the background to keep your salable quantities updated.
---

# Reservations

Adobe Commerce and Magento Open Source use _reservations_ to calculate and keep track of the salable quantity of each product assigned to a stock.

<InlineAlert variant="info" slots="text" />

See [Source Algorithms and Reservations](https://experienceleague.adobe.com/docs/commerce-admin/inventory/basics/selection-reservations.html) in the _Admin User Guide_.

## Interfaces and services

All interfaces and services are defined in the `InventoryReservations` and `InventoryReservationsApi` modules.

### Data interface

`ReservationInterface` defines the constants and getter methods required for managing reservations.

### Reservation services

When an event such as an order placement, cancellation, refund, or shipment occurs, the Append Reservation Service creates a reservation for each SKU, indicating how many items to add to the salable quantity total. The service guarantees the client does not use the `ReservationAppend` service to update existing reservations. (Reservations are append-only entities.) For example, use the service to check whether the `ReservationId`, which is passed in the scope of `ReservationInterface`, has been nullified.

```php
interface AppendReservationsInterface
{
    /**
     * Append reservations
     *
     * @param ReservationInterface[] $reservations
     * @return void
     * @throws \Magento\Framework\Exception\InputException
     * @throws \Magento\Framework\Exception\CouldNotSaveException
     */
    public function execute(array $reservations): void;
}
```

Do NOT use the `AppendReservationsInterface` service directly in the business logic that creates a business event. Instead, use a more high-level service:

```php
namespace Magento\InventorySalesApi\Api;

/**
 * This service is responsible for creating reservations upon a sale event.
 *
 * @api
 */
interface PlaceReservationsForSalesEventInterface
{
    /**
     * @param \Magento\InventorySalesApi\Api\Data\ItemToSellInterface[] $items
     * @param \Magento\InventorySalesApi\Api\Data\SalesChannelInterface $salesChannel
     * @param \Magento\InventorySalesApi\Api\Data\SalesEventInterface $salesEvent
     * @return void
     *
     * @throws \Magento\Framework\Exception\LocalizedException
     * @throws \Magento\Framework\Exception\InputException
     * @throws \Magento\Framework\Exception\CouldNotSaveException
     */
    public function execute(
        array $items,
        \Magento\InventorySalesApi\Api\Data\SalesChannelInterface $salesChannel,
        \Magento\InventorySalesApi\Api\Data\SalesEventInterface $salesEvent
    ): void;
}
```

### Checkout services

In Inventory Management, a product's `Quantity` value is not static. The salable quantity is now retrieved as a result of a dedicated service call. This differs from the previous `CatalogInventory` implementation, which defined the `Product` `StockItem` interface. (`CatalogInventory` has been deprecated.)

Use the following dynamic services introduced instead of `StockItem`:

Interface | Description
--- | ---
`GetProductSalableQtyInterface` | Returns the salable product quantity for the specified stock ID
`IsProductSalableInterface` | Checks whether the product is salable
`IsProductSalableForRequestedQtyInterface` |  Checks whether there is enough salable quantity to fulfill an order or place the product into a shopping cart

## Web API support

Adobe Commerce and Magento Open Source web APIs (REST and SOAP) impose restrictions for entity interfaces that are outside the scope of reservations. Most notably, Web APIs require getter and setter methods. Because reservations are append-only immutable entities, there are no reservation setter methods. Therefore, reservation Web APIs are not supported.
