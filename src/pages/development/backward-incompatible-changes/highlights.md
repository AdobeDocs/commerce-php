---
title: Backward-incompatible changes | Commerce PHP Extensions
description: Learn about major changes in Adobe Commerce and Magento Open Source releases that require action to ensure your custom extension continues working.
keywords:
  - Extensions
---

# Backward-incompatible changes highlights

This page highlights backward-incompatible changes between Adobe Commerce and Magento Open Source releases that have a major impact and require detailed explanation and special instructions to ensure third-party modules continue working. High-level reference information for all backward-incompatible changes in each release are documented in [Backward incompatible changes reference](reference.md).

## 2.4.7-beta1

The following major backward-incompatible changes were introduced in the 2.4.7-beta1 Adobe Commerce and Magento Open Source releases:

* New interface and method for ApplicationServer module
* New public method in `Config/Type/System`
* New configuration for payment information rate limiting
* Default behavior for isEmailAvailable API

### New interface and method for ApplicationServer module

State management has been enabled for all GraphQL APIs (excluding B2B and service-related processes). The 2.4.7-beta1 release introduces a new PHP application server that is implemented on a Swoole PHP extension. The [ApplicationServer](https://developer.adobe.com/commerce/php/module-reference/module-application-server/) module enables Adobe Commerce to maintain state between Commerce GraphQL API requests and eliminates the need for request bootstrapping. By sharing application state among processes, API requests become significantly more efficient, and API response times potentially decrease by 50 to 60 milliseconds.

The `ResetAfterRequestInterface` interface and `_resetState()` method were added to enable the PHP application server. The `__debugInfo()` method was also added to fix issues with `var_dump` calls.

No action for merchants or extension developers is necessary.

The following modules are affected by this change:

* [Magento_Authorization](https://developer.adobe.com/commerce/php/module-reference/module-authorization/)
* [Magento_Config](https://developer.adobe.com/commerce/php/module-reference/module-config/)
* [Magento_Customer](https://developer.adobe.com/commerce/php/module-reference/module-customer/)
* [Magento_ResourceConnections](https://developer.adobe.com/commerce/php/module-reference/module-resource-connections/)

### New public method in `Config/Type/System`

The `bin/magento cache:clean config` CLI command, and its Admin UI equivalent, now pre-warm the config cache (when config cache is enabled) in order to reduce the lock time after cleaning the config cache. This reduces the downtime for large configurations that take significant time to generate the config cache.

We've also changed the configuration save so that it no longer cleans the `config_scopes` cache (when config cache is enabled). Config saving also pre-warms the config cache now, which also reduces the lock time for large configurations. Cleaning the config cache after saving configuration changes is still recommended.

No action for merchants or extension developers is necessary because the general functionality is the same. Only the order of generating the config cache, serializing, and encrypting (before lock instead of after) was changed.

The following module is affected by this change:

* [Magento_Config](https://developer.adobe.com/commerce/php/module-reference/module-config/)

### New configuration for payment information rate limiting

New native application rate-limiting features have been added with initial out-of-the-box support for rate limiting of payment API's. Disabled by default.

No action for merchants or extension developers is necessary.

The following module is affected by this change:

* [Magento_Quote](https://developer.adobe.com/commerce/php/module-reference/module-quote/)

### `isEmailAvailable` API

The default behavior of the [`isEmailAvailable`](https://developer.adobe.com/commerce/webapi/graphql/schema/customer/queries/is-email-available/) GraphQL query and ([`V1/customers/isEmailAvailable`](https://adobe-commerce.redoc.ly/2.4.6-admin/tag/customersisEmailAvailable/#operation/PostV1CustomersIsEmailAvailable)) REST endpoint has changed. By default, the API now always returns `true`.
The new default behaviour also affects the checkout workflow for guests that do not realize they already have an account. Previously, by default, when a guest supplied an email address that matched an existing customer account, they were prompted to sign in. Now, they are no longer prompted to sign in.

Merchants can restore the original default behavior of the `isEmailAvailable` API and checkout flow by setting the **Stores > Configuration > Sales > Checkout > Enable Guest Checkout Login field** to **Yes**. However, doing this can expose customer information to unauthenticated users.

## 2.4.6

The following major backward-incompatible changes were introduced in the 2.4.6 Adobe Commerce and Magento Open Source releases:

*  New default value for automatic redirects
*  New system configuration for customer segments
*  New system configuration for limiting products in grid
*  New system configuration for OpenSearch module
*  Symfony dependencies upgraded to latest LTS version
*  Zend_Filter replaced with laminas-filter
*  Zend_HTTP replaced with laminas-http
*  Zend_Json replaced with laminas-json
*  Zend_Validate replaced with laminas-validator

### New default value for automatic redirects

To improve performance, the default value for `generate_category_product_rewrites` in the [`app/code/Magento/CatalogURLRewrite/etc/config.xml`](https://github.com/magento/magento2/blob/2.4-develop/app/code/Magento/CatalogUrlRewrite/etc/config.xml#L12) file was changed from `1` to `0`. This change disables [automatic category/product URL rewrites](https://experienceleague.adobe.com/docs/commerce-admin/marketing/seo/url-rewrites/url-redirect-product-automatic.html#skip-rewrite), but only if you have not changed the previous default setting prior to upgrading to 2.4.6.

The new default does not change existing records in the `catalog_url_rewrite_product_category` and `url_rewrite` database tables when upgrading to 2.4.6, but no new rewrites are added. You can enable the **Generate "category/product" URL Rewrites** setting if you want to continue using it after upgrading.

<InlineAlert variant="warning" slots="text" />

Manually changing this setting (for example, using the `bin/magento config:set catalog/seo/generate_category_product_rewrites 1` command) permanently deletes all rewrites with no ability to restore them. This may cause unresolved category/product type URL conflicts that you must resolve by manually updating URL keys.

### New system configuration for limiting products in grid

<!-- AC-6425 -->

To improve product grid performance for large catalogs, a new system configuration setting (disabled by default) was added to limit the number of products in the grid: **Stores > Settings > Configuration > Advanced > Admin > Admin Grids > Limit Number of Products in Grid**. See [Limit number of products in grid](https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/configuration.html#limit-number-of-products-in-grid).

The product grid limitation only affects product collections that are used by UI components. As a result, not all product grids are affected by this limitation. Only those that are using the `Magento\Catalog\Ui\DataProvider\Product\ProductCollection` class.

The following module is affected by this change:

*  [Magento_Backend](https://developer.adobe.com/commerce/php/module-reference/module-backend/)

### New system configuration for OpenSearch module

<!-- AC-6339 -->

In Adobe Commerce and Magento Open Source 2.4.4 and 2.4.3-p2, all system configuration fields labeled **Elasticsearch** also apply to OpenSearch. When support for Elasticsearch 8.x was introduced in 2.4.6, new labels were created to distinguish between Elasticsearch and OpenSearch configurations. See [Search engine configuration](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/search/configure-search-engine.html).

To simplify current and future support for Elasticsearch and OpenSearch, we refactored redundant virtual types for the Elasticsearch modules and renamed the [functional test](https://developer.adobe.com/commerce/testing/functional-testing-framework/) action group `SearchEngineElasticsearch` to `SearchEngine`.

These changes can be break tests or custom code if you:

*  Use or extend the `SearchEngineElasticsearch` functional tests
*  Use or extend the `Magento\Elasticsearch\SearchAdapter\ConnectionManager` virtual type, which was removed

If these changes impact you, you must update all tests and custom code that rely on the refactored action group and removed virtual type.

The following modules are affected by this change:

*  [Magento_VisualMerchandiser](https://developer.adobe.com/commerce/php/module-reference/module-visual-merchandiser/)
*  [Magento_GiftCard](https://developer.adobe.com/commerce/php/module-reference/module-gift-card/)
*  [Magento_Elasticsearch](https://developer.adobe.com/commerce/php/module-reference/module-elasticsearch/)
*  [Magento_Elasticsearch7](https://developer.adobe.com/commerce/php/module-reference/module-elasticsearch-7/)
*  [Magento_Search](https://developer.adobe.com/commerce/php/module-reference/module-search/)
*  [Magento_LayeredNavigation](https://developer.adobe.com/commerce/php/module-reference/module-layered-navigation/)
*  [Magento_GroupedProduct](https://developer.adobe.com/commerce/php/module-reference/module-grouped-product/)
*  [Magento_Downloadable](https://developer.adobe.com/commerce/php/module-reference/module-downloadable/)
*  [Magento_Customer](https://developer.adobe.com/commerce/php/module-reference/module-customer/)
*  [Magento_ConfigurableProduct](https://developer.adobe.com/commerce/php/module-reference/module-configurable-product/)
*  [Magento_CatalogSearch](https://developer.adobe.com/commerce/php/module-reference/module-catalog-search/)
*  [Magento_Catalog](https://developer.adobe.com/commerce/php/module-reference/module-catalog/)
*  [Magento_Bundle](https://developer.adobe.com/commerce/php/module-reference/module-bundle/)
*  [Magento_Config](https://developer.adobe.com/commerce/php/module-reference/module-config/)
*  Magento_FunctionalTestModuleInventoryAdminUi
*  Magento_OpenSearch

### New system configuration for customer segments

<!-- AC-6832 -->

A new system configuration setting was added to avoid performance degradation when you have a large number of customer segments. See [customer segments validation](https://experienceleague.adobe.com/docs/commerce-operations/performance-best-practices/configuration.html#customer-segments-validation).

You can enable or disable this setting at any time. No additional actions are necessary, except cleaning the cache.

| Level | Target/Location                                                                                                                                                    | Code/Reason                  |
|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| MINOR | Magento\CustomerSegment\Model\Customer::XML_PATH_REAL_TIME_CHECK_IF_CUSTOMER_IS_MATCHED_BY_SEGMENT<br/>/app/code/Magento/CustomerSegment/Model/Customer.php:47     | M071 Constant has been added |
| MINOR | customer/magento_customersegment/real_time_check_if_customer_is_matched_by_segment<br/>/app/code/Magento/CustomerSegment/etc/adminhtml/system.xml:0                | M302 A field-node was added  |

The following module is affected by this change:

*  [Magento_CustomerSegment](https://developer.adobe.com/commerce/php/module-reference/module-customer-segment/)

### Symfony dependencies upgraded to latest LTS version

<!-- AC-6431 -->

This change adds support for the latest version of Symfony, so that you can use the latest solutions to build more stable functionality and avoid hypothetical security issues.

For example, this change updates the return type for the `Magento\Backend\Console\Command\AbstractCacheTypeManageCommand` class from `void` to `int`, which extends `Symfony\Component\Console\Command\Command` and [must return](https://github.com/symfony/symfony/issues/33747) the `int` type.

If you override or extend the `Magento\Backend\Console\Command\AbstractCacheTypeManageCommand` class, you should check the return type for the `execute` method to avoid errors when executing command-line commands.

The following module is affected by this change:

*  [Magento_Backend](https://developer.adobe.com/commerce/php/module-reference/module-backend/)

### Zend_Filter replaced with laminas-filter

<!-- AC-6519 -->

This change replaces the outdated `Zend_Filter` library with the actively supported `laminas-filter` library. The following modules are affected by this change:

*  [Magento_GoogleAdwords](https://developer.adobe.com/commerce/php/module-reference/module-google-adwords/) (backend)
*  Magento_Framework (translation and validation functionality)

#### Interface changes

The following interface changes are a result of replacing interfaces from the `Zend-Filter` library with the corresponding interfaces from the `laminas-filter` library.

| Level | Target/Location                                                                                                            | Code/Reason                                 |
|-------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| MAJOR | Magento\Framework\Filter\FactoryInterface::createFilter<br/>/lib/internal/Magento/Framework/Filter/FactoryInterface.php:42 | M123 [public] Method return typing changed. |

#### Class changes

| Level | Target/Location                                                                                                              | Code/Reason                                    |
|-------|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| MAJOR | Magento\Framework\Stdlib\DateTime\Filter\Date<br/>/lib/internal/Magento/Framework/Stdlib/DateTime/Filter/Date.php:0          | M0123 Implements has been removed.             |
| MAJOR | Magento\Framework\Filter\FilterManager::get<br/>/lib/internal/Magento/Framework/Filter/FilterManager.php:68                  | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Framework\Filter\FilterManager::createFilterInstance<br/>/lib/internal/Magento/Framework/Filter/FilterManager.php:87 | M121 [protected] Method return typing changed. |
| MAJOR | Magento\Framework\Filter\FilterManager::__call<br/>/lib/internal/Magento/Framework/Filter/FilterManager.php:128              | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Framework\Filter\Template<br/>/lib/internal/Magento/Framework/Filter/Template.php:0                                  | M0123 Implements has been removed.             |
| MAJOR | Magento\GoogleAdwords\Model\Filter\UppercaseTitle<br/>/app/code/Magento/GoogleAdwords/Model/Filter/UppercaseTitle.php:0      | M0123 Implements has been removed.             |
| MINOR | Magento\Framework\Stdlib\DateTime\Filter\Date<br/>/lib/internal/Magento/Framework/Stdlib/DateTime/Filter/Date.php:0          | M0125 Interface has been added.                |
| MINOR | Magento\Framework\Filter\Template<br/>/lib/internal/Magento/Framework/Filter/Template.php:0                                  | M0125 Interface has been added.                |
| MINOR | Magento\GoogleAdwords\Model\Filter\UppercaseTitle<br/>/app/code/Magento/GoogleAdwords/Model/Filter/UppercaseTitle.php:0      | M0125 Interface has been added.                |

### Zend_HTTP replaced with laminas-http

<!-- AC-6404 -->

This change replaces the outdated `Zend_HTTP` library with the actively supported `laminas-http` library. The following modules are affected by this change:

*  [Magento_Payment](https://developer.adobe.com/commerce/php/module-reference/module-payment/)
*  Magento_Framework

| Level | Target/Location                                                                                                     | Code/Reason                                    |
|-------|---------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| MAJOR | Magento\Framework\HTTP\Adapter\Curl::setOptions<br/>/lib/internal/Magento/Framework/HTTP/Adapter/Curl.php:103       | V088 [public] Method parameter typing removed. |
| MAJOR | Magento\Framework\HTTP\Adapter\Curl::$_options<br/>/lib/internal/Magento/Framework/HTTP/Adapter/Curl.php:63         | V009 [protected] Property has been removed.    |
| MAJOR | Magento\Framework\HTTP\Adapter\Curl<br/>/lib/internal/Magento/Framework/HTTP/Adapter/Curl.php:0                     | M0123 Implements has been removed.             |
| MAJOR | Magento\Payment\Gateway\Http\Client\Zend::__construct<br/>/app/code/Magento/Payment/Gateway/Http/Client/Zend.php:46 | M113 [public] Method parameter typing changed. |
| MINOR | Magento\Framework\HTTP\Adapter\Curl<br/>/lib/internal/Magento/Framework/HTTP/Adapter/Curl.php:0                     | M0125 Interface has been added.                |

### Zend_Validate replaced with laminas-validator

<!-- AC-6405 -->

This change replaces the outdated `Zend_Validate` library with the actively supported `laminas-validator` library. The following modules are affected by this change:

*  [Magento_Store](https://developer.adobe.com/commerce/php/module-reference/module-store/) (validations during the creation of a new store)
*  [Magento_User](https://developer.adobe.com/commerce/php/module-reference/module-user/)
*  [Magento_GoogleAdwords](https://developer.adobe.com/commerce/php/module-reference/module-google-adwords/) (backend)
*  Magento_Framework (translation and validation functionality)

#### Interface changes

The following interface changes are a result of replacing interfaces from the `Zend-Validate` library with the corresponding interfaces from the `laminas-validate` library.

| Level | Target/Location                                                                                                                       | Code/Reason                                  |
|-------|---------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| MAJOR | Magento\Framework\Validator\ValidatorInterface::setTranslator<br/>/lib/internal/Magento/Framework/Validator/ValidatorInterface.php:23 | V075 [public] Method parameter typing added. |
| MAJOR | Magento\Framework\Validator\ValidatorInterface::getTranslator<br/>/lib/internal/Magento/Framework/Validator/ValidatorInterface.php:30 | M123 [public] Method return typing changed.  |
| MAJOR | Magento\Framework\Validator\ValidatorInterface<br/>/lib/internal/Magento/Framework/Validator/ValidatorInterface.php:0                 | M0122 Extends has been removed.              |
| MAJOR | Magento\Framework\Translate\AdapterInterface::translate<br/>/lib/internal/Magento/Framework/Translate/AdapterInterface.php:27         | M102 [public] Added optional parameter(s).   |
| MINOR | Magento\Framework\Validator\ValidatorInterface<br/>/lib/internal/Magento/Framework/Validator/ValidatorInterface.php:0                 | M0127 Added parent to interface.             |
| MINOR | Magento\Framework\Translate\AdapterInterface<br/>/lib/internal/Magento/Framework/Translate/AdapterInterface.php:0                     | M0127 Added parent to interface.             |

#### Class changes

| Level | Target/Location                                                                                                                                                     | Code/Reason                                    |
|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| MAJOR | Magento\Framework\Validator::setTranslator<br/>/lib/internal/Magento/Framework/Validator.php:80                                                                     | V085 [public] Method parameter typing added.   |
| MAJOR | Magento\Framework\Validator\AbstractValidator::setDefaultTranslator<br/>/lib/internal/Magento/Framework/Validator/AbstractValidator.php:40                          | M113 [public] Method parameter typing changed. |
| MAJOR | Magento\Framework\Validator\AbstractValidator::getDefaultTranslator<br/>/lib/internal/Magento/Framework/Validator/AbstractValidator.php:50                          | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Framework\Validator\AbstractValidator::setTranslator<br/>/lib/internal/Magento/Framework/Validator/AbstractValidator.php:61                                 | V085 [public] Method parameter typing added.   |
| MAJOR | Magento\Framework\Validator\AbstractValidator::getTranslator<br/>/lib/internal/Magento/Framework/Validator/AbstractValidator.php:72                                 | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Framework\Validator\Constraint::setTranslator<br/>/lib/internal/Magento/Framework/Validator/Constraint.php:89                                               | V085 [public] Method parameter typing added.   |
| MAJOR | Magento\Framework\Validator\Constraint::getTranslator<br/>/lib/internal/Magento/Framework/Validator/Constraint.php:100                                              | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Framework\Validator\DataObject::addRule<br/>/lib/internal/Magento/Framework/Validator/DataObject.php:41                                                     | M113 [public] Method parameter typing changed. |
| MAJOR | Magento\Framework\Validator\DataObject<br/>/lib/internal/Magento/Framework/Validator/DataObject.php:0                                                               | M0123 Implements has been removed.             |
| MAJOR | Magento\Framework\Model\AbstractModel::_getValidatorBeforeSave<br/>/lib/internal/Magento/Framework/Model/AbstractModel.php:743                                      | M121 [protected] Method return typing changed. |
| MAJOR | Magento\Framework\Model\AbstractModel::_createValidatorBeforeSave<br/>/lib/internal/Magento/Framework/Model/AbstractModel.php:758                                   | M121 [protected] Method return typing changed. |
| MAJOR | Magento\Framework\Model\AbstractModel::_getValidationRulesBeforeSave<br/>/lib/internal/Magento/Framework/Model/AbstractModel.php:784                                | M121 [protected] Method return typing changed. |
| MAJOR | Magento\User\Model\User::_getValidationRulesBeforeSave<br/>/app/code/Magento/User/Model/User.php:321                                                                | M121 [protected] Method return typing changed. |
| MAJOR | Magento\User\Model\ResourceModel\User::getValidationRulesBeforeSave<br/>/app/code/Magento/User/Model/ResourceModel/User.php:495                                     | M120 [public] Method return typing changed.    |
| MAJOR | Magento\Store\Model\Store::_getValidationRulesBeforeSave<br/>/app/code/Magento/Store/Model/Store.php:479                                                            | M121 [protected] Method return typing changed. |
| MAJOR | Magento\GoogleAdwords\Model\Config\Backend\Color::_getValidationRulesBeforeSave<br/>/app/code/Magento/GoogleAdwords/Model/Config/Backend/Color.php:21               | M121 [protected] Method return typing changed. |
| MAJOR | Magento\GoogleAdwords\Model\Config\Backend\ConversionId::_getValidationRulesBeforeSave<br/>/app/code/Magento/GoogleAdwords/Model/Config/Backend/ConversionId.php:21 | M121 [protected] Method return typing changed. |
| MINOR | Magento\Framework\Validator\DataObject<br/>/lib/internal/Magento/Framework/Validator/DataObject.php:0                                                               | M0125 Interface has been added.                |

## 2.4.5

The `grunt-contrib-jasmine.js` library has been updated. The `toBeFalsy()` function does not work correctly with undefined values. Use the `toBeUndefined()` function instead to check results. <!--- AC-2840-->

### Static content deployment

A new backend theme (`magento/spectrum`) was added to support integration with Adobe Experience Platform. As a result, static file generation does not work correctly after upgrading to Adobe Commerce 2.4.5 on cloud infrastructure if you use the [`SCD_MATRIX`](https://devdocs.magento.com/cloud/env/variables-deploy.html#scd_matrix) deployment strategy.

If you use the `SCD_MATRIX` configuration, you must add the new `magento/spectrum` theme to your `.magento.env.yaml` file or your custom static content deploy command.  

```diff
stage:
  deploy:
    SCD_MATRIX:
      "magento/backend":
        language:
          - en_US
          
+     "magento/spectrum":
+       language:
+         - en_US    
```

## 2.4.4

### Removal of deprecated email variable usage

Email variable usage was deprecated back in 2.3.4 as part of a security risk mitigation in favor of a more strict variable syntax. This legacy behavior has been fully removed in this release as a continuation of that security risk mitigation.

As a result, email or newsletter templates that worked in previous versions may not work correctly after upgrading to Adobe Commerce 2.4.4 or Magento Open Source 2.4.4. Affected templates include admin overrides, themes, child themes, and templates from custom modules or third-party extensions. Your deployment may still be affected even after using the [Upgrade compatibility tool](https://experienceleague.adobe.com/docs/commerce-operations/upgrade-guide/upgrade-compatibility-tool/overview.html?lang=en) to fix deprecated usages. See [Migrating custom email templates](https://developer.adobe.com/commerce/frontend-core/guide/templates/email-migration/) for information about potential effects and guidelines for migrating affected templates.

### Changes to naming conventions for language package filenames

2.4.4 and its support for PHP 8.1 requires changes in how translation packages are named. Language package filenames must now follow the naming conventions enforced by PHP 8.1. Consequently, lowercase letters are no longer permitted in the second part of the locale name.

The `nl_di` translation package has been renamed to `nl_DI`. **Merchants using this translation pack must update their configuration (path: `general/locale/code`) from `nl_di` to `nl_DI` to use  Adobe Commerce 2.4.4**.

### Inventory check on cart load

A new "Enable Inventory Check On Cart Load" system configuration option has been added to Admin > **Stores** > **Configuration** > **General** > **Catalog** > **Inventory** > **Stock Options**. The new option determines if an inventory check is performed when loading a product in the cart. It is enabled by default.

Disabling the inventory check can improve performance for checkout steps, especially when there are many items in the cart. But if this inventory check is skipped, some out-of-stock scenarios could throw other types of errors, including:

*  `The requested qty is not available`
*  `Unable to place order: Enter a valid payment method and try again.`
*  `Unable to place order: There are no source items with the in stock status.`
*  `The shipping method is missing. Select the shipping method and try again.`

The following table contains metrics of checkout with a large amount of products (750) and additional product by guest:

Step | Absolute numbers | Percentage change | Change in milliseconds | Status
-----|------------------|-------------------|--------------|-------
Add Bulk Of Simple Products to Cart | 6260 | -0.7% | -41ms | ok
Load Cart Section - Total: 750 | 788 | -49.2% | -762ms | improvement
Configurable Product 1 Add To Cart - Total: 751 | 1566 | -32.3% | -748ms | improvement
Load Cart Section - Total: 751 | 789 | -49.0% | -757ms | improvement
Configurable Product 2 Add To Cart - Total: 752 | 1574 | -32.1% | -745ms | improvement
Load Cart Section - Total: 752 | 793 | -48.6% | -751ms | improvement
Open Cart | 1587 | -33.1% | -785ms | improvement
Checkout start | 942 | -44.6% | -757ms | improvement
Checkout Email Available | 36 | +0.0% | +0ms | ok
Checkout Estimate Shipping Methods | 1287 | -58.1% | -1782ms | improvement
Checkout Billing/Shipping Information | 2098 | -61.5% | -3354ms | improvement
Checkout Payment Info/Place Order | 4618 | -25.1% | -1549ms | improvement
Checkout success | 270 | -0.4% | -1ms | ok

### TinyMCE

There are three major BICs related to TinyMCE in 2.4.4, including:

*  Renamed TinyMCE4 to tinymce
*  Refactored TinyMCE MFTF tests
*  Refactored TinyMCE4 MFTF tests

#### Renamed `tinymce4` to `tinymce`

Renaming `tinymce4` to `tinymce` removes the strict dependency on a version of TinyMCE from the code.
The following changes could cause the WYSIWYG interface to break and not display on pages that use it in the Admin and break the Page Builder extension:

*  Renamed the array key in the TinyMCE [configuration provider](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Cms/Model/Wysiwyg/DefaultConfigProvider.php)
*  Renamed the alias in the [`requirejs-config.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/requirejs-config.js) file
*  Renamed a [Page Builder JavaScript file](https://github.com/magento/magento2-page-builder/blob/develop/app/code/Magento/PageBuilder/view/adminhtml/web/ts/js/wysiwyg/tinymce.ts) that was marked as API from `tinymce4.ts` to `tinymce.ts`

You are impacted by these changes if:

*  You use a custom configuration for TinyMCE that uses the `tinymce4` alias in `requirejs`
*  If you use the Page Builder JavaScript file that was renamed in any other place than the `app/code/Magento/PageBuilder/etc/adminhtml/di.xml` file

If these changes impact you, take the following action:

*  Change the name of the array key in the TinyMCE configuration provider from `tinymce4` to `tinymce`
*  Change any `requirejs` file that uses the `tinymce4` alias to `tinymce`
*  Update anywhere that references the Page Builder JavaScript file that was renamed

#### Refactored TinyMCE MFTF tests

To simplifiy current and future upgrades to the next version of TinyMCE and decrease maintenance efforts, we refactored WYSIWYG (TinyMCE) MFTF tests to use the same sections\selectors. We also removed duplicated entities. These changes might break some MFTF tests.

You are impacted by these changes if:

*  You have tests that use elements (selectors) from duplicated sections
*  You have tests that extend core tests with TinyMCE

If these changes impact you, update all tests that use duplicated elements.

#### Refactored TinyMCE4 MFTF tests

To simplify current and future upgrades to the next version of TinyMCE, we refactored TinyMCE4 MFTF in the following ways:

*  Renamed the action group `CliEnableTinyMCE4ActionGroup` to `CliEnableTinyMCEActionGroup`
*  Replaced all references to "TinyMCE 4" in the test code base with `tinymce`
*  Create variable for adapter version
*  Change `stepKey` on each test

These changes can be break tests if you use or extend the TinyMCE4 MFTF tests, but they affect only functional tests (MFTF).

If these changes impact you, you must update all tests that rely on the refactored action group and reference "TinyMCE4".

## 2.4.3-p2

### Removal of deprecated email variable usage

Email variable usage was deprecated back in 2.3.4 as part of a security risk mitigation in favor of a more strict variable syntax. This legacy behavior has been fully removed in this release as a continuation of that security risk mitigation.

As a result, email or newsletter templates that worked in previous versions may not work correctly after upgrading to Adobe Commerce 2.4.3-p2 or Magento Open Source 2.4.3-p2. Affected templates include admin overrides, themes, child themes, and templates from custom modules or third-party extensions. Your deployment may still be affected even after using the [Upgrade compatibility tool](https://experienceleague.adobe.com/docs/commerce-operations/upgrade-guide/upgrade-compatibility-tool/overview.html) to fix deprecated usages. See [Migrating custom email templates](https://developer.adobe.com/commerce/frontend-core/guide/templates/email-migration/) for information about potential effects and guidelines for migrating affected templates.

## 2.4.3-p1

## Media Gallery folders

Version 2.4.3-p1 introduced a configuration option for Media Gallery content that denotes which folders can contain Media gallery files.

The new configuration path `system/media_storage_configuration/allowed_resources/media_gallery_image_folders` is used to define the "Media Gallery Allowed" folders in 'config.xml'.

The initial values are the `wysiwyg` and `catalog/category` folders.

These can be extended by adding a new value in `config.xml`.

### Issue

Any Media Gallery files within `pub/media`, or in a folder outside a "Media Gallery Allowed" folder will not be accessible to the Media Gallery after the patch is installed.

### Workaround

Copy any Media Gallery files to `pub/media/wysiwyg` or one of the specified "Media Gallery Allowed" folders, or add a new entry under `system/media_storage_configuration/media_storage/allowed_resource/media_gallery_image_folders`.

## 2.4.2- 2.4.3

### Cookie message is displayed when new page loads

Stores with a pre-existing custom theme and for which cookies are enabled now display this message: **The store will not work correctly in the case when cookies are disabled**. This issue is caused by a backward-incompatible change in how Commerce handles cookie status messages. [GitHub-9095](https://github.com/magento/devdocs/issues/9095)

**Workaround**: Add the `cookie-status-message` class to the
`custom_theme_path/Magento_Theme/web/css/source/_module.less` file for custom themes.

```javascript

& when (@media-common = true) {
    .cookie-status-message {
        display: none;
    }
}

```

### pelago/emogrifier update

The dependency `pelago/emogrifier` has been updated from version 3.1.0 to 5.0.0. This update resulted in the introduction of backwards-incompatible changes to the `Magento\Email\Model\Template\Filter` class. The changed code is executed during email templates rendering. See [reference](reference.md). <!--- MC-41445-->

### TinyMCE

The TinyMCE v3 library, which was deprecated on May 14, 2018, has been removed because it is not compatible with the latest version of jQuery. You must use TinyMCE v4.

*  The `Magento_Tinymce3` module has been removed from Magento Open Source.

*  The `Magento_Tinymce3Banner` module has been removed from Adobe Commerce.

*  All MFTF tests related to TinyMCE v3 have been removed.

To switch to the TinyMCE v4 library, you must change the `cms/wysiwyg/editor` value in the `core_config_data` database table to `mage/adminhtml/wysiwyg/tiny_mce/tinymce4Adapter`.

This change only impacts extensions that depend on the TinyMCE v3 library for WYSIWYG functionality in the Admin.

<InlineAlert variant="info" slots="text"/>

An upgrade script that switches TinyMCE to v4 has existed since 2.3.6 ([`Magento\Config\Setup\Patch\Data\UnsetTinymce3`](https://github.com/magento/magento2/blob/2.3/app/code/Magento/Config/Setup/Patch/Data/UnsetTinymce3.php)).

## 2.4.1 - 2.4.2

### Compare lists

Commerce uses session storage to work with compare lists. In version 2.4.2, Adobe added GraphQL support for compare lists. Instead of relying on session storage, GraphQL now saves compare list information into the database, with each list assigned an ID. These changes are additive and do not alter the behavior of compare lists on the storefront. However, there is a chance these changes could affect third-party extensions that manage compare lists.

The following methods and property have been added to the `Magento\Catalog\Model\ResourceModel\Product\Compare\Item\Collection` class. They are available to all developers, not just those working on GraphQL.

```terminal
getListId()
getProductsByListId()
removeCompareList()
setListId()
setListIdToCustomerCompareItems()
$listId
```

This feature introduces the following database changes:

*  Added the foreign key `catalog_compare_item/CATALOG_COMPARE_ITEM_LIST_ID_CATALOG_COMPARE_LIST_LIST_ID`
*  Added the `catalog_compare_list` table
*  Added the `catalog_compare_item/list_id` column

## 2.3.0 - 2.4

### Elasticsearch

MySQL is no longer used for search. You must use [Elasticsearch](https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/search-engine/overview.html).

You must [install and configure](https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/search-engine/overview.html) Elasticsearch 7.6.x before upgrading to 2.4.0. New installations require a connection to Elasticsearch to complete.

<InlineAlert variant="warning" slots="text"/>

Adobe Commerce and Magento Open Source do not support Elasticsearch 2.x, 5.x, and 6.x. If you attempt to upgrade before installing and configuring a supported search engine, the application could go into an inconsistent state and the Admin will become inaccessible.

Extension developers must update any module that depends on the unsupported search engines.

The changes with removing values from the `system.xml` file require eliminating ES2 support from the Admin UI. Other API classes were removed to clean up the code when we deprecated ES2 and ES5 in 2.3.5.

The following modules have been refactored to use the `ElasticSearchResultApplier` class and avoid usage of `CatalogSearch` and `SearchResultApplier`, which was based on MySQL:

*  CatalogGraphQL
*  QuickOrder (B2B)

In addition, the following constructors were modified to provide a mixed type. We have removed deprecated class private and protected components but have left their usages as arguments in the constructor for backward compatibility.

```terminal
Magento\CatalogSearch\Model\ResourceModel\Fulltext\Collection
Magento\CatalogSearch\Model\ResourceModel\Advanced\Collection
Magento\CatalogSearch\Model\Indexer\Fulltext\Action\Full
```

<InlineAlert variant="info" slots="text"/>

We recommend that you do not inherit from any class. If your extension does inherit from any of the classes above, make sure it is not using any of the deprecated or removed mixed type class members. For compatibility, modify your constructors accordingly.

The following deprecated interfaces were deleted. If your extension implements any of these interfaces, refactor your code to use the Elasticsearch module.

```terminal
Magento\Framework\Search\Adapter\Mysql\Query\Builder\QueryInterface
Magento\CatalogSearch\Model\Search\FilterMapper\FilterStrategyInterface
```

The following deprecated classes were deleted. If your extension uses any of the above classes, then you must do a major refactor to your code to use the Elasticsearch module and not rely on the MySQL Search class implementations.

```terminal
Magento\Framework\Search\Adapter\Mysql\DocumentFactory
Magento\Framework\Search\Adapter\Mysql\Mapper
Magento\Framework\Search\Adapter\Mysql\ScoreBuilder
Magento\Framework\Search\Adapter\Mysql\Query\Builder\Match
Magento\Framework\Search\Adapter\Mysql\Field\FieldFactory
Magento\Framework\Search\Adapter\Mysql\Aggregation\Builder
Magento\Framework\Search\Adapter\Mysql\Aggregation\DataProviderContainer
Magento\CatalogSearch\Model\Search\TableMapper
Magento\CatalogSearch\Model\Indexer\IndexerHandler
Magento\CatalogSearch\Model\Indexer\ProductFieldset
Magento\CatalogSearch\Model\Indexer\Scope\IndexTableNotExistException
Magento\CatalogSearch\Model\Indexer\Fulltext\Action\IndexIterator
Magento\CatalogSearch\Model\Adapter\Mysql\Filter\AliasResolver
```

### Functional Testing Framework

MFTF now uses Google Authenticator to execute tests with 2FA enabled. The functional test framework will not work with 2.4.0 without additional configuration steps to enable Google Authenticator. See [Configuring Two-Factor Authentication (2FA)](https://developer.adobe.com/commerce/testing/functional-testing-framework/two-factor-authentication/).

### Inventory asynchronous reindex

A new Stock/Source reindex strategy configuration setting option was added to the Admin to prevent index table collisions. The setting has the following options:

*  Synchronous
*  Asynchronous

Previously, it was possible to have a "burst" of activity that triggered contention of the index process. Even batching and deferring individual updates that were triggering the indexer, it was still highly likely that an index table collision would occur based on "other" activity.

For example, if the indexer was running based on schedule, and replenishment happens manually through the Admin or interaction with an order, indexing would be triggered. Previously, that would result in two processes attempting to index; one of those will "lose", leading to a deadlocked/stale index.

```terminal
changed.MAJOR: Magento\InventoryIndexer\Indexer\Stock\StockIndexer::__construct
/InventoryIndexer/Indexer/Stock/StockIndexer.php:28 M113 [public] Method parameter typing changed.
changed.MAJOR: Magento\InventoryIndexer\Indexer\SourceItem\SourceItemIndexer::__construct
/InventoryIndexer/Indexer/SourceItem/SourceItemIndexer.php:27 M113 [public] Method parameter typing changed.
```

### JSON field support

MySQL 5.7 supports the native JSON data type: [https://dev.mysql.com/doc/refman/5.7/en/json.html](https://dev.mysql.com/doc/refman/5.7/en/json.html). Version 2.4.0 now supports using JSON fields with a declarative schema.

### Laminas

Migrating ZF2 components to Laminas introduced BICs in the following files:

```terminal
Magento\Backend\App\Area\FrontNameResolver::_construct - _constructor argument type was changed
Magento\Framework\App\Response\HttpInterface::getHeader - declared return type was changed
```

Both files are API class/interface. These changes will be solved dynamically during runtime if you follow the recommended guidelines.

### MediaContent and MediaContentApi modules

The 'MediaContent' and 'MediaContentApi' modules were introduced to provide the ability to manage relationships between content and media assets used in that content.

Additionally, observers have been added to the CMS and Catalog modules to save the relationship of corresponding entities to 'MediaContent' storage.

### Method parameter typing changed

Method parameter typing was changed to leverage [PHP 7+ Throwables](https://www.php.net/manual/en/class.throwable.php) and enable catching ALL possible errors that might expose confidential information, such as passwords.

#### Level Target/Location Code/Reason

```terminal
Magento\Framework\App\Bootstrap::terminate
/lib/internal/Magento/Framework/App/Bootstrap.php:426 M114 [protected] Method parameter typing changed.
```

### New bulk interfaces for inventory salability check

In order to support bulk check for products salability, we introduced two new interfaces:

```terminal
Magento\InventorySalesApi\Api\AreProductsSalableInterface
Magento\InventorySalesApi\Api\AreProductsSalableForRequestedQtyInterface
```

These changes allow third-party developers to optimize performance by providing an implementation for bulk services.

*  Introduced a Bulk version of `IsProductSalableForRequestedQtyInterface` API
*  Introduced a Bulk version of `IsProductSalableInterface` when working with a list of items

### PHP

PHP 7.4 support is added to 2.4.0, and the lowest compatible version is PHP 7.3. As the result, some of the Composer libraries have been updated.

This section lists the backward incompatible changes and deprecated features in PHP 7.4. During development, we also discovered changes in the behavior of the `setcookie` function:

```php
setcookie("tst", "Test Message");
print_r(headers_list());
//PHP 7.3
Array
(
    [0] => X-Powered-By: PHP/7.3.14
    [1] => Set-Cookie: tst=Test+Message
)
//PHP 7.4
Array
(
    [0] => X-Powered-By: PHP/7.4.4
    [1] => Set-Cookie: tst=Test%20Message
)
```

### PHPUnit

The current PHPUnit framework version used with version 2.4.0 is PHPUnit 9. This requires refactoring most PHPUnit-based tests.

The most critical changes include:

*  The methods listed below now have a void return type declaration:

   ```terminal
   PHPUnit\Framework\TestCase::setUpBeforeClass()
   PHPUnit\Framework\TestCase::setUp()
   PHPUnit\Framework\TestCase::assertPreConditions()
   PHPUnit\Framework\TestCase::assertPostConditions()
   PHPUnit\Framework\TestCase::tearDown()
   PHPUnit\Framework\TestCase::tearDownAfterClass()
   PHPUnit\Framework\TestCase::onNotSuccessfulTest()
   ```

*  The following methods have been removed, and you should change the implementation their tests:

   ```terminal
   assertAttributeContains()
   assertAttributeNotContains()
   assertAttributeContainsOnly()
   assertAttributeNotContainsOnly()
   assertAttributeCount()
   assertAttributeNotCount()
   assertAttributeEquals()
   assertAttributeNotEquals()
   assertAttributeEmpty()
   assertAttributeNotEmpty()
   assertAttributeGreaterThan()
   assertAttributeGreaterThanOrEqual()
   assertAttributeLessThan()
   assertAttributeLessThanOrEqual()
   assertAttributeSame()
   assertAttributeNotSame()
   assertAttributeInstanceOf()
   assertAttributeNotInstanceOf()
   assertAttributeInternalType()
   assertAttributeNotInternalType()
   attribute()
   attributeEqualTo()
   readAttribute()
   getStaticAttribute()
   getObjectAttribute()
   ```

*  The signature of `assertContains()`, `assertNotContains()`, `assertEquals()`, and `assertNotEquals()` were changed. In most cases, more specific methods should be used instead, like `assertStringContainsString()`

#### Tips and Tricks

*  Use `\PHPUnit\Framework\Assert::assertEqualsCanonicalizing()` if you need to compare two entities with a different order of elements. `assertEquals()` has been used before.
*  Use `\PHPUnit\Framework\Assert::assertEqualsWithDelta()` if you need non-strict comparison. `assertEquals()` with additional parameters has been used before.

### Size field added to media_gallery_asset table

This is a dependency for the Adobe Stock integration.

A size field was added to the `media_gallery_asset` table to enable storing and using the media asset size. The Media Gallery Asset entity model and interface were updated accordingly.

The `Magento\MediaGalleryApi\Api\Data\AssetInterface` that was updated with a new public method in the scope of the changes is not marked as @api so it is not currently part of the API.

The possible impact is minimal: the table was introduced in 2.3.4 (just several month ago) and it was not used by any Commerce functionality (only Adobe Stock Integration extension).

### SVC failure due to adding strict types

This change fixes a bug where `getDefaultLimitPerPageValue` returns a value that is not available.

As a Store Administrator, you are able to provide the 'Products per Page on Grid Allowed' values and 'Products per Page on Grid Default' value. There is no verification, so you can accidentally set the default value to be one of the unavailable options.

The only stores that might be affected are the ones who changed the configuration value for 'Default items per page', without customizing possible options. Some system integrators customize either the default value or allowed values.

As a result, there is inconsistency between default and allowed values. So far this worked by coincidence, but after the change, that would be explicit.

Per technical guidelines, all new PHP files MUST have strict type mode enabled by starting with `declare(strict_types=1);`. All updated PHP files SHOULD have strict type mode enabled. PHP interfaces MAY have this declaration.

Strict typing was added to the `app/code/Magento/Catalog/Helper/Product/ProductList.php` file.

It caused SVC failures.

Return type now array (the same as before in DocBlock):

```terminal
changed.MAJOR: Magento\Catalog\Helper\Product\ProductList::getAvailableLimit
/app/code/Magento/Catalog/Helper/Product/ProductList.php:122M120 [public] Method return typing
```

The input parameter is renamed to `viewMode`:

```terminal
changed.MAJOR: Magento\Catalog\Helper\Product\ProductList::getAvailableLimit
/app/code/Magento/Catalog/Helper/Product/ProductList.php:122V060 [public] Method parameter name
```

Now returns int for `DefaultLimitPerPageValue`:

```terminal
changed.MAJOR: Magento\Catalog\Helper\Product\ProductList::getDefaultLimitPerPageValue
/app/code/Magento/Catalog/Helper/Product/ProductList.php:147M120 [public] Method return typing changed.
```

### UrlRewrite module

The Admin grid in the UrlRewrite module was moved to UI components and all unused blocks were removed. Added mass delete and inline edit actions.

```terminal
adminhtml.block.url_rewrite.grid.container
adminhtml.block.url_rewrite.grid
adminhtml.url_rewrite.grid.columnSet
adminhtml.url_rewrite.grid.columnSet.url_rewrite_id
adminhtml.url_rewrite.grid.columnSet.store_id
adminhtml.url_rewrite.grid.columnSet.request_path
adminhtml.url_rewrite.grid.columnSet.target_path
adminhtml.url_rewrite.grid.columnSet.redirect_type
adminhtml.url_rewrite.grid.columnSet.actions
```

### UUID validator

This code adds the Ramsey library as a UUID validator and creates wrappers for it. This feature is needed for the async-import project. They pass UUID to get status of the async-import, for that they need to validate UUID.
