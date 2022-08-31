---
title: Vault DI configuration
description: Configure vault payment method and create payment actions
---

# Vault DI configuration

This section describes how to configure vault [payment method](https://glossary.magento.com/payment-method) and create payment actions, like authorize, and sale (authorize & capture).

## Add vault payment facade

To add a payment facade for the vault payment, create a [virtual type](../../build/dependency-injection-file.md#virtual-types). In the most cases, it will extend [`Magento\Vault\Model\Method\Vault`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Vault/Model/Method/Vault.php) that is the default implementation of [`Magento\Vault\Model\VaultPaymentInterface`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Vault/Model/VaultPaymentInterface.php):

Example of the vault payment facade configuration for Braintree:

```xml
<virtualType name="BraintreeCreditCardVaultFacade" type="Magento\Vault\Model\Method\Vault">
    <arguments>
        <argument name="config" xsi:type="object">BraintreeVaultPaymentConfig</argument>
        <argument name="valueHandlerPool" xsi:type="object">BraintreeVaultPaymentValueHandlerPool</argument>
        <argument name="vaultProvider" xsi:type="object">BraintreeFacade</argument>
        <argument name="code" xsi:type="const">Magento\Braintree\Model\Ui\ConfigProvider::CC_VAULT_CODE</argument>
    </arguments>
</virtualType>
```

This [virtual type](https://glossary.magento.com/virtual-type) is similar to the [payment method facade](../base-integration/facade-configuration.md). The main difference is the `vaultProvider` argument. As the Vault payment in the general case is a proxy, the specific payment provider must be specified.

## Extend payment method configuration

To enable vault usage for the payment method, set the `can_authorize_vault` option in the [method's configuration](../base-integration/payment-option-config.md).

Following is an example from Braintree configuration:

```xml
<payment>
    <braintree>
        <model>BraintreeFacade</model>
        <title>Credit Card (Braintree)</title>
        ...
        <can_authorize_vault>1</can_authorize_vault>
        ...
    </braintree>
</payment>
```

## Add a gateway command for vault

For payment actions, you need to create gateway commands for vault, and update the payment provider [command pool](../payment-gateway/command-pool.md).

All available commands you can find in the [VaultPaymentInterface](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Vault/Model/VaultPaymentInterface.php)

Example: a gateway command for the authorize action is added for the Braintree vault

```xml
<virtualType name="BraintreeVaultAuthorizeCommand" type="Magento\Payment\Gateway\Command\GatewayCommand">
    <arguments>
        <argument name="requestBuilder" xsi:type="object">BraintreeVaultAuthorizeRequest</argument>
        <argument name="transferFactory" xsi:type="object">Magento\Braintree\Gateway\Http\TransferFactory</argument>
        <argument name="client" xsi:type="object">Magento\Braintree\Gateway\Http\Client\TransactionSale</argument>
        <argument name="handler" xsi:type="object">BraintreeVaultResponseHandler</argument>
        <argument name="validator" xsi:type="object">Magento\Braintree\Gateway\Validator\ResponseValidator</argument>
        <argument name="errorMessageMapper" xsi:type="object">Magento\Braintree\Gateway\ErrorMapper\VirtualErrorMessageMapper</argument>
    </arguments>
</virtualType>
```

This command is similar to the payment provider authorize command. But it uses own [request builders](../payment-gateway/request-builder.md) and [response handlers](../payment-gateway/response-handler.md).

The following sample from Braintree configuration illustrates how to add the `authorize` payment action to command pool:

```xml
<virtualType name="BraintreeCommandPool" type="Magento\Payment\Gateway\Command\CommandPool">
    <arguments>
        <argument name="commands" xsi:type="array">
            <item name="authorize" xsi:type="string">BraintreeAuthorizeCommand</item>
            ...
            <item name="vault_authorize" xsi:type="string">BraintreeVaultAuthorizeCommand</item>
        </argument>
    </arguments>
</virtualType>
```

## Add command manager

You also need to create a command manager for vault. It is configured with the payment integration command pool and allows performing payment commands in any place of code.

Example of adding a command manager for Braintree vault:

```xml
<virtualType name="BraintreeCommandManager" type="Magento\Payment\Gateway\Command\CommandManager">
    <arguments>
        <argument name="commandPool" xsi:type="object">BraintreeCommandPool</argument>
    </arguments>
</virtualType>
```

Command manager must be added to the command manager pool. This pool is available for vault instance and enables performing payment provider actions.

There are two ways to add command manager to the pool:

*  Add to default `CommandManagerPool` implementation. Example:

```xml
<type name="Magento\Payment\Gateway\Command\CommandManagerPool">
    <arguments>
        <argument name="executors" xsi:type="array">
            <item name="braintree" xsi:type="string">BraintreeCommandManager</item>
        </argument>
    </arguments>
</type>
```

*  Create custom command manager pool. Example:

```xml
<virtualType name="BraintreeCcVaultCommandManagerPool" type="Magento\Payment\Gateway\Command\CommandManagerPool">
    <arguments>
        <argument name="executors" xsi:type="array">
            <item name="braintree" xsi:type="string">BraintreeCommandManager</item>
        </argument>
    </arguments>
</virtualType>

<virtualType name="BraintreeCreditCardVaultFacade" type="Magento\Vault\Model\Method\Vault">
    <arguments>
        ...
        <argument name="commandManagerPool" xsi:type="object">BraintreeCcVaultCommandManagerPool</argument>
    </arguments>
</virtualType>
```

In the first case, this pool can be used in any [module](https://glossary.magento.com/module) to perform vault payment commands. In the second case, only specific vault payment integration can use this pool.

You can use the samples as templates for your command manager configuration. You only need to change the Braintree-related names to your custom ones.
