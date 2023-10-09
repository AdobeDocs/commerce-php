---
title: AdobeIoEventsClient
description: README.md contents of the module from the source code
---

Welcome to the Magento Adobe IO Events integration repository!

# Overview

Adobe IO Events is a package that enables integration between Magento and Adobe IO Events to create custom Event
Provider and custom Events Metadata.

# Usage

This is a two-step process:

1. We will create an Event Provider, this is required once per Adobe Commerce instance
2. We will update the Events Metadata, this should happen during the deployment phase

## Configure Adobe Commerce for IO Events

Depending on credential type complete steps for `OAuth Server-to-Server` or `Service Account (JWT) DEPRECATED`

### OAuth Server-to-Server

1. In the Adobe Developer Console, download your Adobe IO Console workspace configuration.
2. In the Commerce admin panel, navigate to Stores > Settings > Configuration > Adobe Services > Adobe I/O Events > General configuration and make the following changes:
    - Select `OAuth (recommended)` as  `Adobe I/O Authorization Type`
    - Populate the `Adobe I/O Workspace Configuration` fields
    - Enter a unique ID  in the `Adobe Commerce Instance ID` field

### Service Account (JWT) DEPRECATED

1. In the Adobe Developer Console, download your Adobe IO Console workspace configuration and its associated Service Account private key.
2. In the Commerce admin panel, navigate to Stores > Settings > Configuration > Adobe Services > Adobe I/O Events > General configuration and make the following changes:
    - Select `JWT` as  `Adobe I/O Authorization Type`
    - Populate the `Service Account Private Key` and `Adobe I/O Workspace Configuration` fields
    - Enter a unique ID  in the `Adobe Commerce Instance ID` field

### Create Event Provider

1. Run the following command to create an event provider

```bash
bin/magento events:create-event-provider --label "<unique_provider_label>" --description "<provider description>"
````

2. Enter the Event Provider ID output by the command in the `Adobe I/O Event Provider ID` field

# Update Events Metadata

Events Metadata in the following format can optionally be stored in `app/etc/event-types.json`:

```json
{
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

To update the metadata using the `app/etc/event-types.json` file, add the following step to your `ece-tool` or deployment script:

```bash
bin/magento events:sync-events-metadata
```

# Delete Events Metadata

You can alternatively delete the Events Metadata no longer required by adding the `--delete` option to the command as such:

```bash
bin/magento events:sync-events-metadata --delete
```
