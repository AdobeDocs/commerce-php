---
title: Response Handler
description: Process payment provider responses
---

# Response Handler

Response Handler is a component of the Adobe Commerce payment provider gateway, that processes payment provider responses.

Typically, the response requires one of the following actions:

-  Modify the [order status](https://glossary.magento.com/order-status)

-  Save information that was provided in a transaction response

-  Send an email

The response handler only modifies the order state, based on the [payment gateway](https://glossary.magento.com/payment-gateway) response. It does not perform any other required actions.

## Interface

Basic interface for a response handler is [`Magento\Payment\Gateway\Response\HandlerInterface`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Payment/Gateway/Response/HandlerInterface.php)

### Useful implementations

`\Magento\Payment\Gateway\Response\HandlerChain` might be used as a basic container of response handlers, handling different parts.

### Example

Example of a simple response handler ([`app/code/Magento/Braintree/Gateway/Response/PayPalDetailsHandler.php`](https://github.com/magento/magento2/tree/2.3/app/code/Magento/Braintree/Gateway/Response/PayPalDetailsHandler.php)):

```php
class PayPalDetailsHandler implements HandlerInterface
{
    const PAYMENT_ID = 'paymentId';

    const PAYER_EMAIL = 'payerEmail';

    /**
     * @var SubjectReader
     */
    private $subjectReader;

    /**
     * Constructor
     *
     * @param SubjectReader $subjectReader
     */
    public function __construct(SubjectReader $subjectReader)
    {
        $this->subjectReader = $subjectReader;
    }

    /**
     * @inheritdoc
     */
    public function handle(array $handlingSubject, array $response)
    {
        $paymentDO = $this->subjectReader->readPayment($handlingSubject);

        /** @var \Braintree\Transaction $transaction */
        $transaction = $this->subjectReader->readTransaction($response);

        /** @var OrderPaymentInterface $payment */
        $payment = $paymentDO->getPayment();

        $payPal = $this->subjectReader->readPayPal($transaction);
        $payment->setAdditionalInformation(self::PAYMENT_ID, $payPal[self::PAYMENT_ID]);
        $payment->setAdditionalInformation(self::PAYER_EMAIL, $payPal[self::PAYER_EMAIL]);
    }
}
```

(The code sample is from Magento Open Source v2.1. Although the payment provider gateway was added in v2.0, the particular default implementation using the gateway were added in v2.1)
