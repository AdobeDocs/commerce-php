---
title: Coding Standards | Commerce PHP Extensions
description: Review Adobe Commerce and Magento Open Source coding standards for different languages, including PHP, JavaScript, LESS, and jQuery. 
---

# Coding standards

<!-- This topic is referred to from Magento 2 code! Don't change the URL without informing engineering! -->
<!-- Referring file: contributing.md owned by core -->

Like many large projects, Adobe Commerce and Magento Open Source have coding standards. Use the coding standards when you contribute to the codebase or create extensions.

## Ensuring the code is compliant

You can perform Magento Coding Standard inspection with the Magento2 PHP_CodeSniffer standard.

To execute the inspection from the command line, run the following command from the project root:

```bash
vendor/bin/phpcs --standard=Magento2 <path to inspect>
```

To include the Magento Coding Standard as part of PHPStorm inspections:

- Open PHPStorm preferences
- Navigate to "Editor" | "Inspections"
- Select "PHP" | "Quality Tools" | "PHP_CodeSniffer validation"
- Set "Coding standard" to "Custom" and select the path to `<project_root>/vendor/magento/magento-coding-standard/Magento2/ruleset.xml`
- Check "Installed standards path" and select the path to `<project_root>/vendor/php-compatibility/PHPCompatibility`

## Contributing

The Magento Coding Standard is created and maintained by the Magento community! See the [Contribution guide](contributing.md) if you'd like to participate.

## Review the standards

Standard details and guides:

-  [Code demarcation standard](code-demarcation.md)
-  [PHP coding standard](php.md)
-  [JavaScript coding standard](js.md)
-  [jQuery widget coding standard](jquery-widgets.md)
-  [DocBlock standard](docblock.md)
-  [JavaScript DocBlock standard](js-docblock.md)
-  [LESS coding standard](less.md)
-  [HTML style guide](html-style-guide.md)
-  [Technical guidelines](technical-guidelines.md)
