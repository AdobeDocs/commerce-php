---
title: Migrate message queue configuration
description: Learn how to migrate message queue configuration between Adobe Commerce versions, including support for RabbitMQ (AMQP) and ActiveMQ Artemis (STOMP).
keywords:
  - Configuration
  - Message Queue
  - Migration
---

# Migrate message queue configuration

This guide provides migration instructions for message queue configuration across Adobe Commerce versions. Use these examples to update your `env.php` and XML configuration files when upgrading.

## Migrate from 2.4.4 to 2.4.5+

Adobe Commerce 2.4.5 and later versions support Apache ActiveMQ Artemis (STOMP) as an alternative message broker to RabbitMQ (AMQP). When upgrading from 2.4.4 or earlier, you can continue using RabbitMQ or migrate to ActiveMQ Artemis.

### Key changes in 2.4.5+

- **ActiveMQ Artemis (STOMP) support**—New message broker option alongside RabbitMQ
- **Extended dynamic connection detection**—Supports STOMP in addition to AMQP
- **Enhanced SSL configuration**—Improved SSL options for both brokers
- **Multiple named connections**—Configure multiple broker connections simultaneously

For STOMP connections, use ANYCAST addressing mode for point-to-point message delivery and load balancing across multiple consumers.

### Configuration File Changes

The following table shows the key differences between 2.4.4 and 2.4.5+ configurations:

| Configuration Area | 2.4.4 | 2.4.5+ |
| ------------------ | ----- | ------ |
| `env.php` default_connection | Optional when single broker configured | Optional when single broker configured; required when multiple brokers (can be `'amqp'`, `'stomp'`, or `'db'`) |
| `env.php` broker configuration | RabbitMQ (AMQP) only | RabbitMQ (AMQP) and/or ActiveMQ Artemis (STOMP) |
| `queue_consumer.xml` connection attribute | Optional (auto-detected from env.php) | Optional (auto-detected, now includes STOMP in 2.4.5+) |
| `queue_publisher.xml` connection element | Optional for AMQP, supports multiple connections | Optional for AMQP/STOMP, enhanced multiple connections |
| `queue_topology.xml` connection attribute | Optional (auto-detected from env.php) | Optional (auto-detected, now includes STOMP in 2.4.5+) |

### Update `env.php` Configuration

**For RabbitMQ (AMQP) - No Changes Required:**

```php
'queue' => [
    'amqp' => [
        'host' => 'rabbitmq.example.com',
        'port' => '5672',
        'user' => 'magento',
        'password' => 'magento',
        'virtualhost' => '/',
        'ssl' => false
    ]
]
```

**For ActiveMQ Artemis (STOMP):**

```php
'queue' => [
    'stomp' => [
        'host' => 'activemq.example.com',
        'port' => '61613',
        'user' => 'artemis',
        'password' => 'artemis',
        'ssl' => false
    ]
]
```

**For both brokers (requires `default_connection`):**

```php
'queue' => [
    'default_connection' => 'amqp', // Required when multiple brokers are configured
    'amqp' => [
        'host' => 'rabbitmq.example.com',
        'port' => '5672',
        'user' => 'magento',
        'password' => 'magento',
        'virtualhost' => '/',
        'ssl' => false
    ],
    'stomp' => [
        'host' => 'activemq.example.com',
        'port' => '61613',
        'user' => 'artemis',
        'password' => 'artemis',
        'ssl' => false
    ]
]
```

<InlineAlert variant="info" slots="text"/>

The `default_connection` parameter is required only when multiple brokers are configured. When only one broker is configured, the system uses it automatically. The `connection` attribute in XML configuration files is optional—omit it to use the default broker, or specify `connection="amqp"` or `connection="stomp"` to force a specific broker.

### Update `queue_consumer.xml` files

All `<consumer>` attributes (`name`, `queue`, `handler`, `consumerInstance`, `maxMessages`) remain unchanged. The only difference is the `connection` attribute:

| Attribute | Change in 2.4.5+ |
| --- | --- |
| `connection` | Now also supports `stomp` value. Optional in both versions—auto-detected from `env.php`. Specify explicitly to force a specific broker. |

**2.4.4 Example:**

```xml
<consumer name="example.consumer" queue="example.queue" connection="amqp" maxMessages="100" />
```

**2.4.5+ Example (Uses default broker from env.php):**

```xml
<consumer name="example.consumer" queue="example.queue" maxMessages="100" />
```

**2.4.5+ Example (Explicitly specifies broker):**

