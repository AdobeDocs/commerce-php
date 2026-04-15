---
title: Example bulk operations implementation
description: Learn how to implement bulk operations for asynchronous processing in Adobe Commerce.
keywords:
  - Extensions
---

# Example bulk operations implementation

This topic explains how to implement bulk operations in Adobe Commerce. Bulk operations allow you to process large sets of data asynchronously using message queues.

Implementation requires three components:

* **Publisher** - Sends messages to the message queue
* **Consumer** - Receives and processes messages from the queue
* **Message queue configuration** - Defines the queue topology and routing

## Create a publisher

The publisher schedules bulk operations by performing these tasks:

* Generating a unique `bulkUuid` for the operation
* Publishing each operation to the message queue
* Tracking and reporting operation status

The following example demonstrates a publisher implementation:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

use Magento\AsynchronousOperations\Api\Data\OperationInterface;
use Magento\AsynchronousOperations\Api\Data\OperationInterfaceFactory;
use Magento\Authorization\Model\UserContextInterface;
use Magento\Framework\Bulk\BulkManagementInterface;
use Magento\Framework\DataObject\IdentityGeneratorInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Json\Helper\Data as JsonHelper;
use Magento\Framework\UrlInterface;

/**
 * Class ScheduleBulk
 */
class ScheduleBulk
{
    /**
     * @var BulkManagementInterface
     */
    private $bulkManagement;

    /**
     * @var OperationInterfaceFactory
     */
    private $operationFactory;

    /**
     * @var IdentityGeneratorInterface
     */
    private $identityService;

    /**
     * @var UrlInterface
     */
    private $urlBuilder;

    /**
     * @var UserContextInterface
     */
    private $userContext;

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * ScheduleBulk constructor.
     *
     * @param BulkManagementInterface $bulkManagement
     * @param OperationInterfaceFactory $operationFactory
     * @param IdentityGeneratorInterface $identityService
     * @param UserContextInterface $userContextInterface
     * @param UrlInterface $urlBuilder
     */
    public function __construct(
        BulkManagementInterface $bulkManagement,
        OperationInterfaceFactory $operationFactory,
        IdentityGeneratorInterface $identityService,
        UserContextInterface $userContextInterface,
        UrlInterface $urlBuilder,
        JsonHelper $jsonHelper
    ) {
        $this->userContext = $userContextInterface;
        $this->bulkManagement = $bulkManagement;
        $this->operationFactory = $operationFactory;
        $this->identityService = $identityService;
        $this->urlBuilder = $urlBuilder;
        $this->jsonHelper = $jsonHelper;

    }

    /**
     * Schedule new bulk operation
     *
     * @param array $operationData
     * @throws LocalizedException
     * @return void
     */
    public function execute($operationData)
    {
        $operationCount = count($operationData);
        if ($operationCount > 0) {
            $bulkUuid = $this->identityService->generateId();
            $bulkDescription = 'Specify here your bulk description';

            $operations = [];
            foreach ($operationData as $operation) {

                $serializedData = [
                    //this data will be displayed in Failed item grid in ID column
                    'entity_id' => $operation['entity_id'],
                    //add here logic to add url for your entity(this link will be displayed in the Failed item grid)
                    'entity_link' => $this->urlBuilder->getUrl('your_url'),
                    //this data will be displayed in Failed item grid in the column "Meta Info"
                    'meta_information' => 'Specify here meta information for your entity',//this data will be displayed in Failed item grid in the column "Meta Info"
                ];
                $data = [
                    'data' => [
                        'bulk_uuid' => $bulkUuid,
                        //topic name must be equal to data specified in the queue configuration files
                        'topic_name' => '%your_topic name%',
                        'serialized_data' => $this->jsonHelper->jsonEncode($serializedData),
                        'status' => OperationInterface::STATUS_TYPE_OPEN,
                    ]
                ];

                /** @var OperationInterface $operation */
                $operation = $this->operationFactory->create($data);
                $operations[] = $operation;

            }
            $userId = $this->userContext->getUserId();
            $result = $this->bulkManagement->scheduleBulk($bulkUuid, $operations, $bulkDescription, $userId);
            if (!$result) {
                throw new LocalizedException(
                    __('Something went wrong while processing the request.')
                );
            }
        }
    }
}
```

## Create a consumer

The consumer receives messages from the queue and updates the operation status after processing. The following example shows a consumer that handles price update operations:

```php
<?php
/**
 * Copyright [first year code created] Adobe
 * All rights reserved.
 */

namespace Magento\SharedCatalog\Model\ResourceModel\ProductItem\Price;

use Magento\AsynchronousOperations\Api\Data\OperationInterface;
use Magento\AsynchronousOperations\Api\Data\OperationInterfaceFactory;
use Magento\Framework\Bulk\BulkManagementInterface;
use Magento\Framework\Bulk\OperationManagementInterface;
use Magento\Framework\DB\Adapter\ConnectionException;
use Magento\Framework\DB\Adapter\DeadlockException;
use Magento\Framework\DB\Adapter\LockWaitException;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Exception\TemporaryStateExceptionInterface;
use Magento\Framework\Json\Helper\Data as JsonHelper;
use Psr\Log\LoggerInterface;

/**
 * Class Consumer
 */
