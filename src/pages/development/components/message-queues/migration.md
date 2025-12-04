---
title: Migrate Configuration | Commerce PHP Extensions
description: Use these examples to migrate your message queue configuration between 2.x versions of Adobe Commerce and Magento Open Source.
keywords:
  - Configuration
  - Extensions
---

# Migrate message queue configuration

## Migrate from 2.4.4 to 2.4.5, 2.4.6, 2.4.7, 2.4.8, 2.4.9

Adobe Commerce 2.4.9 introduced support for Apache ActiveMQ Artemis (STOMP) as an alternative message broker to RabbitMQ (AMQP). This feature was also backported to versions 2.4.5, 2.4.6, 2.4.7, and 2.4.8. When upgrading from 2.4.4 (or earlier) to 2.4.5 or later versions, you have the option to continue using RabbitMQ or migrate to ActiveMQ Artemis.

### Key Changes in 2.4.5+

- **ActiveMQ Artemis (STOMP) Support**: New message broker option alongside RabbitMQ (introduced in 2.4.9, backported to 2.4.5, 2.4.6, 2.4.7, 2.4.8)
- **Extended Dynamic Connection Detection**: Existing dynamic connection detection now supports STOMP in addition to AMQP
- **Enhanced SSL Configuration**: Improved SSL options for both brokers
- **Multiple Named Connections**: Enhanced support for configuring multiple broker connections

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

**For ActiveMQ Artemis (STOMP) - Available in 2.4.5+ (introduced in 2.4.9, backported to 2.4.5-2.4.8):**

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

**For Both Brokers - Available in 2.4.5+ (requires `default_connection`):**

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

The `default_connection` parameter is only required when multiple message brokers are configured. When only one broker (AMQP or STOMP) is configured, the system automatically uses the available broker.

<InlineAlert variant="info" slots="text"/>

The `connection` attribute in XML configuration files (`queue_consumer.xml`, `queue_publisher.xml`, `queue_topology.xml`) is optional when you want to use the default broker from `env.php`. However, you can explicitly specify `connection="amqp"` or `connection="stomp"` when you want a particular module or functionality to use a specific broker, even when multiple brokers are configured.

### Update `queue_consumer.xml` Files

The first column in the following table lists parameters in 2.4.5+ `queue_consumer.xml` files. The second column shows the equivalent in 2.4.4.

| 2.4.5+ Attribute | 2.4.4 Equivalent | Notes |
| ----------------- | ----------------- | ----- |
| `<consumer>/name` | `<consumer>/name` | No change |
| `<consumer>/queue` | `<consumer>/queue` | No change |
| `<consumer>/handler` | `<consumer>/handler` | No change |
| `<consumer>/consumerInstance` | `<consumer>/consumerInstance` | No change |
| `<consumer>/connection` | `<consumer>/connection` | Optional in both versions, auto-detected from env.php. In 2.4.5+ also supports STOMP. Use explicitly to force specific broker selection. |
| `<consumer>/maxMessages` | `<consumer>/maxMessages` | No change |

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

### Update `queue_publisher.xml` Files

The first column in the following table lists parameters in 2.4.5+ `queue_publisher.xml` files. The second column shows the equivalent in 2.4.4.

| 2.4.5+ Attribute | 2.4.4 Equivalent | Notes |
| ----------------- | ----------------- | ----- |
| `<publisher>/topic` | `<publisher>/topic` | No change |
| `<publisher>/queue` | Not available | Available in 2.4.5+ for ActiveMQ Artemis |
| `<publisher>/disabled` | `<publisher>/disabled` | No change |
| `<publisher>/<connection>/name` | `<publisher>/<connection>/name` | Can specify `stomp` for ActiveMQ (2.4.5+) |
| `<publisher>/<connection>/exchange` | `<publisher>/<connection>/exchange` | Not used with STOMP |
| `<publisher>/<connection>/disabled` | `<publisher>/<connection>/disabled` | Enhanced in 2.4.5+ for multiple connections |

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

### Update `queue_topology.xml` Files

The first column in the following table lists parameters in 2.4.5+ `queue_topology.xml` files. The second column shows the equivalent in 2.4.4.

