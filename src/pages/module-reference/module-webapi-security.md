---
title: WebapiSecurity
description: WebapiSecurity module provides option to loosen security on some webapi resources.
---

# Magento_WebapiSecurity module

The Magento_WebapiSecurity module enables access management of some Web API resources.

If checkbox enabled in backend through: `Stores -> Configuration -> Services -> Magento Web API -> Web Api Security` then the security of all the services outlined in `app/code/Magento/WebapiSecurity/etc/di.xml` would be loosened. You may modify this list to customize which services should follow this behavior.

By loosening the security, these services would allow access anonymously (by anyone).

## Installation details

Before installing this module, note that the Magento_WebapiSecurity is dependent on the following modules:

- `Magento_Webapi`

For information about enabling or disabling a module, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

<InlineAlert slots="text" />
The version of this module is 100.4.5.
