---
title: DeferredTotalCalculating
description: N/A
---

# Magento_DeferredTotalCalculating module

The Magento_DeferredTotalCalculating module optimizes the checkout process by deferring the total calculation until it is requested for shopping cart or final checkout steps.

DeferredTotalCalculating values:

-  `0` — (_Default value_) Disable the Magento_DeferredTotalCalculating module and use the standard total calculation throughout the shopping process.
-  `1` — Enable the Magento_DeferredTotalCalculating module to show a subtotal and defer calculating the complete total until in the shopping cart or final checkout steps.

To enable Magento_DeferredTotalCalculating, set the `checkout/deferred_total_calculating` variable in the `env.php` file. For example:

```php
<?php
      'checkout' => [
               'deferred_total_calculating' => 1
       ]
```

Alternatively, you can set the variable using the command-line interface:

```bash
bin/magento setup:config:set --deferred-total-calculating 1
```

<InlineAlert slots="text" />
The version of this module is 100.4.4.
