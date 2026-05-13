---
title: ApplicationServerStateMonitor
description: A module that monitors state in ApplicationServer for debugging state
---

# Magento_ApplicationServerStateMonitor module

The Magento_ApplicationServerStateMonitor module provides the possibility to debug the state of the Application Server while it is running.

To enable it, add the `--state-monitor` parameter to `bin/magento server:run`.

This should only be used for debugging because it has significant performance impact.

<InlineAlert slots="text" />
The version of this module is 100.4.2.
