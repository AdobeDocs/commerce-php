---
title: Company
description: N/A
---

# Magento_Company module

The Magento_Company module allows a merchant to create a company account and assign multiple members of the company to the account.

The module also implements roles and permissions for the company members. The company admin builds a hierarchical company structure (which consists of teams and users) in the storefront and assigns roles and permissions to the company members. This hierarchy allows the company admin to control user activity within the account. This hierarchy as well as roles and permissions are currently available in the storefront only. A merchant can only view the list of company members in Admin.
A merchant can view and manage company profiles in Admin. A company's status controls what kind of access the company members have to the website. An admin user can also configure company-level emails and allow or disallow a company registration from the storefront. Also, this module adds a 'customer type' attribute to the customer in Admin: individual user, company member or company admin.

## Installation details

This module does not create any backward incompatible changes. This module can be deactivated after all the other B2B modules (except QuickOrder and RequisitionList) are deactivated.

## Structure

[Learn about a typical file structure for a Magento 2 module](https://developer.adobe.com/commerce/php/development/build/component-file-structure/).

## Extensibility

Extension developers can interact with the Magento_Company module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_Company module.

### Layouts

You can extend and override layouts in the `Magento\Company\view\adminhtml\layout` and `Magento\Company\view\frontend\layout` directories.

For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

### UI components

The following directories contain extensible UI components:

* `Magento\Company\view\adminhtml\ui_component` -  customer listing, invitation form, sales order grid

* `Magento\Company\view\base\ui_component` - company listing, complany creation form, customer creation form

* `Magento\Company\view\frontend\ui_component` - company users listing, role listing

For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

<InlineAlert slots="text" />
The version of this module is 102.0.2.