| 2.4.5+ Attribute | 2.4.4 Equivalent | Notes |
| ----------------- | ----------------- | ----- |
| `<exchange>/name` | `<exchange>/name` | No change |
| `<exchange>/type` | `<exchange>/type` | No change |
| `<exchange>/connection` | `<exchange>/connection` | Optional in both versions, auto-detected from env.php. In 2.4.5+ also supports STOMP. Use explicitly to force specific broker selection. |
| `<exchange>/durable` | `<exchange>/durable` | No change |
| `<exchange>/autoDelete` | `<exchange>/autoDelete` | No change |
| `<exchange>/<binding>/id` | `<exchange>/<binding>/id` | No change |
| `<exchange>/<binding>/topic` | `<exchange>/<binding>/topic` | No change |
| `<exchange>/<binding>/destinationType` | `<exchange>/<binding>/destinationType` | No change |
| `<exchange>/<binding>/destination` | `<exchange>/<binding>/destination` | No change |

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

Connection detection has always been dynamic based on your `env.php` configuration. If AMQP is configured in deployment configuration, the AMQP connection is used automatically. In 2.4.5+, this same dynamic detection was extended to support STOMP connections. This allows you to omit connection declarations in XML configuration files.

<InlineAlert variant="info" slots="text"/>

ActiveMQ Artemis (STOMP) was introduced in Adobe Commerce 2.4.9 and backported to versions 2.4.5, 2.4.6, 2.4.7, and 2.4.8. For STOMP connections, use ANYCAST addressing mode for point-to-point message delivery and load balancing across multiple consumers.

## Migrate from 2.1 to 2.2

To upgrade the message queues for Adobe Commerce or Magento Open Source 2.1, you must create the following files in the `<module>/etc` directory for each module that will use the message queue framework.

- `queue_consumer.xml` - Defines the relationship between an existing queue and its consumer.
- `queue_topology.xml`- Defines the message routing rules and declares queues and exchanges.
- `queue_publisher.xml` -   Defines the exchange where a topic is published.

The existing `queue.xml` file is deprecated.

For complete details about these files, see [Configure message queues](configuration.md)

<InlineAlert variant="warning" slots="text"/>

The Adobe Commerce and Magento Open Source 2.1 `communication.xml` file has not changed for Adobe Commerce and Magento Open Source 2.2.

### Create the `queue_consumer.xml` file

The first column in the following table lists the all the parameters in the `queue_consumer.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.1 `queue.xml` file the equivalent parameters are located.

| 2.2 Attribute  | 2.1 queue.xml source |
| ---------------- | ----------- |
`<consumer>/name`   | `<broker>/<queue>/consumer`
`<consumer>/queue`  | `<broker>/<queue>/name`
`<consumer>/handler`          | `<broker>/<queue>/handler`
`<consumer>/consumerInstance`  | `<broker>/<queue>/consumerInstance`
`<consumer>/connection`       | `<broker>/type`
`<consumer>/maxMessages`     | `<broker>/<queue>/maxMessages`

### Create the `queue_topology.xml` file

The first column in the following table lists the all the parameters in the `queue_topology.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.1 `queue.xml` file the equivalent parameters are located.

| 2.2 Attribute  | 2.1 queue.xml source |
| ---------------- | -----------|
`<exchange>/name` | `<broker>/exchange`
`<exchange>/type` | Not present in 2.1. Set this value to `topic`.
`<exchange>/connection` | `<broker>/type`
`<exchange>/durable` | Not present in 2.1. Omit this parameter to accept the default value.
`<exchange>/autoDelete` | Not present in 2.1. Omit this parameter to accept the default value.
`<exchange>/internal` | Not present in 2.1. Omit this parameter to accept the default value.
`<exchange>/<binding>/id` | Not present in 2.1. It is recommended that you concatenate the 2.1 exchange name, topic name, and queue name to create a value for the `id` parameter.
`<exchange>/<binding>/topic` | `<broker>/topic`
`<exchange>/<binding>/destinationType` | Not present in 2.1. This value must be set to `queue`.
`<exchange>/<binding>/destination` | `<broker>/<queue>/name`
`<exchange>/<binding>/disabled` | Not present in 2.1. Omit this parameter to accept the default value.
`<exchange>/<arguments>` and `<exchange>/<binding>/<arguments>` | Not present in 2.1. Omit this element.

