---
title: Coding FAQ | Commerce PHP Extensions
description: Review answers to frequently asked questions about coding Adobe Commerce and Magento Open Source extensions.
---

# Coding FAQ

This page is a compilation of frequently asked coding questions by the Magento Open Source Community.

## What do I need to know to work with the framework?

*  [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) - The essential principles needed to create maintainable and extendable code.
*  [PHP](http://php.net/) - This is the programming language used for developing application code.
*  [HTML](https://en.wikipedia.org/wiki/HTML), [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets), and [JavaScript](https://www.javascript.com/) - Languages used for [frontend development](https://developer.adobe.com/commerce/frontend-core/guide/).
*  [Architecture basics overview](../../architecture/basics/index.md) - Developers should be familiar with the architectural concepts, such as the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern and the [Command Query Responsibility Segregation](http://martinfowler.com/bliki/CQRS.html) principle.
*  [Dependency Injection](../../development/components/dependency-injection.md) - An important design pattern used to handle dependencies across classes and modules.

## How can my extension distinguish between the Magento Open Source and the Adobe Commerce?

The correct edition can be obtained through `\Magento\Framework\App\ProductMetadataInterface::getEdition`.

In Magento Open Source that interface maps to the concrete implementation `Magento\Framework\AppInterface\ProductMetadata`.
However, in Adobe Commerce, the Commerce module will override that mapping and the interface will be implemented by `\Magento\Enterprise\Model\ProductMetadata`.

Just relying on the interface through dependency injection will get you the right class, and calling "getEdition" will return the right answer.

## How do I configure my module so that it appears in a specific place on the Admin?

Use the `<Module Directory>/etc/adminhtml/menu.xml` file to configure from where on the Admin your extension is accessible.
