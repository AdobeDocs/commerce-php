---
title: Configure payment method by area
description: Learn how to define payment method availability.
keywords:
  - Extensions
  - Integration
  - Payments
---

import Docs from '/src/_includes/braintree-note.md'

<Docs />

# Configure payment method by area

You can determine if the payment method is available for the storefront and checkout in the [payment method configuration in `config.xml`](payment-option-config.md):

-  `can_use_checkout`: Determines if payment method is available in storefront checkout

-  `can_use_internal`: Determines if payment method is available in Admin order creation

If you have a different payment flow for the storefront and the Admin panel, you can use a separate DI configuration for each [area](../../../architecture/modules/areas.md#area-types):

-  `%Vendor_Module%/etc/adminhtml/di.xml`: DI configuration for the Admin panel

-  `%Vendor_Module%/etc/frontend/di.xml`: DI configuration for the storefront

## Example

For example, if the storefront 3D Secure verification uses the Braintree payment method, but you don't want it to be available in the Admin panel, then the DI configuration for the authorization request builder for the [admin area](https://github.com/magento/magento2/blob/2.3/app/code/Magento/Braintree/etc/adminhtml/di.xml) would be something similar to:

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

While the general [app/code/Magento/Braintree/etc/di.xml](https://github.com/magento/magento2/blob/2.3/app/code/Magento/Braintree/etc/di.xml) does not have 3D secure verification builder for the Admin panel, you can use a virtual type with the same name (the object will be created according to the context of the area).
