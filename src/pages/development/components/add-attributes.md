---
title: Add extension attributes | Commerce PHP Extensions
description: Extend the functionality of Adobe Commerce and Magento Open Source using complex data types.
keywords:
  - Extensions
---

# Add extension attributes to entities

Third-party developers cannot change the API data interfaces defined in the Adobe Commerce and Magento Open Source code. However, most of these entities have a feature called extension attributes. Check the interface for the methods `getExtensionAttributes()` and `setExtensionAttributes()` to determine if they are available for the entity.

<InlineAlert variant="info" slots="text"/>

We will demonstrate how to add extension attributes to a Product entity, Product Repository and Web Api example.

In order to retrieve a product or a list of products from the API, you need to make an API request to the appropriate service (the Product Repository in this case).
The response to these requests will return objects with the following structure:

## Product response

```xml
<product>
    <id>1</id>
    <sku>some-sku</sku>
    <custom_attributes><!-- Custom Attributes Data --></custom_attributes>
    <extension_attributes><!-- Here should we add extension attributes data --></extension_attributes>
</product>
```

## Product list response:

```xml
<products>
    <item>
        <id>1</id>
        <sku>some-sku</sku>
        <custom_attributes><!-- Custom Attributes Data --></custom_attributes>
        <extension_attributes><!-- Here should we add extension attributes data --></extension_attributes>
    </item>
    <item>
        <id>2</id>
        <sku>some-sku-2</sku>
        <custom_attributes><!-- Custom Attributes Data --></custom_attributes>
        <extension_attributes><!-- Here should we add extension attributes data --></extension_attributes>
    </item>
</products>
```

## Add plugin to product repository

In order to add extension attributes, we need to use an after plugin on Product Repository.
The plugin should be declared for the methods: `save`, `get` and `getList`.

We can add scalar and non-scalar extension attributes.
Scalar is a simple attribute.
Non-scalar attributes can be represented by Data Object.

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Catalog\Api\Data\ProductInterface;

public function afterGet
(
    ProductRepositoryInterface $subject,
    ProductInterface $entity
) {
    $ourCustomData = $this->customDataRepository->get($entity->getId());

    $extensionAttributes = $entity->getExtensionAttributes(); /** get current extension attributes from entity **/
    $extensionAttributes->setOurCustomData($ourCustomData);
    $entity->setExtensionAttributes($extensionAttributes);

    return $entity;
}
```

This is the simplest way to add extension attributes without causing a conflict:

-  We get the entity's extension attributes, if they are already set.
-  We add our extension attribute.
-  Finally set the extension attribute on the entity with ours included.

Function `afterGetList` is similar to `afterGet`:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Catalog\Api\Data\ProductSearchResultsInterface;

public function afterGetList(
    ProductRepositoryInterface $subject,
    ProductSearchResultsInterface $searchResults
) : ProductSearchResultsInterface {
    $products = [];
    foreach ($searchResults->getItems() as $entity) {
        $ourCustomData = $this->customDataRepository->get($entity->getId());

        $extensionAttributes = $entity->getExtensionAttributes();
        $extensionAttributes->setOurCustomData($ourCustomData);
        $entity->setExtensionAttributes($extensionAttributes);

        $products[] = $entity;
    }
    $searchResults->setItems($products);
    return $searchResults;
}
```

<InlineAlert variant="info" slots="text"/>

To add extension attributes to an entity without plugins, use the `extensionActions` argument of `\Magento\Framework\EntityManager\Operation\ExtensionPool`. See [\Magento\Catalog\Model\ProductRepository::getList()](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/Model/ProductRepository.php) as an example of an implementation.

Likewise, the `afterSave` plugin should manipulate the entity data before returning it:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Catalog\Api\Data\ProductInterface;
use Magento\Catalog\Api\ProductRepositoryInterface;

