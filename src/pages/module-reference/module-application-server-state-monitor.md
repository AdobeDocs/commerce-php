---
title: ApplicationServerStateMonitor
description: A module that monitors state in ApplicationServer for debugging state
---

# ApplicationServerStateMonitor module

The ApplicationServerStateMonitor module provides possibility to debug state in ApplicationServer while it is running.

To enable it, add the `--state-monitor` parameter to `bin/magento server:run`.

This should only be used for debugging because it has significant performance impact.

<InlineAlert slots="text" />
The version of this module is 100.4.1.