### Create the `queue_publisher.xml` file

The first column in the following table lists the all the parameters in the `queue_publisher.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.1 `queue.xml` file the equivalent parameters are located.

| 2.2 Attribute  | 2.1 queue.xml source |
| ---------------- | ----------- |
`<publisher>/topic` | `<broker>/topic`
`<publisher>/disabled` | Not present in 2.1. Omit this parameter to accept the default value.
`<publisher>/<connection>/name` | `<broker>/type`
`<publisher>/<connection>/exchange` | `<broker>exchange`
`<publisher>/<connection>/disabled` | Not present in 2.1. Omit this parameter to accept the default value.

## Migrate from 2.0 to 2.2

To upgrade from Adobe Commerce or Magento Open Source 2.0, you must create the following files in the `<module>/etc` directory for each module that will use the message queue framework.

- `queue_consumer.xml` - Defines the relationship between an existing queue and its consumer.
- `queue_topology.xml`- Defines the message routing rules.
- `queue_publisher.xml` - Defines the relationship between a topic and its publisher.

The existing `queue.xml` file is deprecated.

For complete details about these files, see [Configure message queues](configuration.md)

### Create the `queue_consumer.xml` file

The first column in the following table lists the all the parameters in the `queue_consumer.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.0 `queue.xml` file the equivalent parameters are located.

2.2 Attribute        | 2.0 queue.xml Source
---------------- | -----------
`<consumer>/name`   | `<consumer>/name`
`<consumer>/queue`  | `<consumer>/queue`
`<consumer>/handler`          | Use the values from `<consumer>/class` and `<consumer>/method` in the format `<Vendor>\Module\<ServiceName>::<methodName>`.
`<consumer>/consumerInstance` | `<consumer>/executor`
`<consumer>/connection`       |  `<consumer>/connection`
`<consumer>/maxMessages`     | `<consumer>/max_messages`

### Create the `queue_topology.xml` file

The first column in the following table lists the all the parameters in the `queue_topology.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.0 `queue.xml` file the equivalent parameters are located.

| 2.2 Attribute  | 2.0 queue.xml Source |
| ---------------- | -----------|
`<exchange>/name` | `<publisher>/exchange`
`<exchange>/type` | Not present in 2.0. Set this value to `topic`.
`<exchange>/connection` | `<publisher>/connection`
`<exchange>/durable` | Not present in 2.0. Omit this parameter to accept the default value.
`<exchange>/autoDelete` | Not present in 2.0. Omit this parameter to accept the default value.
`<exchange>/internal` | Not present in 2.0. Omit this parameter to accept the default value.
`<exchange>/<binding>/id` | Not present in 2.0. It is recommended that you concatenate the 2.1 exchange name, topic name, and queue name to create a value for the `id` parameter.
`<exchange>/<binding>/topic` | `<bind>/topic`
`<exchange>/<binding>/destinationType` | Not present in 2.0. This value must be set to `queue`.
`<exchange>/<binding>/destination` | `<bind>/queue`
`<exchange>/<binding>/disabled` | Not present in 2.0. Omit this parameter to accept the default value.
`<arguments>` | Not present in 2.0. Omit this element.

### Create the `queue_publisher.xml` file

The first column in the following table lists the all the parameters in the `queue_publisher.xml` file. The second column lists where in the Adobe Commerce and Magento Open Source 2.0 `queue.xml` file the equivalent parameters are located.

| 2.2 Attribute  | 2.0 queue.xml Source |
| ---------------- | ----------- |
`<publisher>/topic` | `<topic>/name`
`<publisher>/disabled` | Not present in 2.0. Omit this parameter to accept the default value.
`<publisher>/<connection>/name` | `<publisher>/connection`
`<publisher>/<connection>/exchange` | `<publisher>/exchange`
`<publisher>/<connection>/disabled` | Not present in 2.0. Omit this parameter to accept the default value.
