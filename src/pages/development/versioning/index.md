---
title: Versioning Schema | Commerce PHP Extensions
description: Learn how Adobe Commerce and Magento Open Source component versioning works.
keywords:
  - Extensions
---

# Versioning schema

Adobe Commerce and Magento Open Source application and module releases have their own unique version number.

## Application version format

A change in the version for the application indicates a patch or feature release.
This version change does not reflect the nature of the changes in the code base.

## Module version format

The `version` field in a modules [`composer.json`][composer-json] file specifies the module version and consists of three numbers in the following format:

`MAJOR.MINOR.PATCH`

The format follows [Semantic Versioning][semantic-versioning] rules for any `@api` annotated by `code`:

*  The MAJOR version increments when incompatible API changes are made.
*  The MINOR version increments when backward-compatible functionality has been added or if the module's customization points have changed.
*  The PATCH version increments when backward-compatible bug fixes occur.

<InlineAlert variant="info" slots="text"/>

On an exceptional basis, breaking changes or additional patches or hotfixes may be released on a PATCH version to address security or compliance issues and high-impact quality issues.

### Pre-release versions

For pre-release versions, the format is:

`MAJOR.MINOR.PATCH-<alpha | beta | rc>n`

|                         |                                                                                                    |
|-------------------------|----------------------------------------------------------------------------------------------------|
| `alpha`, `beta` or `rc` | Stability indicators, as described in the [`version_compare()`][php-version-compare] specification |
| `n`                     | An increment number to distinguish releases of the non-stable versions                             |

Adobe's module versioning policy complies with the following specifications:

*  [Semantic Versioning][semantic-versioning]
*  [Composer version specification][composer-versioning]
*  [PHP `version_compare()` specification][php-version-compare]

## Where versioning is used

The application version can be found in the source code of any component or bundle inside the `composer.json` file.

It can be declared as the version of the component:

```json
"name": "acme/foo",
"version": 1.2.0
```

Or it can be used to declare a dependency on a particular version of a component:

```json
"require": {
    "acme/foo": "1.2.*",
    "acme/bar": "2.2.0"
}
```

<InlineAlert variant="info" slots="text"/>

If you installed the application from GitHub without using Composer, the `version` is not included. The Admin displays the version as `Magento ver. dev-<GitHub-branch-name>`. In addition, modules inside the `require` declaration list a version of `*`. For example, `"magento/framework": "*"`.

**Related topics:**

*  [Module version dependencies][version-dependencies] - Information about how your module can depend on the version of other modules.
*  [Codebase changes][codebase-changes] - Information on how changes in a module's codebase affect versions.
*  [Backward compatible development](https://developer.adobe.com/commerce/contributor/guides/code-contributions/backward-compatibility-policy/) - Information about MAJOR and MINOR changes and how they impact extension developers.

[version-dependencies]: ../versioning/dependencies.md
[codebase-changes]: ../versioning/code-changes.md
[semantic-versioning]: http://semver.org/
[composer-versioning]: https://getcomposer.org/doc/04-schema.md#version
[php-version-compare]: http://php.net/version_compare
[composer-json]: ../build/composer-integration.md
