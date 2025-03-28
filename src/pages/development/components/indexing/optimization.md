---
title: Indexer Optimization | Commerce PHP Extensions
description: Learn techniques for optimizing Adobe Commerce and Magento Open Source indexers.
keywords:
  - Extensions
---

# Indexer optimization

Use batching and table switching to optimize the performance of indexers.

## Indexer batching

Adobe Commerce and Magento Open Source can increase the memory for processing a large amount of data by using memory engines instead of InnoDB. The algorithm increases the memory value for the `max_heap_table_size` and `tmp_table_size` MySQL parameters.

The interface `BatchSizeManagementInterface` provides the ability to set the MEMORY table size for indexer processes according to batch size and index row size.

```php
namespace Magento\Framework\Indexer;

use Magento\Framework\DB\Adapter\AdapterInterface;

/**
 * Batch size manager can be used to ensure that MEMORY table has enough memory for data in batch.
 * @api
 */
interface BatchSizeManagementInterface
{
    /**
     * Ensure memory size for data in batch.
     *
     * @param AdapterInterface $adapter database adapter.
     * @param int $batchSize
     * @return void
     */
    public function ensureBatchSize(\Magento\Framework\DB\Adapter\AdapterInterface $adapter, $batchSize);
}
```

The interface `IndexTableRowSizeEstimatorInterface` calculates the memory size for all rows per entity in the index table. The entity can store several rows in an index table generated by different store dimensions, such as count of websites and customer groups.

```php
namespace Magento\Framework\Indexer;

/**
 * Calculate memory size for entity according different dimensions.
 * @api
 */
interface IndexTableRowSizeEstimatorInterface
{
    /**
     * Calculate memory size for entity row.
     *
     * @return float
     */
    public function estimateRowSize();
}
```

### Exceeding allocated memory size

When the allocated memory size for a temporary table will be greater than 20% of `innodb_buffer_pool_size`, the following message is written to the log.

`Memory size allocated for the temporary table is more than 20% of innodb_buffer_pool_size.`

To prevent this error message, update `innodb_buffer_pool_size` or decrease the batch size value (which decreases memory usage for the temporary table).

## Batching configuration

Batching is available for the following indexers:

| Index name                                    | Configured object                                                             | Parameter name                              | Default value |
|-----------------------------------------------|-------------------------------------------------------------------------------|---------------------------------------------|---------------|
| catalog_product_price (Product Price)         | Magento\Catalog\Model\<br/>ResourceModel\Product\Indexer\Price\BatchSizeCalculator | batchRowsCount['default']                   | 5000          |
| cataloginventory_stock (Stock)                | Magento\CatalogInventory\Model\<br/>Indexer\Stock\Action\Full                      | batchRowsCount['default']                   | 200           |
| catalog_category_product (Category Products)  | Magento\Catalog\Model\<br/>Indexer\Category\Product\Action\Full                    | batchRowsCount                              | 100000        |
| catalog_product_attribute (Product Attribute) | Magento\Catalog\Model\<br/>ResourceModel\Product\Indexer\Eav\BatchSizeCalculator   | batchSizes['decimal'], batchSizes['source'] | 1000, 1000    |

Changing the batch size can help you optimize indexer running time. For example, for a store with the following characteristics:

*  10 websites
*  10 store groups
*  20 store views
*  300 tier prices
*  About 40,000 products (of which 254 are configurable)

Reducing the batch size for `catalog_product_price` indexer from 5000 to 1000 decreases the execution time from about 4 hours to less than 2 hours. You can experiment to determine the ideal batch size. In general, halving the batch size can decrease the indexer execution time.

The following examples illustrate how to define a custom batch size for configurable products. Add these samples to your  `{Your_Module_Name}/etc/di.xml`.

```xml
....
<type name="Magento\Catalog\Model\ResourceModel\Product\Indexer\Price\BatchSizeCalculator">
    <arguments>
        <argument name="batchRowsCount" xsi:type="array">
            <item name="configurable" xsi:type="number">5000</item>
        </argument>
    </arguments>
</type>
...
```

```xml
<type name="Magento\CatalogInventory\Model\Indexer\Stock\Action\Full">
    <arguments>
        <argument name="batchRowsCount" xsi:type="array">
            <item name="configurable" xsi:type="number">200</item>
        </argument>
    </arguments>
</type>
```

### Setting batch size with environment variables

As of Adobe Commerce and Magento Open Source 2.4.3, it is possible to configure the batch size with environment variables, or in `app/etc/env.php`, for the following indexers:

*  `cataloginventory_stock`
*  `catalog_category_product`
*  `catalogsearch_fulltext`
*  `catalog_product_price`
*  `catalogpermissions_category`
*  `inventory`

Here is an example of the configuration in `app/etc/env.php`

