---
title: Subresource Integrity
description: Security feature that enables browsers to verify the resources they fetch.
---

# Subresource Integrity
Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched resource must match.
See [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to learn more about SRI.

## Application Support
As of version 2.4.7, Adobe Commerce and Magento Open Source add support for Subresource Integrity by providing integrity hashes for all javascript assets residing in the local filesystem. (This
functionality is defined in the Magento_Csp module.)
Please note that currently there is no SRI support for custom remote javascript resources. Merchants will need to generate integrity hashes for any custom remote resources used in themes. 
Please see the HashGenerator class `Magento\Csp\Model\SubresourceIntegrity\HashGenerator.php` to learn more about generating hashes for resources.

## Default Configuration
The default SRI feature is implemented only on the payment pages for the admin and storefront areas. However, merchants can extend the default configuration to other pages.
For example, the `Magento_Csp/view/adminhtml/layout/sales_order_create_index.xml` layout enables the SRI feature on the admin order create page
```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <head>
        <link src="Magento_Csp::js/sri.js"/>
    </head>
    <body>
        <referenceBlock name="head.additional">
            <block class="Magento\Csp\Block\Sri\Hashes" name="admin.sri.hashes" template="Magento_Csp::sri/hashes.phtml"/>
        </referenceBlock>
    </body>
</page>
```

## Subresource Integrity Caching
SRI hashes for javascript assets across all themes are computed and stored in a custom cache after static content deployment is complete. This ensures that any updates to files will automatically update the hashes.
Please see `Magento\Csp\Model\SubresourceIntegrityCollector.php` and `Magento\Csp\Model\SubresourceIntegrityRepository.php` to learn more about how hashes are stored and updated.
