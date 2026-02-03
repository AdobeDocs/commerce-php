---
title: Message Queues | Commerce PHP Extensions
description: Learn about the Message Queue Framework (MQF) for asynchronous communication in Adobe Commerce and how to configure different messaging brokers.
role: Admin, Developer
keywords:
  - Extensions
---

# Message queues

Message queues provide an asynchronous communications mechanism in which the sender and the receiver of a message do not contact each other directly. When a sender places a message onto a queue, the message is stored until the recipient receives it.

## Message Queue Framework overview

The Adobe Commerce Message Queue Framework (MQF) is a fully-functional system that allows a module to publish messages to queues and create consumers to receive them asynchronously.

The MQF supports the following messaging brokers:

| Broker | Protocol | Description |
| --- | --- | --- |
| [RabbitMQ](http://www.rabbitmq.com) | AMQP 0.9.1 | The primary messaging broker with a scalable platform for sending and receiving messages. Includes a mechanism for storing undelivered messages. |
| [Apache ActiveMQ Artemis](https://activemq.apache.org/components/artemis/) | STOMP | An alternative messaging broker using Simple Text Oriented Messaging Protocol (STOMP) for reliable and scalable messaging. |
| MySQL adapter | Database | A basic message queue system that stores messages in the database using three tables: `queue`, `queue_message`, and `queue_message_status`. Cron jobs ensure consumers receive messages. |

<InlineAlert variant="info" slots="text"/>

The MySQL adapter is not scalable. Use an external message broker like RabbitMQ or ActiveMQ Artemis for production environments whenever possible.

See [Configure message queues](configuration.md) for information about setting up the message queue system.

## Publish messages to a queue

Use the `publish` method defined in `PublisherInterface` to send a message to the queue:

```php
$publisher->publish($topic, $message);
```

When using the MySQL adapter, a message published to multiple queues creates:

- A single record in `queue_message`
- Multiple records in `queue_message_status` (one for each queue)

Retrieving these messages requires a join on the `queue`, `queue_message`, and `queue_message_status` tables.

## Instantiate consumers

The procedure for instantiating a consumer differs depending on the message queue system.

### RabbitMQ and ActiveMQ Artemis

For external brokers, consumers are defined in a [`queue_consumer.xml`](configuration.md#queue_consumerxml) file. The consumer listens to the queue, receives messages, and invokes a callback method for each one.

The following example instantiates the `customer_created_listener` consumer, which calls `Magento\Some\Class::processMessage($message)` for each message:

```php
$this->consumerFactory->get('customer_created_listener')
    ->process();
```

### MySQL adapter

For the MySQL adapter, implement `ConsumerInterface::process($maxNumberOfMessages)` and perform the following steps:

1. Get the queue name using `ConsumerConfigurationInterface::getQueueName`.
1. Select `$maxNumberOfMessages` records, filtering on `queue_name`. Join all three tables (`queue`, `queue_message`, `queue_message_status`). Extract fewer records at a time to improve load distribution across consumers.
1. Decode the message using the topic name from `ConsumerConfigurationInterface`.
1. Invoke `ConsumerConfigurationInterface::getCallback` with the decoded data.

## Switch from MySQL to an external broker

You can switch from the MySQL adapter to an external message broker by adding runtime configuration to redefine the adapter for a topic. The configuration disables the `db` connection and enables the external broker connection.

The following example shows how to switch a topic to an external broker. Replace the placeholder values based on your broker:

| Broker | Publisher value | Connection name |
| --- | --- | --- |
| RabbitMQ | `amqp-magento` | `amqp` |
| ActiveMQ Artemis | `stomp-magento` | `stomp` |

```php
'queue' => [
    'topics' => [
        '<topic.name>' => [
            'publisher' => '<amqp-magento|stomp-magento>'
        ]
    ],
    'config' => [
        'publishers' => [
            '<topic.name>' => [
                'connections' => [
                    '<amqp|stomp>' => [
                        'name' => '<amqp|stomp>',
                        'exchange' => 'magento',
                        'disabled' => false
                    ],
                    'db' => [
                        'name' => 'db',
                        'exchange' => 'magento',
                        'disabled' => true
                    ]
                ]
            ]
        ]
    ],
    'consumers' => [
        '<topic.name>' => [
            'connection' => '<amqp|stomp>',
        ]
    ]
],
```

For example, to switch the `product_action_attribute.update` topic to RabbitMQ, use `amqp-magento` as the publisher and `amqp` as the connection name.