```php
<?php
return [
    'indexer' => [
        'batch_size' => [
            'cataloginventory_stock' => [
                'simple' => 200
            ],
            'catalog_category_product' => 666,
            'catalogsearch_fulltext' => [
                'partial_reindex' => 100,
                'mysql_get' => 500,
                'elastic_save' => 500
            ],
            'catalog_product_price' => [
                'simple' => 200,
                'default' => 500,
                'configurable' => 666
            ],
            'catalogpermissions_category' => 999,
            'inventory' => [
                'simple' => 210,
                'default' => 510,
                'configurable' => 616
            ]
        ]
    ]
];
```

The batches size for `catalog_category_product`, `catalogpermissions_category`, `catalogpermissions_category` will be set for all product types.

Batch size for `catalogsearch_fulltext` can be set using different parameters.

*  `partial_reindex` - represents how many products will be processed in a partial reindex.
*  `elastic_save` - represents how many products will be saved as a batch into Elasticsearch.
*  `mysql_get` - represents how many searchable products will be retrieved from Mysql.

Batch size for `cataloginventory_stock`, `catalog_product_price`, `inventory` can be set up for each product type. If no batch size is set for a specific product type, the `default` value is used. We recommend setting the `default` value for each indexer to allow for different batch sizes per product type.

## Indexer table switching

Adobe Commerce and Magento Open Source optimize certain indexer processes to prevent deadlocks and wait locks caused by read/write collisions on the same table. In these cases, the application uses separate tables for performing read operations and reindexing. As a result of this table switching process, customers are not impacted when you run a full reindex. For example, when `catalog_product_price` is reindexing, customers won't be slowed down as they navigate on Categories pages, search products, or user layer navigation filters with price filters.

The application uses the following tables to support table switching.

Indexer name | Tables used
--- | --- | ---
`catalog_product_price` |  `catalog_product_index_price`, `catalog_product_index_price_replica`
`cataloginventory_stock` | `cataloginventory_stock_status`, `cataloginventory_stock_status_replica`
`catalog_category_product` | `catalog_category_product_index`, `catalog_category_product_index_replica`
`catalog_product_attribute` (select, multiselect attributes) | `catalog_product_index_eav`, `catalog_product_index_eav_replica`
`catalog_product_attribute` (decimal values) |`catalog_product_index_eav_decimal`, `catalog_product_index_eav_decimal_replica`
`catalogrule_rule` | `catalogrule_product`, `catalogrule_product_replica`, `catalogrule_product_price`, `catalogrule_product_price_replica`, `catalogrule_group_website`, `catalogrule_group_website_replica`

Make sure that these indexers are in "Update By Schedule" mode. If "Update On Save" mode is selected, some data can be lost if you make changes during full reindex.

<InlineAlert variant="info" slots="text"/>

The indexer table switching mechanism requires additional database storage.

### EAV indexer optimization

The Product EAV indexer reorganizes the EAV product structure to a flat structure.
As of Adobe Commerce and Magento Open Source 2.3, under certain circumstances, you can disable this indexer to improve performance. (Its indexation takes about 5 minutes on a large Commerce performance profile.)

You cannot disable the Product EAV indexer if you have installed any 3rd-party extensions that rely on the Product EAV indexer.

<InlineAlert variant="info" slots="text"/>

To determine whether any 3rd-party extensions are using the Product EAV indexer, check the `catalog_product_index_eav` table for reading/writing activity.

To disable the Product EAV indexer in the Admin, go to **Stores** > Settings > **Configuration** > **Catalog** > **Catalog** > **Catalog Search** and set the value of **Enable EAV Indexer** to No.

## Customer group limitations by websites

By default, all websites are assigned to a customer group. If there are a large number of products, websites, customer groups, and B2B shared catalogs, the execution time of the `Product Price` and `Catalog Rule` indexers may be quite long. This is because each website, customer group, shared catalog, and product SKU must all be indexed against each other in the product price and catalog rule indexer-related tables.

You can exclude websites from a customer group or shared catalog on the [Customer Groups page](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-groups#create-a-customer-group). Excluding websites can decrease `Product Price` and `Catalog Rule` indexing time, because excluded websites are not indexed.

When a customer group with a new, excluded website is saved, the `Product Price`, `Catalog Rule` and `Catalog Search` indexes are invalidated. If you have a large number of products, websites, and customer groups, we recommended you pause the reindex process until you have excluded websites from the customer groups.

You cannot exclude websites from a shared catalog on a shared catalog create/edit page. However, you can exclude websites from a customer group that is created from a shared catalog.

<InlineAlert variant="info" slots="text"/>

By default, no websites are excluded from a customer group or shared catalog.
You cannot exclude websites from the `NOT LOGGED IN` customer group.

<InlineAlert variant="warning" slots="text"/>

When a website is added to the excluded customer group and a customer who belongs to this group is trying to login to their account on the excluded website, the customer gets the `"This website is excluded from customer's group."` warning.
Customers are not allowed to login to the website even if [the scope of customer accounts is shared with all websites](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-accounts/customer-account-scope), because there are no prices in the index table for this user.