```xml
<!-- Force this consumer to use AMQP even if multiple brokers are configured -->
<consumer name="example.consumer" queue="example.queue" connection="amqp" maxMessages="100" />

<!-- Force this consumer to use STOMP even if multiple brokers are configured -->
<consumer name="example.consumer" queue="example.queue" connection="stomp" maxMessages="100" />
```

### Update `queue_publisher.xml` files

The `topic` and `disabled` attributes remain unchanged. Key differences in 2.4.5+:

| Attribute | Change in 2.4.5+ |
| --- | --- |
| `<publisher>/queue` | New attribute for ActiveMQ Artemis |
| `<connection>/name` | Can now specify `stomp` for ActiveMQ |
| `<connection>/exchange` | Not used with STOMP connections |
| `<connection>/disabled` | Enhanced support for multiple connections |

**2.4.4 Example (RabbitMQ only):**

```xml
<publisher topic="example.topic">
    <connection name="amqp" exchange="magento" />
</publisher>
```

**2.4.5+ Example (RabbitMQ):**

```xml
<publisher topic="example.topic">
    <connection name="amqp" exchange="magento" disabled="false"/>
    <connection name="db" disabled="true"/>
</publisher>
```

**2.4.5+ Example (ActiveMQ Artemis):**

```xml
<publisher topic="example.topic" queue="example.queue">
    <connection name="stomp" disabled="false"/>
    <connection name="db" disabled="true"/>
</publisher>
```

### Update `queue_topology.xml` files

All `<exchange>` and `<binding>` attributes (`name`, `type`, `durable`, `autoDelete`, `id`, `topic`, `destinationType`, `destination`) remain unchanged. The only difference is the `connection` attribute:

| Attribute | Change in 2.4.5+ |
| --- | --- |
| `connection` | Now also supports `stomp` value. Optional in both versions—auto-detected from `env.php`. Specify explicitly to force a specific broker. |

**2.4.4 Example:**

```xml
<exchange name="magento" type="topic" connection="amqp">
    <binding id="example.binding" topic="example.topic" destinationType="queue" destination="example.queue"/>
</exchange>
```

**2.4.5+ Example (Uses default broker from env.php):**

```xml
<exchange name="magento" type="topic">
    <binding id="example.binding" topic="example.topic" destinationType="queue" destination="example.queue"/>
</exchange>
```

**2.4.5+ Example (Explicitly specifies broker):**

```xml
<!-- Force this exchange to use AMQP even if multiple brokers are configured -->
<exchange name="magento" type="topic" connection="amqp">
    <binding id="example.binding" topic="example.topic" destinationType="queue" destination="example.queue"/>
</exchange>

<!-- Force this exchange to use STOMP even if multiple brokers are configured -->
<exchange name="magento" type="topic" connection="stomp">
    <binding id="example.binding" topic="example.topic" destinationType="queue" destination="example.queue"/>
</exchange>
```

<InlineAlert variant="info" slots="text"/>

Connection detection is dynamic based on your `env.php` configuration. In 2.4.5+, this detection supports both AMQP and STOMP, allowing you to omit connection declarations in XML files.

## Legacy migrations

The following sections document migration paths for older Adobe Commerce versions. These are provided for reference when upgrading from legacy installations.

### Migrate from 2.1 to 2.2

To upgrade the message queues for Adobe Commerce or Magento Open Source 2.1, you must create the following files in the `<module>/etc` directory for each module that will use the message queue framework.

- `queue_consumer.xml`—Defines the relationship between an existing queue and its consumer.
- `queue_topology.xml`—Defines the message routing rules and declares queues and exchanges.
- `queue_publisher.xml`—Defines the exchange where a topic is published.

The existing `queue.xml` file is deprecated.

For complete details about these files, see [Configure message queues](configuration.md)

<InlineAlert variant="warning" slots="text"/>

The Adobe Commerce and Magento Open Source 2.1 `communication.xml` file has not changed for Adobe Commerce and Magento Open Source 2.2.

#### Create the `queue_consumer.xml` file

| 2.2 Attribute | 2.1 queue.xml source |
| --- | --- |
| `<consumer>/name` | `<broker>/<queue>/consumer` |
| `<consumer>/queue` | `<broker>/<queue>/name` |
| `<consumer>/handler` | `<broker>/<queue>/handler` |
| `<consumer>/consumerInstance` | `<broker>/<queue>/consumerInstance` |
| `<consumer>/connection` | `<broker>/type` |
| `<consumer>/maxMessages` | `<broker>/<queue>/maxMessages` |

#### Create the `queue_topology.xml` file

