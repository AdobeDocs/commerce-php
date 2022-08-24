---
title: DownloadableStaging
description: README.md contents of the module from the source code
---

# Magento_DownloadableStaging module

The Magento_DownloadableStaging module is a part of the staging functionality in Magento EE. It enables you to create new Downloadable Product updates or add new changes to the existing store updates. In other words, you can modify the Downloadable Products entity attributes in updates. These updates are shown on the content dashboard.

## Implementation details

The Magento_DownloadableStaging module changes the Downloadable Product creation page to make them compatible with the Magento Staging Framework. This module extends the Magento_Downloadable module functionality to be used in staging.

The Magento_DownloadableStaging module adds the "Downloadable information" tab to the Schedule Update form for a product.

### Installation details

The Magento_DownloadableStaging module makes irreversible changes in a database during installation. You cannot uninstall this module.

## Dependencies

You can find the list of modules that have dependencies on the Magento_DownloadableStaging module in the `require` section of the `composer.json` file. The file is located in the root directory of the module.

## Extension points

Extension points enable extension developers to interact with the Magento_DownloadableStaging module.
For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_DownloadableStaging module.

### UI components

You can extend product and category updates using the UI components located in the `Magento\DownloadableStaging\view\adminhtml\ui_component` directory. For more information, see [UI Listing/Grid Component](https://developer.adobe.com/commerce/frontend-core/ui-components/components/listing-grid/).

### Layouts

You can extend and override layouts in the `Magento\DownloadableStaging\view\adminhtml\layout` directory.
For more information about layouts, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).