public function afterSave
(
    ProductRepositoryInterface $subject,
    ProductInterface $result, /** result from the save call **/
    ProductInterface $entity  /** original parameter to the call **/
    /** other parameter not required **/
) {
    $extensionAttributes = $entity->getExtensionAttributes(); /** get original extension attributes from entity **/
    $ourCustomData = $extensionAttributes->getOurCustomData();
    $this->customDataRepository->save($ourCustomData);

    $resultAttributes = $result->getExtensionAttributes(); /** get extension attributes as they exist after save **/
    $resultAttributes->setOurCustomData($ourCustomData); /** update the extension attributes with correct data **/
    $result->setExtensionAttributes($resultAttributes);

    return $result;
}
```

But if some entity doesn't have implementation to fetch extension attributes, we will always retrieve `null` and each time when we fetch extension attributes we need to check if they are `null`. If so, then we need to create them. To avoid such code duplication, we need to create `afterGetExtensionAttributes` plugin for our entity with extension attributes.

Let's assume the product entity doesn't have any implementation of extension attributes, so our plugin might look like this:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\Catalog\Api\Data\ProductExtensionInterface;
use Magento\Catalog\Api\Data\ProductInterface;
use Magento\Catalog\Api\Data\ProductExtensionFactory;

class ProductAttributesLoad
{
    /**
     * @var ProductExtensionFactory
     */
    private $extensionFactory;

    /**
     * @param ProductExtensionFactory $extensionFactory
     */
    public function __construct(ProductExtensionFactory $extensionFactory)
    {
        $this->extensionFactory = $extensionFactory;
    }

    /**
     * Loads product entity extension attributes
     *
     * @param ProductInterface $entity
     * @param ProductExtensionInterface|null $extension
     * @return ProductExtensionInterface
     */
    public function afterGetExtensionAttributes(
        ProductInterface $entity,
        ProductExtensionInterface $extension = null
    ) {
        if ($extension === null) {
            $extension = $this->extensionFactory->create();
        }

        return $extension;
    }
}

```

Now we need to bind our plugin to `ProductInterface`:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Catalog\Api\Data\ProductInterface">
        <plugin name="ProductExtensionAttributeOperations" type="Magento\Catalog\Plugin\ProductAttributesLoad"/>
    </type>
</config>
```

## Configure extension attributes

The file that holds these extension attributes must reside under the `/etc` folder of your module.

For scalar attributes, we can use the following configuration:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Api/etc/extension_attributes.xsd">
    <extension_attributes for="Magento\Catalog\Api\Data\ProductInterface">
        <attribute code="first_custom_attribute" type="int" />
        <attribute code="second_custom_attribute" type="string" />
    </extension_attributes>
</config>
```

Here, the scalar attributes indicate the simple form of attribute representation, such as an integer or a string. Specify the class or interface of the extension attributes inside the "for" attribute of the `<extension_attributes>` tag. In this case, it is the ProductInterface. The attribute is specified with a unique code and its type.

For non-scalar attributes:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Api/etc/extension_attributes.xsd">
    <extension_attributes for="Magento\Catalog\Api\Data\ProductInterface">
        <attribute code="our_custom_data" type="Magento\SomeModule\Api\Data\CustomDataInterface" />
    </extension_attributes>
</config>
```

Here, the non-scalar attributes indicate data objects such as the instance of a class. In the above example, the CustomDataInterface object is added as an extension attribute.

For array extension attributes:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Api/etc/extension_attributes.xsd">
    <extension_attributes for="Magento\Catalog\Api\Data\ProductInterface">
        <attribute code="some_custom_data" type="string[]" />
    </extension_attributes>
</config>
```

The array extension attributes are just an extension of the scalar attributes where a range of values can be represented as an attribute. The `[]` symbol indicates the attribute type is an array.

The array indicator `[]` can also be appended to non-scalar types.

In first - scalar - case we will get the next result:

```xml
<product>
    <id>1</id>
    <sku>some-sku</sku>
    <custom_attributes><!-- Custom Attributes Data --></custom_attributes>
    <extension_attributes>
        <first_custom_attribute>1</first_custom_attribute>
        <second_custom_attribute>foo</second_custom_attribute>
    </extension_attributes>
</product>
```

In second, non-scalar one:

```xml
<product>
    <id>1</id>
    <sku>some-sku</sku>
    <custom_attributes><!-- Custom Attributes Data --></custom_attributes>
    <extension_attributes>
        <our_custom_data>
            <!-- fields defined in CustomDataInterface are here -->
        </our_custom_data>
    </extension_attributes>
</product>
```

In third, array one (in JSON for a change):

```js
{
  "id": 1,
  "sku": "some-sku",
  "custom_attributes": { /* ... custom attribute data ... */ },
  "extension_attributes": {
    "some_custom_data": ["value1", "value2", "value3"]
  }
}
```
