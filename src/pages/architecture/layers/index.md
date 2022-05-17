---
title: Architectural Layers Overview | Commerce PHP Extensions
description: Learn about layered application design and details about each layer.
---

# Architectural layers overview

At its highest level, the Adobe Commerce and Magento Open Source framework (Commerce framework) architecture consists of the core product code plus optional *modules*. These optional modules enhance or replace the basic product code.

If you are substantially customizing the basic Adobe Commerce or Magento Open Source product, [module](https://glossary.magento.com/module) development will be your central focus. Modules organize code that supports a particular task or feature. A module can include code to change the look-and-feel of your [storefront](https://glossary.magento.com/storefront) as well as its fundamental behavior.

Your modules function with the core product code, which is organized into layers. Understanding layered software pattern is essential for understanding basic Adobe Commerce and Magento Open Source product organization.

Layered software is a popular, widely discussed principle in software development. Many resources exist for this topic, but consider consulting Pattern-Oriented Software Architecture for a general discussion.

## Advantages of layered application design

Layered application design offers many advantages, but users of the Commerce framework will appreciate:

*  Stringent separation of business logic from presentation logic simplifies the customization process. For example, you can alter your storefront appearance without affecting any of the [backend](https://glossary.magento.com/backend) business logic.

*  Clear organization of code predictably points [extension](https://glossary.magento.com/extension) developers to code location.
