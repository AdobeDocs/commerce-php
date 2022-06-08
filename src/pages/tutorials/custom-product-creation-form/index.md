---
title: Customize the Product Creation Form | Commerce PHP Extensions
description: Follow this tutorial to customize the Adobe Commerce and Magento Open Source product creation form.
---

# Customize the product creation form

This tutorial describes how developers can customize the product creation form used on the product creation and product edit pages in [Admin](https://glossary.magento.com/admin). The product creation form is implemented using the [form UI component](https://devdocs.magento.com/guides/v2.4/ui_comp_guide/components/ui-form.html).

Product attributes and attribute sets available in the form, can be customized and added under **STORES** > **Attributes** in the Admin. But you can also customize the form view and behavior in code. The following sections describe what files define the form and how they can be customized in your [module](https://glossary.magento.com/module).

## Prerequisites

[Change to developer mode](https://devdocs.magento.com/guides/v2.4/config-guide/cli/config-cli-subcommands-mode.html) while you perform all customizations and debugging.

For the sake of compatibility, upgradability, and easy maintenance, do not edit the default application code. Instead, add your customizations in a separate module.

## List of customization methods

This tutorial includes the following customizations:

*  [Customize the form configuration](configuration.md)
*  [Customize using a modifier class](modifier-class.md)

The following image is an illustration of the default view of the form on the **New Product** page:

![The product creation page in Admin](../../_images/tutorials/product_pmg.png)
