---
title: Price Adjustments | Commerce PHP Extensions
description: Adjust product prices on Adobe Commerce and Magento Open Source category or product pages.
contributor_name: Goivvy LLC
contributor_link: https://www.goivvy.com
keywords:
  - Extensions
---

# Price adjustments

Price adjustments adjust the product price as it is displayed on category or product pages.

In this example, we will add `1.79` to each product price.

To create a price adjustment, add the following code to the module's `VENDOR/MODULE/etc/di.xml`:

```xml
<type name="Magento\Framework\Pricing\Adjustment\Collection">
  <arguments>
    <argument name="adjustments" xsi:type="array">
      <item name="devadj" xsi:type="const">VENDOR\MODULE\Pricing\Adjustment::ADJUSTMENT_CODE</item>
    </argument>
  </arguments>
</type>
<type name="Magento\Framework\Pricing\Adjustment\Pool">
  <arguments>
     <argument name="adjustments" xsi:type="array">
        <item name="devadj" xsi:type="array">
           <item name="className" xsi:type="string">VENDOR\MODULE\Pricing\Adjustment</item>
           <item name="sortOrder" xsi:type="string">10</item>
        </item>
     </argument>
  </arguments>
</type>
```

The `VENDOR/MODULE/Pricing/Adjustment.php` file should look like:

```php
namespace VENDOR\MODULE\Pricing;

use Magento\Framework\Pricing\Adjustment\AdjustmentInterface;
use Magento\Framework\Pricing\SaleableInterface;

class Adjustment implements AdjustmentInterface
{

    const ADJUSTMENT_CODE = 'devadj';
    const ADJUSTMENT_VALUE = 1.79;

    /**
     * Get adjustment code
     *
     * @return string
     */
    public function getAdjustmentCode()
    {
        return self::ADJUSTMENT_CODE;
    }

    /**
     * Define if adjustment is included in base price
     *
     * @return bool
     */
    public function isIncludedInBasePrice()
    {
        return true;
    }

    /**
     * Define if adjustment is included in display price
     *
     * @return bool
     */
    public function isIncludedInDisplayPrice()
    {
        return true;
    }

    /**
     * Extract adjustment amount from the given amount value
     *
     * @param float $amount
     * @param SaleableInterface $saleableItem
     * @param null|array $context
     * @return float
     */
    public function extractAdjustment($amount, SaleableInterface $saleableItem, $context = [])
    {
        return $amount - self::ADJUSTMENT_VALUE;
    }

    /**
     * Apply adjustment amount and return result value
     *
     * @param float $amount
     * @param SaleableInterface $saleableItem
     * @param null|array $context
     * @return float
     */
    public function applyAdjustment($amount, SaleableInterface $saleableItem, $context = [])
    {
        return $amount + self::ADJUSTMENT_VALUE;
    }

    /**
     * Check if adjustment should be excluded from calculations along with the given adjustment
     *
     * @param string $adjustmentCode
     * @return bool
     */
    public function isExcludedWith($adjustmentCode)
    {
        return $this->getAdjustmentCode() === $adjustmentCode;
    }

    /**
     * Return sort order position
     *
     * @return int
     */
    public function getSortOrder()
    {
        return 21;
    }
}
```

The `ADJUSTMENT_CODE` constant is a unique code for the adjustment which is added to the `Magento\Framework\Pricing\Adjustment\Collection` collection.

The adjustment logic is defined in the `extractAdjustment` and `applyAdjustment` functions.

Price adjustments affect storefront product prices.

Price adjustments **will not** affect quote item prices, so when a product is added to the cart, any price adjustments defined above are discarded.

## Add price adjustments for quote items

To add price adjustments for quote items, a custom quote total is added:

Add the following to `VENDOR/MODULE/etc/sales.xml`:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Sales:etc/sales.xsd">
    <section name="quote">
        <group name="totals">
            <item name="custom-surcharge" instance="VENDOR\MODULE\Model\Quote\Surcharge" sort_order="1000"/>
        </group>
    </section>
</config>
```

Then in `VENDOR/MODULE/Model/Quote/Surcharge.php`:

```php
namespace VENDOR\MODULE\Model\Quote;

use Magento\Quote\Api\Data\ShippingAssignmentInterface;
use Magento\Quote\Model\Quote\Address\Total;
use Magento\Quote\Model\Quote;

class Surcharge extends \Magento\Quote\Model\Quote\Address\Total\AbstractTotal
{

   const COLLECTOR_TYPE_CODE = 'custom-surcharge';

   /**
    * Surcharge constructor.
    */
   public function __construct()
   {
       $this->setCode(self::COLLECTOR_TYPE_CODE);
   }

