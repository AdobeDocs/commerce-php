---
title: Modules for advanced reporting | Commerce PHP Extensions
description: Learn about the PHP modules that Adobe Commerce and Magento Open Source use for provide advanced reporting functionality.
---

# Modules for advanced reporting

Advanced reporting functionality is implemented in the following Commerce modules.

[Analytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Analytics/README.md) implements the following:

*  Enabling subscription to Adobe Commerce Reporting and automatic re-subscription
*  Changing the base URL without changing the Adobe Commerce Reporting account
*  Declaring the configuration schemas for [report data collection](data-collection.md)
*  Collecting the Commerce instance data as reports for Commerce Reporting
*  Introducing API that provides the collected data
*  Extending the Commerce configuration with the module parameters:
   *  Subscription status (enabled/disabled)
   *  Industry (a business area in which the instance website works)
   *  Time of data collection (time of the day when the module collects data)

[CatalogAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/CatalogAnalytics/README.md) configures data definitions for data collection related to the Catalog module entities

[CustomerAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/CustomerAnalytics/README.md) configures data definitions for data collection related to the Customer module entities

[QuoteAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/QuoteAnalytics/README.md) configures data definitions for data collection related to the Quote module entities

[ReviewAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/ReviewAnalytics/README.md) configures data definitions for data collection related to the Review module entities

[SalesAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/SalesAnalytics/README.md) configures data definitions for data collection related to the Sales module entities

[WishlistAnalytics](https://github.com/magento/magento2/blob/2.4/app/code/Magento/WishlistAnalytics/README.md) configures data definitions for data collection related to the Wishlist module entities
