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
    "url": "/path_to_the_module/module-commerce-events-client", 
    "options": {
      "symlink": true
    }
  }
]
```

And in the `require` section:
```json
"magento/module-commerce-events-client": "*"
```

### Admin panel configuration

After adding this package to Magento, the following should be set in the admin panel (navigate to Stores > Settings > Configuration > Adobe Services > Adobe I/O Events > Commerce events):
- `Endpoint`
- `Merchant ID`
- `Environment ID`

## Event subscription CLI commands

CLI commands provided by this module can be used to manage event subscriptions.

### Subscribe to an event
```
bin/magento events:subscribe <event-code> --fields=entity_id --fields=name
```
An event code is expected to contain a type label (ex. "plugin", "observer") and an event code separated by a dot: "<type-label>.<event-code>".
The command expects at least one field provided that must be in the event data payload.

Example:
```
bin/magento events:subscribe observer.catalog_product_save_after
```
### List existing event subscriptions
```
bin/magento events:list
```

### Unsubscribe from an event
```
bin/magento events:unsubscribe <event-code>
```