---
title: Domain Layer | Commerce PHP Extensions
description: Learn about the architectural domain layer of the Commerce framework.
keywords:
  - Extensions
---

# Domain layer

The domain layer holds the business logic layer of a module. It typically does not contain resource-specific or database-specific information. Its primary functions include:

*  Defining the generic data objects, or models, that contain business logic. This logic defines which operations can be performed on particular types of data, such as a Customer object. These models contain generic information only. Applications can also use SOAP or RESTful endpoints to request data from models.

*  (Optionally) Including the implementation of service contracts, although not their definition.

<InlineAlert variant="success" slots="text"/>

**Best practice:** Use service contracts to communicate with the domain layer by passing data types through strongly typed objects. This helps you avoid the need to replace presentation layer code when replacing business layer logic.

## Models

Each domain-layer model contains a reference to a resource model, which it uses to retrieve data from the database with MySql calls. This resource model contains logic for connecting to the underlying database, typically MySQL. A model requires a resource model only if the model data must persist.

## Accessing the domain layer

There are three primary ways of accessing a module's domain-layer code:

*  Service contracts are the recommended way for one module to access another module's domain-level code. This loosely coupled solution is the optimal way for most modules to access another module.

*  A module can directly call into another module. This tightly coupled solution is not recommended for most situations, but is sometimes unavoidable.

*  Domain layer code in one module can also plug itself into another module by:

   *  event hooks

   *  plugins

   *  `di.xml` files (with an SPI contract)

Your strategy for calling another module's domain-layer code is highly dependent upon the unique configuration and needs of your system.
