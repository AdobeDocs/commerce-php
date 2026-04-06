---
title: Add a Custom Dropdown Attribute | Commerce PHP Extensions
description: Follow this tutorial to create a custom dropdown attribute for Adobe Commerce or Magento Open Source.
keywords:
  - Extensions
---

# Add a custom dropdown attribute

This tutorial describes how a developer can create a custom dropdown (select) attribute for the Customer entity using code. This will reflect in both the [Customer Grid](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-accounts/manage/manage-account) and the [Customer Form](https://experienceleague.adobe.com/en/docs/commerce-admin/customers/customer-accounts/manage/update-account) in the Admin.

Use a select attribute when you want administrators (and optionally customers) to choose a value from a controlled set of options — for example, a customer tier (Silver/Gold/Platinum) or an internal segmentation flag. The attribute will be created as an EAV attribute in a data patch. This tutorial also implements `PatchRevertableInterface`, which allows the attribute to be cleanly removed by running `bin/magento setup:rollback`.

## Code

### Create the data patch class

Create a data patch class called `AddCustomerAttributeOptions` under the `\ExampleCorp\Customer\Setup\Patch\Data` namespace. This makes the application execute the data patch automatically when `bin/magento setup:upgrade` is run. Unlike the text field and boolean attribute tutorials, this class implements both `\Magento\Framework\Setup\Patch\DataPatchInterface` and `\Magento\Framework\Setup\Patch\PatchRevertableInterface`. Adding the revertable interface requires implementing a `revert()` method that removes the attribute when the patch is rolled back.

```php
<?php declare(strict_types=1);

namespace ExampleCorp\Customer\Setup\Patch\Data;

use \Magento\Framework\Setup\Patch\DataPatchInterface;
use \Magento\Framework\Setup\Patch\PatchRevertableInterface;

class AddCustomerAttributeOptions implements DataPatchInterface, PatchRevertableInterface
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

Note that unlike previous tutorials, the dropdown patch stores `$customerSetupFactory` directly rather than instantiating `$customerSetup` in the constructor. This is because `revert()` also needs to create a `CustomerSetup` instance, so the factory is reused across both methods.

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

1. Add the dropdown customer attribute with the required settings.

    Dropdown attributes store the selected option's ID as an integer. Set `input` to `select` and assign a source model that provides the option list. The built-in `Table` source model reads options from the `eav_attribute_option` and `eav_attribute_option_value` tables, which can be managed through the Admin or populated programmatically. To provide a fixed, code-defined set of options, replace `Table::class` with a custom source model that implements `toOptionArray()`.

    ```php
    /** @var CustomerSetup $customerSetup */
    $customerSetup = $this->customerSetupFactory->create(['setup' => $this->moduleDataSetup]);

    $customerSetup->addAttribute(
        CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, // entity type code
        'custom_options', // unique attribute code
        [
            'label' => 'Customer Custom Attribute Options',
            'type' => 'int',
            'input' => 'select',
            'source' => \Magento\Eav\Model\Entity\Attribute\Source\Table::class,
            'required' => false,
            'position' => 444,
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
    | `label` | `Customer Custom Attribute Options` - Label for displaying the attribute value |
    | `type` | `int` - Stores the selected option ID as an integer |
    | `input` | `select` - Renders as a dropdown in the customer form |
    | `source` | Provides the list of selectable options |
    | `required` | `false` - Attribute will be an optional field in the customer form |
    | `position` | `444` - Sort order in the customer form |
    | `system` | `false` - Not a system-defined attribute |
    | `user_defined` | `true` - A user-defined attribute |
    | `is_used_in_grid` | `true` - Ready for use in the customer grid |
    | `is_visible_in_grid` | `true` - Visible in the customer grid |
    | `is_filterable_in_grid` | `true` - Filterable in the customer grid |
    | `is_searchable_in_grid` | `false` - Not searchable in the customer grid (dropdown fields are filtered by option, not free-text searched) |

1. Add attribute to an attribute set and group.

    There is only one attribute set and group for the customer entity. The default attribute set ID is a constant defined in the `CustomerMetadataInterface` interface and setting the attribute group ID to null makes the application use the default attribute group ID for the customer entity.

    ```php
    $customerSetup->addAttributeToSet(
        CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, // entity type code
        CustomerMetadataInterface::ATTRIBUTE_SET_ID_CUSTOMER, // attribute set ID
        null, // attribute group ID
        'custom_options' // unique attribute code
    );
    ```

1. Make the attribute visible in the customer form.

    ```php
    // Get the newly created attribute's model
    $attribute = $customerSetup->getEavConfig()
        ->getAttribute(CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, 'custom_options');

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
            'custom_options'
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
-  The attribute is displayed in the customer grid and can be filtered using a dropdown of available options.

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
use Magento\Eav\Model\Entity\Attribute\Source\Table;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\Patch\PatchRevertableInterface;

/**
 * Creates a Customer select attribute backed by a source model.
 */
class AddCustomerAttributeOptions implements DataPatchInterface, PatchRevertableInterface
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
                'custom_options',
                [
                    'label' => 'Customer Custom Attribute Options',
                    'type' => 'int',
                    'input' => 'select',
                    'source' => Table::class,
                    'required' => false,
                    'position' => 444,
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
                'custom_options'
            );

            // Get the newly created attribute's model
            $attribute = $customerSetup->getEavConfig()
                ->getAttribute(CustomerMetadataInterface::ENTITY_TYPE_CUSTOMER, 'custom_options');

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
                'custom_options'
            );
        } catch (Exception $e) {
            $this->logger->error($e->getMessage());
        }

        // End setup
        $this->moduleDataSetup->getConnection()->endSetup();
    }
}
```