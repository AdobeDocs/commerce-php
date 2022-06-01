---
title: Adapters | Commerce PHP Extensions
description: Learn about Adobe Commerce and Magento Open Source adapter classes, when to use them, and how to write them.
---

# Adapters

Adapter classes follow the [adapter pattern](https://en.wikipedia.org/wiki/Adapter_pattern) and wrap around classes from third-party libraries.
These classes allow you to use functionality from third-party libraries in your code by converting the third-party class interfaces into an interface that is expected by your native code.

## When to use

You should always use [adapter](https://glossary.magento.com/adapter) classes instead of directly using classes from third-party libraries.
This reduces the change impact on your code when the [API](https://glossary.magento.com/api) changes in a third-party [library](https://glossary.magento.com/library).

We recommend using adapter classes for [dependency injection](dependency-injection.md) to get access to the functionality provided by third-party classes.

## How to write

A common approach in developing an adapter is to create an interface named `AdapterInterface` to describe the functionality the third-party class provides.
This class is typically found in a directory labeled `Adapter`.
Classes implementing this adapter interface use the third-party class directly to provide indirect functionality.

This approach allows you to update or substitute different implementations provided by other third-party classes without the need to update code that uses your adapter.

## Types

### `Magento/Framework/Code/Minifier`

The [minifier](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Code/Minifier) functionality provided by the `Magento/Framework/Code` library involves the use of third-party libraries for code compression.

The [`AdapterInterface`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Code/Minifier/AdapterInterface.php) for this class contains a `minify($content)` function that the [`CSSmin`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Code/Minifier/Adapter/Css/CSSmin.php) and [`JShrink`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Code/Minifier/Adapter/Js/JShrink.php) implementation class define.

The [jshrink](https://github.com/tedious/JShrink)(tedivm/jshrink) and [cssmin](https://github.com/tubalmartin/YUI-CSS-compressor-PHP-port)(tubalmartin/cssmin) libraries registered in the [`composer.json`](https://github.com/magento/magento2/blob/2.4/composer.json) file provide the functionalities for the implementation classes.

### `Magento/Framework/Image`

The [`Magento/Framework/Image`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Image) library uses adapters to access functionality provided by GD(php-gd2) and ImageMagick(php-imagick) third-party libraries.

The [`AdapterInterface`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Image/Adapter/AdapterInterface.php) class defines the available functionality, and the [`Gd2`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Image/Adapter/Gd2.php) and [`ImageMagick`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/Image/Adapter/ImageMagick.php) adapter classes provides the concrete implementation using the third-party libraries.

## Examples

The code below describes an interface for an adapter that parses [markdown](https://glossary.magento.com/markdown).

```php
/**
 * Interface for markdown library adapters
 */
namespace MyCompany\MyModule\Markdown\Parser\Adapter;

interface AdapterInterface
{
    /**
     * Converts markdown text into another format
     *
     * @param string $text
     * @return string
     */
    public function parse($text);
}
```

The code below is an implementation class of the `AdapterInterface` that uses the [php-markdown](https://github.com/michelf/php-markdown) library to convert markdown into [HTML](https://glossary.magento.com/html).

```php
namespace MyCompany\MyModule\Markdown\Parser\Adapter\PhpMarkdown;

use \Michelf\Markdown;
use MyCompany\MyModule\Markdown\Parser\Adapter\AdapterInterface;

/**
 * Adapter for php-markdown library
 */
class PhpMarkdown implements AdapterInterface
{
    /**
     * Convert markdown into HTML
     *
     * @param string $text
     * @return string
     */
    public function parse($text)
    {
        return Markdown::defaultTransform($text);
    }
}
```

To configure the ObjectManager to use the PhpMarkdown implementation when the AdapterInterface class is requested as a dependency, add the following code in your di.xml file.

```php
<preference for="MyCompany\MyModule\Markdown\Parser\Adapter\AdapterInterface" type="MyCompany\MyModule\Markdown\Parser\Adapter\PhpMarkdown\PhpMarkdown" />
```

The code below is an alternate implementation class of the `AdapterInterface` that uses the [Ciconia](https://github.com/kzykhys/Ciconia) library to parse markdown into HTML.
This code differs from the previous implementations in that an instance of the `Ciconia` class is a constructor dependency.

```php
namespace MyCompany\MyModule\Markdown\Parser\Adapter\Ciconia;
use Ciconia\Ciconia;
use MyCompany\MyModule\Markdown\Parser\Adapter\AdapterInterface;

/**
 * Adapter for the Ciconia library
 */
class CiconiaParser implements AdapterInterface
{
    /**
     * @var Ciconia
     */
     protected $parser;

    /**
     * @param Ciconia
     */
    public function __construct(Ciconia $parser)
    {
        $this->parser = $parser;
    }

    /**
     * Convert markdown into HTML
     *
     * @param string $text
     * @return string
     */
    public function parse($text)
    {
        return $this->parser->render($text);
    }
}
```

The following [dependency injection](https://glossary.magento.com/dependency-injection) entries belong in the `di.xml` file.
They describe to the ObjectManager how to create the third-party and adapter classes.

```xml
<virtualType name="defaultCiconia" type="Ciconia\Ciconia" shared="false">
   <arguments>
       <argument name="renderer" xsi:type="null"/>
   </arguments>
</virtualType>
<type name="MyCompany\MyModule\Markdown\Parser\Adapter\Ciconia\CiconiaParser">
   <arguments>
       <argument name="parser" xsi:type="object">defaultCiconia</argument>
   </arguments>
</type>
```
