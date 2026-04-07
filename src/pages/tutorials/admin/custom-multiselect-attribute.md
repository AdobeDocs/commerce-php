---
title: Add a Custom Multiselect Attribute | Commerce PHP Extensions
description: Follow this tutorial to create a custom multiselect attribute for Adobe Commerce or Magento Open Source.
keywords:
  - Extensions
---

# Add a custom multiselect attribute

This tutorial describes how a developer can create a custom multiselect attribute for the Customer entity using code. This will reflect in both the [Customer Grid](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-accounts/manage/manage-account) and the [Customer Form](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-accounts/manage/update-account) in the Admin.

Use a multiselect attribute when you need to store multiple simultaneous values for a single customer field — for example, eligible shipping methods, allowed sales channels, or subscription preferences. Unlike the [dropdown attribute](custom-dropdown-attribute.md), which stores a single selected option ID as an integer, a multiselect attribute stores a comma-separated list of option IDs as a `varchar` value, handled by the `ArrayBackend` backend model. This tutorial also implements `PatchRevertableInterface`, which allows the attribute to be cleanly removed by running `bin/magento setup:rollback`.

## Code

### Create the data patch class

Create a data patch class called `AddCustomerAttributeMultipleOptions` under the `\ExampleCorp\Customer\Setup\Patch\Data` namespace. This makes the application execute the data patch automatically when `bin/magento setup:upgrade` is run. This class implements both `\Magento\Framework\Setup\Patch\DataPatchInterface` and `\Magento\Framework\Setup\Patch\PatchRevertableInterface`.

```php
<?php declare(strict_types=1);

namespace ExampleCorp\Customer\Setup\Patch\Data;

use \Magento\Framework\Setup\Patch\DataPatchInterface;
use \Magento\Framework\Setup\Patch\PatchRevertableInterface;

class AddCustomerAttributeMultipleOptions implements DataPatchInterface, PatchRevertableInterface
{
    public function apply(): void
    {
        // will be implemented in the next steps.
    }

    public function revert(): void
    {
        // will be implemented in the next steps.
    }

    public function getAliases(): array
    {
        // will be implemented in the next steps.
    }

    public static function getDependencies(): array
    {
        // will be implemented in the next steps.
    }
}
```

### Inject the dependencies

The dependencies to the data patch are injected using constructor DI and are listed below:

-  `\Magento\Framework\Setup\ModuleDataSetupInterface` for initializing and ending the setup.
-  `\Magento\Customer\Setup\CustomerSetupFactory` for creating a model of `\Magento\Customer\Setup\CustomerSetup` which is required to add and remove the custom attribute.
-  `\Magento\Customer\Model\ResourceModel\Attribute` aliased as `AttributeResource` for saving the attribute after adding custom data to it.
-  `\Psr\Log\LoggerInterface` for logging exceptions thrown during the execution.

As with the dropdown attribute, the factory is stored rather than a single `CustomerSetup` instance, because both `apply()` and `revert()` need to create their own instance.

```php
/**
 * Constructor
 *
 * @param ModuleDataSetupInterface $moduleDataSetup
 * @param CustomerSetupFactory $customerSetupFactory
 * @param AttributeResource $attributeResource
 * @param LoggerInterface $logger
 */
public function __construct(
    ModuleDataSetupInterface $moduleDataSetup,
    CustomerSetupFactory $customerSetupFactory,
    AttributeResource $attributeResource,
    LoggerInterface $logger
) {
    $this->moduleDataSetup = $moduleDataSetup;
    $this->customerSetupFactory = $customerSetupFactory;
    $this->attributeResource = $attributeResource;
    $this->logger = $logger;
}
```

### Implement the apply method

There are five steps in developing a data patch. All the steps below are written inside the `apply` method.

1. Starting and ending the setup execution. This turns off foreign key checks and sets the SQL mode.

    ```php
    $this->moduleDataSetup->getConnection()->startSetup();

    /*
      Attribute creation code must be run between these two lines
      to ensure that the attribute is created smoothly.
     */

    $this->moduleDataSetup->getConnection()->endSetup();
    ```