class Consumer
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * @var OperationManagementInterface
     */
    private $operationManagement;

    /**
     * Consumer constructor.
     *
     * @param LoggerInterface $logger
     * @param JsonHelper $jsonHelper
     */
    public function __construct(
        LoggerInterface $logger,
        JsonHelper $jsonHelper,
        OperationManagementInterface $operationManagement
    ) {
        $this->logger = $logger;
        $this->jsonHelper = $jsonHelper;
        $this->operationManagement = $operationManagement;
    }

    /**
     * Processing operation for update price
     *
     * @param OperationInterface $operation
     * @return void
     */
    public function processOperation(OperationInterface $operation)
    {
        $status = OperationInterface::STATUS_TYPE_COMPLETE;
        $errorCode = null;
        $message = null;
        $serializedData = $operation->getSerializedData();
        $unserializedData = $this->jsonHelper->jsonDecode($serializedData);
        try {
            //add here your own logic for async operations
        } catch (\Zend_Db_Adapter_Exception  $e) {
            //here sample how to process exceptions if they occurred
            $this->logger->critical($e->getMessage());
            //you can add here your own type of exception when operation can be retried
            if (
                $e instanceof LockWaitException
                || $e instanceof DeadlockException
                || $e instanceof ConnectionException
            ) {
                $status = OperationInterface::STATUS_TYPE_RETRIABLY_FAILED;
                $errorCode = $e->getCode();
                $message = __($e->getMessage());
            } else {
                $status = OperationInterface::STATUS_TYPE_NOT_RETRIABLY_FAILED;
                $errorCode = $e->getCode();
                $message = __('Sorry, something went wrong during product prices update. Please see log for details.');
            }

        } catch (NoSuchEntityException $e) {
            $this->logger->critical($e->getMessage());
            $status = ($e instanceof TemporaryStateExceptionInterface) ? OperationInterface::STATUS_TYPE_NOT_RETRIABLY_FAILED : OperationInterface::STATUS_TYPE_NOT_RETRIABLY_FAILED;
            $errorCode = $e->getCode();

            $message = $e->getMessage();
            unset($unserializedData['entity_link']);
            $serializedData = $this->jsonHelper->jsonEncode($unserializedData);
        } catch (LocalizedException $e) {
            $this->logger->critical($e->getMessage());
            $status = OperationInterface::STATUS_TYPE_NOT_RETRIABLY_FAILED;
            $errorCode = $e->getCode();
            $message = $e->getMessage();
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
            $status = OperationInterface::STATUS_TYPE_NOT_RETRIABLY_FAILED;
            $errorCode = $e->getCode();
            $message = __('Sorry, something went wrong during product prices update. Please see log for details.');
        }

        //update operation status based on result performing operation(it was successfully executed or exception occurs
        $this->operationManagement->changeOperationStatus(
            $operation->getId(),
            $status,
            $errorCode,
            $message,
            $serializedData
        );
    }
}
```

## Configure message queues

Configure the message queue topology by creating or editing the following files in the `app/code/<vendor>/<module_name>/etc` directory:

* `communication.xml`
* `di.xml`
* `queue_consumer.xml`
* `queue_publisher.xml`
* `queue_topology.xml`

For more information about `di.xml`, see [Dependency Injection](../dependency-injection.md). For information about the other files, see [Configure message queues](configuration.md).

### communication.xml

The `communication.xml` file defines message queue topics for the module:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Communication/etc/communication.xsd">
    <topic name="<your_topic_name>" request="Magento\AsynchronousOperations\Api\Data\OperationInterface">
        <handler name="<your_handler_name>" type="<Consumer_Class>" method="<consumer_method>" />
    </topic>
</config>
```

### di.xml

Add the following type to the module's `di.xml` file:

```xml
<type name="Magento\Framework\MessageQueue\MergerFactory">
    <arguments>
        <argument name="mergers" xsi:type="array">
            <item name="<your_consumer_name>" xsi:type="string"><Merger_Class></item>
        </argument>
    </arguments>
</type>
```

### queue_consumer.xml

The `queue_consumer.xml` file defines the relationship between a queue and its consumer:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/consumer.xsd">
    <consumer name="<consumer_name>" queue="<queue_name>" consumerInstance="Magento\Framework\MessageQueue\Consumer" handler="<Consumer_Class>::<Consumer_method>"/>
</config>
```

The connection type (AMQP or STOMP) is determined automatically from the `env.php` configuration.

### queue_publisher.xml

The `queue_publisher.xml` file defines the exchange where a topic is published.

**For RabbitMQ (AMQP):**

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/publisher.xsd">
    <!-- Connection and exchange are resolved from app/etc/env.php configuration -->
    <publisher topic="<topic_name>" />
</config>
```

Alternatively, you can explicitly specify the connection and exchange:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/publisher.xsd">
    <publisher topic="<topic_name>">
        <connection name="amqp" exchange="magento" />
    </publisher>
</config>
```

**For ActiveMQ Artemis (STOMP):**

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/publisher.xsd">
    <publisher topic="<topic_name>" queue="<queue_name>" />
</config>
```

<InlineAlert variant="info" slots="text"/>

For ActiveMQ Artemis, the `<connection>` element is not required because the connection type is determined from `env.php`. If the topic name and queue name differ, specify the `queue` attribute in the `<publisher>` element.

### queue_topology.xml

The `queue_topology.xml` file defines message routing rules and declares queues and exchanges:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework-message-queue:etc/topology.xsd">
    <exchange name="magento" type="topic">
        <binding id="defaultBinding" topic="" destinationType="queue" destination="<queue_name>"/>
    </exchange>
</config>
```

<InlineAlert variant="info" slots="text"/>

Message queue connections are resolved dynamically from `env.php`. When AMQP or STOMP is configured, the corresponding connection is applied; otherwise, the database connection is used. You can omit connection declarations from `queue_consumer.xml`, `queue_publisher.xml`, and `queue_topology.xml` when using AMQP or STOMP. ActiveMQ Artemis (STOMP) was introduced in Adobe Commerce 2.4.5 and uses ANYCAST addressing mode for point-to-point message delivery and load balancing across multiple consumers. See [Message queue configuration files](configuration.md).
