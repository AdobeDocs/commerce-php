---
title: Glossary of common terms | Commerce PHP Extensions
description: Review common terms that are used to describe technical aspects of Adobe Commerce and Magento Open Source extension development.
keywords:
  - Extensions
---

# Glossary of terms

## Component

We refer to what you're coding as *components*. (Composer refers to them as <a href="https://getcomposer.org/doc/05-repositories.md#packages" target="_blank">*packages*</a>; the terms component and package are equivalent.) A component can be classified into the following *types*:

*  Module (extend application capabilities)
*  Theme (change the look and feel of your storefront and Admin)
*  Language package (localize the storefront and Admin)

You can *package* your components as follows:

*  Individually
*  As a [metapackage](https://getcomposer.org/doc/04-schema.md#type), which is a Commerce Marketplace requirement if you're developing a product that has more than one component.

   A metapackage consists of *shared packages*. Examples: a metapackage that consists of a module and a theme, two modules, two themes, and so on.

   More information about metapackages can be found in the next section.

<InlineAlert variant="info" slots="text"/>

Commerce Marketplace uses the blanket term *product* to refer to a component or a metapackage.

## Metapackage

Commerce Marketplace requires more than one component to be packaged as a *metapackage*, which consists of only a `composer.json` that specifies individual components and their dependencies. (Commerce Marketplace also refers to a metapackage as an *extension*.)

A metapackage requires or suggests components that we refer to as *shared packages*. You can use a shared package in multiple metapackages if you wish. (If you use shared packages, Marketplace requires that *all* components in a metapackage be shared packages.)

For example, you might want to list two metapackages in the Commerce Marketplace---a standard package and a premium package. All of the standard package components could be shared packages used by the premium package.

Merchants do not need to understand that, under the covers, some packages are shared.

<InlineAlert variant="warning" slots="text"/>

You can upload to Commerce Marketplace as many shared packages as you want but you must specifically give components access to them. Failure to do so means your components won't work properly after they're installed by merchants. For more information, see the [Commerce Marketplace User Guide](https://developer.adobe.com/commerce/marketplace/guides/sellers/).
