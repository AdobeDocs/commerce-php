---
title: Customize Checkout | Commerce PHP Extensions
description: Review a list of tutorials focused on customizing the Adobe Commerce and Magento Open Source checkout experience.
---

# Customize checkout

[Checkout](https://glossary.magento.com/checkout) is implemented using the [UI components](https://devdocs.magento.com/guides/v2.4/ui_comp_guide/bk-ui_comps.html).
Out of the box, the checkout consists of two steps:

-  Shipping Information
-  Review and Payment Information

The checkout totals and the corresponding side-bar are only displayed after the first step is completed.

The only [exception](https://glossary.magento.com/exception) is checkout of virtual and/or downloadable products: if there are only these  types of products in the shopping cart, checkout is automatically transformed to one-step procedure, because shipping information is not required.

<InlineAlert variant="info" slots="text"/>

For the sake of compatibility, upgradability, and easy maintenance, do not edit the default application code. Add your customizations in a custom [module](https://glossary.magento.com/module).

## List of available customizations

You can customize the default checkout in multiple ways. This tutorial includes the following customizations:

-  [Add a new checkout step](add-new-step.md)
-  [Customize the view of an existing step](customize-view.md)
-  [Add a custom payment method to checkout](add-payment-method.md)
-  [Add custom validations before order placement](add-order-validation.md)
-  [Add custom shipping carrier](add-shipping-carrier.md)
-  [Add custom shipping carrier validations](add-carrier-validation.md)
-  [Add custom input mask for ZIP code](add-input-mask.md)
-  [Add a custom template for a form field on Checkout page](add-template.md)
-  [Add a new input form to checkout](add-form.md)
-  [Add a new field in address form](add-address-field.md)
-  [Add custom shipping address renderer](add-address-renderer.md)
-  [Add a custom field for an offline payment method](add-payment-field.md)
