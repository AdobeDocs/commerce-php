---
title: Factories | Commerce PHP Extensions
description: Use factories to instantiate non-injectable classes in your Adobe Commerce and Magento Open Source extenions.
contributor_name: Classy Llama
contributor_link: http://www.classyllama.com/
keywords:
  - Extensions
---

# Factories

Factories are service classes that instantiate non-injectable classes, that is, models that represent a database entity.
They create a layer of abstraction between the `ObjectManager` and business code.

## Relationship to `ObjectManager`

The `Magento\Framework\ObjectManager` is the class responsible for instantiating objects in the application.
Adobe Commerce and Magento Open Source prohibit depending on and directly using the `ObjectManager` in your code.

Factories are an exception to this rule because they require the `ObjectManager` to instantiate specific models.

The following example illustrates the relationship between a simple factory and the `ObjectManager`:

```php
<?php
/**
 * Copyright Adobe
 * All rights reserved.
 */

namespace Magento\Framework\App\Config;

use Magento\Framework\ObjectManagerInterface;
use Magento\Framework\Simplexml\Element;
use Magento\Framework\App\Config\Base;

class BaseFactory
{
    /**
     * @var ObjectManagerInterface
     */
    protected $_objectManager;

    /**
     * @param ObjectManagerInterface $objectManager
     */
    public function __construct(ObjectManagerInterface $objectManager)
    {
        $this->_objectManager = $objectManager;
    }

    /**
     * Create config model
     *
     * @param string|Element $sourceData
     * @return Base
     */
    public function create($sourceData = null): Base
    {
        return $this->_objectManager->create(Base::class, ['sourceData' => $sourceData]);
    }
}
```

## Writing factories

Unless you require specific behavior for your factory classes, you do not need to explicitly define them because they are an [automatically generated](code-generation.md) class type.
When you reference a factory in a class constructor, Magento's [object manager](object-manager/index.md) generates the factory class if it does not exist.

Factories follow the naming convention `<class-type>Factory` where `<class-type>` is the name of the class the factory instantiates.

For example the automatically generated `Magento\Cms\Model\BlockFactory` class is a factory that instantiates the class [`Magento\Cms\Model\Block`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Cms/Model/Block.php).

## Using factories

You can get the singleton instance of a factory for a specific model using [dependency injection](dependency-injection.md).

The following example shows a class getting the `BlockFactory` instance through the constructor:

```php
public function __construct ( \Magento\Cms\Model\BlockFactory $blockFactory) {
    $this->blockFactory = $blockFactory;
}
```

Calling the `create()` method on a factory gives you an instance of its specific class:

```php
$block = $this->blockFactory->create();
```

For classes that require parameters, the automatically generated `create()` function accepts an array of parameters that it passes on to the `ObjectManager` to create the target class.

The example below shows the construction of a `\Magento\Framework\FlagFactory` object by passing in an array of parameters to a factory:

```php
$flag = $this->flagFactory->create([
  'data' =>  ['flag_code' => 'something']
]);
```

The `Flag` class has a `$data` constructor parameter which corresponds to the data key in the `create` array above.

### Interfaces

Factories are smart enough to resolve dependencies and allow you to get the correct instance of an interface as defined in your module's `di.xml`.

For example, in the [`CatalogInventory`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/CatalogInventory) module, the `di.xml` file contains the following entry:

```xml
<preference for="Magento\CatalogInventory\Api\Data\StockItemInterface" type="Magento\CatalogInventory\Model\Stock\Item" />
```

It instructs the application to use the specific [`Item`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/CatalogInventory/Model/Stock/Item.php) class wherever the [`StockItemInterface`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/CatalogInventory/Api/Data/StockItemInterface.php) is used.
When a class in that module includes the factory `StockItemInterfaceFactory` as a dependency, the application generates a factory that is capable of creating the specific `Item` objects.
