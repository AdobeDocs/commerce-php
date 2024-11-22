---
title: Request Processors Pool | Commerce PHP Extensions
description: Use the request processors pool to route web API requests in your Adobe Commerce and Magento Open Source extensions.
contributor_name: Comwrap GmbH
contributor_link: https://www.comwrap.com
keywords:
  - Extensions
---

# Request processors pool

The request processors pool routes web API requests. It is located in the `Magento_WebApi` module: `Magento\Webapi\Controller\Rest\RequestProcessorPool`

Adobe Commerce and Magento Open Source define the following processors:

## Processors

### `sync`

Executes the corresponding service contract.

-  **Class:** `Magento\Webapi\Controller\Rest\SynchronousRequestProcessor`
-  **URL pattern:** `/^\\/V\\d+/`

### `syncSchema`

Delivers the schema needed for generating Swagger documentation.

-  **Class:** `Magento\Webapi\Controller\Rest\SchemaRequestProcessor`
-  **URL pattern:** `schema`

### `async`

-  **Class:** `Magento\WebapiAsync\Controller\Rest\AsynchronousRequestProcessor`
-  **URL pattern:** `/^\\/async(\\/V.+)/`

Performs an asynchronous API request. It executes `Magento\AsynchronousOperations\Model\MassSchedule::publishMass`, which places a single message in the queue.

### `asyncSchema`

Delivers the schema needed for generating Swagger documentation for asynchronous endpoints.

-  **Class:** `Magento\WebapiAsync\Controller\Rest\AsynchronousSchemaRequestProcessor`
-  **URL pattern:** `async/schema`

### `asyncBulk`

-  **Class:** `Magento\WebapiAsync\Controller\Rest\VirtualType\AsynchronousBulkRequestProcessor`
-  **URL pattern:** `/^\\/async\/bulk(\\/V.+)/`

Performs a bulk API request by executing `Magento\AsynchronousOperations\Model\MassSchedule::publishMass`, which places multiple messages in the queue.

### `asyncBulkSchema`

Currently not used. Reserved for future use.

-  **Class:** `Magento\WebapiAsync\Controller\Rest\VirtualType\AsynchronousBulkSchemaRequestProcessor`
-  **URL pattern:** `async/bulk/schema`

<InlineAlert variant="info" slots="text"/>

`async` and `asyncBulk` share the same processor but have different URL patterns.

## Create a new processor

To create a custom processor, you must perform the following tasks:

-  Define the custom processor in `webapi_rest/di.xml`.
-  Create a processor class and implement the `Magento\Webapi\Controller\Rest\RequestProcessorInterface` interface.
-  Define the processing rules in the `canProcess` method.
-  Create the processor logic in the `process` method.

### Define the custom processor

Processors must be defined in a module's `webapi_rest/di.xml` file. The following example shows the definition of the default `sync` processor:

```xml
<type name="Magento\Webapi\Controller\Rest\RequestProcessorPool">
    <arguments>
        <argument name="requestProcessors" xsi:type="array">
            <item name="sync" xsi:type="object" sortOrder="100">Magento\Webapi\Controller\Rest\SynchronousRequestProcessor</item>
        </argument>
    </arguments>
</type>
```

## Create the processor class

A custom processor must implement the `Magento\Webapi\Controller\Rest\RequestProcessorInterface` interface, as shown below:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */
declare(strict_types=1);

namespace Magento\Webapi\Controller\Rest;

/**
 *  Request processor interface
 */
interface RequestProcessorInterface
{
    /**
     * Executes the logic to process the request
     *
     * @param \Magento\Framework\Webapi\Rest\Request $request
     * @return void
     * @throws \Magento\Framework\Exception\AuthorizationException
     * @throws \Magento\Framework\Exception\InputException
     * @throws \Magento\Framework\Webapi\Exception
     */
    public function process(\Magento\Framework\Webapi\Rest\Request $request);

    /**
     * Method should return true for all the requests the current processor can process.
     *
     * Invoked in the loop for all registered request processors. The first one wins.
     *
     * @param \Magento\Framework\Webapi\Rest\Request $request
     * @return bool
     */
    public function canProcess(\Magento\Framework\Webapi\Rest\Request $request);
}
```

The `canProcess(\Magento\Framework\Webapi\Rest\Request $request)` method defines whether the current request can be processed. Currently, all implemented processors match current request URLs with the defined patterns.

For example, `Magento\WebapiAsync\Controller\Rest\AsynchronousRequestProcessor` processes asynchronous calls, such as `<host>/rest/async/V1/products`.

```php
const PROCESSOR_PATH = "/^\\/async(\\/V.+)/";

.....

public function canProcess(\Magento\Framework\Webapi\Rest\Request $request)
{
    if ($request->getHttpMethod() === \Magento\Framework\Webapi\Rest\Request::HTTP_METHOD_GET) {
        return false;
    }

    if (preg_match($this->processorPath, $request->getPathInfo()) === 1) {
        return true;
    }
    return false;
}

.....
```

The `process(\Magento\Framework\Webapi\Rest\Request $request)` method executes processor logic.
