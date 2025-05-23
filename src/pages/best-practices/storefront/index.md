---
title: Storefront UI Best Practices | Commerce PHP Extensions
description: Review best practices for customizing the Adobe Commerce and Magento Open Source storefront user interface with extensions.
keywords:
  - Extensions
---

# Storefront UI best practices

The storefront theme is the front facing interface for the application that can be customized through a [theme extension](https://developer.adobe.com/commerce/frontend-core/guide/themes/). We suggest adopting the following best practices to avoid common problems we have seen other developers make while making a theme extension.

## Clear your cache periodically

Forgetting to clear or disable caching can cause a lot of development headache. Visual spot checks on rendered content are unreliable when the content being displayed is retrieved from the cache. We recommend clearing your cache before doing visual checks for your theme to make sure the content displayed is correct.

You can manage your cache in the Admin section under **System** > Tools > **Cache Management**.

**Recommended Reading:**

*  [Clear directories during development](/development/components/clear-directories/)

## Consider different resolutions/devices

When developing your theme extension, you should check how it looks using different resolutions or devices. We recommend you apply [responsive web design(RWD)](https://en.wikipedia.org/wiki/Responsive_web_design) concepts to optimize the look and feel of your theme on different devices and resolutions. To help you with this task, both [Chrome](https://developer.chrome.com/docs/devtools/) and [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/index.html) web browsers have built-in developer tools that allow you to view your theme under different resolutions.

**Recommended Reading:**

*  [How to make your theme responsive and mobile](https://developer.adobe.com/commerce/frontend-core/guide/responsive-design/)

## Inherit and customize

There is a lot of work in building a theme extension from scratch. This is why we recommend you inherit and customize an existing theme. The application comes with both Blank and Luma themes after initial install. You can leverage the work already done to make those two themes responsive by setting one of them as your theme's parent.
