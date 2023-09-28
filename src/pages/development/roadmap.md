---
title: Developer roadmap | Commerce PHP Extensions
description: Navigate the steps for developing an Adobe Commerce or Magento Open Source extension.
keywords:
  - Extensions
---

# Extension developer roadmap

This topic introduces the high-level workflow for a developer who wants to create or customize the Adobe Commerce or Magento Open Source application. Developers can also package and distribute their customizations to merchants.

To satisfy the minimum required elements for creating or customizing your application:

*  [Declare component dependencies](build/composer-integration.md) in `composer.json`.

   While you can manage dependencies on your own, it is a recommended and strongly encouraged best practice to use the `composer.json` file.

*  [Register](build/component-registration.md) the component using the `registration.php` file.
*  Use these component-specific XML definition files:
   *  Modules: [`module.xml`](build/component-name.md)
   *  Themes: [`theme.xml`](https://developer.adobe.com/commerce/frontend-core/guide/themes/create-storefront/#declare-your-theme)
   *  Language packages: [`language.xml`](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/localization.html)

*  Distribute your component:
   *  [Package your component](package/component.md) in `.zip` format.
   *  If you upload the component to Commerce Marketplace, it should be less than 30MB in size.
