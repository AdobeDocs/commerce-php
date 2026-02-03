---
title: Token UI component provider
description: Learn how to create custom vault payment UI components that display stored tokens.
keywords:
  - Extensions
  - Integration
  - Payments
---

import Docs from '/src/_includes/braintree-note.md'

<Docs />

# Token UI component provider

This topic describes how to create custom vault payments UI components that are used to display stored tokens on checkout page and order placing using vault.

## Token component provider

The main logic for displaying tokens on checkout page is located in
[Vault TokensConfigProvider](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Vault/Model/Ui/TokensConfigProvider.php). You just need to create a token component provider. It should implement the
[TokenUiComponentProviderInterface](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Vault/Model/Ui/TokenUiComponentProviderInterface.php) interface:

```php
interface TokenUiComponentProviderInterface
{
    const COMPONENT_DETAILS = 'details';
    const COMPONENT_PUBLIC_HASH = 'publicHash';

    /**
     * @param PaymentTokenInterface $paymentToken
     * @return TokenUiComponentInterface
     */
    public function getComponentForToken(PaymentTokenInterface $paymentToken);
}
```

The basic implementation of the token UI component provider can be like following:

```php
class TokenUiComponentProvider implements TokenUiComponentProviderInterface
{
    /**
     * Get UI component for token
     * @param PaymentTokenInterface $paymentToken
     * @return TokenUiComponentInterface
     */
    public function getComponentForToken(PaymentTokenInterface $paymentToken)
    {
        $jsonDetails = json_decode($paymentToken->getTokenDetails() ?: '{}', true);
        $component = $this->componentFactory->create(
            [
                'config' => [
                    'code' => ConfigProvider::CC_VAULT_CODE,
                    TokenUiComponentProviderInterface::COMPONENT_DETAILS => $jsonDetails,
                    TokenUiComponentProviderInterface::COMPONENT_PUBLIC_HASH => $paymentToken->getPublicHash()
                ],
                'name' => 'Magento_Braintree/js/view/payment/method-renderer/vault'
            ]
        );

        return $component;
    }
}
```

This implementation allows to retrieve all available payment token details and specify the JS component for storefront.

Having created the component provider, you need to add it to the list of available vault config providers in `di.xml` - the DI configuration file.

In the following example the `Magento\Braintree\Model\Ui\TokenUiComponentProvider` component provider is added to this list:

```xml
<type name="Magento\Vault\Model\Ui\TokensConfigProvider">
    <arguments>
        <argument name="tokenUiComponentProviders" xsi:type="array">
            <item name="braintree" xsi:type="object">Magento\Braintree\Model\Ui\TokenUiComponentProvider</item>
        </argument>
    </arguments>
</type>
```

## JavaScript component for vault

In your custom module directory, create the component's `.js` file. It must be located under the `<your_module_dir>/view/frontend/web/js/view/` directory.

The component should extend [vault.js](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Vault/view/frontend/web/js/view/payment/method-renderer/vault.js):

```javascript
define([
    'Magento_Vault/js/view/payment/method-renderer/vault',
], function (VaultComponent) {
    'use strict';

    return VaultComponent.extend({
        defaults: {
            template: 'Magento_Vault/payment/form'
        }
        ...
    });
});
```
