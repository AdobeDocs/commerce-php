---
title: AsyncOrder
description: N/A
---

# Magento_AsyncOrder module

The Magento_AsyncOrder module enables asynchronous order placement, which marks the order as `received`, places it in a queue, and processes it in a first-in-first-out basis.

AsyncOrder values:

-  `0` — (_Default value_) Disable the Magento_AsyncOrder module and use the standard synchronous order placement.
-  `1` — Enable the Magento_AsyncOrder module for asynchronous order placement.

To enable Magento_AsyncOrder, set the `checkout/async` variable in the `env.php` file.
For example:

```php
<?php
      'checkout' => [
               'async' => 1
       ]
```

Alternatively, you can set the variable using the command-line interface:

```bash
bin/magento setup:config:set --checkout-async 1
```

Before disabling the Magento_AsyncOrder module, you must verify that all asynchronous order processes are complete.

<InlineAlert slots="text" />
The version of this module is 100.4.5.
