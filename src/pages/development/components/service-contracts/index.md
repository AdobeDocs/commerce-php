---
title: Service Contracts | Commerce PHP Extensions
description: Review an introduction to service contracts and how they help Adobe Commerce and Magento Open Source extension developers create stable APIs.
keywords:
  - Extensions
---

# Service contracts

Adobe Commerce and Magento Open Source are modular systems that enable third-party developers to customize and overwrite core parts of the application framework. This flexibility, however, comes at a price. Business logic tends to leak across the layers of the system, which manifests as duplicated and inconsistent code.

Merchants might be reluctant to upgrade Adobe Commerce or Magento Open Source because customized extensions that they have purchased might not be compatible with new versions. Also, Adobe and third-party developers can find it difficult to track and report the dependencies that customized extensions have on other extensions.

To address these issues, Adobe Commerce and Magento Open Source introduced _service contracts_.

## What is a service contract?

A service contract is a set of PHP interfaces that are defined for a module.
A service contract includes [data interfaces](design-patterns.md#data-interfaces), which preserve data integrity, and [service interfaces](design-patterns.md#service-interfaces), which hide business logic details from service requestors such as controllers, web services, and other modules.

If developers define data and service interfaces according to a set of [design patterns](design-patterns.md), the result is a well-defined, durable API that other modules and third-party extensions can implement through models and resource models.

![Service Contracts](../../../_images/msc.jpg)

## Benefits

Service contracts enhance the modularity of Magento. They enable Adobe and third-party developers to report system dependencies through `composer.json` files and, consequently, guarantee compatibility across versions of Adobe Commerce and Magento Open Source. This compatibility ensures that merchants can easily upgrade Magento.
These contracts ensure a well-defined, durable API that other modules and third-party extensions can implement. Also, these contracts make it easy to [configure services as web APIs](../web-api/services.md).

Data entities are a side benefit of service contracts.
The database tables that normally support these entities can be complicated.
For example, some attributes might be stored in an EAV table, so a set of MySQL database tables might define a single data entity.
Data entities in a service contract reveal a simpler data model than the data model in an underlying relational database schema.
Eventually, you will be able to use different storage technologies for different data collections. For example, you could use a NoSQL database to replace product tables.

## Using the @api tag

Backward compatibility can be indicated by the use of `@api`. For more information, see [Backward compatibility](https://developer.adobe.com/commerce/contributor/guides/code-contributions/backward-compatibility-policy/).
