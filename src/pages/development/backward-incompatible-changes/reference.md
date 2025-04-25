---
title: Backward-incompatible changes | Commerce PHP Extensions
description: Learn about minor changes in Adobe Commerce and Magento Open Source releases that may require you to update your extension.
keywords:
  - Extensions
---

# Backward-incompatible changes references

Use this page to review high-level reference information for all backward-incompatible changes in each supported Adobe Commerce and Magento Open Source release. Backward-incompatible changes that have a major impact and require detailed explanation and special instructions are documented in the [Backward-incompatible changes highlights](highlights.md).

We use a custom tool that extends a PHP semantic version checker to auto-generate this content. The tool compares the code base from a previous release with the code base from the latest release. Backward-incompatible changes for each release are aggregated into the following tables (if applicable):

-  Class changes
-  Class API membership changes
-  Database changes
-  Dependency injection (DI) changes
-  Interface changes
-  Interface API membership changes
-  Layout changes
-  System changes
-  XSD changes

To view changes in functional tests, refer to [Backward incompatible changes in functional tests](https://developer.adobe.com/commerce/testing/functional-testing-framework/backward-incompatible-changes/).

<InlineAlert variant="info" slots="text"/>

Patch releases are primarily focused on delivering security and quality enhancements on a regular basis to help you keep your sites performing at their peak. On an exceptional basis, breaking changes or additional patches or hotfixes may be released to address security or compliance issues and high-impact quality issues. On the module level, these are mostly PATCH-level changes; sometimes MINOR-level changes. See [Release policy](https://experienceleague.adobe.com/en/docs/commerce-operations/release/planning/versioning-policy).

## 2.4.7 - 2.4.8

### Adobe Commerce

Adobe Commerce v2.4.8 includes the [B2B extension][] v1.5.2.

import Ac248 from '/src/_includes/backward-incompatible-changes/commerce/2.4.7-2.4.8.md'

<Ac248 />

### Magento Open Source

import Os248 from '/src/_includes/backward-incompatible-changes/open-source/2.4.7-2.4.8.md'

<Os248 />

## 2.4.6 - 2.4.7

### Adobe Commerce

Adobe Commerce v2.4.7 includes the [B2B extension][] v1.4.2.

import Ac247 from '/src/_includes/backward-incompatible-changes/commerce/2.4.6-2.4.7.md'

<Ac247 />

### Magento Open Source

import Os247 from '/src/_includes/backward-incompatible-changes/open-source/2.4.6-2.4.7.md'

<Os247 />

## 2.4.5 - 2.4.6

### Adobe Commerce

Adobe Commerce v2.4.6 includes the [B2B extension][] v1.3.5.

import Ac246 from '/src/_includes/backward-incompatible-changes/commerce/2.4.5-2.4.6.md'

<Ac246 />

### Magento Open Source

import Os246 from '/src/_includes/backward-incompatible-changes/open-source/2.4.5-2.4.6.md'

<Os246 />

## 2.4.4 - 2.4.5

### Adobe Commerce

Adobe Commerce v2.4.5 includes the [B2B extension][] v1.3.4.

import Docs19 from '/src/_includes/backward-incompatible-changes/commerce/2.4.4-2.4.5.md'

<Docs19 />

### Magento Open Source

import Docs20 from '/src/_includes/backward-incompatible-changes/open-source/2.4.4-2.4.5.md'

<Docs20 />

## 2.4.3 - 2.4.4

### Adobe Commerce

Adobe Commerce v2.4.4 includes the [B2B extension][] v1.3.3.

import Docs16 from '/src/_includes/backward-incompatible-changes/commerce/2.4.3-2.4.4.md'

<Docs16 />

### Magento Open Source

import Docs17 from '/src/_includes/backward-incompatible-changes/open-source/2.4.3-2.4.4.md'

<Docs17 />

<!-- Links -->
[B2B extension]: https://experienceleague.adobe.com/en/docs/commerce-admin/b2b/reference/backward-incompatible-changes
