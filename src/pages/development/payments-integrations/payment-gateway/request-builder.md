---
title: Request Builder
description: Learn how to implement complex building strategies using builder composites.
keywords:
  - Extensions
  - Integration
  - Payments
---

import Docs from '/src/_includes/braintree-note.md'

<Docs />

# Request Builder

Request Builder is a component of the Adobe Commerce payment gateway responsible for building a request from several parts. It allows implementing complex, yet atomic and testable, building strategies. Each builder can have simple logic or contain builder composites.

## Basic interface

The basic interface for a request builder is [`\Magento\Payment\Gateway\Request\BuilderInterface`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Request/BuilderInterface.php).

## Builder composite

`\Magento\Payment\Gateway\Request\BuilderComposite` is a container for a list of `\Magento\Payment\Gateway\Request\BuilderInterface` implementations. It gets a list of classes, or types, or virtual type names, and performs a lazy instantiation on an actual `BuilderComposite::build([])` call. So that you can have as many objects, as required, but only those, which are needed for a request are instantiated.

`BuilderComposite` implements the [composite design pattern](https://designpatternsphp.readthedocs.io/en/latest/Structural/Composite/README.html).

The concatenation strategy is defined in the `BuilderComposite::merge()` method. So if you need to alter the strategy, you need to add your custom implementation of `BuilderComposite`.

## Adding a builder composite

Builder composites are added using [dependency injection](../../components/dependency-injection.md) in `di.xml`. A builder composite might comprise simple builders as well as other builder composites.

Example of adding composite builders for the Braintree payment provider ([`app/code/Magento/Braintree/etc/di.xml`](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml)):

```xml
...
<!-- is a builder composite comprising a number of builders -->
<virtualType name="BraintreeAuthorizeRequest" type="Magento\Payment\Gateway\Request\BuilderComposite">
    <arguments>
        <argument name="builders" xsi:type="array">
            <item name="customer" xsi:type="string">Magento\Braintree\Gateway\Request\CustomerDataBuilder</item>
            <item name="payment" xsi:type="string">Magento\Braintree\Gateway\Request\PaymentDataBuilder</item>
            <item name="channel" xsi:type="string">Magento\Braintree\Gateway\Request\ChannelDataBuilder</item>
            <item name="address" xsi:type="string">Magento\Braintree\Gateway\Request\AddressDataBuilder</item>
            <item name="vault" xsi:type="string">Magento\Braintree\Gateway\Request\VaultDataBuilder</item>
            <item name="3dsecure" xsi:type="string">Magento\Braintree\Gateway\Request\ThreeDSecureDataBuilder</item>
            <item name="device_data" xsi:type="string">Magento\Braintree\Gateway\Request\KountPaymentDataBuilder</item>
            <item name="dynamic_descriptor" xsi:type="string">Magento\Braintree\Gateway\Request\DescriptorDataBuilder</item>
            <item name="store" xsi:type="string">Magento\Braintree\Gateway\Request\StoreConfigBuilder</item>
            <item name="merchant_account" xsi:type="string">Magento\Braintree\Gateway\Request\MerchantAccountDataBuilder</item>
        </argument>
    </arguments>
</virtualType>
...
<!-- The same BraintreeAuthorizeRequest builder composite is a part of the BraintreeSaleRequest builder composite -->
<virtualType name="BraintreeSaleRequest" type="Magento\Payment\Gateway\Request\BuilderComposite">
    <arguments>
        <argument name="builders" xsi:type="array">
            <item name="authorize" xsi:type="string">BraintreeAuthorizeRequest</item>
            <item name="settlement" xsi:type="string">Magento\Braintree\Gateway\Request\SettlementDataBuilder</item>
        </argument>
    </arguments>
</virtualType>
```
