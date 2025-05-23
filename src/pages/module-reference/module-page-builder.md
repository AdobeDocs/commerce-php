---
title: PageBuilder
description: Page Builder module
---

# Magento_PageBuilder module

The Magento_PageBuilder module provides an enhancement for the default Magento WYSIWYG editor. It installs an alternative editor in the Admin area for building content.

The PageBuilder editor can be used on the following content pages:

* Category Pages
* CMS Pages
* CMS Blocks
* Dynamic Blocks

## Enable the module

The PageBuilder module and the editor is enabled by default after installation.

The editor itself is enabled globally in the Admin area under *Stores > Configuration > Content Management > Advanced Content Tool > Enable Page Builder*.
This setting determines the `is_pagebuilder_enabled` configuration value.

## Disable the module

You can disable the PageBuilder module for a specific field by adding the following entry to a field configuration in an XML configuration file:

```xml
<item name="wysiwygConfigData" xsi:type="array">
    <item name="is_pagebuilder_enabled" xsi:type="boolean">false</item>
</item>
```

### Example

The following example disables the PageBuilder editor for the content field.

```xml
<form xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <fieldset name="content" sortOrder="10">
        <field name="content" formElement="wysiwyg">
            <argument name="data" xsi:type="array">
                <item name="config" xsi:type="array">
                    <item name="source" xsi:type="string">page</item>
                    <item name="wysiwygConfigData" xsi:type="array">
                        <item name="is_pagebuilder_enabled" xsi:type="boolean">false</item>
                    </item>
                </item>
            </argument>
        </field>
    </fieldset>
</form>
```

**Note:** Disabling the editor this way overrides the value of `is_pagebuilder_enabled` for the specified field.

<InlineAlert slots="text" />
The version of this module is 2.2.6.
