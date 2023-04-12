---
title: Best Practices for Extension Developers | Commerce PHP Extensions
description: Use this collection of best practices curated by the community and Adobe to avoid commonly reported issues in third-party Adobe Commerce and Magento Open source extensions.
---

# Best practices for extension developers

<InlineAlert variant="info" slots="text"/>

This Best Practices guide is a living document, meant to be improved and revised as the software and our recommendations change. This guide combines best practices our community requested with guidelines that our User Experience (UX), Engineering, and Product teams create.
If you have feedback about these recommendations, submit a pull request (PR) to the documentation. Give us your best practices recommendations, tell us about your challenges, and tell us how we can help standardize these guidelines.

The Adobe Commerce and Magento Open Source applications consist of the core product code plus optional components that enhance or replace the core product code. There are over 100 out-of-the-box components in the form of modules, themes, and language packages available.

The Adobe Commerce and Magento Open Source architecture allows for enhancements by letting you develop your own component. Keep in mind that in addition to the core modules, your extension will be running alongside components from other developers. For this reason, it is important that your component behaves correctly in the application's modular environment.

The table below is data from a recent poll that shows the distribution of the amount of extensions installed on an Adobe Commerce or Magento Open Source instance for each edition. So for example, 32% of merchants on EE have over 50 different extensions installed!

| Edition   | 1-9 extensions | 10-30 extensions| 31-50 extensions| 50+ extensions|
| --------- | --- | ----- | ----- | --- |
| Community | 10% | 53%   | 26%   | 11% |
| Enterprise| 9%  | 32%   | 27%   | 32% |

This guide provides best practices, guidelines, and tips for creating extensions. We encourage you to follow our best practices when developing code for your Adobe Commerce and Magento Open Source components.
