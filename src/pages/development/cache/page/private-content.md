---
title: Private Content | Commerce PHP Extensions
description: Learn how to work with private data when implementing a caching in your Adobe Commerce or Magento Open Source extension.
keywords:
  - Cache
  - Extensions
---

# Private content

Since private content is specific to individual users, it is reasonable to handle it on the client.

Use our [customer-data](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/view/frontend/web/js/customer-data.js) JS library to store private data in local storage, invalidate private data using customizable rules, and synchronize data with the backend.

This example displays a product comparison on a cacheable page.

## Create a section source

The section source class is responsible for retrieving data for the section. As a best practice, we recommend that you put your code within the `Vendor/ModuleName/CustomerData` namespace. Your classes must implement the [`Magento\Customer\CustomerData\SectionSourceInterface`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/CustomerData/SectionSourceInterface.php) interface.

The public method `getSectionData` must return an array with data for a private block.

[Example](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/CustomerData/CompareProducts.php#L61-L70)

Add the following to your component's dependency injection configuration (`di.xml`):

```xml
<type name="Magento\Customer\CustomerData\SectionPoolInterface">
    <arguments>
        <argument name="sectionSourceMap" xsi:type="array">
            <item name="custom-name" xsi:type="string">Vendor\ModuleName\CustomerData\ClassName</item>
        </argument>
    </arguments>
</type>
```

## Create a block and template

To render private content, create a block and a template to display user-agnostic data; this data is replaced with user-specific data by the UI component.

<InlineAlert variant="info" slots="text"/>

Do not use the `$_isScopePrivate` property in your blocks. This property is obsolete and will not work properly.

Replace private data in blocks with placeholders (using [Knockout](https://knockoutjs.com/documentation/introduction.html) syntax). The init scope on the root element is `data-bind="scope: 'compareProducts'"`, where you define the scope name (`compareProducts` in this example) in your layout.

Initialize the component as follows:

```html
<script type="text/x-magento-init">
    {"<css-selector>": {"Magento_Ui/js/core/app": <?php echo $block->getJsLayout();?>}}
</script>
```

[Example](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/view/frontend/templates/product/compare/sidebar.phtml#L50-L52)

## Configure a UI component

The UI component renders block data on the storefront. To initialize the UI component, you must trigger the parent initialization method by calling the `_super()` method and defining a property to store customer data. The `customerData.get()` method returns a Knockout's observable.

```javascript
initialize: function () {
    this._super();
    this.compareProducts = customerData.get('compare-products');
}
```

[Example](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/view/frontend/web/js/view/compare-products.js#L32-L33)

All properties are available in the template where the UI component initialized.

[Example of defining a UI component in a layout](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/view/frontend/layout/default.xml#L55-L61)

## Invalidate private content

Specify actions that trigger cache invalidation for private content blocks in a `sections.xml` configuration file in the `Vendor/ModuleName/etc/frontend` directory. The application invalidates the cache on a POST or PUT request.

Customer sections was designed to cache private data in browser storage. This means that any customer section will not be updated until proper action was made.

These are some exception cases:

-  Store and website switching, after any of these action customer section `cart` will be updated.
-  Customer cart lifetime option `section_data_lifetime` which is 60 minutes by default. After scheduled time passes, section `cart` will be updated.

<InlineAlert variant="info" slots="text"/>

Product information will not be simultaneously updated in customer cart (product name, price, product enabled/disabled). Information will be updated after what comes first: `section_data_lifetime` time passed or an action that the update cart triggered.

The following example adds comments to [app/code/Magento/Catalog/etc/frontend/sections.xml](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/etc/frontend/sections.xml) so you can see what the code is doing.

```xml
<?xml version="1.0"?>
<!--
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */
-->
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Customer:etc/sections.xsd">
    <!-- invalidates the "compare-products" section when a user
    adds a product to the comparison, resulting in a "catalog/product_compare/add" POST request -->
    <action name="catalog/product_compare/add">
        <section name="compare-products"/>
    </action>
    <!-- invalidates the section when a customer removes a product from the comparison -->
    <action name="catalog/product_compare/remove">
        <section name="compare-products"/>
    </action>
    <!-- invalidates the section when a customer clears all products from the comparison -->
    <action name="catalog/product_compare/clear">
        <section name="compare-products"/>
    </action>
</config>
```

There are sections that allow you to declare an 'action' node without specifying a sections, for instance, when logging out:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Customer:etc/sections.xsd">
  <action name="customer/account/logout"/>
</config>
```

This tells The application to invalidate all sections. But if you have declared sections for this action in another .xml file, it will override the initial sections and only newly added sections will be invalidated. If you need to reload all sections on some action, use `*` as section name or use an empty action and ensure that they will not be overridden by any other rules:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Customer:etc/sections.xsd">
    <action name="customer/account/editPost">
        <section name="*"/>
    </action>
</config>
```

<InlineAlert variant="warning" slots="text"/>

Use only HTTP POST or PUT methods to change state (e.g., adding to a shopping cart, adding to a wishlist, etc.) and do not expect to see caching on these methods. Using GET or HEAD methods might trigger caching and prevent updates to private content. For more information about caching, see [RFC-2616 section 13](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html).

Other examples:

-  [Checkout](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Checkout/etc/frontend/sections.xml)
-  [Customer](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Customer/etc/frontend/sections.xml)

## Version private content

Private content, which is stored in the browser local storage, uses the `private_content_version` cookie to store the version.

Versioning works as follows:

1. The user performs some action, such as adding to a cart, that results in an POST or PUT request to the Adobe Commerce or Magento Open Source application.
1. The server generates the `private_content_version` cookie for this user and returns the response to the browser.
1. JavaScript interprets the presence of the `private_content_version` cookie to mean that private content is present on the page, so it sends an AJAX request to the application server to get the current private content.
1. The server's reply is cached in the browser's local storage.

   Subsequent requests with the same data version are retrieved from local storage.

1. Any future HTTP POST or PUT request changes the value of `private_content_version` and results in the updated content being cached by the browser.

<InlineAlert variant="warning" slots="text"/>

The customer data invalidation mechanism no longer relies on the `private_content_version`.

import PageChecklist from '/src/_includes/page-cache-checklist.md'

<PageChecklist />
