---
title: Inventory Management | Commerce PHP Extensions
description: Learn about the architecture of the Adobe Commerce and Magento Open Source Inventory Management module.
keywords:
  - Extensions
  - Inventory
---

# Inventory Management

Adobe Commerce and Magento Open Source are highly modular systems that allow third-party developers to extend and customize the system on many levels. As a result, a developer can replace or add any component (module) without affecting the rest of the system.

Module interchangeability was one of the main reasons behind introducing [Service Layer](../layers/service.md). By using service contracts and providing extensions over them, third-party developers can:

*  Enhance out-of-the-box business logic
*  Replace a module without breaking the system or other extensions relying on these contracts

A set of interfaces in a module's `/Api` directory typically define the service contracts, including the APIs and their implementations. A module interface expresses the elements (entity interfaces and services to manipulate them) that the module requires. These elements defined in the interface represent a gateway for communication between modules. The implementation contains the working business logic that corresponds to the elements declared in the interface.

By placing service contracts (APIs), implementations, and UI code in the same module, the application combines different architectural layers of the system in the scope of one component. Unfortunately, this means that a developer who wants to tweak a module's UI would be changing the same module as another developer who would like to substitute the implementation for predefined business logic. Even modules that the developer expects to be used in headless installations (those that don't use the Admin at all) must contain UI code.

## Inventory management service layer

Implementing a good modular architecture means maintaining a loose coupling between components of the system, reducing dependencies on components that are not needed for a particular deployment. To allow modules to be swapped out, we have designed the Inventory Management modules to follow the [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) (SRP). Each module has responsibility over a single part of the functionality, and all of its services are narrowly aligned with that responsibility.

As a result of applying SRP to module responsibilities (while taking into account the multi-layered application architecture), Inventory Management is comprised of independent modules responsible for:

*  Service contract APIs
*  Implementation of the business logic for APIs
*  Admin UI
*  Frontend UI

The Admin and frontend UIs can be separated, because it's possible to have two different technology stacks. The Admin UI uses UI components, while the frontend UI can use the [PWA](https://developer.adobe.com/commerce/pwa-studio/) studio stack, consisting of technology such as webpack, React, Redux, and GraphQL.

Now, instead of creating one module that covers a specialized business domain, we create up to four modules, each one responsible for a dedicated layer of the system to provide high granularity for customizations. For example, in the standard application architecture, the `InventorySales` module would have contained all the APIs, business logic, and UI definitions. Now, these responsibilities are defined in the `InventorySales`,  `InventorySalesApi`, `InventorySalesAdminUI`, and `InventorySalesFrontendUI` modules.

This approach implies additional code limitations in the modules:

*  All modules should depend on the API module. Implementations can be swapped in `di.xml` files.
*  API modules should contain web API tests. These tests cover API endpoints agnostically to the implementation details. Example: `InventoryApi\Tests\Api\*`
*  Only UI modules should contain MFTF tests, because these tests cover the interaction between the user and the UI. Example: `InventoryCatalogAdminUi\Test\Mftf\*`.

## Module dependencies

The list of Inventory Management dependencies varies, depending on whether the merchant has installed a headless version of the application. These merchants have integrated the application with external Enterprise Resource Planning (ERP) software, and they often consider the ERP software to be the "source of truth" for processes like order processing and inventory tracking. The ERP provides its own UI for managing information and processes. Attempting to use the application UI to manage the same things would be excessive and would lead to sophisticated bi-directional synchronization of all changed data.

### Dependencies in a standard installation

For non-headless installations, Inventory Management has dependencies on the following modules:

*  Backend
*  BundleProduct
*  Catalog
*  CatalogInventory (legacy)
*  ConfigurableProduct
*  Directory
*  EAV
*  GroupedProduct
*  ImportExport
*  Reports
*  Sales
*  Shipping
*  Store
*  UI

### Dependencies in a headless installation

In headless installations, Inventory Management is dependent on the following modules:

*  BundleProduct
*  Catalog
*  CatalogInventory (legacy)
*  ConfigurableProduct
*  EAV
*  GroupedProduct
*  ImportExport
*  Sales
*  Store