1. Add the multiselect customer attribute with the required settings.

    Multiselect attributes differ from dropdown attributes in two important ways. First, `type` is set to `varchar` rather than `int`, because the stored value is a comma-separated string of selected option IDs (for example, `3,7,12`) rather than a single integer. Second, a `backend` model must be specified. `ArrayBackend` handles serializing the array of selected IDs into that comma-separated string on save, and deserializing it back to an array on load. Without it, the multiselect will not persist correctly.

    ```php
    /** @var CustomerSetup $customerSetup */
    $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

    $customerSetup->addAttribute(
        CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, // entity type code
        'custom_multi_options', // unique attribute code
        [
            'label' => 'Customer Custom Attribute MultiOptions',
            'type' => 'varchar',
            'input' => 'multiselect',
            'source' => \Magento\Eav\Model\Entity\Attribute\Source\Table::class,
            'backend' => \Magento\Eav\Model\Entity\Attribute\Backend\ArrayBackend::class,
            'required' => false,
            'position' => 555,
            'system' => false,
            'user_defined' => true,
            'is_used_in_grid' => true,
            'is_visible_in_grid' => true,
            'is_filterable_in_grid' => true,
            'is_searchable_in_grid' => false,
        ]
    );
    ```

    | Setting Key | Description |
    | --- | --- |
    | `label` | `Customer Custom Attribute MultiOptions` - Label for displaying the attribute value |
    | `type` | `varchar` - Stores selected option IDs as a comma-separated string |
    | `input` | `multiselect` - Renders as a multiselect list in the customer form |
    | `source` | Provides the list of selectable options |
    | `backend` | `ArrayBackend` - Serializes and deserializes the comma-separated option ID string |
    | `required` | `false` - Attribute will be an optional field in the customer form |
    | `position` | `555` - Sort order in the customer form |
    | `system` | `false` - Not a system-defined attribute |
    | `user_defined` | `true` - A user-defined attribute |
    | `is_used_in_grid` | `true` - Ready for use in the customer grid |
    | `is_visible_in_grid` | `true` - Visible in the customer grid |
    | `is_filterable_in_grid` | `true` - Filterable in the customer grid |
    | `is_searchable_in_grid` | `false` - Not searchable in the customer grid (multiselect fields are filtered by option, not free-text searched) |

1. Add attribute to an attribute set and group.

    There is only one attribute set and group for the customer entity. The default attribute set ID is a constant defined in the `CustomerMetadataInterface` interface and setting the attribute group ID to null makes the application use the default attribute group ID for the customer entity.

    ```php
    $customerSetup->addAttributeToSet(
        CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, // entity type code
        CustomerMetadataInterface::ATTRIBUTE_SET_ID_CUSTOMER, // attribute set ID
        null, // attribute group ID
        'custom_multi_options' // unique attribute code
    );
    ```

1. Make the attribute visible in the customer form.

    ```php
    // Get the newly created attribute's model
    $attribute = $customerSetup->getEavConfig()
        ->getAttribute(CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, 'custom_multi_options');

    // Make attribute visible in Admin customer form and storefront forms
    $attribute->setData('used_in_forms', [
        'adminhtml_customer',
        'customer_account_create',
        'customer_account_edit',
    ]);

    // Save modified attribute model using its resource model
    $this->attributeResource->save($attribute);
    ```

1. Gracefully handle exceptions.

    ```php
    try {
        // All the code inside the apply method goes into the try block.
    } catch (Exception $exception) {
        $this->logger->error($exception->getMessage());
    }
    ```

### Implement the revert method

Because this class implements `PatchRevertableInterface`, it must also define a `revert()` method. This method is called when `bin/magento setup:rollback` targets this patch and removes the attribute from the system.

```php
public function revert(): void
{
    $this->moduleDataSetup->getConnection()->startSetup();

    /** @var CustomerSetup $customerSetup */
    $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

    try {
        $customerSetup->removeAttribute(
            CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER,
            'custom_multi_options'
        );
    } catch (Exception $e) {
        $this->logger->error($e->getMessage());
    }

    $this->moduleDataSetup->getConnection()->endSetup();
}
```

### Implement rest of the interface

This data patch does not have any other patch as a dependency, and this data patch was not renamed earlier, so both `getDependencies` and `getAliases` can return an empty array.

```php
public static function getDependencies(): array
{
    return [];
}

public function getAliases(): array
{
    return [];
}
```

