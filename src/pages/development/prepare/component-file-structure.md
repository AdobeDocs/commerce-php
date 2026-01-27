---
title: About Component File Structure | Commerce PHP Extensions
description: Review the required files for Adobe Commerce and Magento Open Source components.
keywords:
  - Extensions
---

# About component file structure

One of the first things you can do to get started with component development is to understand and set up the file system. Each type of component has a *different file structure*, although all components require certain files.

In addition, you can choose the component root directory to start development. The following sections have more information.

## Root directory location

<Fragment src='/_includes/component-root.md'/>

## Required files

The following files are required for all components:

*  `registration.php`: Among other things, this file specifies the directory in which the component is installed by vendors in production environments. By default, Composer automatically installs components in the `<Application root dir>/vendor` directory. For more information, see [Component registration](../build/component-registration.md).
*  `composer.json`: Specifies component dependencies and other metadata. For more information, see [Composer integration](../build/composer-integration.md).

Each component has an additional component-specific required file:

| Component Type | Required file | Description |
| --- | --- | --- |
| `magento2-module` | [module.xml](../../architecture/modules/dependencies.md#managing-module-dependencies) | This file defines basic information about the component, such as component dependencies and version number. Adobe Commerce and Magento Open Source use the version number to determine which schema and data to update when executing `bin/magento setup:upgrade`. |
| `magento2-theme` | [theme.xml](https://developer.adobe.com/commerce/frontend-core/guide/themes/create-storefront/#declare-your-theme) | Describes the theme. File specifies a theme name in the `title` node, a parent theme (optional), and a theme preview image (optional) in the `media/preview_image` node. |
| `magento2-language` | [language.xml](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/localization#language-package-languagexml) | Declares a language translation package. |
