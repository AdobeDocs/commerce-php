---
title: Subresource Integrity
description: Security feature that enables browsers to verify the resources that they fetch.
---

# Subresource Integrity

Subresource Integrity (SRI) is a security feature that enables browsers to verify that the resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. This feature works by allowing you to provide a cryptographic hash that a fetched resource must match.
See [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to learn more about SRI.

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

The Subresource Integrity hash generation process begins once [static content](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment) for each package area has been deployed.
The [postprocessor](https://github.com/magento-commerce/magento2ce/tree/2.4-develop/app/code/Magento/Csp/Model/Deploy/Package/Processor/PostProcessor) class then systematically processes all javascript files within each package and generates integrity hashes.
The postprocessor class triggers the [SubresourceIntegrityCollector](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityCollector.php) class to collect the hashes which are cached for storage after all packages are deployed.
All integrity hashes are stored in cache via the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

## Subresource Integrity Caching

Subresource Integrity hashes are stored and organized in cache by the deployed package area - frontend, base or admin.
The hash value for a specific file can be retrieved from the cache using the `getByPath` function in the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

Caches can be purged in the following ways:

* Programmatically, by using the `deleteAll` function in the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

* Using the CLI

```bash
bin/magento cache:flush
```

* Through the Admin UI via **System** > **Tools** > **Cache Management**. **Flush Cache Storage**

<InlineAlert slots="text" />

After the cache has been purged, SRI caches must be regenerated using the static content deploy command.

```bash
bin/magento setup:static-content:deploy
```

### Subresource Integrity for Remote Resources

Although, there is no SRI support for custom remote Javascript resources currently, merchants can generate the integrity hash for remote resources using the following example.

```php
$hash = base64_encode(hash('sha256', $content, true));
$integrity = "sha256" . "-{$hash}";
```

<InlineAlert slots="text" />

For subresource-integrity verification of a resource served from an origin other than the document where it is embedded, the [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) attribute must be provided along with the integrity attribute.