---
title: GoogleGtag
description: N/A
---

# Magento_GoogleGtag module

This module implements the integration with the Google Analytics 4 and Google Ads Gtag service.

## Installation

Before installing this module, note that the Magento_GoogleGtag is dependent on the Magento_Store module.

Before disabling or uninstalling this module, note that the Magento_GoogleOptimizer module depends on this module

For information about a module installation in Magento 2, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

## Extensibility

Extension developers can interact with the Magento_GoogleGtag module. For more information about the Magento extension mechanism, see [Magento plugins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_GoogleGtag module.

A lot of functionality in the module is on JavaScript, use [mixins](https://developer.adobe.com/commerce/frontend-core/javascript/mixins/) to extend it.

### Layouts

This module introduces the following layouts in the `view/frontend/layout` directory:

- `default`
- `checkout_onepage_success`

For more information about a layout in Magento 2, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

## Additional information

[Learn how to configure Google Analytics](https://experienceleague.adobe.com/en/docs/commerce-admin/marketing/google-tools/google-analytics).

<InlineAlert slots="text" />
The version of this module is 100.4.3.
