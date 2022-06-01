---
title: Register a component | Commerce PHP Extensions
description: Learn how to register different Adobe Commerce and Magento Open Source component types, including modules, themes, language packages, and libraries.
---

# Register a component

Components, including modules, themes, and language packages, must be registered in the system through the `ComponentRegistrar` class.

Each component must have a file called `registration.php` in its root directory. For example, here is the `registration.php` file for Magento's [AdminNotification module](https://github.com/magento/magento2/blob/2.4/app/code/Magento/AdminNotification/registration.php). Depending on the type of component, registration is performed through `registration.php` by adding to it as follows:

## Modules

Register modules with:

```php
ComponentRegistrar::register(ComponentRegistrar::MODULE, '<VendorName_ModuleName>', __DIR__);
```

Here `<VendorName>` is the name of the company providing the [module](https://glossary.magento.com/module) and `<ModuleName>` is the name of the module.

Avoid using "Ui" for your custom module name because the <code>%Vendor%_Ui</code> notation, required when specifying paths, might cause issues.

### Example

```php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::MODULE, 'Magento_AdminNotification', __DIR__);
```

## Themes

Register themes with:

```php
ComponentRegistrar::register(ComponentRegistrar::THEME, '<area>/<vendor>/<theme name>', __DIR__);
```

Here `<area>` is the functional area of the module (frontend, controller, and so on.), `<vendor>` is the name of the company providing the theme, and `<theme name>` is the name of the [theme](https://glossary.magento.com/theme).

### Example

```php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::THEME, 'frontend/Magento/luma', __DIR__);
```

## Language packages

Register language packages with:

```php
ComponentRegistrar::register(ComponentRegistrar::LANGUAGE, '<VendorName>_<packageName>', __DIR__);
```

Here `<VendorName>` is the name of the company providing the package and `<packageName>` is the name of the package.

### Example

```php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::LANGUAGE, 'magento_de_de', __DIR__);
```

## Libraries

Libraries should be registered using

```php
ComponentRegistrar::register(ComponentRegistrar::LIBRARY, '<vendor>/<library_name>', __DIR__);
```

Here `<vendor>` is the name of the company providing the library. `<library_name>` is the library name.

### Example

```php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::LIBRARY, 'magento/framework', __DIR__);
```

## Integrate with Composer

After you create your `registration.php` file and you are creating [your component's composer.json file](composer-integration.md), invoke your `registration.php` file in the `autoload` section of `composer.json`:

```json
{
 "name": "Acme-vendor/bar-component",
 "autoload": {
    "psr-4": { "AcmeVendor\\BarComponent\\": "" },
    "files": [ "registration.php" ]
 }
}
```

### Sample `registration.php` file

```php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::MODULE, 'Magento_AdminNotification', __DIR__);
```
