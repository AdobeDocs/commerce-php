---
title: Configure payment method by area
description: Learn how to define payment method availability.
---

# Configure payment method by area

You can determine if the payment method is available for the [storefront](https://glossary.magento.com/storefront) and [checkout](https://glossary.magento.com/checkout) in the [payment method configuration in `config.xml`](payment-option-config.md):

-  `can_use_checkout`: Determines if [payment method](https://glossary.magento.com/payment-method) is available in storefront checkout

-  `can_use_internal`: Determines if payment method is available in [Admin](https://glossary.magento.com/admin) order creation

If you have a different payment flow for the storefront and the Admin panel, you can use a separate DI configuration for each [area](../../../architecture/modules/areas.md#area-types):

-  `%Vendor_Module%/etc/adminhtml/di.xml`: DI configuration for the Admin panel

-  `%Vendor_Module%/etc/frontend/di.xml`: DI configuration for the storefront

## Example

For example, if the storefront 3D Secure verification uses the Braintree payment method, but you don't want it to be available in the Admin panel, then the DI configuration for the [authorization](https://glossary.magento.com/authorization) request builder for the [admin area](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/adminhtml/di.xml) would be something similar to:

```xml
<virtualType name="BraintreeAuthorizeRequest" type="Magento\Payment\Gateway\Request\BuilderComposite">
    <arguments>
        <argument name="builders" xsi:type="array">
            <item name="customer" xsi:type="string">Magento\Braintree\Gateway\Request\CustomerDataBuilder</item>
            <item name="payment" xsi:type="string">Magento\Braintree\Gateway\Request\PaymentDataBuilder</item>
            ...
        </argument>
    </arguments>
</virtualType>
```

While the general [app/code/Magento/Braintree/etc/di.xml](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml) does not have 3D secure verification builder for the Admin panel, you can use a [virtual type](https://glossary.magento.com/virtual-type) with the same name (the object will be created according to the context of the area).
