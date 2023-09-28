---
title: URN Schema Validation | Commerce PHP Extensions
description: Learn about uniform resource name (URN) schema validation for Adobe Commerce and Magento Open Source components.
keywords:
  - Extensions
---

# URN schema validation

Each module can contain XSD files for XML validation.

The application uses [Uniform Resource Names](https://en.wikipedia.org/wiki/Uniform_Resource_Name) (URNs) to reference XML schema declarations.

The application supported URNs begin with `urn:magento`. The application supports two XSD reference types:

*  Module XSD
*  Framework XSD

<InlineAlert variant="info" slots="text"/>

You cannot change the XSD for any XML files provided with the Adobe Commerce and Magento Open Source applications.

### Module XSD

The syntax for the module XSD is a colon separated declaration. An example follows:

`urn:magento:module:Magento_Flow:flows/content.xsd`

where

*  `urn:magento` is the URN identifier
*  `module` is the reference type identifier
*  `Magento_Flow` is the name of the module. This must be exactly the same as the module specified by ComponentRegistrar in the [registration.php](component-registration.md) file.
*  `flows/content.xsd` is the relative path to the module&#8217;s directory.

### Framework XSD

The syntax for the framework XSD is a colon separated declaration. An example follows:

`urn:magento:framework:Api/etc/extension_attributes.xsd`

where

*  `urn:magento` is the URN identifier
*  `framework` is the reference type identifier. You can also add additional framework libraries as separate components with `framework-<sub-name>`
*  `Api/etc/extension_attributes.xsd` is the relative path to the framework&#8217;s directory.

### Referencing a XSD from another XSD

Use URN notation to reference schema from inside a XSD document:

```xml

<xs:redefine schemaLocation="urn:magento:framework:Config/etc/view.xsd">

```

The URN resolution is invoked automatically by the libxml engine. Register the URN resolver by using `libxml_set_external_entity_loader`:

```xml
libxml_set_external_entity_loader(['Magento\Framework\Config\Dom\UrnResolver', 'registerEntityLoader']);
```

<InlineAlert variant="info" slots="text"/>

The relative path to other XSDs cannot be used from inside the XSD file, because the entity loader fails to resolve the relative path.
