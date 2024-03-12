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
Please note that currently there is no Subresource Integrity support for custom remote javascript resources. Merchants need to implement and provide hashes for all remote javascript assets used in themes.
Merchants can use the HashGenerator class `Magento\Csp\Model\SubresourceIntegrity\HashGenerator.php` to generate hashes for remote resources.

## Default Configuration
Subresource Integrity hashes for javascript assets in all themes are computed after static content deployment is complete. This ensures that any updates to files automatically update the hashes.
These generated hashes are then stored in a custom cache.

## Subresource Integrity Caching
Please see [Subresource Integrity collector](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityCollector.php) and  [Subresource Integrity repository](https://github.com/magento-commerce/magento2ce/blob/2.4-develop/app/code/Magento/Csp/Model/SubresourceIntegrityRepository.php) to learn more about how hashes are stored and updated.
