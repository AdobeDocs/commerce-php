---
title: Subresource Integrity
description: Security feature that enables browsers to verify the resources that they fetch.
---

# Subresource Integrity

Subresource Integrity (SRI) is a security feature that enables browsers to verify that the resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. This feature works by allowing you to provide a cryptographic hash that a fetched resource must match.
See [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity) to learn more about SRI.

## Application Support

To comply with PCI 4.0 requirements for verification of script integrity on payment pages, Adobe Commerce and Magento Open Source 2.4.7 and later include support for Subresource Integrity by providing integrity hashes for all Javascript assets residing in the local filesystem. (This
functionality is defined in the Magento_Csp module.)

## Default Configuration

The default SRI feature is implemented only on the payment pages for the admin and storefront areas. However, merchants can extend the default configuration to other pages. For example, to enable SRI on the customer account page in the storefront, create the file `<module-dir>/view/frontend/layout/customer_account_index.xml` with the following content:

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <link src="Magento_Csp::js/sri.js"/>
    </head>
    <body>
        <referenceBlock name="head.additional">
            <block class="Magento\Csp\Block\Sri\Hashes" name="customer.account.index.sri.hashes" template="Magento_Csp::sri/hashes.phtml"/>
        </referenceBlock>
    </body>
</page>
```

## Subresource Integrity Hash Generation

<InlineAlert slots="text" />
Adobe Commerce and Magento Open Source 2.4.9 and later support SRI hash generation for all JavaScript assets, including those processed through minification, bundling, and merging.

The Subresource Integrity hash generation process begins once [static content](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment) for each package area has been deployed.
The [postprocessor](https://github.com/magento/magento2/tree/2.4-develop/app/code/Magento/Csp/Model/Deploy/Package/Processor/PostProcessor) class then systematically processes all JavaScript files within each package and generates SHA-256 integrity hashes, including minified file variants. This process covers all Static Content Deployment (SCD) strategies: Standard, Quick, and Compact.
The postprocessor class triggers the [SubresourceIntegrityCollector](https://github.com/magento/magento2/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityCollector.php) class to collect the hashes, which are saved to a scoped, per-package repository immediately after each package is deployed.
Hashes for bundled JavaScript assets are also generated at deploy time. Hashes for runtime-generated merged JavaScript assets are captured on first use and stored separately in `pub/static/_cache/merged/sri-hashes.json`.
All integrity hashes are stored in the filesystem via the [Storage](https://github.com/magento/magento2/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrity/Storage/File.php) class.

## Subresource Integrity Storage

<InlineAlert slots="text" />
Adobe Commerce and Magento Open Source 2.4.8 and later no longer use a cache to store SRI hashes. The implementation has been refactored to store the hashes in the local filesystem instead. This ensures that SRI hashes are still intact and not effected by purging of caches.

<InlineAlert slots="text" />
Adobe Commerce and Magento Open Source 2.4.9 and later store SRI hashes in files scoped by area, theme, and locale, rather than a single file per area.

Subresource Integrity hashes are stored in `sri-hashes.json` files scoped by area, theme, and locale under the `pub/static` directory.
For example, SRI hashes for the `adminhtml/Magento/backend/en_US/requirejs/require.js` file are stored in the `pub/static/adminhtml/Magento/backend/en_US/sri-hashes.json` file.

Hashes for runtime-generated merged JavaScript files are stored separately in `pub/static/_cache/merged/sri-hashes.json`.

Scoping hash files by area, theme, and locale prevents a single large file from degrading page and checkout performance as additional themes and locales are added.

When running a partial static content deployment with the `--area`, `--theme`, or `--language` options, only the SRI hash files that match the specified scope are removed and regenerated, leaving all other locales and themes intact.

### Subresource Integrity for Remote Resources

Although, there is no SRI support for custom remote Javascript resources currently, merchants can generate the integrity hash for remote resources using the following example.

```php
$hash = base64_encode(hash('sha256', $content, true));
$integrity = "sha256" . "-{$hash}";
```

<InlineAlert slots="text" />

For subresource-integrity verification of a resource served from an origin other than the document where it is embedded, the [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin) attribute must be provided along with the integrity attribute.
