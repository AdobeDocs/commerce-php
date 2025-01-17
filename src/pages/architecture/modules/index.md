---
title: Extensibility and Modularity | Commerce PHP Extensions
description: Learn about how extensibility has been designed to maximize your ability to customize and enhance the Commerce framework.
keywords:
  - Extensions
---

# Extensibility and modularity

Product *extensibility* describes how easy it is to expand a product's feature set. An extensible product has been designed from its earliest  stages for customization and enhancement. Extensible products are designed for ease in expanding your installation's feature set, enriching current features, and integrating with third-party software.

Maximizing extensibility has been our goal through all aspects of development. Core tasks such as shipping are packaged as discrete modules, and you expand your features by installing modules that you either buy from third-party vendors or create yourself. While logic specific to each shipping carrier is packaged in a discrete module, you can easily add or delete shipping providers by simply adding or deleting modules. The Adobe Commerce and Magento Open Source framework (Commerce framework) provides common logic to control routing and other core application functions.

## What makes a product extensible?

*Extensibility* describes the product's built-in ability for developers and merchants to routinely extend their storefront's capabilities as their business grows.

The following factors significantly affect extensibility.

### Architectural principles that guide product structure

Central to the Commerce framework model of software development is the practice of replacing or extending core code rather than editing it. This strategy supports your efforts to maintain the integrity of the tested code we provide while still extensively customizing your storefront.

### Reliance on popular design patterns

Reliance on known architectural and programming structures helps PHP developers orient themselves to the specific development issues that affect coding in a particular product ecosystem. This can reduce the learning curve for new developers.

Design patterns are time-tested, widely recognized software architecture constructs. The Commerce framework architecture incorporates many well known patterns, but Model-View-Controller (MVC) holds particular interest for extension developers.

### Modularity

The concept of the *module* is the heart of extension development, and modular design of software components (in particular, modules, themes, and language packages) is a core architectural principle of the product. Self-contained modules of discrete code are organized by feature, thereby reducing each module's external dependencies.

If a module is self-contained, then you can modify or replace it without affecting other areas of the code. This *loose coupling* of software components reduces the ripple effects throughout your code base of changing code.

 See the [PHP Developer Guide](/development/) for detailed instructions on how to create modules.

### Rich product ecosystem

The wider Adobe Commerce and Magento Open Source ecosystem provides an extensive community and rich third-party marketplace for extensions. Visit [Commerce Marketplace](https://marketplace.magento.com/) for an overview of the many modules and themes available for download and to buy modules and theme packages, which offer more possibilities for extending your storefront.

### Open-source software to create and manage extensions

The Commerce framework is built on open-source technologies, created for the development community. For example, it uses Composer to manage dependencies. See [Technology Stack](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/system-requirements) for a complete list of technologies used.

### Coding standards

Adherence to standard best practices for PHP and JavaScript code ensures that the code base is sound. The Commerce framework has adopted most of the PSR2 Coding Standards for PHP. See [Coding Standards](../coding-standards.md) for more information.

### Upgrade and versioning strategies

The Commerce framework has well-defined upgrade and versioning strategies that can help you avoid any problems with software component dependencies. Add modules after confirming that the module version is compatible with the Commerce framework version.

### Web APIs

Adobe or third-party services can be configured as a web API (REST or SOAP) with some simple XML. You can use these services to integrate your installation into third-party applications, such as CRM (Customer Relationship Management), ERP (Enterprise Resource Planning) back office systems, and CMS (Content Management Systems).

See [Getting Started with web APIs](https://developer.adobe.com/commerce/webapi/get-started/) for more information.

### Flexible attribute types

You can enhance your storefront by adding unique attributes to the default product attributes. For example, you might need to add a new attribute to describe a product, such as texture or an industry-specific rating. You can add these attributes from the Admin, and the storefront  displays them.

|Attribute type|Displayed by storefront?|
|--- |--- |
|EAV|no|
|Custom|yes|
|Extension|no|

Attribute types fall into three general categories:

*  **EAV (Entity-Attribute-Value) attributes** are site-specific attributes that you can define for a local site using the Admin.

*  **Custom attributes** are a subset of EAV attributes. Objects that use EAV attributes typically store values in several MySQL tables. The Customer and Catalog modules use EAV attributes.

*  **Extension attributes** often use more complex data types than custom attributes. These attributes do not appear in the storefront. Extension attributes are introduced by modules.

See [PHP Developer Guide](/development/) for information about using attributes.

### Service contracts, dependency injection, and dependency inversion

*Service contracts* provide a new way to access public API endpoints. These PHP interfaces offer robust, stable extension points to which clients can connect.  Service contracts define the endpoints that function as a module's public API. Defining these endpoints is an essential part of adding a module.

Service contracts are discussed throughout the documentation set. See [Service layer](../layers/service.md) for a high-level introduction. See [PHP Developer Guide](/development/) for a more detailed discussion of service contracts and dependency injection.

The Commerce framework implements *dependency injection* along with service contracts. Dependency injection provides a mechanism for changing a module's behavior without altering the client or understanding nitty-gritty details of implementation. Both dependency injection and its related concept *dependency inversion* support the Commerce framework's fundamental architectural principles of modularity and ease-of-extensibility. They strongly encourage basic coding practices that support the loose coupling of software modules.

See [PHP Developer Guide](/development/) for information on both dependency injection and service contracts.

### Plug-ins

Plug-ins, like modules, are a mechanism for adding features to the core Commerce framework. Plug-ins enable you to make changes to the behavior of any public method in a class. You can consider it a form of extension that uses the `Plugin` class.

Plug-ins are also called *interceptors*. Applications use the plug-in pattern to change method behavior without modifying the actual class. Plug-ins can typically intercept method processing before or after the method runs, or only when the method throws an exception.

See [Plug-ins](/development/components/plugins/) in [PHP Developer Guide](/development/) for information on declaring and prioritizing plug-ins.