   /**
    * Collect totals including custom surcharge.
    *
    * @param Quote $quote
    * @param ShippingAssignmentInterface $shippingAssignment
    * @param Total $total
    * @return $this
    */
   public function collect(
        Quote $quote,
        ShippingAssignmentInterface $shippingAssignment,
        Total $total
   ) {
        parent::collect($quote, $shippingAssignment, $total);

        $items = $shippingAssignment->getItems();
        if (!count($items)) {
            return $this;
        }

        $amount = 0;
        foreach($quote->getItemsCollection() as $_quoteItem){
            $amount += $_quoteItem->getQty() * \VENDOR\MODULE\Pricing\Adjustment::ADJUSTMENT_VALUE;
        }

        $total->setTotalAmount(self::COLLECTOR_TYPE_CODE, $amount);
        $total->setBaseTotalAmount(self::COLLECTOR_TYPE_CODE, $amount);
        $total->setCustomAmount($amount);
        $total->setBaseCustomAmount($amount);
        $total->setGrandTotal($total->getGrandTotal() + $amount);
        $total->setBaseGrandTotal($total->getBaseGrandTotal() + $amount);
        return $this;
   }

  /**
    * @param Total $total
    */
   protected function clearValues(Total $total)
   {
       $total->setTotalAmount('subtotal', 0);
       $total->setBaseTotalAmount('subtotal', 0);
       $total->setTotalAmount(self::COLLECTOR_TYPE_CODE, 0);
       $total->setBaseTotalAmount(self::COLLECTOR_TYPE_CODE, 0);
       $total->setSubtotalInclTax(0);
       $total->setBaseSubtotalInclTax(0);
   }

   /**
    * @param Quote $quote
    * @param Total $total
    * @return array
    */
   public function fetch(
       Quote $quote,
       Total $total
   ) {

       $amount = 0;

       foreach ($quote->getItemsCollection() as $_quoteItem) {
            $amount += $_quoteItem->getQty() * \VENDOR\MODULE\Pricing\Adjustment::ADJUSTMENT_VALUE;
       }

       return [
           'code' => $this->getCode(),
           'title' => __('Custom Surcharge Total'),
           'value' => $amount
       ];
   }

   /**
    * @return \Magento\Framework\Phrase
    */
   public function getLabel()
   {
       return __('Custom Surcharge');
   }
}
```

The `COLLECTOR_TYPE_CODE` constant is a unique name of the custom total. The custom total can be retrieved with `Magento\Quote\Model\Quote\Address\Total::getTotalAmount`, and set with `Magento\Quote\Model\Quote\Address\Total::setTotalAmount`.

### Display price-adjusted totals on the cart page

To display the price-adjusted total on the cart page, we need to create a few files.

First, add the new total:

`VENDOR/MODULE/view/frontend/layout/checkout_cart_index.xml`:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="checkout.cart.totals">
            <arguments>
                <argument name="jsLayout" xsi:type="array">
                    <item name="components" xsi:type="array">
                        <item name="block-totals" xsi:type="array">
                            <item name="children" xsi:type="array">
                                <item name="custom-surcharge" xsi:type="array">
                                    <item name="component" xsi:type="string">VENDOR_MODULE/js/view/cart/totals/surcharge</item>
                                    <item name="sortOrder" xsi:type="string">25</item>
                                    <item name="config" xsi:type="array">
                                        <item name="title" xsi:type="string" translate="true">Custom Surcharge</item>
                                    </item>
                                </item>
                            </item>
                        </item>
                    </item>
                </argument>
            </arguments>
        </referenceBlock>
    </body>
</page>
```

Then, define a new component: `VENDOR_MODULE/js/view/cart/totals/surcharge`:

`VENDOR/MODULE/view/frontend/web/js/view/cart/totals/surcharge.js`:

```javascript
define([
    'Magento_Checkout/js/view/summary/abstract-total',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/totals',
    'mage/translate'
], function (Component, quote, totals, $t) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'VENDOR_MODULE/summary/surcharge'
        },
        totals: quote.getTotals(),

        /**
         * @return {*|Boolean}
         */
        isDisplayed: function () {
            return this.isFullMode() && this.getPureValue() != 0;
        },

        /**
         * Get surcharge title
         *
         * @returns {null|String}
         */
        getTitle: function () {
            if (!this.totals()) {
                return null;
            }

            return $t('Custom Surcharge');
        },

        /**
         * @return {Number}
         */
        getPureValue: function () {
            let amount = 0,
                customSurchargeTotal;

            if (this.totals()) {
                customSurchargeTotal = totals.getSegment('custom-surcharge');

                if (customSurchargeTotal) {
                    amount = customSurchargeTotal.value;
                }
            }

            return amount;
        },

        /**
         * @return {*|String}
         */
        getValue: function () {
            return this.getFormattedPrice(this.getPureValue());
        }
    });
});
```

