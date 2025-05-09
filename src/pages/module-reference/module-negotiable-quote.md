---
title: NegotiableQuote
description: N/A
---

# Magento_NegotiableQuote

The Magento_NegotiableQuote module allows a customer and a merchant (admin user) to negotiate product and/or shipping prices before the customer places an order. Its functionality is available for the company members only.

Currently, B2B quoting is global--the price is given for the quote as a whole. Quoting per item is not supported. The quote lifecycle is managed via quote statuses. The quoting interface allows both a merchant and a customer to manage items in the quote (add, delete, change quantity) as well as make an offer (or request a quote) for items and/or for shipping. The negotiated price set in the negotiable quote is exactly the price that will be applied on a quote during checkout, order generation, and invoice generation.

The module provides a set of configurations for the quoting feature, such as the ability to request a quote, configure the minimum quote amount, configure the default expiration period, configure attached files, and set email templates for quotes. The module provides web APIs and can be integrated with 3rd party solutions to manage negotiable quote in Magento.

## Installation details

The module heavily depends on the Quote and Magento_Company modules, which must be previously installed and enabled.

Also, the module has dependency on the following Magento’s B2C modules: Tax module, Checkout module and Cart Pricing Rules module.

When working with the SharedCatalog module, Negotiable Quote will be restricted to the products added to the shared catalog and custom prices set in the shared catalog.

The module does not create any backward incompatible changes. Can be deactivated and uninstalled at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Magento_NegotiableQuote uses Extensible attributes to extend Magento_Quote. For more information about the Magento extensible attributes, see [Adding extension attributes to entity](https://developer.adobe.com/commerce/php/development/components/add-attributes/).

Extension developers can interact with the Magento_NegotiableQuote module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_NegotiableQuote module.

### Layouts

You can extend and override layouts in the `Magento\NegotiableQuote\view\adminhtml\layout` and `Magento\NegotiableQuote\view\frontend\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directories contain extensible UI components:

* `Magento\NegotiableQuote\view\adminhtml\ui_component` -  company form, negotiable quote grid

* `Magento\NegotiableQuote\view\frontend\ui_component` - negotiable quote listing

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/) and [UI Form Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/form/).

<InlineAlert slots="text" />
The version of this module is 101.0.2.
