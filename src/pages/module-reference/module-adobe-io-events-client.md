---
title: AdobeIoEventsClient
description: README.md contents of the module from the source code
---

Welcome to the Magento Adobe IO Events integration repository!

# Overview

Adobe IO Events is a package tha enables integration between Magento and Adobe IO Events to create custom Event
Provider and custom Events Metadata.

# Usage

This is a two-step process:
1. We will create an Event Provider, this is required once per Adobe Commerce instance
2. We will update the Events Metadata, this should happen during the deployment phase

## Define your Event Provider and Events Metadata

Copy the following JSON file and store in `app/etc/event-types.json`:

```json
{
   "provider": {
      "label": "Adobe Commerce Events - Brand Two",
      "description": "Provides out-of-process extensibility for Adobe Commerce"
   },
    "events": [
        {
            "event_code": "com.adobe.commerce.product.created",
            "label": "Product created",
            "description": "A product was created in your catalog"
        },
        {
            "event_code": "my.custom.event.code",
            "label": "Custom event",
            "description": "custom event"
        }
    ]
}
```

## Configure Adobe Commerce for IO Events

1. Declare an Instance ID. This ID should be unique to your Adobe IMS Organization and by environment.
```bash
magento-cloud variable:set ADOBE_IO_EVENTS_INSTANCE_ID 'myproject-1234-prod'
```
2. Download your Adobe IO Console workspace configuration and it's associated Service Account private key following [those steps](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=dxdevx&title=Onboarding+Event+Provider+and+Event+Type+metadata).
3. Set two environment variables with the content of both files with the following names:
    - `ADOBE_IO_TECHACCT_PRIVATE_KEY` for the private key
    - `ADOBE_IO_CONSOLE_CONFIGURATION` for the Adobe IO Console Configuration.
4. Run the following command to create an event provider
```bash
bin/magento events:create-event-provider
```
5. Declare the Event Provider ID. It should look like that:
```bash
magento-cloud variable:set ADOBE_IO_EVENTS_PROVIDER_ID 'f6f22f08-bbc6-11ec-8422-0242ac120002';
```

# Update Events Metadata

1. Add the following step to your `ece-tool` or deployment script:
```bash
bin/magento events:sync-events-metadata
```

# Delete Events Metadata

You can alternatively delete the Events Metadata no longer required by adding the `--delete` option to the command as such:

```bash
bin/magento events:sync-events-metadata --delete
```
