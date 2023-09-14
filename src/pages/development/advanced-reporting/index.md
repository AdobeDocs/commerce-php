---
title: Advanced reporting | Commerce PHP Extensions
description: Learn how Adobe Commerce and Magento Open Source use the Analytics module to collect and send data to Adobe Commerce Reporting.
keywords:
  - Extensions
---

# Advanced reporting

[Advanced reporting functionality](https://experienceleague.adobe.com/docs/commerce-admin/start/reporting/business-intelligence.html#advanced-reporting) is free to Adobe Commerce and Magento Open Source customers and is provided through an integration with [Adobe Commerce Reporting](https://business.adobe.com/products/magento/business-intelligence.html). The [Analytics](../../module-reference/module-analytics.md) module collects and sends data to Adobe Commerce Reporting. However, you do not need to have an Adobe Commerce Reporting account to use the Analytics module.

<InlineAlert variant="info" slots="text" />

If you encounter problems with Advanced Reporting, try the [troubleshooter](https://experienceleague.adobe.com/docs/commerce-knowledge-base/kb/troubleshooting/miscellaneous/magento-advanced-reporting-troubleshooter.html) in the *Adobe Commerce Knowledge Base*.

## Prerequisites

1. The website must run on a public web server.
1. The domain must have a valid security (SSL) certificate.
1. Adobe Commerce or Magento Open Source must have been installed or upgraded successfully without error.
1. In the Adobe Commerce or Magento Open Source configuration, the [Base URL (Secure) setting](https://docs.magento.com/user-guide/stores/store-urls.html) for the store view must point to the secure URL. For example `https://yourdomain.com`.
1. In the Adobe Commerce or Magento Open Source configuration, **Use Secure URLs on Storefront**, **and Use Secure URLs in Admin** must be set to **Yes**.
1. Make sure that the [crontab](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/configure-cron-jobs.html) is created and cron jobs are running on the installed server.

The merchant can now click on the **Go to Advanced Reporting** button on the Admin dashboard to launch the advanced reporting features.

<InlineAlert variant="info" slots="text"/>

It can take up to a day for data to be available in Advanced Reporting.

## Recommendations

To avoid system overload during its prime time, you can set the preferable time of a day for a data collection.

## Extensibility

Though the Analytics module provides an API, it is used specifically to interchange data with Adobe Commerce Reporting. Adobe does not recommend extending the advanced reporting functionality.
