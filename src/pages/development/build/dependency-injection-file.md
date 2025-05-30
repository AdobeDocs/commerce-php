---
title: Dependency Injection Configuration | Commerce PHP Extensions
description: Learn how to configure dependency injection in Adobe Commerce and Magento Open Source components using the di.xml file.
keywords:
  - Extensions
---

# Dependency injection configuration

The `di.xml` file configures which [dependencies](../components/dependency-injection.md) are injected by the [object manager](../components/object-manager/index.md). You can also specify [sensitive configuration settings](#sensitive-and-system-specific-configuration-settings) using `di.xml`.

## Areas and application entry points

Each module can have a global and area-specific `di.xml` file.
The application reads all the `di.xml` configuration files declared in the system and merges them all together by appending all nodes.

As a general rule, the area specific `di.xml` files should configure dependencies for the presentation layer, and your module's global `di.xml` file should configure the remaining dependencies.

The application loads the configuration in the following stages:

1. Initial (`app/etc/di.xml`)
1. Global (`<moduleDir>/etc/di.xml`)
1. Area-specific (`<moduleDir>/etc/<area>/di.xml`)

The areas are:

*  adminhtml
*  frontend
*  graphql
*  webapi_rest
*  webapi_soap
*  crontab

During [bootstrapping](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/setup/initialization), each application entry point loads the appropriate `di.xml` files for the requested [area](/architecture/modules/areas/).

**Examples:**

In `index.php`, the [`\Magento\Framework\App\Http`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/App/Http.php) class loads the area based on the front-name provided in the URL.

```php
$areaCode = $this->_areaList->getCodeByFrontName($this->_request->getFrontName());
$this->_state->setAreaCode($areaCode);
$this->_objectManager->configure($this->_configLoader->load($areaCode));
```

In `static.php`, the [`\Magento\Framework\App\StaticResource`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/App/StaticResource.php) class also loads the area based on the URL in the request.

```php
$path = $this->request->get('resource');
$params = $this->parsePath($path);
$this->state->setAreaCode($params['area']);
$this->objectManager->configure($this->configLoader->load($params['area']));
```

In `cron.php`, the [`\Magento\Framework\App\Cron`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/App/Cron.php) class always loads the `crontab` area.

```php
$this->_state->setAreaCode(Area::AREA_CRONTAB);
$configLoader = $this->objectManager->get(\Magento\Framework\ObjectManager\ConfigLoaderInterface::class);
$this->objectManager->configure($configLoader->load(Area::AREA_CRONTAB));
```

## Type configuration

Type configurations describe an object's lifestyle and how to instantiate it.

You can configure the type in your `di.xml` configuration node in the following ways:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <virtualType name="moduleConfig" type="Magento\Core\Model\Config">
        <arguments>
            <argument name="type" xsi:type="string">system</argument>
        </arguments>
    </virtualType>
    <type name="Magento\Core\Model\App">
        <arguments>
            <argument name="config" xsi:type="object">moduleConfig</argument>
        </arguments>
    </type>
</config>
```

The preceding example declares the following types:

*  `moduleConfig`: A virtual type that extends the type `Magento\Core\Model\Config`.
*  `Magento\Core\Model\App`: All instances of this type receive an instance of `moduleConfig` as a dependency.

### Virtual types

A virtual type allows you to change the arguments of a specific injectable dependency and change the behavior of a particular class.
This allows you to use a customized class without affecting other classes that have a dependency on the original.

The example creates a virtual type for `Magento\Core\Model\Config` and specifies `system` as the constructor argument for `type`.

## Constructor arguments

You can configure the class constructor arguments in your `di.xml` in the argument node.
The object manager injects these arguments into the class during creation.
The name of the argument configured in the XML file must correspond to the name of the parameter in the constructor in the configured class.

The following example creates instances of `Magento\Core\Model\Session` with the class constructor argument `$sessionName` set to a value of `adminhtml`:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Core\Model\Session">
        <arguments>
            <argument name="sessionName" xsi:type="string">adminhtml</argument>
        </arguments>
    </type>
</config>
```

### Argument types

`object`

Node Formats:

`<argument xsi:type="object">{typeName}</argument>`
`<argument xsi:type="object" shared="{shared}">{typeName}</argument>`

Creates an instance of `typeName` type and passes it in as an argument.
You can pass any class name, interface name, or virtual type as `typeName`.

Setting the `shared` property defines the lifestyle of a created instance.
See [object lifestyle configuration](#object-lifestyle-configuration).

---

`string`

Node Formats:

`<argument xsi:type="string">{strValue}</argument>`
`<argument xsi:type="string" translate="true">{strValue}</argument>`

The application interprets any value for this argument node as a string.

---

`boolean`

Node Format:

`<argument xsi:type="boolean">{boolValue}</argument>`

The application converts any value for this argument node into a boolean value.
See table below:

| Input Type | Data     | Boolean Value |
| --- | --- | --- |
| Boolean    | true     | true          |
| Boolean    | false    | false         |
| String     | "true"*  | true          |
| String     | "false"* | false         |
| String     | "1"      | true          |
| String     | "0"      | false         |
| Integer    | 1        | true          |
| Integer    | 0        | false         |

<small>*These String literals are case-sensitive</small>

---

`number`

Node Format:

`<argument xsi:type="number">{numericValue}</argument>`

Acceptable values for this type include: integers, floats, or [numeric strings](https://www.php.net/is_numeric).

---

`init_parameter`

Node Format:

`<argument xsi:type="init_parameter">{Constant::NAME}</argument>`

This is the global application initialization argument represented by `Constant::NAME`.

---

`const`

Node Format:

`<argument xsi:type="const">{Constant::NAME}</argument>`

This is the constant value represented by `Constant::NAME`.

---

`null`

Node Format:

`<argument xsi:type="null"/>`

This indicates a null value.

---

`array`

Node Format:

The node format is as follows:

  ```xml
  <argument xsi:type="array">
    <item name="someKey" xsi:type="<type>">someVal</item>
  </argument>
  ```

  The application builds an array with elements corresponding to the items and passes it as the argument.
  The array can contain an infinite number of items, and each array item can be of any object type including an array itself.

  When the application merges the configuration files for a given scope, array arguments with the same name get merged into a new array.

  When the application loads a new configuration at a later time, either by a more specific scope or through code, then any array definitions in the new configuration will replace the loaded config instead of merging.

---

**Argument Examples:**

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Example\Type">
        <arguments>
            <!-- Pass simple string -->
            <argument name="stringParam" xsi:type="string">someStringValue</argument>
            <!-- Pass instance of Magento\Some\Type -->
            <argument name="instanceParam" xsi:type="object">Magento\Some\Type</argument>
            <!-- Pass true -->
            <argument name="boolParam" xsi:type="boolean">1</argument>
            <!-- Pass 1 -->
            <argument name="intParam" xsi:type="number">1</argument>
            <!-- Pass application init argument, named by constant value -->
            <argument name="globalInitParam" xsi:type="init_parameter">Magento\Some\Class::SOME_CONSTANT</argument>
            <!-- Pass constant value -->
            <argument name="constantParam" xsi:type="const">Magento\Some\Class::SOME_CONSTANT</argument>
            <!-- Pass null value -->
            <argument name="optionalParam" xsi:type="null"/>
            <!-- Pass array -->
            <argument name="arrayParam" xsi:type="array">
                <!-- First element is value of constant -->
                <item name="firstElem" xsi:type="const">Magento\Some\Class::SOME_CONSTANT</item>
                <!-- Second element is null -->
                <item name="secondElem" xsi:type="null"/>
                <!-- Third element is a subarray -->
                <item name="thirdElem" xsi:type="array">
                    <!-- Subarray contains scalar value -->
                    <item name="scalarValue" xsi:type="string">ScalarValue</item>
                    <!-- and application init argument -->
                    <item name="globalArgument " xsi:type="init_parameter">Magento\Some\Class::SOME_CONSTANT</item>
                </item>
            </argument>
        </arguments>
    </type>
</config>
```

<InlineAlert variant="warning" slots="text"/>

**Arguments on different stages**—Configuration arguments are merged when they are declared on the same stage (Initial, Global, or Area-Specifc). If you declare new arguments on a higher stage, like Area-Specific, the arguments declared on the higher stage will replace the existing ones.

<InlineAlert variant="info" slots="text"/>

**Merging and Arguments**—During merging, arguments replace other arguments with the same name if their type is different.
If the argument type is the same, then the newer argument replaces the old one.

### Abstraction-implementation mappings

The object manager uses abstraction-implementation mappings when the constructor signature of a class requests an object by its interface.
The object manager uses these mappings to determine what the default implementation is for that class for a particular scope.

The `preference` node specifies the default implementation:

```xml
<!--  File: app/etc/di.xml -->
<config>
    <preference for="Magento\Framework\UrlInterface" type="Magento\Framework\Url" />
</config>
```

This mapping is in `app/etc/di.xml`, so the object manager injects the `Magento\Framework\Url` implementation class wherever there is a request for the `Magento\Framework\UrlInterface` in the global scope.

```xml
<!-- File: app/code/Magento/Backend/etc/adminhtml/di.xml -->
<config>
    <preference for="Magento\Framework\UrlInterface" type="Magento\Backend\Model\UrlInterface" />
</config>
```

This mapping is in `app/code/Magento/Backend/etc/adminhtml/di.xml`, so the object manager injects the `Magento\Backend\Model\UrlInterface` implementation class wherever there is a request for the `Magento\Framework\UrlInterface` in the admin area.

### Override a method using 'preference' nodes

If you want to override a public or protected method from a core class, utilize the `preference` node from `di.xml` to achieve it.
Here is an example of overriding a method from a core file:

```xml
<!-- app/code/ExampleCorp/OverrideExample/etc/di.xml -->
<config  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <preference for="Magento\Checkout\Block\Onepage\Success" type="ExampleCorp\OverrideExample\Block\Onepage\Success" />
</config>
```

The example below overrides the `isVisible` method from the `Magento\Checkout\Block\Onepage\Success` block class.

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace ExampleCorp\OverrideExample\Block\Onepage;

use Magento\Checkout\Block\Onepage\Success as MagentoSuccess;
use Magento\Framework\View\Element\Template\Context;
use Magento\Checkout\Model\Session;
use Magento\Sales\Model\Order\Config;
use Magento\Framework\App\Http\Context as HttpContext;

class Success extends MagentoSuccess
{
    /**
     * Constructor Modification
     *
     * @param Context $context
     * @param Session $checkoutSession
     * @param Config $orderConfig
     * @param HttpContext $httpContext
     * @param array $data
     */
    public function __construct(
        Context $context,
        Session $checkoutSession,
        Config $orderConfig,
        HttpContext $httpContext,
        array $data = []
    ) {
        parent::__construct(
            $context,
            $checkoutSession,
            $orderConfig,
            $httpContext,
            $data
        );
    }

    /**
     * Is order visible
     *
     * @param Order $order
     * @return bool
     */
    protected function isVisible(Order $order)
    {
        # Write your custom logic here.
        return !in_array(
            $order->getStatus(),
            $this->_orderConfig->getInvisibleOnFrontStatuses()
        );
    }
}
```

<InlineAlert variant="warning" slots="text"/>

Overriding a method is not recommended because it can cause conflicts in the system and increase the complexity to upgrade. Consider other extensibility options, such as `event observers` and `plugins`, when possible.

### Parameter configuration inheritance

Parameters configured for a class type pass on its configuration to its descendant classes.
Any descendant can override the parameters configured for its supertype; that is, the parent class or interface:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Framework\View\Element\Context">
        <arguments>
            <argument name="urlBuilder" xsi:type="object">Magento\Framework\Url</argument>
        </arguments>
    </type>
    <type name="Magento\Backend\Block\Context">
        <arguments>
            <argument name="urlBuilder" xsi:type="object">Magento\Backend\Model\Url</argument>
        </arguments>
    </type>
</config>
```

In the preceding example, [`Magento\Backend\Block\Context`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Backend/Block/Context.php) is a descendant of [`Magento\Framework\View\Element\Context`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/View/Element/Context.php).

The first entry configures all instances of `Magento\Framework\View\Element\Context` as well as its children to pass in [`Magento\Framework\Url`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Url.php) as `$urlBuilder` in their constructors.

The second entry overrides this and configures all instances of `Magento\Backend\Block\Context` to use [`Magento\Backend\Model\Url`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Backend/Model/Url.php) as the `$urlBuilder` instead.

## Object lifestyle configuration

The lifestyle of an object determines the number of instances that can exist of that object.

You can configure dependencies in Adobe Commerce and Magento Open Source to have the following lifestyles:

*  **Singleton**(default) - One instance of this class exists. The object manager creates it at the first request. Requesting the class again returns the same instance. Disposing or ending the container registered to it releases the instance.
*  **Transient** - The object manager creates a new instance of the class for every request.

The `shared` property determines the lifestyle of both `argument` and `type` configurations.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Filesystem" shared="false">
        <arguments>
            <argument name="adapter" xsi:type="object" shared="false">Magento\Filesystem\Adapter\Local</argument>
        </arguments>
    </type>
</config>
```

In this example `Magento\Filesystem` is not shared, so all clients will retrieve separate instances of `Magento\Filesystem`.
Also, every instance of `Magento\Filesystem` will get separate instance of `$adapter`, because it is non-shared too.

## Sensitive and system-specific configuration settings

For multi-system deployments, such as the [pipeline deployment model](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/deployment/overview), you can specify the following types of configuration settings:

| | |
|-----------------|----------------------------|
| shared          | Settings that are shared between systems using `app/etc/config.php` |
| sensitive       | Settings that are restricted or confidential                        |
| system-specific | Settings that are unique to a particular system or environment      |

The following code sample is a template for specifying values as sensitive or system-specific:

```xml
<type name="Magento\Config\Model\Config\TypePool">
   <arguments>
      <argument name="VALUE_TYPE" xsi:type="array">
         <item name="CONFIG_PATH" xsi:type="string">ARGUMENT_VALUE</item>
      </argument>
   </arguments>
</type>
```

|                  |                                                                                                                                                                |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `VALUE_TYPE`     | Specifies the type of value: either `sensitive` or `environment`.                                                                                              |
| `CONFIG_PATH`    | A unique, `/`-delimited string that identifies this configuration setting.                                                                                     |
| `ARGUMENT_VALUE` | A value of `1` indicates the `CONFIG_PATH` value is sensitive or system-specific. The default `0` value indicates it is neither sensitive nor system specific. |

Do not share sensitive or system-specific settings stored in `app/etc/env.php` between development and production systems.

See [sensitive and environment settings](../configuration/sensitive-environment-settings.md) for more information and examples.

### Information related to pipeline deployment

*  [Guidelines for specifying system-specific and sensitive configuration values](../configuration/sensitive-environment-settings.md)
*  [Sensitive and system-specific configuration paths reference](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/paths/config-reference-sens)
*  [Adobe Commerce B2B Extension configuration paths reference](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/paths/config-reference-b2b)

## Get dependency injection configuration information for a class

Use the [dev:di:info](https://experienceleague.adobe.com/en/docs/commerce-operations/tools/cli-reference/commerce-on-premises#devdiinfo) command to retrieve information about dependency injection configuration for a class. The following example retrieves the dependency injection configuration information for the `Magento\Quote\Model\Quote\Item\ToOrderItem` class:

```bash
bin/magento dev:di:info "Magento\Quote\Model\Quote\Item\ToOrderItem"
```

```terminal
DI configuration for the class Magento\Quote\Model\Quote\Item\ToOrderItem in the GLOBAL area

Preference: Magento\Quote\Model\Quote\Item\ToOrderItem

Constructor Parameters:
+-------------------+--------------------------------------------------+------------------+
| Name              | Requested Type                                   | Configured Value |
+-------------------+--------------------------------------------------+------------------+
| orderItemFactory  | Magento\Sales\Api\Data\OrderItemInterfaceFactory |                  |
| objectCopyService | Magento\Framework\DataObject\Copy                |                  |
| dataObjectHelper  | Magento\Framework\Api\DataObjectHelper           |                  |
+-------------------+--------------------------------------------------+------------------+

Plugins:
+-----------------------------------------------------+---------+--------+
| Plugin                                              | Method  | Type   |
+-----------------------------------------------------+---------+--------+
| Magento\Catalog\Model\Plugin\QuoteItemProductOption | convert | before |
| Magento\GiftMessage\Model\Plugin\QuoteItem          | convert | after  |
| Magento\Bundle\Model\Plugin\QuoteItem               | convert | after  |
+-----------------------------------------------------+---------+--------+

Plugins for the Preference:
+-----------------------------------------------------+---------+--------+
| Plugin                                              | Method  | Type   |
+-----------------------------------------------------+---------+--------+
| Magento\Catalog\Model\Plugin\QuoteItemProductOption | convert | before |
| Magento\GiftMessage\Model\Plugin\QuoteItem          | convert | after  |
| Magento\Bundle\Model\Plugin\QuoteItem               | convert | after  |
+-----------------------------------------------------+---------+--------+
```
