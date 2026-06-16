---
title: Add a Custom Shipping Carrier | Commerce PHP Extensions
description: Follow this tutorial to create a custom shipping carrier in the Adobe Commerce and Magento Open Source checkout experience.
contributor_name: Atwix
contributor_link: https://www.atwix.com/
keywords:
  - Checkout
  - Extensions
---

# Add a custom shipping carrier

This topic describes how to add a custom shipping carrier.

To add a new shipping carrier to the checkout:

1. [Create a new module](#step-1-create-a-new-module)
1. [Add the carrier configuration](#step-2-add-the-module-configuration)
1. [Create the carrier model](#step-3-create-the-carrier-model)
1. [Enable the module](#step-4-enable-the-module)

## Step 1: Create a new module

The example module for use here is `Vendor_CustomShipping`.

### Source code of `app/code/Vendor/CustomShipping/registration.php`

```php
<?php

declare(strict_types=1);

use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(
    ComponentRegistrar::MODULE,
    'Vendor_CustomShipping',
    __DIR__
);

```

### Source code of `app/code/Vendor/CustomShipping/composer.json`

```json
{
    "name": "vendor/module-custom-shipping",
    "description": "Custom shipping module",
    "require": {
        "php": "~7.4.0||~8.1.0",
        "magento/framework": "102.0.*",
        "magento/module-backend": "101.0.*",
        "magento/module-catalog": "103.0.*",
        "magento/module-config": "101.1.*",
        "magento/module-directory": "100.3.*",
        "magento/module-quote": "101.1.*",
        "magento/module-sales": "102.0.*",
        "magento/module-sales-rule": "101.1.*",
        "magento/module-shipping": "100.3.*",
        "magento/module-store": "101.0.*"
    },
    "type": "magento2-module",
    "license": [
        "OSL-3.0",
        "AFL-3.0"
    ],
    "autoload": {
        "files": [
            "registration.php"
        ],
        "psr-4": {
            "Vendor\\CustomShipping\\": ""
        }
    }
}
```

### Source code of `app/code/Vendor/CustomShipping/etc/module.xml`

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Vendor_CustomShipping"/>
</config>
```

## Step 2: Add the module configuration

To add a module configuration use the following source code snippets.

### Source code of `app/code/Vendor/CustomShipping/etc/adminhtml/system.xml`

The `system.xml` source code declares custom shipping module options:

-  Enabled
-  Title
-  Method Name
-  Shipping Cost
-  Ship to Applicable Countries
-  Ship to Specific Countries
-  Show Method if Not Applicable
-  Sort Order

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Config:etc/system_file.xsd">
    <system>
        <section id="carriers">
            <group id="customshipping" translate="label" type="text" sortOrder="0" showInDefault="1" showInWebsite="1" showInStore="1">
                <label>Custom Shipping Module</label>
                <field id="active" translate="label" type="select" sortOrder="10" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Enabled</label>
                    <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>
                </field>
                <field id="title" translate="label" type="text" sortOrder="20" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Title</label>
                </field>
                <field id="name" translate="label" type="text" sortOrder="30" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Method Name</label>
                </field>
                <field id="shipping_cost" translate="label" type="text" sortOrder="40" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Shipping Cost</label>
                    <validate>validate-number validate-zero-or-greater</validate>
                </field>
                <field id="sallowspecific" translate="label" type="select" sortOrder="50" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Ship to Applicable Countries</label>
                    <frontend_class>shipping-applicable-country</frontend_class>
                    <source_model>Magento\Shipping\Model\Config\Source\Allspecificcountries</source_model>
                </field>
                <field id="specificcountry" translate="label" type="multiselect" sortOrder="60" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Ship to Specific Countries</label>
                    <source_model>Magento\Directory\Model\Config\Source\Country</source_model>
                    <can_be_empty>1</can_be_empty>
                </field>
                <field id="showmethod" translate="label" type="select" sortOrder="70" showInDefault="1" showInWebsite="1" showInStore="1">
                    <label>Show Method if not applicable</label>
                    <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>
                    <frontend_class>shipping-skip-hide</frontend_class>
                </field>
                <field id="sort_order" translate="label" type="text" sortOrder="80" showInDefault="1" showInWebsite="1" showInStore="1" canRestore="1">
                    <label>Sort Order</label>
                </field>
            </group>
        </section>
    </system>
</config>
```

### Source code of `app/code/Vendor/CustomShipping/etc/config.xml`

The `config.xml` file specifies default values for custom shipping module options and the shipping module model, `Vendor\CustomShipping\Model\Carrier\Customshipping`:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Store:etc/config.xsd">
    <default>
        <carriers>
            <customshipping>
                <active>0</active>
                <title>Custom Shipping Title</title>
                <name>Custom Shipping Method Name</name>
                <shipping_cost>10</shipping_cost>
                <sallowspecific>0</sallowspecific>
                <sort_order>15</sort_order>
                <model>Vendor\CustomShipping\Model\Carrier\Customshipping</model>
            </customshipping>
        </carriers>
    </default>
</config>
```

## Step 3: Create the carrier model

In this example, the `Vendor\CustomShipping\Model\Carrier\Customshipping` class is a skeleton of a carrier model. You can extend it to fit your needs.

The carrier class implements the `CarrierInterface` interface and retrieves all available shipping methods in the `getAllowedMethods` function. The `collectRates` function returns the `\Magento\Shipping\Model\Rate\Result` object if the carrier method is available on checkout. Otherwise, it returns `false`---the carrier method is not applicable to the shopping cart.

### Source code of `app/code/Vendor/CustomShipping/Model/Carrier/Customshipping.php`

```php
<?php

declare(strict_types=1);

namespace Vendor\CustomShipping\Model\Carrier;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Quote\Model\Quote\Address\RateRequest;
use Magento\Quote\Model\Quote\Address\RateResult\Method;
use Magento\Quote\Model\Quote\Address\RateResult\MethodFactory;
use Magento\Quote\Model\Quote\Address\RateResult\ErrorFactory;
use Magento\Shipping\Model\Carrier\AbstractCarrier;
use Magento\Shipping\Model\Carrier\CarrierInterface;
use Magento\Shipping\Model\Rate\Result;
use Magento\Shipping\Model\Rate\ResultFactory;
use Psr\Log\LoggerInterface;

class Customshipping extends AbstractCarrier implements CarrierInterface
{
    protected $_code = 'customshipping';

    protected $_isFixed = true;

    private ResultFactory $rateResultFactory;

    private MethodFactory $rateMethodFactory;

    public function __construct(
        ScopeConfigInterface $scopeConfig,
        ErrorFactory $rateErrorFactory,
        LoggerInterface $logger,
        ResultFactory $rateResultFactory,
        MethodFactory $rateMethodFactory,
        array $data = []
    ) {
        parent::__construct($scopeConfig, $rateErrorFactory, $logger, $data);

        $this->rateResultFactory = $rateResultFactory;
        $this->rateMethodFactory = $rateMethodFactory;
    }

    /**
     * Custom Shipping Rates Collector
     *
     * @param RateRequest $request
     * @return \Magento\Shipping\Model\Rate\Result|bool
     */
    public function collectRates(RateRequest $request)
    {
        if (!$this->getConfigFlag('active')) {
            return false;
        }

        /** @var Method $method */
        $method = $this->rateMethodFactory->create();

        $method->setCarrier($this->_code);
        $method->setCarrierTitle($this->getConfigData('title'));

        $method->setMethod($this->_code);
        $method->setMethodTitle($this->getConfigData('name'));

        $shippingCost = (float) $this->getConfigData('shipping_cost');
        $method->setPrice($shippingCost);
        $method->setCost($shippingCost);

        /** @var Result $result */
        $result = $this->rateResultFactory->create();
        $result->append($method);

        return $result;
    }

    public function getAllowedMethods(): array
    {
        return [$this->_code => $this->getConfigData('name')];
    }
}
```

## Step 4: Enable the module

Run the commands below to register `Vendor_CustomShipping` module:

```bash
bin/magento module:enable Vendor_CustomShipping
```

## Screenshots

The backend settings for the custom shipping carrier appear as shown below.

![Custom shipping carrier backend settings](../../../images/tutorials/checkout-add-custom-carrier-01.png)

The custom shipping carrier will appear on checkout as shown below.

![Custom shipping carrier on checkout](../../../images/tutorials/checkout-add-custom-carrier-02.png)
