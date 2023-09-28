---
title: Gateway Command
description: Learn how provider responses are sent, received, and processed.
keywords:
  - Extensions
  - Integration
  - Payments
---

import Docs from '/src/_includes/braintree-note.md'

<Docs />

# Gateway Command

Gateway Command is a component of the Adobe Commerce payment gateway that takes the [payload](index.md#terms-used) required for a particular payment provider and sends, receives, and processes the provider's response.

For each operation (authorization, capture and so on) of a certain payment provider - a separate gateway command is added.

## Interface

Basic interface for a gateway command is [`\Magento\Payment\Gateway\CommandInterface`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/CommandInterface.php). It implements the [Command design pattern](https://designpatternsphp.readthedocs.io/en/latest/Behavioral/Command/README.html).

## Basic implementation

The `\Magento\Payment\Gateway\Command\GatewayCommand` class is the default `CommandInterface` implementation. It allows performing most of the operations implemented in the [Commerce sales management](index.md#terms-used).

## Adding gateway commands

For each particular integration with a payment provider, gateway commands are added using virtual types in [dependency injection (DI)](../../components/dependency-injection.md) configuration.

In the following example the `BraintreeAuthorizeCommand` gateway command is added. The command implements the "authorize" operation for the Braintree payment provider ([`app/code/Magento/Braintree/etc/di.xml`](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml)):

```xml
<virtualType name="BraintreeAuthorizeCommand" type="Magento\Payment\Gateway\Command\GatewayCommand">
    <arguments>
        <argument name="requestBuilder" xsi:type="object">BraintreeAuthorizeRequest</argument>
        <argument name="transferFactory" xsi:type="object">Magento\Braintree\Gateway\Http\TransferFactory</argument>
        <argument name="client" xsi:type="object">Magento\Braintree\Gateway\Http\Client\TransactionSale</argument>
        <argument name="handler" xsi:type="object">BraintreeAuthorizationHandler</argument>
        <argument name="validator" xsi:type="object">Magento\Braintree\Gateway\Validator\ResponseValidator</argument>
        <argument name="errorMessageMapper" xsi:type="object">Magento\Braintree\Gateway\ErrorMapper\VirtualErrorMessageMapper</argument>
    </arguments>
</virtualType>
```

(The code sample is from Magento Open Source v2.2. Although the payment provider gateway was added in v2.0, the particular default implementation using the gateway were added in v2.1.)

A gateway command must be configured with the following arguments:

-  `requestBuilder`: [request builder](request-builder.md), builds an array of provider-specific arguments using the order information.

-  `transferFactory`: [transfer factory](gateway-client.md#transfer-factory), creates transfer object from request data, which will be used by Gateway Client to process requests.

-  `client`: [gateway client](gateway-client.md), takes the provider-specific arguments and performs a low-level call to the provider.

Optional arguments :

-  `handler`: [response handler](response-handler.md), changes the order and payment status depending on the payment provider response.

-  `validator`: [response validator](response-validator.md), validates the provider response.