### Execute the data patch

Run `bin/magento setup:upgrade` from the project root to execute the newly added data patch.

-  The attribute is created in the customer form under the _Account Information_ section.
-  The attribute is displayed in the customer grid and can be filtered by selecting one or more options.

To remove the attribute, run `bin/magento setup:rollback` and target this patch. The `revert()` method will execute and delete the attribute from the system.

### Code reference

```php
<?php declare(strict_types=1);

namespace ExampleCorp\Customer\Setup\Patch\Data;

use Exception;
use Psr\Log\LoggerInterface;
use Magento\Customer\Api\CustomerMetadataInterface;
use Magento\Customer\Model\ResourceModel\Attribute as AttributeResource;
use Magento\Customer\Setup\CustomerSetup;
use Magento\Customer\Setup\CustomerSetupFactory;
use Magento\Eav\Model\Entity\Attribute\Backend\ArrayBackend;
use Magento\Eav\Model\Entity\Attribute\Source\Table;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\Patch\PatchRevertableInterface;

/**
 * Creates a Customer multi-select attribute stored using ArrayBackend.
 */
class AddCustomerAttributeMultipleOptions implements DataPatchInterface, PatchRevertableInterface
{
    /**
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var CustomerSetupFactory
     */
    private $customerSetupFactory;

    /**
     * @var AttributeResource
     */
    private $attributeResource;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Constructor
     *
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param CustomerSetupFactory $customerSetupFactory
     * @param AttributeResource $attributeResource
     * @param LoggerInterface $logger
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        CustomerSetupFactory $customerSetupFactory,
        AttributeResource $attributeResource,
        LoggerInterface $logger
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->customerSetupFactory = $customerSetupFactory;
        $this->attributeResource = $attributeResource;
        $this->logger = $logger;
    }

    /**
     * Get array of patches that have to be executed prior to this.
     *
     * @return string[]
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * Get aliases (previous names) for the patch.
     *
     * @return string[]
     */
    public function getAliases(): array
    {
        return [];
    }

    /**
     * Run code inside patch
     */
    public function apply(): void
    {
        // Start setup
        $this->moduleDataSetup->getConnection()->startSetup();

        /** @var CustomerSetup $customerSetup */
        $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

        try {
            // Add customer attribute with settings
            $customerSetup->addAttribute(
                CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER,
                'custom_multi_options',
                [
                    'label' => 'Customer Custom Attribute MultiOptions',
                    'type' => 'varchar',
                    'input' => 'multiselect',
                    'source' => Table::class,
                    'backend' => ArrayBackend::class,
                    'required' => false,
                    'position' => 555,
                    'system' => false,
                    'user_defined' => true,
                    'is_used_in_grid' => true,
                    'is_visible_in_grid' => true,
                    'is_filterable_in_grid' => true,
                    'is_searchable_in_grid' => false,
                ]
            );

            // Add attribute to default attribute set and group
            $customerSetup->addAttributeToSet(
                CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER,
                CustomerMetadataInterface::ATTRIBUTE_SET_ID_CUSTOMER,
                null,
                'custom_multi_options'
            );

            // Get the newly created attribute's model
            $attribute = $customerSetup->getEavConfig()
                ->getAttribute(CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, 'custom_multi_options');

            // Make attribute visible in Admin customer form and storefront forms
            $attribute->setData('used_in_forms', [
                'adminhtml_customer',
                'customer_account_create',
                'customer_account_edit',
            ]);

            // Save attribute using its resource model
            $this->attributeResource->save($attribute);
        } catch (Exception $e) {
            $this->logger->error($e->getMessage());
        }

        // End setup
        $this->moduleDataSetup->getConnection()->endSetup();
    }

    /**
     * Rollback all changes, done by this patch
     */
    public function revert(): void
    {
        // Start setup
        $this->moduleDataSetup->getConnection()->startSetup();

        /** @var CustomerSetup $customerSetup */
        $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

        try {
            $customerSetup->removeAttribute(
                CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER,
                'custom_multi_options'
            );
        } catch (Exception $e) {
            $this->logger->error($e->getMessage());
        }

        // End setup
        $this->moduleDataSetup->getConnection()->endSetup();
    }
}
```
