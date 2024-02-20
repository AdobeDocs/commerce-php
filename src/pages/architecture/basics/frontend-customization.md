---
title: Frontend Customization | Commerce PHP Extensions
description: Discover tools designed to help you customize your Adobe Commerce or Magento Open Source storefront.
keywords:
  - Extensions
---

# Frontend customization

The frontend is designed to optimize storefront customization, with highly extensible *themes* being the central customization mechanism.

Merchants are encouraged to use components and themes to extend and transform the appearance of their storefronts.

## Storefront customization tools

Adobe provides several tools to help you significantly jumpstart the storefront customization process:

*  Blank theme

*  [UI components](https://developer.adobe.com/commerce/frontend-core/ui-components/)

*  [Admin pattern library](https://developer.adobe.com/commerce/admin-developer/pattern-library/)

See the [Frontend Developer Guide](https://developer.adobe.com/commerce/frontend-core/guide/) for information on creating your themes.

### Blank theme

The blank theme template provides a launchpad for storefront customization. You can use this boilerplate as a robust starting point for your own theme development.

### UI components

Using standard coding and styling tools can help:

*  Enforce for consistency in design across your storefronts
*  Simplify (and speed up) the design process

This component library contains standard reusable components for form features, such as fields and buttons, and navigation elements. The UI library is a set of generic web components and Commerce-specific patterns, which simplifies the process of theme creation and customization.

See [Overview of UI components](https://developer.adobe.com/commerce/frontend-core/ui-components/) for details about this library.

### Admin pattern library

A *pattern library* is a collection of user interface (UI) design patterns that can be re-used in locations throughout your product installation. The [Admin Pattern Library](https://developer.adobe.com/commerce/admin-developer/pattern-library/) defines examples of components that administrators working with the storefront can use.

Form elements included in the Admin pattern library include:

*  address form
*  button bar
*  container
*  tabs
*  sign-in form

Users of the default storefront encounter examples of these form elements throughout the product. These patterns provide a valuable language of software components (and indirectly, user experiences) for extension developers and administrators.

The Admin Pattern library is built on the Less preprocessor and implemented as a module. You can download a free, current version of this module from [Commerce Marketplace](https://marketplace.magento.com/).

See [Admin Pattern Library](https://developer.adobe.com/commerce/admin-developer/pattern-library/) for more information on using this library.

## Storefront customization levels

These four levels of potential storefront customization are listed in order to increase complexity.

### Extend CSS

Commerce supplies a default theme and a Less-based CSS. You can substantially change a storefront using CSS only. This uncomplicated strategy might suit projects with a limited budget, or might interest developers who create different skins for a site. A small business enter this process of storefront customization by buying a third-party developed theme from Commerce Marketplace to extend the default values.

### Replace PHTML template files

In addition to extending the default CSS, you can generate different HTML markup. For example, you might need to add a missing CSS class name, or add an extra `<div>` tag to achieve some visual effect. You might also need to tweak some JavaScript to cope with different HTML markup. This change is more demanding than simply extending CSS, but is still within the grasp of smaller projects and leaner teams.

### Replace CSS

Rather than edit the default CSS provided by Commerce, you might decide to replace all the default storefront CSS code with your own. This strategy avoids tying a project to the Commerce-provided CSS, but puts a greater burden on project development and integration. It also allows the use of different CSS tools or technologies not provided with Commerce. Partners who build their own set of CSS libraries could reuse these libraries on different customer projects. (These unique CSS libraries may help differentiate a partner from others in the market.)

In addition to replacing CSS files, you might need to replace small amounts of HTML and JavaScript.

### Replace CSS, HTML, and JavaScript

Delivering a sharply different shopping experience than the default Commerce installation provides is a more substantial task. However, the tradeoff might be a more complicated experience integrating additional extensions into your installation in the future.

<InlineAlert variant="success" slots="text"/>

Any customization of your storefront will work optimally, and provide the easiest path for later upgrades, if you follow the best practice of consistently compartmentalizing code by type. For example, keep all HTML in PHTML files; keep all JavaScript in JavaScript files.
