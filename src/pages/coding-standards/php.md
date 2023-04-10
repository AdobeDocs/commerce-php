---
title: PHP Coding Standard | Commerce PHP Extensions
description: Review standards for writing PHP code for Adobe Commerce and Magento Open Source projects.
---

# PHP coding standard

The core development team uses the [Magento Coding Standard](https://github.com/magento/magento-coding-standard). We recommend that developers who create extensions and customizations also use this standard.

The Magento Coding Standard provides a set of rules that covers the following:

*  [PSR-1](http://www.php-fig.org/psr/psr-1/) and [PSR-12](http://www.php-fig.org/psr/psr-12/) compliance
*  The use of insecure functions
*  Unescaped output
*  The use of deprecated PHP functions
*  PHP code syntax
*  Naming convention
*  The use of PHP superglobals
*  Empty code blocks
*  Improper exception handling
*  Raw SQL queries and many other general PHP and Adobe Commerce and Magento Open Source-specific code issues.

### Coding standard compliance

Developers should consistently use [PHP_CodeSniffer](http://pear.php.net/manual/en/package.php.php-codesniffer.faq.php) to enhance the readability of the code and ensure that it meets the Magento Coding Standard. [PHP_CodeSniffer](http://pear.php.net/manual/en/package.php.php-codesniffer.faq.php) is the most popular tool in use throughout the PHP development community.
It provides the mechanism of checking code compliance with specific coding standard.

The set of rules is located in [`ruleset.xml`](https://github.com/magento/magento-coding-standard/blob/develop/Magento2/ruleset.xml) file of the Magento Coding Standard.

Learn more about using rule sets with PHP CodeSniffer [ruleset](http://pear.php.net/manual/en/package.php.php-codesniffer.annotated-ruleset.php)

### Literal Namespace Rule

For class name resolution, use the [`::class`](http://php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class) keyword instead of a string literal for every class name reference outside of that class.
This includes references to:

*  Fully qualified class name
*  Imported/non-imported class name
*  Namespace relative class name
*  Import relative class name

Examples:

```php
  $this->get(ClassName::class);
```

```php
  $this->get(\Magento\Path\To\Class::class);
```

The [coding standards overview](index.md) introduces Adobe Commerce and Magento Open Source-specific practices for PHP, JavaScript, and JQuery.
