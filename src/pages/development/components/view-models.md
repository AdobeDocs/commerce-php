---
title: View Models | Commerce PHP Extensions
description: Learn about Adobe Commerce and Magento Open Source view models, including when to use them and how to write them.
contributor_name: Space 48
contributor_link: https://www.space48.com/
keywords:
  - Extensions
---

# View models

A view model is an abstraction of the view exposing public properties and commands. It allows developers to offload features and business logic from block classes into separate classes that are easier to maintain, test, and reuse.

## When to use view models

Use this approach anytime you need to inject functionality into template files and your code does not need to be backwards compatible.

<InlineAlert variant="info" slots="text"/>

View models are available in Adobe Commerce and Magento Open Source 2.2 and later. If your code must be compatible with older versions of Magento, consider adding your logic to blocks. For more information, see [Backward compatibility](https://developer.adobe.com/commerce/contributor/guides/code-contributions/backward-compatibility-policy/).

<InlineAlert variant="info" slots="text"/>

The use of helpers in templates is discouraged. It is recommended to use view models instead.

## Create and use view models

View models can be used by passing the view model class as an argument to a template's block in the page layout configuration file. In the following example snippet, `MyNewViewModel` is the view model class of the ExampleCorp_Catalog module passed as an argument to a block.

```xml
<block name="examplecorp.new.viewmodel" template="ExampleCorp_Catalog::example.phtml">
    <arguments>
        <argument name="view_model" xsi:type="object">ExampleCorp\Catalog\ViewModel\MyNewViewModel</argument>
    </arguments>
</block>
```

In the following example, the same view model is used with an existing block in `Magento/Checkout/view/frontend/layout/checkout_cart_item_renderers.xml`.

```xml
<referenceBlock name="checkout.cart.item.renderers.default">
    <arguments>
        <argument name="view_model" xsi:type="object">ExampleCorp\Catalog\ViewModel\MyNewViewModel</argument>
    </arguments>
</referenceBlock>
```

The view model class must always implement the interface `\Magento\Framework\View\Element\Block\ArgumentInterface`. For example:

```php
namespace ExampleCorp\Catalog\ViewModel;

class MyNewViewModel implements \Magento\Framework\View\Element\Block\ArgumentInterface
{
    public function getTitle()
    {
      return 'Hello World';
    }
}
```

You can access the public methods for the view model class in the template:

```html
<?php

/** @var \ExampleCorp\Catalog\ViewModel\MyNewViewModel $viewModel */
$viewModel = $block->getViewModel();

?>
<h1><?= $escaper->escapeHtml($viewModel->getTitle()); ?></h1>
```

## Examples
Here are several examples of how view models are used in Adobe Commerce.

[Theme](https://github.com/magento/magento2/blob/2.3.3/app/code/Magento/Theme/view/frontend/layout/default.xml#L43-L45 "view_model definition"). In this example, the `view_model` is injected into a template to return the target store redirect URL.

The following is an example of view model usage within the `Magento/Catalog/view/frontend/layout/catalog_product_view.xml` layout file.

The view model class is passed as an argument to the `product.info.upsell` block in the layout configuration file:

```xml
<block class="Magento\Catalog\Block\Product\ProductList\Upsell" name="product.info.upsell" template="Magento_Catalog::product/list/items.phtml">
    <arguments>
        <argument name="type" xsi:type="string">upsell</argument>
        <argument name="view_model" xsi:type="object">Magento\Catalog\ViewModel\Product\Listing\PreparePostData</argument>
    </arguments>
</block>
```

The following is an example of the view model class `Magento/Catalog/ViewModel/Product/Listing/PreparePostData.php` implementation in the catalog module.

The class must implement the `\Magento\Framework\View\Element\Block\ArgumentInterface` interface class.

```php
namespace Magento\Catalog\ViewModel\Product\Listing;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\App\ActionInterface;
use Magento\Framework\Url\Helper\Data as UrlHelper;

/**
 * Check is available add to compare.
 */
class PreparePostData implements ArgumentInterface
{
    /**
     * @var UrlHelper
     */
    private $urlHelper;

    /**
     * @param UrlHelper $urlHelper
     */
    public function __construct(UrlHelper $urlHelper)
    {
        $this->urlHelper = $urlHelper;
    }

    /**
     * Wrapper for the PostHelper::getPostData()
     *
     * @param string $url
     * @param array $data
     * @return array
     */
    public function getPostData(string $url, array $data = []):array
    {
        if (!isset($data[ActionInterface::PARAM_NAME_URL_ENCODED])) {
            $data[ActionInterface::PARAM_NAME_URL_ENCODED] = $this->urlHelper->getEncodedUrl();
        }
        return ['action' => $url, 'data' => $data];
    }
}
```

The following is an example of the view model initialization in the `app/code/Magento/Catalog/view/frontend/templates/product/list/items.phtml` template.

```php
/** @var /Magento/Catalog/ViewModel/Product/Listing/PreparePostData $viewModel */
$viewModel = $block->getViewModel();
$postArray = $viewModel->getPostData(
    $escaper->escapeUrl($block->getAddToCartUrl($_item)),
    ['product' => $_item->getEntityId()]
);
```

## Additional concepts and best practices

### Difference between blocks and view models

Blocks prepare data for rendering and interact with the layout system.  
View models expose data or operations directly to templates without layout responsibilities.

Use a block when layout manipulation is required.  
Use a view model when the template needs business logic or computed values.

### Single Responsibility Principle (SRP)

View models help enforce SRP by moving business logic out of blocks.  
This keeps classes smaller, easier to test, and more maintainable.

### Reusability

A view model can be injected into multiple templates or blocks.  
This avoids duplicated logic and ensures consistent behavior across the storefront.

### Using multiple view models

You can provide several view models to the same block:

```xml
<arguments>
    <argument name="product_view_model" xsi:type="object">Vendor\Module\ViewModel\ProductData</argument>
    <argument name="utility_view_model" xsi:type="object">Vendor\Module\ViewModel\Utility</argument>
</arguments>
```
Retrieve them in the template using $block->getViewModel() or custom accessors.
### Cache and performance

View models do not manage cache identities.  
If a view model depends on cached entities, ensure the block implements  
`\Magento\Framework\DataObject\IdentityInterface` to prevent stale output.

### Naming conventions

- Store view models in the `ViewModel` namespace.
- Use descriptive names such as `PrepareData`, `Formatter`, or `Resolver`.
- Keep methods small and focused on template-specific data.

### Checklist

1. Implement `\Magento\Framework\View\Element\Block\ArgumentInterface`.
2. Inject dependencies in the constructor.
3. Add only the logic required by the template.
4. Register the view model in the layout XML.
5. Access it using `$block->getViewModel()`.
6. Use `$escaper` for proper HTML escaping.
