---
title: AdvancedSearch
description: N/A
---

# Magento_AdvancedSearch module

The Magento_AdvancedSearch module introduces advanced search functionality and provides interfaces that allow third-party search engines to implement this functionality.

## Installation details

Before disabling or uninstalling this module, note that the following modules depends on this module:

- Magento_Elasticsearch
- Magento_Elasticsearch8

For information about module installation in Magento 2, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

## Extensibility

Extension developers can interact with the Magento_AdvancedSearch module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_AdvancedSearch module.

### Events

This module observes the following event:

- `catalogsearch_query_save_after` in the `Magento\AdvancedSearch\Model\Recommendations\SaveSearchQueryRelationsObserver` file.

For information about an event in Magento 2, see [Events and observers](https://developer.adobe.com/commerce/php/development/components/events-and-observers/#events).

### Layouts

The module interacts with the following layout handles in the `view/adminhtml/layout` directory:

- `catalog_search_block`
- `catalog_search_edit`
- `catalog_search_relatedgrid`

The module interacts with the following layout handles in the `view/frontend/layout` directory:

- `catalogsearch_result_index`

For more information about layouts in Magento 2, see the [Layout documentation](https://developer.adobe.com/commerce/frontend-core/guide/layouts/).

<InlineAlert slots="text" />
The version of this module is 100.4.6.
