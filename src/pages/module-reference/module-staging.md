---
title: Staging
description: N/A
---

## Overview

Magento_Staging module is used for setting up, previewing and managing future store updates.

## Dependencies

The **Magento_Staging** is dependent on the following modules:

 - Magento_Ui

## Extension points

Magento_Staging module have configured timeline view that simplify representation of updates. Configuration of
timeline is present in view/adminhtml/ui_component/staging_update_grid.xml file. Difference between simple grid is
in next components declaration:

 - listingToolbar
    - template - overloaded template to provide switcher between grid and timeline, legend for timeline.
    - updateTypes - path to status column that provide data for legend
 - columns
    - component - timeline component tht extends listing.
    - recordTmpl - overloaded template for timeline records.
    - detailsTmpl - template for tooltip that provide details about updates.
 - status column
    - component - extends selection column, sets class based on value.
    - updateTypesMap - array that contains bounded classes and values.

## Precautions

 - To avoid mixed content and to work properly, Staging Site Preview feature requires both Storefront and Admin area to be under the same protocol (http or https).

<InlineAlert slots="text" />
The version of this module is 101.2.8.
