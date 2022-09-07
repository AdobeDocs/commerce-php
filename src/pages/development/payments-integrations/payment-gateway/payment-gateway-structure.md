---
title: Payment provider gateway structure
description: This is a structural overview of the basic components of the Adobe Commerce payment provider gateway.
---

import Docs from '/src/pages/_includes/braintree-note.md'

<Docs />

# Payment provider gateway structure

The following diagram shows the basic components of the Adobe Commerce payment provider gateway:

![Payment Gateway Structure](../../../_images/pg_structure.png)

The interaction between the [payment gateway](https://glossary.magento.com/payment-gateway) components looks like following:

![Payment Gateway Structure](../../../_images/pg_internal_flow.png)

Each component from this scheme is described in the corresponding topic:

-  [Gateway Command](gateway-command.md)

-  [Gateway Command Pool](command-pool.md)

-  [Request Builder](request-builder.md)

-  [Gateway Client](gateway-client.md)

-  [Response Validator](response-validator.md)

-  [Response Handler](response-handler.md)
