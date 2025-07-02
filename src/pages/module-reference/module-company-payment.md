---
title: CompanyPayment
description: N/A
---

# Magento_CompanyPayment module

The Magento_CompanyPayment module allows a merchant to configure which payment methods are available for B2B companies.

In Admin, the CompanyPayment module adds an additional panel (on the Company profile page and on the B2B Features page) where a merchant configures payment methods for companies. Payment methods can be configured on the store level or on the company level.

## Installation details

The module has a dependency on the Magento_Company module, which must be installed and enabled first. This module does not create any backward incompatible changes. It can be deactivated and uninstalled at any time.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_CompanyPayment module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_CompanyPayment module.

### Layouts

You can extend and override layouts in the `Magento\CompanyPayment\view\frontend\layout` directory.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directory contains extensible UI components:

<!-- Should the description for the following directory be "company profile" or "company payment methods"? -->

- `Magento\CompanyPayment\view\frontend\ui_component` - company form

For more information, see [UI Form Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/form/).

<InlineAlert slots="text" />
The version of this module is 100.5.1.
