---
title: Sensitive settings | Commerce PHP Extensions
description: Configure sensitive and environment-specific settings with Adobe Commerce or Magento Open Source components.
keywords:
  - Configuration
  - Extensions
---

# Sensitive and environment-specific settings

This topic discusses how third-party developers can create components that designate configuration settings as being sensitive, environment-specific, or both.

## Guidelines

Use the following guidelines to determine which settings to designate as sensitive, system-specific, or both.

Adobe Commerce and Magento Open Source store these settings in `<Application root dir>/app/etc/env.php`.
Do not include this file in source control.

### Sensitive values

_Sensitive_ configuration values hold restricted or confidential information.

Examples of sensitive information include:

*  Keys (such as API keys)
*  Usernames and passwords
*  E-mail addresses
*  Any personally identifiable information (e.g., address, phone number, date of birth, government identification number, etc.)

<InlineAlert variant="info" slots="text"/>

In keeping with current security and privacy best practices, be sure you are aware of any potential legal and security risks associated with the storage of customers' full date of birth (month, day, year) along with other personal identifiers, such as full name, before collecting or processing such data.

### Environment or system-specific values

_Environment_ or _system-specific_ values are unique to the system where the application is deployed.

Examples of environment or system-specific values include:

*  URLs
*  IP addresses
*  Ports
*  Hostnames
*  Domain names
*  Paths (e.g., custom paths, proxy host, proxy port)
*  "modes" (e.g, sandbox mode, debug mode, test mode)
*  SSL (only for non-payment)
*  E-mail recipients
*  Administrative settings between systems (e.g., password expiration limits)

## How to specify values as sensitive or system-specific

Add a reference to [`Magento\Config\Model\Config\TypePool`][typepool] to the [`di.xml`][di-xml] file to specify either a system-specific or sensitive configuration value.

### Example: Sensitive settings

```xml
<type name="Magento\Config\Model\Config\TypePool">
   <arguments>
      <argument name="sensitive" xsi:type="array">
         <item name="payment/test/password" xsi:type="string">1</item>
      </argument>
   </arguments>
</type>
```

After specifying the sensitive setting, use the following commands to verify it:

```bash
bin/magento cache:clean
```

```bash
bin/magento app:config:dump
```

A message similar to the following is displayed:

```terminal
The configuration file doesn't contain sensitive data for security reasons. Sensitive data can be stored in the following environment variables:
CONFIG__DEFAULT__PAYMENT__TEST__PASWORD for payment/test/password
Done.
```

### Example: System-specific settings

```xml
<type name="Magento\Config\Model\Config\TypePool">
   <arguments>
      <argument name="environment" xsi:type="array">
         <item name="catalog/search/searchengine/port" xsi:type="string">1</item>
      </argument>
   </arguments>
</type>
```

### Sensitive, system-specific setting

To set a configuration setting as both sensitive and system-specific, create two entries with the `name` property for `argument` set to `sensitive` for one entry and `environment` for the other.

[typepool]: https://github.com/magento/magento2/blob/2.4/app/code/Magento/Config/Model/Config/TypePool.php
[di-xml]: ../build/dependency-injection-file.md
[config-importers]: importers.md
