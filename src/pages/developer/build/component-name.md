---
group: php-developer-guide
title: Name your component
---

You give a name to your component in its `composer.json` and `module.xml` files. These files also contain other required configuration parameters, such as the module's schema version.

## Prerequisites

Before you continue, make sure you have completed all of the following tasks:

*  Create a [file structure](component-file-structure.md).
*  Create the [configuration files](required-configuration-files.md) you'll need.
*  [Register](component-registration.md) your component.

## Add the component's `module.xml` file

Declare the component itself by adding a `module.xml` file in the `/etc` folder of your component.

A component declares itself (that is, defines its name and existence) in the `module.xml` file, located in the install directory at `<ComponentName>/etc/`.

The smallest working `module.xml` file would look something like this:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
        <module name="Vendor_ComponentName"/>
</config>
```

The `name` parameter defines the name of your component. It is required for all components. If you do not use [Declarative Schema](../components/declarative-schema/index.md) to help manage the installation and upgrade processes for your component, then you must also add the  `setup_version` parameter to the `module` line. Set the `setup_version` value to your module's [database schema](https://glossary.magento.com/database-schema) version. Omit the `setup_version` parameter if you use [Declarative Schema](../components/declarative-schema/index.md).

<InlineAlert variant="info" slots="text"/>

Avoid using "Ui" for your custom module name, because the `%Vendor%_Ui` notation, required when specifying paths, might cause issues.

## Add the component's `composer.json` file

`composer.json` provides a component name and also specifies component dependencies.

Refer to [Module version dependencies](../versioning/dependencies.md) to determine versioning requirements.

### Example `composer.json` file

```json
{
    "name": "your-name/module-Acme",
    "description": "Test component",
    "require": {
        "php": "~7.3.0||~7.4.0",
        "magento/module-store": "102.1",
        "magento/module-catalog": "102.1",
        "magento/module-catalog-inventory": "102.1",
        "magento/module-ui": "self.version",
        "magento/magento-composer-installer": "*"
    },
    "suggest": {
      "magento/module-webapi": "102.1"
    },
    "type": "magento2-module",
    "version": "102.1",
    "license": [
        "OSL-3.0",
        "AFL-3.0"
    ],
    "autoload": {
        "files": [ "registration.php" ],
        "psr-4": {
            "Magento\\CatalogImportExport\\": ""
        }
    }
}
```

In this example:

*  `name` is the name of your component.
*  `description` is a concise explanation of your component's purpose.
*  `require` lists any components your component depends on.
*  `suggest` lists soft dependencies. The component can operate without them, but if the components are active, this component might impact their functionality. `Suggest` does not affect component load order.
*  `type` determines what the [component](https://glossary.magento.com/magento-component) type. Choose from *magento2-theme*, *magento2-language*, or *magento2-module*.
*  `version` lists the version of the component.
*  `license` lists applicable licenses that apply to your component.
*  `autoload` instructs Composer to load the specified files.

<InlineAlert variant="info" slots="text"/>

Adobe Commerce and Magento Open Source do not currently support the [`path`](https://getcomposer.org/doc/05-repositories.md#path) repository.
