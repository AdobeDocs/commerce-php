---
title: Source Selection Algorithms | Commerce PHP Extensions
description: Learn about the Source Selection Algorithm systems that run in the background to keep your salable quantities updated.
---

# Source selection algorithms

The **Source Selection Algorithm (SSA)** recommends how to fulfill partial and full shipments. The merchant decides which business needs take precedence when deciding which shipping method to use:

*  Should the products be delivered from the sources designated as having the highest priority?
*  Should the total shipment cost be the primary factor in choosing a shipment method?
*  Should the shipments originate from the closest source?
*  Should the fastest shipping method with the shortest delivery time be used, even if it's not the cheapest?

<InlineAlert variant="info" slots="text" />

See [Source Algorithms and Reservations](https://experienceleague.adobe.com/docs/commerce-admin/inventory/basics/selection-reservations.html) in the _Admin User Guide_.

## SSA interfaces

The source priority algorithm recommends delivering products from sources having the highest priority. The `SourceSelectionServiceInterface` accepts an `InventoryRequestInterface` object, which in turn contains the stock ID and a list of items to be shipped. Each item contains only the SKU and quantity. Other potentially relevant data, such as shipping address, is not included, because the priority algorithm does not need it.

Additional input data might be needed for more sophisticated algorithms, such as the Distance Priority algorithm. In this case, the algorithm needs the shipping address and all data entered for the source (GPS or full address). That's why `InventoryRequestInterface` implements `ExtensibleDataInterface` interfaces, which can be extended with custom input parameters.

Currently, Inventory Management deducts stock from the appropriate source after the merchant creates a shipment for an order. However, that's not flexible enough--a developer might want to introduce customizations and launch the SSA when the customer proceeds to checkout. Running the SSA at this point could provide the customer more accurate shipping costs. Note in this case, the `Order` object has not created yet, and the system must instead rely on the `Quote` object.

Taking into account that there are at least two valid business cases when to launch the SSA, and the data source can be an `Order` or `Quote` object, Inventory Management introduces a new layer of abstraction. The algorithm must use an abstract data container instead of a specific Magento entity.

Use these interfaces to create your own SSA:

*  [InventoryRequestInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Api/Data/InventoryRequestInterface.php) requests products for a given quantity and stock ID
*  [ItemRequestInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Api/Data/ItemRequestInterface.php) represents the requested quantity for a specific SKU
*  [SourceSelectionServiceInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Api/SourceSelectionServiceInterface.php) returns the source selection algorithm result for the specified `inventoryRequest`
*  [GetSourceSelectionAlgorithmListInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Api/GetSourceSelectionAlgorithmListInterface.php) returns the list of data interfaces that represent registered SSAs
*  [SourceSelectionAlgorithmInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Api/Data/SourceSelectionAlgorithmInterface.php) represents a single SSA
*  [SourceSelectionInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventorySourceSelectionApi/Model/SourceSelectionInterface.php) returns the SSA result for the specified `inventoryRequest`
*  [GetDistanceInterface](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventoryDistanceBasedSourceSelectionApi/Api/GetDistanceInterface.php)  - returns the distance between the source and the shipping address in kilometers without specifying the units. To change this behavior, provide your own implementation for `\Magento\InventoryDistanceBasedSourceSelection\Model\DistanceProvider\GoogleMap\GetDistance`.

## Develop a custom algorithm

As you develop your custom Source Selection Algorithm, keep these design considerations in mind:

*  Implement `SourceSelectionInterface`
*  If your module provides an SSA on quotes, introduce your own `InventoryRequestFactory`
*  Register your SSA within a `di.xml` file

### Implement  `SourceSelectionInterface`

Your SSA must implement `SourceSelectionInterface`, which is shown below:

```php?start_inline=1
/**
 * Returns source selection algorithm result for given Inventory Request
 * Current interface should be implemented in order to add own Source Selection Method
 *
 * @api
 */
interface SourceSelectionInterface
{
    /**
     * @param InventoryRequestInterface $inventoryRequest
     * @return SourceSelectionResultInterface
     */
    public function execute(
       InventoryRequestInterface $inventoryRequest
    ): SourceSelectionResultInterface;
}
````

For example, the following example defines the `MinimalDeliveryCostAlgorithm` class:

```php?start_inline=1
namespace Some\Vendor\Namespace\SourceSelection;

/**
 * Minimal Delivery Cost for Merchant algorithm
 *
 * @api
 */
class MinimalDeliveryCostAlgorithm implements SourceSelectionInterface
{
    public function execute(
       InventoryRequestInterface $inventoryRequest
    ): SourceSelectionResultInterface;
    {
        // TODO: Implement execute() method.
    }
}
```

### Create a `InventoryRequest` factory for quotes  (optional)

Magento provides the [`InventoryRequestFromOrderFactory`](https://github.com/magento/inventory/blob/1.1.3/app/code/Magento/InventoryShipping/Model/InventoryRequestFromOrderFactory.php), which determines the sources to use to fulfill the order at the time a shipment is created.

```php?start_inline=1
class InventoryRequestFromOrderFactory
{
      /**
     * @param OrderInterface $order
     * @return InventoryRequestInterface
     */
    public function create(OrderInterface $order) : InventoryRequestInterface
    {
        $requestItems = [];
        $websiteId = $order->getStore()->getWebsiteId();
        $stockId = (int)$this->stockByWebsiteIdResolver->execute((int)$websiteId)->getStockId();
        /** @var OrderItemInterface|OrderItem $orderItem */
        foreach ($order->getItems() as $orderItem) {
            $itemSku = $this->getSkuFromOrderItem->execute($orderItem);
            $qtyToDeliver = $orderItem->getQtyToShip();
            //check if order item is not delivered yet
            if ($orderItem->isDeleted()
                || $orderItem->getParentItemId()
                || $this->isZero((float)$qtyToDeliver)
                || $orderItem->getIsVirtual()
            ) {
                continue;
            }
            $requestItems[] = $this->itemRequestFactory->create([
                    'sku' => $itemSku,
                    'qty' => $qtyToDeliver
            ]);
        }
        return $this->inventoryRequestFactory->create([
            'stockId' => $stockId,
            'items' => $requestItems
        ]);
    }
}
```

To add an SSA at the time of checkout, introduce your own factory that produces an  `InventoryRequestInterface` based on a `Quote` object, outlined as follows:

```php?start_inline=1
class InventoryRequestFactory
{
    /**
     * @param \Magento\Quote\Api\Data\CartInterface $quote
     * @return InventoryRequestInterface
     */
    public function create(\Magento\Quote\Api\Data\CartInterface $quote) : InventoryRequestInterface
    {
        // TODO
    }
}
```

### Configure `di.xml`

Configure your module's `etc/di.xml` file to register your SSA with `SourceSelectionServiceInterface` and `GetSourceSelectionAlgorithmList`.

```xml
<type name="Magento\InventorySourceSelectionApi\Model\SourceSelectionService">
    <arguments>
        <argument name="sourceSelectionMethods" xsi:type="array">
            <item name="minimalDeliveryCost" xsi:type="string">Some\Vendor\Namespace\SourceSelection\MinimalDeliveryCostAlgorithm</item>
        </argument>
    </arguments>
</type>
<type name="Magento\InventorySourceSelectionApi\Model\GetSourceSelectionAlgorithmList">
    <arguments>
        <argument name="availableAlgorithms" xsi:type="array">
            <item name="minimalDeliveryCost" xsi:type="array">
                <item xsi:type="string" name="code">minimalDeliveryCost</item>
                <item xsi:type="string" name="title" translatable="true">Minimal Delivery Cost</item>
                <item xsi:type="string" name="description" translatable="true">Algorithm that calculates the shipping option with the lowest shipping cost to the merchant.</item>
            </item>
        </argument>
    </arguments>
</type>
```
