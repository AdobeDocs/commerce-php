---
title: Message Queues | Commerce PHP Extensions
description: Review an introduction to the message queue system in Adobe Commerce and Magento Open Source.
keywords:
  - Extensions
---

# Message queues

Message queues provide an asynchronous communications mechanism in which the sender and the receiver of a message do not contact each other, nor do they need to communicate with the message queue at the same time. When a sender places a message onto a queue, it is stored until the recipient receives them.

In Adobe Commerce and Magento Open Source, the Message Queue Framework (MQF) is a fully-functional system that allows a module to publish messages to queues. It also creates consumers to receive them asynchronously. The MQF primarily uses [RabbitMQ](http://www.rabbitmq.com) as the messaging broker, which provides a scalable platform for sending and receiving messages. It also includes a mechanism for storing undelivered messages. RabbitMQ is based on the Advanced Message Queuing Protocol (AMQP) 0.9.1 specification.

A basic message queue system can also be set up without using RabbitMQ. In this system, a MySQL adapter stores messages in the database. Three database tables (`queue`, `queue_message`, and `queue_message_status`) manage the message queue workload. Cron jobs ensure the consumers are able to receive messages. This solution is not very scalable. RabbitMQ should be used whenever possible.

See [Configure message queues](configuration.md) for information about setting up the message queue system.

## Send a message from the publisher to a queue

The following code sends a message to the queue. The `publish` method is defined in `PublisherInterface`

```php
$publisher->publish($topic, $message)
```

In a MySQL adapter environment, a message that is published to multiple queues creates a single record in `queue_message` and multiple records in `queue_message_status`: one for each queue. (A join on the `queue`, `queue_message`, and `queue_message_status` tables is required).

## Instantiate a consumer

The procedure for instantiating a consumer differs, depending on which message queue system is being used.

### RabbitMQ

This instantiates a consumer that is defined in a [`queue_consumer.xml`](configuration.md#queue_consumerxml) file. The consumer (`customer_created_listener`) listens to the queue and receives all new messages. For every message, it invokes `Magento\Some\Class::processMessage($message)`

```php
$this->consumerFactory->get('customer_created_listener')
    ->process();
```

### MySQL adapter

Implement `\Magento\Framework\MessageQueue\ConsumerInterface::process($maxNumberOfMessages)` to instantiate a consumer.

Perform the following actions:

1. Define the queue name associated with current consumer using `\Magento\Framework\MessageQueue\ConsumerConfigurationInterface::getQueueName`.
1. Select `$maxNumberOfMessages` message records, filtering on the `queue_name` field. You must join on all 3 tables. To accomplish this, you may want to extract fewer records at a time to improve load distribution between multiple consumers.
1. Decode the message using topic name taken from the `\Magento\Framework\MessageQueue\ConsumerConfigurationInterface`.
1. Invoke callback `Magento\Framework\MessageQueue\ConsumerConfigurationInterface::getCallback` and pass the decoded data as an argument.

## Change message queue from MySQL to AMQP

The following sample introduces a runtime configuration that allows you to redefine the adapter for a topic.

```php
'queue' => [
    'topics' => [
        'product_action_attribute.update' => [
            'publisher' => 'amqp-magento'
        ]
    ],
    'config' => [
        'publishers' => [
            'product_action_attribute.update' => [
                'connections' => [
                    'amqp' => [
                        'name' => 'amqp',
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
        'product_action_attribute.update' => [
            'connection' => 'amqp',
        ],
    ],
],
```
