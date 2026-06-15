---
title: Payment
description: N/A
---

# Magento_Payment module

This module provides the abstraction level for all payment methods, and all logic that should be used when adding a new payment method.
This logic includes configuration models, separate models for payment data verification, and so on.

For example, `Magento\Payment\Model\Method\AbstractMethod` is an abstract model that should be extended by particular payment methods.

<InlineAlert slots="text" />
The version of this module is 100.4.9.
