---
title: Partial caching | Commerce PHP Extensions
description: Learn about the different caching technologies that are available to Adobe Commerce and Magento Open Source extension developers.
---

# Partial caching

Adobe Commerce and Magento Open Source use [Zend_Cache](http://framework.zend.com/manual/1.12/en/zend.cache.html) to interact with the cache storage. However, the applications also have the [Magento\Cache](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Cache) [library](https://glossary.magento.com/library) for implementing Magento-specific caching. These topics discuss how to configure caching and [cache](https://glossary.magento.com/cache) types.

<InlineAlert variant="info" slots="text"/>

By default, file system caching is enabled; no configuration is necessary to use it. This means the cache is located under `<magento_root>/var`.

To change the cache configuration, edit the `<magento_root>/app/etc/env.php` file.

The cache configuration is an associative array similar to the following:

```php
'cache_types' =>
   array (
      'config' => 1,
      'layout' => 1,
      'block_html' => 1,
      'collections' => 1,
      'db_ddl' => 1,
      'eav' => 1,
      'full_page' => 1,
      'translate' => 1,
      'config_integration' => 1,
      'config_webservice' => 1,
      'config_integration_api' => 1,
   ),
);
```

The preceding lists all cache types and shows they are all enabled.

## More information about caching

The following topics discuss how to set up caching:

*  [Create a cache type](cache-type.md)
*  [Create or extend configuration types](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/files/config-create-types.html)
*  [Associate cache frontends with cache types](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/cache-types.html)
*  [Low-level cache options](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/cache-options.html)
*  [Configure and use Varnish](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/varnish/config-varnish.html)
*  [Configure Redis](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cache/redis/config-redis.html)
