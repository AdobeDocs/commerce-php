---
title: Add payment method to checkout | Commerce PHP Extensions
description: Follow this tutorial to create a custom payment method in the Adobe Commerce and Magento Open Source checkout experience.
---

# Add a custom payment method to checkout

Out of the box, checkout consists of two steps:

-  Shipping Information
-  Review and Payment Information

On the Review and Payment Information step the enabled payment methods are rendered. This topic describes how to add your custom payment method to this list.

To implement a payment method rendering in checkout, you need to take the following steps:

1. [Create the `.js` file implementing the component (payment method renderer).](#step-1-create-the-js-component-file)
1. [Create the `.js` component registering the payment method renderer.](#step-2-create-the-js-component-that-registers-the-renderer)
1. [Create a template for the payment method renderer.](#step-3-create-the-template-for-the-payment-method-component)
1. [Declare the new payment in the checkout page layout.](#step-4-declare-the-payment-method-in-layout)

## Step 1: Create the .js component file

Your payment method renderer must be implemented as a UI component. For the sake of compatibility, upgradability and easy maintenance, do not edit the default application code, add your customizations in a separate module. For your checkout customization to be applied correctly, your custom module should depend on the `Magento_Checkout` module. Module dependencies are specified in the [module's `composer.json`](../../../development/build/composer-integration.md).

Do not use `Ui` for your custom module name, because `%Vendor%_Ui` notation, required when specifying paths, might cause issues.

In your custom module directory create the component's `.js` file (payment method renderer). It must be located under the `<your_module_dir>/view/frontend/web/js/view/` directory. For example in the modules, the payment methods renderers are stored in the `<Magento_module_dir>/view/frontend/web/js/view/payment/method-renderer/` directory.

Usually, your component will extend the default payment method component (default payment method renderer) implemented in the `<Magento_Checkout_module_dir>/view/frontend/web/js/view/payment/default.js` file. The following table contains the list of the `default` component's methods.

|Method|Description|
|--- |--- |
|`getCode():string`|Returns the code of the payment method|
|`getData():object`|Returns an object with the payment data to be sent to the server on selecting a payment method and/or an extension (on pressing Continue button). It must contain data according to \Magento\Quote\Api\Data\PaymentInterface. All the payment information except the method code and purchase order number is passed in the additional_data field.|
|`placeOrder():bool`|Places an order if all validations passed.|
|`selectPaymentMethod():bool`|Adds information about the payment method selected by the user to the Quote JS object.|
|`isChecked():string`|Returns the code of the selected payment method.|
|`isRadioButtonVisible():bool`|Returns true if only one payment method is available.|
|`getTitle():string`|Returns the payment method title.|
|`validate():bool`|Used in the placeOrder() method. So you can override validate() in your module, and this validation will be performed in the scope of placeOrder().|
|`getBillingAddressFormName():string`|Gets the unique billing address name.|
|`disposeSubscriptions()`|Terminates the object's subscription.|

The general view of the payment method renderer is the following:

```js
define(
    [
        'Magento_Checkout/js/view/payment/default'
    ],
    function (Component) {
        'use strict';
        return Component.extend({
            defaults: {
                template: '%path to template%'
            },
            // add required logic here
        });
    }
);
```

If your payment method requires credit cards information, you might use the application renderer implementing a credit card form: [`<Magento_Payment_module_dir>/view/frontend/web/js/view/payment/cc-form.js`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Payment/view/frontend/web/js/view/payment/cc-form.js). It also extends the default payment renderer, but has the following own methods:

|Method|Description|
|--- |--- |
|`getData():object`|Returns an object with the payment data to be sent to the server on selecting a payment method and/or an extension (on pressing Continue button). It must contain data according to \Magento\Quote\Api\Data\PaymentInterface. All the payment information except the method code and purchase order number is passed in the additional_data field. Adds credit card data (type, issue date, number, CVV).|
|`getCcAvailableTypes():array`|Returns the list of available credit card types.|
|`getIcons():bool`|Returns links to the images for available credit card types.|
|`getCcMonths():object`|Retrieves the month of the credit card expiration date.|
|`getCcYears():object`|Retrieves the year of the credit card expiration date.|
|`hasVerification():bool`|A flag that shows if the credit card CVV number is required for this payment.|
|`hasSsCardType():bool`|Returns true if the Solo and Switch (Maestro) card types are available.|
|`getCvvImageUrl():string`|Retrieves the CVV tooltip image URL.|
|`getCvvImageHtml():string`|Retrieves the CVV tooltip image HTML.|
|`getSsStartYears():object`|Solo or Switch (Maestro) card start year.|

### Access the system config data

Your payment method might need to get data that cannot be defined in layout configuration, JS components or templates directly, for example, data from the application system config.
This configuration is stored in the `window.checkoutConfig` variable that is defined in root checkout template.

In order to get access to the system configuration, your payment method or a group of payment methods has to implement the [`\Magento\Checkout\Model\ConfigProviderInterface`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Checkout/Model/ConfigProviderInterface.php) interface, and the class implementing it must be injected to the composite config provider via DI frontend configuration. The following code samples illustrate this.

This is a sample `.php` file implementing `\Magento\Checkout\Model\ConfigProviderInterface`:

```php?start_inline=1
class MyCustomPaymentConfigProvider implements \Magento\Checkout\Model\ConfigProviderInterface
{
...
    public function getConfig()
    {
        return [
            // 'key' => 'value' pairs of configuration
        ];
    }
...
}
```

Here is the associated sample DI configuration file of a custom module `<your_module_dir>/etc/frontend/di.xml`:

```xml
...
<type name="Magento\Checkout\Model\CompositeConfigProvider">
    <arguments>
        <argument name="configProviders" xsi:type="array">
            ...
            <item name="%Custom_provider_name%" xsi:type="object">MyCustomPaymentConfigProvider</item>
            ...
        </argument>
    </arguments>
...
</type>
```

### Add other payment-related features

You can also add payment-related features (like reward points, gift registry, an so on) to the Review and Payment Information checkout step. They must be implemented as UI components as well, and can be displayed before or after the list of payment methods. This is configured in the [checkout page layout file correspondingly](#step-4-declare-the-payment-method-in-layout).

## Step 2: Create the .js component that registers the renderer

In your custom module directory create the `.js` UI component that registers the payment method renderer in the renderers list. It must be located under the `<your_module_dir>/view/frontend/web/js/view/` directory. For example in the modules, the payment methods renderers are stored in the `<Magento_module_dir>/view/frontend/web/js/view/payment/` directory.

The file content must be similar to the following:

```js
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: '%payment_method_code%',
                component: '%js_renderer_component%'
            },
            // other payment method renderers if required
        );
        /** Add view logic here if needed */
        return Component.extend({});
    }
);
```

If your module adds several payment methods, you can register all payment methods renderers in one file.

## Step 3: Create the template for the payment method component

In your custom module directory create a new `<your_module_dir>/view/frontend/web/template/<your_template>.html` file. The template can use [Knockout JS](http://knockoutjs.com/) syntax. You can find a sample `.html` template in any module implementing payment methods, for example the Paypal module.

The template for rendering the Paypal Express payment method in checkout is [`<Magento_Paypal_module_dir>/frontend/web/template/payment/paypal-express.html`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Paypal/view/frontend/web/template/payment/paypal-express.html).

## Step 4: Declare the payment method in layout

In your custom module directory, create a new `<your_module_dir>/view/frontend/layout/checkout_index_index.xml` file. In this file, add the following:

```xml
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="checkout.root">
            <arguments>
                <argument name="jsLayout" xsi:type="array">
                    <item name="components" xsi:type="array">
                        <item name="checkout" xsi:type="array">
                            <item name="children" xsi:type="array">
                                <item name="steps" xsi:type="array">
                                    <item name="children" xsi:type="array">
                                        <item name="billing-step" xsi:type="array">
                                            <item name="component" xsi:type="string">uiComponent</item>
                                            <item name="children" xsi:type="array">
                                                <item name="payment" xsi:type="array">
                                                    <item name="children" xsi:type="array">
                                                        <!-- Declare additional before payment components. START -->
                                                        <item name="beforeMethods" xsi:type="array">
                                                            <item name="component" xsi:type="string">uiComponent</item>
                                                            <item name="displayArea" xsi:type="string">beforeMethods</item>
                                                            <item name="children" xsi:type="array">
                                                                <item name="%your_feature_name%" xsi:type="array">
                                                                    <item name="component" xsi:type="string">%path/to/your/feature_js_component%</item>
                                                                </item>
                                                            </item>
                                                        </item>
                                                        <!-- Declare additional before payment components. END -->
                                                        <!-- Declare the payment method (the component that registrates in the list). START -->
                                                        <item name="renders" xsi:type="array">
                                                            <item name="children" xsi:type="array">
                                                                <item name="%group name of the payment methods%" xsi:type="array">
                                                                    <!-- Example of value: Magento_Paypal/view/frontend/web/js/view/payment-->
                                                                    <item name="component" xsi:type="string">%component_that_registers_payment_renderer%</item>
                                                                    <item name="methods" xsi:type="array">

                                                                        <!-- Add this if your payment method requires entering a billing address-->
                                                                        <item name="%payment_method_code%" xsi:type="array">
                                                                            <item name="isBillingAddressRequired" xsi:type="boolean">true</item>
                                                                        </item>
                                                                    </item>
                                                                </item>
                                                            </item>
                                                        </item>
                                                        <!-- Declare the payment method (the component that registrates in the list). END -->

                                                        <!-- Declare additional after payment components. START -->
                                                        <item name="afterMethods" xsi:type="array">
                                                            <item name="component" xsi:type="string">uiComponent</item>
                                                            <item name="displayArea" xsi:type="string">afterMethods</item>
                                                            <item name="children" xsi:type="array">
                                                                <item name="%your_feature_name%" xsi:type="array">
                                                                    <item name="component" xsi:type="string">%path/to/your/feature_js_component%</item>
                                                                </item>
                                                            </item>
                                                        </item>
                                                        <!-- Declare additional after payment components. END -->
                                                    </item>
                                                </item>
                                            </item>
                                        </item>
                                    </item>
                                </item>
                            </item>
                        </item>
                    </item>
                </argument>
            </arguments>
        </referenceBlock>
    </body>
</page>
```

## Step 5:Run CLI Commands

These steps are required in production mode only, not while in development mode.

1. Compile the code:

   ```bash
   bin/magento setup:di:compile
   ```

1. Deploy the static contents:

   ```bash
   bin/magento setup:static-content:deploy
   ```

1. Clean the cache:

   ```bash
   bin/magento cache:clean
   ```

For an illustration of `checkout_index_index.xml` where a new payment method is declared, view [app/code/Magento/Paypal/view/frontend/layout/checkout_index_index.xml](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Paypal/view/frontend/layout/checkout_index_index.xml)