Then create the template `VENDOR_MODULE/summary/surcharge`:

`VENDOR/MODULE/view/frontend/web/template/summary/surcharge.html`:

```html
<!-- ko if: isDisplayed() -->
<tr class="totals surcharge">
    <th class="mark" scope="row">
        <span class="title" data-bind="text: getTitle()"></span>
    </th>
    <td class="amount">
        <span class="price" data-bind="text: getValue(), attr: {'data-th': name}"></span>
    </td>
</tr>
<!-- /ko -->
```

### Display price-adjusted total on the checkout page

To display the price-adjusted total on the checkout page, add it to the `totals` component.

`VENDOR/MODULE/view/frontend/layout/checkout_index_index.xml`:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="checkout.root">
            <arguments>
                <argument name="jsLayout" xsi:type="array">
                    <item name="components" xsi:type="array">
                        <item name="checkout" xsi:type="array">
                            <item name="children" xsi:type="array">
                                <item name="sidebar" xsi:type="array">
                                    <item name="children" xsi:type="array">
                                        <item name="summary" xsi:type="array">
                                            <item name="children" xsi:type="array">
                                                <item name="totals" xsi:type="array">
                                                    <item name="children" xsi:type="array">
                                                        <item name="custom-surcharge" xsi:type="array">
                                                            <item name="component" xsi:type="string">VENDOR_MODULE/js/view/cart/totals/surcharge</item>
                                                            <item name="sortOrder" xsi:type="string">25</item>
                                                            <item name="config" xsi:type="array">
                                                                <item name="title" xsi:type="string" translate="true">Custom Surcharge</item>
                                                            </item>
                                                        </item>
                                                    </item>
                                                </item>
                                            </item>
                                        </item>
                                    </item>
                                </item>
                            </item>
                        </item>
                    </item>
                </argument>
            </arguments>
        </referenceBlock>
    </body>
</page>
```

The `VENDOR_MODULE/js/view/cart/totals/surcharge` component was defined earlier in the article.

If all has gone smoothly, when run, you should see the adjusted price reflected in the shopping cart.

### Display price adjustment in order totals in the admin UI

To display the price adjustment as a separate row in the order totals on the order detail page within the admin UI, add it to the `order_totals` block.

`VENDOR/MODULE/view/adminhtml/layout/sales_order_view.xml`:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="order_totals">
            <block class="VENDOR\MODULE\Block\Adminhtml\Sales\Order\Totals" name="custom_surcharge_total">
                <action method="setBeforeCondition">
                    <argument name="condition" xsi:type="string">tax</argument>
                </action>
            </block>
        </referenceBlock>
    </body>
</page>
```
You can adjust the value for `condition` in the `setBeforeCondition` action to change before which row the adjustment is added.

The `order_totals` block triggers the `initTotals()` method for each child block.

Next we need to define our block.

`VENDOR/MODULE/Block/Adminhtml/Sales/Order/Totals`:

```php
namespace VENDOR\MODULE\Block\Adminhtml\Sales\Order;

use Magento\Framework\DataObject;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Sales\Model\Order;
use VENDOR\MODULE\Pricing\Adjustment;
use VENDOR\MODULE\Model\Quote\Surcharge;

class Totals extends Template
{

    /**
     * @var Surcharge
     */
    private Surcharge $surcharge;

    /**
     * @param Context $context
     * @param Surcharge $surcharge
     * @param array $data
     */
    public function __construct(
        Context $context,
        Surcharge $surcharge,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->surcharge = $surcharge;
    }

    /**
     * @return $this
     */
    public function initTotals()
    {
        $adjustmentValue = 0;
        $items = $this->getParentBlock()->getSource()->getAllItems();

        foreach ($items as $item) {
            $adjustmentValue += $item->getQtyOrdered() * Adjustment::ADJUSTMENT_VALUE;
        }
        
        if ($adjustmentValue) {
            $totals = $this->getParentBlock()->getTotals();
            $total = new DataObject(
                [
                    'code' => Surcharge::COLLECTOR_TYPE_CODE,
                    'label' => $this->surcharge->getLabel(),
                    'value' => $adjustmentValue,
                    'base_value' => $adjustmentValue
                ]
            );

            if (isset($totals['grand_total_incl'])) {
                $this->getParentBlock()->addTotalBefore($total, 'grand_total');
            } else {
                $this->getParentBlock()->addTotalBefore($total, $this->getBeforeCondition());
            }
        }
        
        return $this;
    }
}

```

If all went well you should now see a new row as part of the order totals in the admin UI whenever your price adjustment is applied.