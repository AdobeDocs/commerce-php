---
title: Adding a new payment integration (payment method)
description: This is an overview of how to add integrations to handle transactions with other payment providers.
keywords:
  - Extensions
  - Integration
  - Payments
---

<Fragment src='/includes/braintree-note.md'/>

# Adding a new payment integration (payment method)

Out-of-the-box Adobe Commerce implements integration with PayPal, Braintree, and Authorize.Net payment service providers. These integrations allow you to create and handle transactions based on order details.

You can create integration with other payment providers, using [Commerce payment provider gateway](../payment-gateway/index.md).

<InlineAlert variant="info" slots="text"/>

The Commerce payment provider gateway allows creating secure and PCI-compliant integrations with payment services. To keep PCI compliance, you must not store sensitive credit card information.

The topics in this chapter explain how to add an integration with a custom payment service provider (in other words, add a new payment method) and implement the authorize payment action for this payment method. For illustration, we use code
samples from the [Braintree](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree) payment integration.

<InlineAlert variant="info" slots="text"/>

You can also view the [Payment sample module](https://github.com/magento/magento2-samples/tree/master/sample-module-payment-gateway) in the `magento/magento2-samples`
repository to understand the underlying principles. However, be aware that this code is NOT supported.

To add a new payment method, take the following high-level steps:

1. Configure general payment method module options. Described in the [Payment method module configuration](module-configuration.md) topic.

1. Configure payment method options. Described in [Payment method configuration](payment-option-config.md).

1. Implement and configure payment method facade - the entity allowing to process payment actions between Commerce sales management and payment processor. Described in [Payment method facade](facade-configuration.md) and [Payment info rendering in Admin checkout](formblocktype.md).

1. Implement and configure payment actions (like authorize, void and so on). Described in [Add a gateway command](payment-action.md)

Your payment method might be available from either storefront and Admin, or both. And also can have a different configuration for each area. The keynotes on how to configure where the method can be used, and how to implement different behavior, are described in the [Configure payment method by area](admin-integration.md) topic.

## Terms Used

| Term        | Description |
| ----------- | ----------- |
| Payment additional information| Array of data where you can store any payment-related information|