| 2.2 Attribute | 2.1 queue.xml source |
| --- | --- |
| `<exchange>/name` | `<broker>/exchange` |
| `<exchange>/type` | Not present in 2.1. Set this value to `topic`. |
| `<exchange>/connection` | `<broker>/type` |
| `<exchange>/durable` | Not present in 2.1. Omit this parameter to accept the default value. |
| `<exchange>/autoDelete` | Not present in 2.1. Omit this parameter to accept the default value. |
| `<exchange>/internal` | Not present in 2.1. Omit this parameter to accept the default value. |
| `<exchange>/<binding>/id` | Not present in 2.1. Concatenate the 2.1 exchange name, topic name, and queue name to create a value for the `id` parameter. |
| `<exchange>/<binding>/topic` | `<broker>/topic` |
| `<exchange>/<binding>/destinationType` | Not present in 2.1. This value must be set to `queue`. |
| `<exchange>/<binding>/destination` | `<broker>/<queue>/name` |
| `<exchange>/<binding>/disabled` | Not present in 2.1. Omit this parameter to accept the default value. |
| `<exchange>/<arguments>` and `<exchange>/<binding>/<arguments>` | Not present in 2.1. Omit this element. |

#### Create the `queue_publisher.xml` file

| 2.2 Attribute | 2.1 queue.xml source |
| --- | --- |
| `<publisher>/topic` | `<broker>/topic` |
| `<publisher>/disabled` | Not present in 2.1. Omit this parameter to accept the default value. |
| `<publisher>/<connection>/name` | `<broker>/type` |
| `<publisher>/<connection>/exchange` | `<broker>/exchange` |
| `<publisher>/<connection>/disabled` | Not present in 2.1. Omit this parameter to accept the default value. |

### Migrate from 2.0 to 2.2

To upgrade from Adobe Commerce or Magento Open Source 2.0, you must create the following files in the `<module>/etc` directory for each module that will use the message queue framework.

- `queue_consumer.xml` - Defines the relationship between an existing queue and its consumer.
- `queue_topology.xml`—Defines the message routing rules.
- `queue_publisher.xml`—Defines the relationship between a topic and its publisher.

The existing `queue.xml` file is deprecated.

For complete details about these files, see [Configure message queues](configuration.md)

#### Create the `queue_consumer.xml` file

| 2.2 Attribute | 2.0 queue.xml source |
| --- | --- |
| `<consumer>/name` | `<consumer>/name` |
| `<consumer>/queue` | `<consumer>/queue` |
| `<consumer>/handler` | Use the values from `<consumer>/class` and `<consumer>/method` in the format `<Vendor>\Module\<ServiceName>::<methodName>`. |
| `<consumer>/consumerInstance` | `<consumer>/executor` |
| `<consumer>/connection` | `<consumer>/connection` |
| `<consumer>/maxMessages` | `<consumer>/max_messages` |

#### Create the `queue_topology.xml` file

| 2.2 Attribute | 2.0 queue.xml source |
| --- | --- |
| `<exchange>/name` | `<publisher>/exchange` |
| `<exchange>/type` | Not present in 2.0. Set this value to `topic`. |
| `<exchange>/connection` | `<publisher>/connection` |
| `<exchange>/durable` | Not present in 2.0. Omit this parameter to accept the default value. |
| `<exchange>/autoDelete` | Not present in 2.0. Omit this parameter to accept the default value. |
| `<exchange>/internal` | Not present in 2.0. Omit this parameter to accept the default value. |
| `<exchange>/<binding>/id` | Not present in 2.0. Concatenate the exchange name, topic name, and queue name to create a value for the `id` parameter. |
| `<exchange>/<binding>/topic` | `<bind>/topic` |
| `<exchange>/<binding>/destinationType` | Not present in 2.0. This value must be set to `queue`. |
| `<exchange>/<binding>/destination` | `<bind>/queue` |
| `<exchange>/<binding>/disabled` | Not present in 2.0. Omit this parameter to accept the default value. |
| `<arguments>` | Not present in 2.0. Omit this element. |

#### Create the `queue_publisher.xml` file

| 2.2 Attribute | 2.0 queue.xml source |
| --- | --- |
| `<publisher>/topic` | `<topic>/name` |
| `<publisher>/disabled` | Not present in 2.0. Omit this parameter to accept the default value. |
| `<publisher>/<connection>/name` | `<publisher>/connection` |
| `<publisher>/<connection>/exchange` | `<publisher>/exchange` |
| `<publisher>/<connection>/disabled` | Not present in 2.0. Omit this parameter to accept the default value. |
