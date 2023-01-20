---
title: AdobeCommerceEventsClient
description: README.md contents of the module from the source code
---

`Magento_AdobeCommerceEventsClient` provides the ability to manage subscriptions to commerce events and supports the publishing of event data for subscribed events to a specified service.

### Local development

For development purposes this package can be added to Magento `composer.json` as a local dependency:

```json
"repositories": [
  {
    "type": "path", 
    "url": "/path_to_the_module/module-adobe-commerce-events-client", 
    "options": {
      "symlink": true
    }
  }
]
```

And in the `require` section:
```json
"magento/module-adobe-commerce-events-client": "*"
```

### Admin panel configuration

After adding this package to Magento, the following changes should be made in the admin panel (navigate to Stores > Settings > Configuration > Adobe Services > Adobe I/O Events > Commerce events):
- Set `Enabled` to `Yes`
- Enter a `Merchant ID`
- Enter a `Environment ID`

## CLI commands defined by module

This module defines the following CLI commands:
- events:subscribe
- events:unsubscribe
- events:list
- events:list:all
- events:info
- events:metadata:populate

Please see [documentation](https://developer.adobe.com/commerce/events/get-started/commands/) for details on using these commands.