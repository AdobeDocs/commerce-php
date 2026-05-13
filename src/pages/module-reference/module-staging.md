---
title: Staging
description: N/A
---

# Magento_Staging module

This module is used for setting up, previewing and managing future store updates.

## Dependencies

This module is dependent on the following modules:

- Magento_Ui

## Extension points

This module has a configured timeline view that simplifies the representation of updates. The configuration of the timeline is present in the `view/adminhtml/ui_component/staging_update_grid.xml` file. The difference between the simple grid and the timeline is in the following component declarations:

- `listingToolbar`
  - `template` - overloaded template to provide switcher between grid and timeline, legend for timeline.
  - `updateTypes` - path to status column that provide data for legend
- `columns`
  - `component` - timeline component that extends listing.
  - `recordTmpl` - overloaded template for timeline records.
  - `detailsTmpl` - template for tooltip that provide details about updates.
- `status column`
  - `component` - extends selection column, sets class based on value.
  - `updateTypesMap` - array that contains bounded classes and values.

## Precautions

 - To avoid mixed content and to work properly, Staging Site Preview feature requires both Storefront and Admin area to be under the same protocol (http or https).

<InlineAlert slots="text" />
The version of this module is 101.2.9.
