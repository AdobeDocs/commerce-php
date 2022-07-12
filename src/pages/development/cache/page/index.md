---
title: Page Caching | Commerce PHP Extensions
description: Use page caching to improve the performance of your Adobe Commerce or Magento Open Source storefront.
---

# Page caching

Caching is one of the most effective ways to improve website performance. Generally speaking, there are two methods of caching content:

-  Client-side (browser)
-  Server-side

Retrieving stored ([cached](https://glossary.magento.com/cache)) content from a previous request for the same client instead of requesting files from your server every time someone visits your site is a more efficient use of network bandwidth.

The Adobe Commerce and Magento Open Source page cache library contains a simple PHP reverse proxy that enables full page caching out of the box. A reverse proxy acts as an intermediary between visitors and your application and can reduce the load on your server.

We recommend using [Varnish](https://devdocs.magento.com/guides/v2.4/config-guide/varnish/config-varnish.html), but you can use Magento's default caching mechanism instead, which stores cache files in any of the following:

-  File system (You don't need to do anything to use file-based caching.)
-  [Database](../partial/database-caching.md)
-  [Redis](https://devdocs.magento.com/guides/v2.4/config-guide/redis/redis-pg-cache.html)

## Cacheable and uncacheable pages

*Cacheable* and *uncacheable* are terms we use to indicate whether or not a page should be cached at all. (By default, all pages are cacheable.) If any block in a [layout](https://glossary.magento.com/layout) is designated as uncacheable, the entire page is uncacheable.

To create an uncacheable page, mark any block on that page as uncacheable in the layout using `cacheable="false"`.

```xml
<block class="Magento\Customer\Block\Form\Edit" name="customer_edit" template="Magento_Customer::form/edit.phtml" cacheable="false">
    <container name="form.additional.info" as="form_additional_info"/>
</block>
```

Examples of uncacheable pages include the compare products, cart, [checkout](https://glossary.magento.com/checkout) pages, and so on.

[Example](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Paypal/view/frontend/layout/paypal_payflow_returnurl.xml)

<InlineAlert variant="warning" slots="text"/>

Do not configure content pages (i.e., catalog, product, and CMS pages) to be uncacheable. Doing so has an adverse affect on performance.

## Public and private content

Reverse proxies serve "public" or shared content to more than one user. However, most Adobe Commerce and Magento Open Source websites generate dynamic and personalized "private" content that should only be served to one user, which presents unique caching challenges. To address these challenges, the application can distinguish between two types of content:

-  **[Public](public-content.md)** - Public content is stored server side in your reverse proxy cache storage (e.g., file system, database, Redis, or Varnish) and is available to multiple customers. Examples of public content include header, footer, and category listing.

-  **[Private](private-content.md)** - Private content is stored client side (e.g., browser) and is specific to an individual customer. Examples of private content include wishlist, shopping cart, customer name, and address. You should limit stored private content to a small portion of the page's total content.

<InlineAlert variant="info" slots="text"/>

Only HTTP [GET](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3) and [HEAD](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.4) requests are cacheable. For more information about caching, see [RFC-2616 section 13](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).
