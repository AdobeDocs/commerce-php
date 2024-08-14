---
title: CompanyCredit
description: N/A
---

# Magento_CompanyCredit module

The Magento_CompanyCredit module adds the "Payment on Account" payment method for B2B companies. It also allows the credit history to be viewed from both Admin and the storefront.

With the Magento_Company Credit module:

- A customer can pay orders with Payment on Account method (or in credit)
- An admin user can manage credit and credit settings for a company (in the admin panel)
- Merchants and customers can track credit history, and specifically: credit allocation, order placement, credit reimbursement, credit change (amount, currency or possibility to exceed credit limit)

The company credit functionality is available for company users only.

## Installation details

The module has a dependency on the Magento_Company module, which must be installed and enabled first. The module does not create any backward incompatible changes. The CompanyCredit module can be deactivated and uninstalled at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_CompanyCredit module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_CompanyCredit module.

[Payment method configuration](https://developer.adobe.com/commerce/php/development/payments-integrations/base-integration/payment-option-config/) will allow you additional configuration to extend module functionality.

### Layouts

You can extend and override layouts in the `Magento\CompanyCredit\view\adminhtml\layout` and `Magento\CompanyCredit\view\frontend\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directories contain extensible UI components:

- `Magento\CompanyCredit\view\adminhtml\ui_component` -  company form, company listing, history listing
- `Magento\CompanyCredit\view\frontend\ui_component` - balance history listing

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/) and [UI Form Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/form/)

<InlineAlert slots="text" />
The version of this module is 100.4.0.
