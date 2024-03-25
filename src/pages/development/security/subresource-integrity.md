---
title: Subresource Integrity
description: Security feature that enables browsers to verify the resources they fetch.
---

# Subresource Integrity

Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched resource must match.
See [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to learn more about SRI.

## Application Support

In order to adhere to PCI 4.0 requirements regarding verifying the integrity of scripts on payment pages, Adobe Commerce and Magento Open Source 2.4.7 and later include support for Subresource Integrity by providing integrity hashes for all javascript assets residing in the local filesystem. (This
functionality is defined in the Magento_Csp module.)
Although, there is no SRI support for custom remote javascript resources currently, merchants can enable SRI support for remote resources by adding integrity and crossorigin attributes on a case by case basis.

## Default Configuration

The default SRI feature is implemented only on the payment pages for the admin and storefront areas. However, merchants can extend the default configuration to other pages.
For example, to enable SRI on the customer account page in the storefront, create the file `<module-dir>/view/frontend/layout/customer_account_index.xml` with the following content
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

The Subresource Integrity hash generation process starts after [static content](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/static-view/static-view-file-deployment) for every package area is deployed.
The [postprocessor](https://github.com/magento-commerce/magento2ce/tree/2.4-develop/app/code/Magento/Csp/Model/Deploy/Package/Processor/PostProcessor) class processes all javascript files by package and generates integrity hashes.
The postprocessor class invokes the [SubresourceIntegrityCollector](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityCollector.php) class to collect integrity hashes to save in cache once all packages are deployed.
All integrity hashes are stored in cache via the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

## Subresource Integrity Caching

Subresource Integrity hashes are stored and organized in cache by the deployed package area - frontend, base or admin.
Hash value for a specific file can be retrieved from the cache using the `getByPath` function in the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

Caches can be purged in the following ways:

* Programmatically, by using the `deleteAll` function in the [SubresourceIntegrityRepository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) class.

* Using the CLI
```bash
bin/magento cache:flush
```
* Through the Admin UI via **System** > **Tools** > **Cache Management**. **Flush Cache Storage**

<InlineAlert slots="text" />

SRI caches must be regenerated using static content deploy command below after cache has been purged.

```bash
bin/magento setup:static-content:deploy
```
