---
title: Test Your Component | Commerce PHP Extensions
description: Learn what type of testing you should do when developing an Adobe Commerce or Magento Open Source component.
keywords:
  - Extensions
---

# Test your component

## Unit and integration tests

Run the PHPUnit based Adobe Commerce and Magento Open Source unit and integration tests.
See the [Testing Overview].

## Functional testing

For further testing with the functional testing frameworks, see [Functional Testing Framework].

## Test using Magento Open Source

Test your component by deploying Magento Open Source and adding the component to the project's `composer.json`. To install, see [Install using Composer].

```json
"require": {
    "magento/magento-composer-installer": "*",
    "yourvendorname/module-one": "0.1.1"
},
```

[Register] your component, including the file location. Verify it works as expected, without compromising functionality.

## Test installing your component

Before you publish your component, test installing it.

1. [Package your component] in a GitHub repository that is accessible by the machine on which you run the Admin.
1. On that machine, create a static route from `https://repo.magento.com` to your GitHub repository.

    To create a static route, add a line similar to the following to your `hosts` file:

    ```conf
    <IP or hostname of your GitHub repository> https://repo.magento.com
    ```

1. [Install your component].
1. Verify it installed correctly.

## More information

See these resources for testing in PHP and validating components:

*  The [Coding Standard] provides a set of rules and sniffs for the [PHP_CodeSniffer] tool
*  [Extension Quality Program](https://developer.adobe.com/commerce/marketplace/guides/sellers/extension-quality-program/) in the Commerce Marketplace guide

[Testing Overview]: https://developer.adobe.com/commerce/testing/guide/
[Functional Testing Framework]: https://developer.adobe.com/commerce/testing/functional-testing-framework/
[register]: ../build/component-registration.md
[Package your component]: ../package/component.md
[Install your component]: https://experienceleague.adobe.com/en/docs/commerce-operations/upgrade-guide/overview
[Install using Composer]: https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/next-steps/sample-data/composer-packages
[Coding Standard]: https://github.com/magento/magento-coding-standard
[PHP_CodeSniffer]: https://github.com/squizlabs/PHP_CodeSniffer
[01 The Module Skeleton Kata]: https://www.youtube.com/watch?v=JvBWJ6Lm9MU)
