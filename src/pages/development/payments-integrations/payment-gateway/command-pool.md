---
title: Gateway Command Pool
description: Select the set of gateway commands available for integration with a payment provider.
---

import Docs from '/src/pages/_includes/braintree-note.md'

<Docs />

# Gateway Command Pool

All [gateway commands](/gateway-command.md) implemented for a particular payment provider, should be added to a command pool for this provider. A command pool is a set of gateway commands available for integration with a particular payment provider. The pool is added to the configuration of the payment provider using [dependency injection](../../components/dependency-injection.md).

## Interface

The basic interface for a command pool is [`\Magento\Payment\Gateway\Command\CommandPoolInterface`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Command/CommandPoolInterface.php). It implements the [Pool pattern](https://designpatternsphp.readthedocs.io/en/latest/Creational/Pool/README.html)

## Default implementation

The [default CommandPool](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Command/CommandPool.php)
implements `CommandPoolInterface` and takes a list of commands as an optional argument for the constructor.

## Command pool configuration for a particular provider

Following is an example of the command pool configuring for the Braintree payment provider, and adding it to the provider's [payment method](https://glossary.magento.com/payment-method) configuration ([`app/code/Magento/Braintree/etc/di.xml`](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml)).

```xml
...
<!-- BraintreeCommandPool - a command pool for the Braintree payments provider -->
<virtualType name="BraintreeCommandPool" type="Magento\Payment\Gateway\Command\CommandPool">
    <arguments>
        <argument name="commands" xsi:type="array">
            <item name="authorize" xsi:type="string">BraintreeAuthorizeCommand</item>
            <item name="sale" xsi:type="string">BraintreeSaleCommand</item>
            <item name="capture" xsi:type="string">BraintreeCaptureStrategyCommand</item>
            ...
        </argument>
    </arguments>
</virtualType>
...
<!-- Adding BraintreeCommandPool to the Braintree payment method configuration:-->
<virtualType name="BraintreeFacade" type="Magento\Payment\Model\Method\Adapter">
    <arguments>
        ...
        <argument name="commandPool" xsi:type="object">BraintreeCommandPool</argument>
    </arguments>
</virtualType>
...
```

(The code sample is from Magento Open Source v2.1. Although the payment provider gateway was added in v2.0, the particular default implementation using the gateway were added in v2.1.)
