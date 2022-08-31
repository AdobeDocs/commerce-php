---
title: Payment method facade
description: Process payment actions between Adobe Commerce Sales Management and payment processor
---

# Payment method facade

Payment facade it is an instance of [Payment Adapter](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Model/Method/Adapter.php) configured with virtual types and allows you to process payment actions between Adobe Commerce Sales Management and payment processor.

Add the [dependency injection (DI)](../../components/dependency-injection.md) configuration for [payment method](https://glossary.magento.com/payment-method) facade in your `%Vendor_Module%/etc/di.xml`.

The following sample is an illustration of such configuration ([app/code/Magento/Braintree/etc/di.xml](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml)):

```xml
<virtualType name="BraintreeFacade" type="Magento\Payment\Model\Method\Adapter">
    <arguments>
        <argument name="code" xsi:type="const">Magento\Braintree\Model\Ui\ConfigProvider::CODE</argument>
        <argument name="formBlockType" xsi:type="string">Magento\Braintree\Block\Form</argument>
        <argument name="infoBlockType" xsi:type="string">Magento\Braintree\Block\Info</argument>
        <argument name="valueHandlerPool" xsi:type="object">BraintreeValueHandlerPool</argument>
        <argument name="validatorPool" xsi:type="object">BraintreeValidatorPool</argument>
        <argument name="commandPool" xsi:type="object">BraintreeCommandPool</argument>
    </arguments>
</virtualType>
```

The following arguments must be configured (all arguments are mandatory):

| Option           | Description                                                                                                                                                                                                                                                                                                                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`           | Payment method's code.                                                                                                                                                                                                                                                                                                                                                                           |
| `formBlockType`  | Name of the block class responsible for payment provider gateway form rendering. This block is used in the Admin panel only, because on the storefront the form is rendered using knockout.js. See the [Admin integration](formblocktype.md) topic for details.                                                                          |
| `infoBlockType`  | Name of the block class responsible for Transaction/Payment Information details rendering in Order block in Admin panel or customer account on storefront. In most cases it will be enough to specify the default implementation of [Configurable Info](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Block/ConfigurableInfo.php), but for customizations you can specify your own implementation. |
| `valueHandlerPool` | Pool of value handlers used for queries to configuration. For details see the [following paragraph](#value-handlers-pool).                                                                                                                                                                                                                                                                         |
| `validatorPool`    | [Pool of validators](#validators-pool).                                                                                                                                                                                                                                                                                            |
| `commandPool`      | [Pool of gateway commands](../payment-gateway/command-pool.md).                                                                                                                                                                                                                                                                                                                     |

#### Value handlers pool

Let's look closer at the value handlers pool of a payment method. This pool enables you to set payment configuration that is based on certain conditions.

For example, the `can_void` configuration option might depend on payment transaction status or paid amount. The following sample shows how to set the corresponding configuration ([app/code/Magento/Braintree/etc/di.xml](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/etc/di.xml)):

```xml
<virtualType name="BraintreeValueHandlerPool" type="Magento\Payment\Gateway\Config\ValueHandlerPool">
    <arguments>
        <argument name="handlers" xsi:type="array">
            <item name="default" xsi:type="string">BraintreeConfigValueHandler</item>
            <item name="can_void" xsi:type="string">Magento\Braintree\Gateway\Config\CanVoidHandler</item>
            <item name="can_cancel" xsi:type="string">Magento\Braintree\Gateway\Config\CanVoidHandler</item>
        </argument>
    </arguments>
</virtualType>
```

Pay attention, that you must always specify the default handler. In the example it is config reader for Braintree:

```xml
<virtualType name="BraintreeConfigValueHandler" type="Magento\Payment\Gateway\Config\ConfigValueHandler">
    <arguments>
        <argument name="configInterface" xsi:type="object">Magento\Braintree\Gateway\Config\Config</argument>
    </arguments>
</virtualType>
```

In your configuration you can use default [Magento\Payment\Gateway\Config\Config](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Config/Config.php). Or you can add a custom config interface. It must implement the `Magento\Payment\Gateway\ConfigInterface` interface.

`Magento\Payment\Gateway\Config\Config` can read configuration by payment method code, so is useful to use it or extend it for your own purposes.

And [Magento\Braintree\Gateway\Config\Config](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/Gateway/Config/Config.php) reads
configuration from database or payment config file.

Other handlers contain some logic, for example, `can_cancel` option is the same as `can_void` and depends on whether the order has paid amount (invoiced).

Your custom handlers must implement the [Value Handler interface](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Config/ValueHandlerInterface.php).

#### Validators pool

You can configure the pool of validators, which allows processing various payment method validations. Below are the examples of such validators:

-  `country` — checks if billing country is allowed for the payment method
-  `currency` — checks if the selected currency is allowed for the payment method
-  `availability` — checks if the payment method is available
-  `global` — the validation that is called before placing an order

A custom validator should implement the `\Magento\Payment\Gateway\Validator\ValidatorInterface`. In the most cases, it is enough
to extend the `\Magento\Payment\Gateway\Validator\AbstractValidator` and create an implementation of the `validate` method:

```php
class CountryValidator extends AbstractValidator
{
    /**
     * @inheritdoc
     */
    public function validate(array $validationSubject)
    {
        $isValid = true;
        $storeId = $validationSubject['storeId'];

        if ((int)$this->config->getValue('allowspecific', $storeId) === 1) {
            $availableCountries = explode(
                ',',
                $this->config->getValue('specificcountry', $storeId)
            );

            if (!in_array($validationSubject['country'], $availableCountries)) {
                $isValid =  false;
            }
        }

        return $this->createResult($isValid);
    }
}
```

Then, the newly created validator needs to be added to the global pool of validators:

```xml
<virtualType name="BraintreeValidatorPool" type="Magento\Payment\Gateway\Validator\ValidatorPool">
    <arguments>
        <argument name="validators" xsi:type="array">
            <item name="country" xsi:type="string">Magento\Braintree\Gateway\Validator\CountryValidator</item>
        </argument>
    </arguments>
</virtualType>
```
