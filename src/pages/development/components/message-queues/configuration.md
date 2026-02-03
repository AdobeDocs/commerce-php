---
title: Configure Message Queues | Commerce PHP Extensions
description: Add message queue functionality to Adobe Commerce and Magento Open Source extensions.
keywords:
  - Configuration
  - Extensions
---

# Configure message queues

The message queue topology is an Adobe Commerce and Magento Open Source feature that can be added to existing modules.

Configuring the message queue topology involves creating and modifying the following configuration files in the `<module>/etc` directory:

* [`communication.xml`](#communicationxml)—Defines aspects of the message queue system that all communication types have in common.
* [`queue_consumer.xml`](#queue_consumerxml)—Defines the relationship between an existing queue and its consumer.
* [`queue_topology.xml`](#queue_topologyxml)—Defines the message routing rules and declares queues and exchanges.
* [`queue_publisher.xml`](#queue_publisherxml)—Defines the exchange where a topic is published.

<InlineAlert variant="info" slots="text"/>

If you are upgrading from Adobe Commerce or Magento Open Source 2.0 or 2.1, see [Migrate message queue configuration](migration.md).

## Use cases

Depending on your use case, you can create and configure `communication.xml` along with one or more of the following files:

* **Publish messages to an existing queue created by a third-party system**—Configure the `queue_publisher.xml` file only.

* **Consume messages from an existing queue**—Configure the `queue_consumer.xml` file only.

* **Define a local queue and consume messages published by a third-party system**—Configure both the `queue_topology.xml` and `queue_consumer.xml` files.

## `communication.xml`

The `<module>/etc/communication.xml` file defines aspects of the message queue system that all communication types have in common. Adobe Commerce supports AMQP, STOMP, and database connections.

### Example

The following sample defines two synchronous topics. The first topic is for RPC calls. The second uses a custom service interface.

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Communication/etc/communication.xsd">
  <topic name="synchronous.rpc.test" request="string" response="string">
    <handler name="processRpcRequest" type="Magento\TestModuleSynchronousAmqp\Model\RpcRequestHandler" method="process"/>
  </topic>
  <topic name="magento.testModuleSynchronousAmqp.api.serviceInterface.execute" schema="Magento\TestModuleSynchronousAmqp\Api\ServiceInterface::execute">
    <handler name="processRemoteRequest" type="Magento\TestModuleSynchronousAmqp\Model\RpcRequestHandler" method="process"/>
  </topic>
</config>
```

#### `topic` element

Topic configuration is flexible in that you can switch the transport layer for topics at deployment time. These values can be overwritten in the `env.php` file.

The `name` parameter is required. The topic definition must include either a `request` or a `schema`. Use `schema` if you want to implement a custom service interface. Otherwise, specify `request`. If `request` is specified, then also specify `response` if the topic is synchronous.

| Parameter | Description |
| --- | --- |
| `name` | A unique string identifier for the topic. Use a series of period-separated strings, with the leftmost being most general and each subsequent string narrowing the scope. For example, `cat.white.feed` and `dog.retriever.walk`. Wildcards are not supported in `communication.xml`.
| `request` | Specifies the data type of the topic. |
| `response` | Specifies the format of the response. This parameter is required if you are defining a synchronous topic. Omit this parameter if you are defining an asynchronous topic. |
| `schema` | The interface that describes the structure of the message. The format must be `<module>\Api\<ServiceName>::<methodName>`. |

#### `handler` element

The `handler` element specifies the class where the logic for handling messages exists and the method it executes.

| Parameter | Description |
| --- | --- |
| `name` | A string that uniquely defines the handler. The name can be derived from the topic name if the handler is specific to the topic. If the handler provides more generic capabilities, name the handler so that it describes those capabilities. |
| `type` | The class or interface that defines the handler. |
| `method` | The method this handler executes. |
| `disabled` | Determines whether this handler is disabled. The default value is `false`. |

See [Handler processing](#handler-processing).

## `queue_consumer.xml`

The `queue_consumer.xml` file contains one or more `consumer` elements:

### Example

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/consumer.xsd">
    <consumer name="basic.consumer" queue="basic.consumer.queue" handler="LoggerClass::log"/>
    <consumer name="synchronous.rpc.test" queue="synchronous.rpc.test.queue" handler="LoggerClass::log"/>
    <consumer name="rpc.test" queue="queue.for.rpc.test.unused.queue" consumerInstance="Magento\Framework\MessageQueue\BatchConsumer"/>
    <consumer name="test.product.delete" queue="queue.for.test.product.delete" handler="Magento\Queue\Model\ProductDeleteConsumer::processMessage" maxMessages="200" maxIdleTime="180" sleep="60" onlySpawnWhenMessageAvailable="0"/>
</config>
```

#### `consumer` element

| Attribute | Description |
| --- | --- |
| `name` (required) | The name of the consumer. |
| `queue` (required) | Specifies the queue name to send the message to. |
| `handler` | Specifies the class and method that processes the message. The value must be specified in the format `<Vendor>\Module\<ServiceName>::<methodName>`. See [Handler processing](#handler-processing). |
| `consumerInstance` | The class name that consumes the message. The default value is `Magento\Framework\MessageQueue\Consumer`. |
| `connection` | For explicit values, use `amqp`, `stomp`, or `db`. If omitted, the connection is resolved automatically. See [Connection resolution](#connection-resolution). |
| `maxMessages` | Specifies the maximum number of messages to consume. |
| `maxIdleTime` | Defines the maximum waiting time in seconds for a new message from the queue. If no message was handled within this period of time, the consumer exits. The default value is `null`. |
| `sleep` | Specifies time in seconds to sleep before checking if a new message is available in the queue. The default value is `null` which equals 1 second. |
| `onlySpawnWhenMessageAvailable` | Boolean value (`1` or `0` only) that identifies whether a consumer should be spawned only if there is available message in the related queue. The default value is `null`. |

<InlineAlert variant="info" slots="text"/>

The `maxIdleTime` and `sleep` attributes are handled only by consumers fired with a defined `maxMessages` parameter. The `onlySpawnWhenMessageAvailable` attribute is only validated by the `\Magento\MessageQueue\Model\Cron\ConsumersRunner` class that runs consumer processes with cron. For details, see [Consumer spawning behavior](#consumer-spawning-behavior).

## `queue_topology.xml`

The `queue_topology.xml` file defines the message routing rules and declares queues and exchanges. It contains the following elements:

* `exchange`
* `exchange/binding` (optional)
* `exchange/arguments` (optional)
* `exchange/binding/arguments` (optional)

### Example

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/topology.xsd">
  <exchange name="magento-topic-based-exchange1">
    <binding id="topicBasedRouting2" topic="anotherTopic" destination="topic-queue1">
        <arguments>
            <!-- Optional: additional arguments are processed if specified -->
            <argument name="argument1" xsi:type="string">value</argument>
        </arguments>
    </binding>
    <arguments>
        <argument name="alternate-exchange" xsi:type="string">magento-log-exchange</argument>
    </arguments>
  </exchange>
  <exchange name="magento-topic-based-exchange2" type="topic" connection="db">
    <binding id="topicBasedRouting1" topic="#" destinationType="queue" destination="topic-queue2"/>
    <arguments>
      <argument name="alternate-exchange" xsi:type="string">magento-log-exchange</argument>
    </arguments>
  </exchange>
</config>
```

#### `exchange` element

| Attribute      | Description |
| -------------- | ----------- |
| `name` (required) | A unique ID for the exchange. |
| `type` | Specifies the type of exchange. Currently, the only value supported is `topic`. |
| `connection` | For explicit values, use `amqp`, `stomp`, or `db`. If omitted, the connection is resolved automatically. See [Connection resolution](#connection-resolution). |
| `durable` | Boolean value indicating whether the exchange is persistent. Non-durable exchanges are purged when the server restarts. The default value is `true`. |
| `autoDelete` | Boolean value indicating whether the exchange is deleted when all queues have finished using it. The default is `false`. |
| `internal` | Boolean value. If set to true, the exchange may not be used directly by publishers, but only when bound to other exchanges. The default is `false`. |

#### `binding` element

The `binding` element is a subnode of the `exchange` element.

| Attribute      | Description |
| -------------- | ----------- |
| `id` (required)  | A unique ID for this binding. |
| `topic` (required)  | The name of a topic. You can specify an asterisk (*) or pound sign (#) as wildcards. These are described below the table.|
| `destinationType` | The default value is `queue`. |
| `destination` (required)  | Identifies the name of a queue. |
| `disabled` | Determines whether this binding is disabled. The default value is `false`. |

Example topic names that include wildcards:

| Pattern | Description | Example matching topics | Example non-matching topics |
| --- | --- | --- | --- |
| `*.*.*` | Matches any topic that contains three segments (two periods) | `mytopic.createOrder.success`, `mytopic.updatePrice.item1` | `mytopic.createOrder`, `mytopic.createOrder.success.true` |
| `#` | Matches any topic name. | `mytopic`, `mytopic.createOrder.success`, `this.is.a.long.topic.name` | Not applicable |
| `mytopic.#` | Matches any topic name that begins with `mytopic` and has a period afterward. | `mytopic.success`, `mytopic.createOrder.error` | `new.mytopic.success` |
| `*.Order.#` | There must be one string before `.Order`. There can be any number of strings (including 0) after that. | `mytopic.Order`, `mytopic.Order.Create`, `newtopic.Order.delete.success` | `mytopic.Sales.Order.Create` |

#### `arguments` element

The `arguments` element is an optional element that contains one or more `argument` elements. These arguments define key/value pairs that are passed to the broker for processing.

Each `argument` definition must have the following parameters:

| Attribute | Description |
| --- | --- |
| `name` | The parameter name. |
| `type` | The data type of the value. |

The following illustrates an `arguments` block:

```xml
<arguments>
    <argument name="warehouseId" xsi:type="int">1</argument>
    <argument name="carrierName" xsi:type="string">USPS</argument>
</arguments>
```

## `queue_publisher.xml`

The `queue_publisher.xml` file defines which connection and exchange to use to publish messages for a specific topic. It contains the following elements:

* `publisher`
* `publisher/connection`

### Example

**For RabbitMQ (AMQP):**

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/publisher.xsd">
    <publisher topic="magento.testModuleSynchronousAmqp.api.serviceInterface.execute" disabled="true" />
    <publisher topic="asynchronous.test">
        <connection name="amqp" exchange="magento" disabled="false"/>
        <connection name="db" exchange="exch1" disabled="true"/>
    </publisher>
</config>
```

**For ActiveMQ Artemis (STOMP):**

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/publisher.xsd">
    <publisher topic="magento.testModuleSynchronousAmqp.api.serviceInterface.execute" disabled="true" />
    <publisher topic="asynchronous.test" queue="async.test.queue">
        <connection name="stomp" disabled="false"/>
        <connection name="db" disabled="true"/>
    </publisher>
</config>
```

#### `publisher` element

| Attribute | Description |
| --- | --- |
| `topic` (required) | The name of the topic. |
| `queue` | For ActiveMQ Artemis (STOMP), specifies the queue name when it differs from the topic name. |
| `disabled` | Determines whether this queue is disabled. The default value is `false`. |

#### `connection` element

The `connection` element is a subnode of the `publisher` element. Only one enabled connection can be defined for a publisher at any given time. If you omit the `connection` element, the connection is resolved automatically and `magento` is used as the exchange. See [Connection resolution](#connection-resolution).


| Attribute | Description |
| --- | --- |
| `name` | The connection name. For explicit values, use `amqp`, `stomp`, or `db`. See [Connection resolution](#connection-resolution). |
| `exchange` | The name of the exchange to publish to. The default system exchange name is `magento`. |
| `disabled` | Determines whether this queue is disabled. The default value is `false`. |

<InlineAlert variant="warning" slots="text"/>

You cannot enable more than one `publisher` for each `topic`.

## Connection resolution

Connection names are resolved dynamically based on the message queue deployment configuration in `env.php`. If you don't explicitly specify a connection, the system automatically selects the appropriate one.

### Automatic resolution

The system checks `env.php` for message queue configuration:

* If AMQP (RabbitMQ) is configured, the `amqp` connection is used
* If STOMP (ActiveMQ Artemis) is configured, the `stomp` connection is used
* Otherwise, the database (`db`) connection is used

### Explicit connection values

When specifying a connection explicitly, use one of these values:

| Connection type | Value | Notes |
| --- | --- | --- |
| RabbitMQ | `amqp` | For AMQP connections in `queue_consumer.xml`, the value must match the `connection` attribute in `queue_topology.xml`. |
| ActiveMQ Artemis | `stomp` | Requires Adobe Commerce or Magento Open Source 2.4.5 or later. Use ANYCAST addressing mode for point-to-point message delivery and load balancing across multiple consumers. |
| Database | `db` | MySQL-based queue storage. Used as fallback when no message broker is configured. |

## Handler processing

A [handler](#handler-element) is a class and method that processes a message. You can define a handler in two places:

* In the `<handler>` element of the module's `communication.xml` file
* In the `handler` attribute of the module's `queue_consumer.xml` file

The following conditions determine which handler is executed:

* If the consumer in `queue_consumer.xml` does not have a `consumerInstance` defined, the system uses the default consumer: `Magento\Framework\MessageQueue\Consumer`. In this case, if the `<consumer>` element contains the `handler` attribute, it is used and the `<handler>` element in `communication.xml` is ignored.
* If the consumer in `queue_consumer.xml` has a `consumerInstance` defined, the specific consumer implementation defines how the handler is used.

The following table shows how the built-in consumers process handlers:

| Class name | Handler in `communication.xml` executed? | Handler in `queue_consumer.xml` executed? |
| --- | --- | --- |
| `Magento\Framework\MessageQueue\Consumer` | Only if not defined in `queue_consumer.xml` | Yes, if exists |
| `Magento\Framework\MessageQueue\BatchConsumer` | Only if not defined in `queue_consumer.xml` | Yes, if exists |
| `Magento\AsynchronousOperations\Model\MassConsumer` | Yes, if exists | Yes, if exists |

## Consumer spawning behavior

Two settings control when consumers spawn and exit: `onlySpawnWhenMessageAvailable` and [`consumers-wait-for-messages`](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/message-consumers). Both help reduce server resource usage, but they work differently.

| Setting | Scope | Behavior |
| --- | --- | --- |
| `onlySpawnWhenMessageAvailable` | Per-consumer or global | Checks for messages *before* spawning. Only creates a consumer process if messages exist in the queue. |
| `consumers-wait-for-messages` | Global only | Always spawns a consumer. When set to `false`, the consumer exits immediately if no messages are available. Because this option is a global option, it cannot be configured separately for each consumer. |

The key difference between the two settings: `onlySpawnWhenMessageAvailable` prevents unnecessary process creation, while `consumers-wait-for-messages` creates a process that immediately terminates if the queue is empty.

### Configuration

Set `onlySpawnWhenMessageAvailable` globally in `app/etc/env.php`:

```php
'queue' => [
    'only_spawn_when_message_available' => 1
]
```

The default global value is `1`. To override for a specific consumer, set the `onlySpawnWhenMessageAvailable` attribute in `queue_consumer.xml`. The per-consumer setting takes priority over the global setting.

### Recommended combinations

* **Infrequent consumers**—Combine `onlySpawnWhenMessageAvailable` with `maxIdleTime`. The consumer spawns only when needed and terminates after a period of inactivity.
* **Resource optimization**—Combine the global `only_spawn_when_message_available` setting with `consumers-wait-for-messages` set to `false`. Consumers run only when messages exist and exit when the queue is empty.

## ActiveMQ Artemis (STOMP) support

<InlineAlert variant="info" slots="text"/>

ActiveMQ Artemis (STOMP) support was introduced in Adobe Commerce 2.4.5 and later versions. For STOMP connections, use ANYCAST addressing mode for point-to-point message delivery and load balancing across multiple consumers.

## Updating `queue.xml`

See [Migrate message queue configuration](migration.md) for information about upgrading from Adobe Commerce and Magento Open Source 2.0 or 2.1.
