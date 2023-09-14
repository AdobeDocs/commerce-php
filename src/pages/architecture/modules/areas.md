---
title: Modules and Areas | Commerce PHP Extensions
description: Learn what an "area" is in the context of Commerce framework modules.
keywords:
  - Extensions
---

# Modules and areas

An *area* is a logical component that organizes code for optimized request processing. The Adobe Commerce and Magento Open Source framework (Commerce framework) uses areas to streamline web service calls by loading only the dependent code for the specified area.  Each of the default areas defined by the Commerce framework can contain completely different code on how to process URLs and requests.

For example, if you are invoking a REST web service call, rather than load all the code related to generating user HTML pages, you can specify a separate area that loads code whose scope is limited to answering  REST calls.

## Area types

The Commerce framework is organized into these main areas:

*  **Admin** (`adminhtml`): entry point for this area is `pub/index.php`. The Admin panel area includes the code needed for store management. The /app/design/adminhtml directory contains all the code for components you'll see while working in the Admin.

*  **Storefront** (`frontend`): entry point for this area is `pub/index.php`. The storefront (or `frontend`)  contains template and layout files that define the appearance of your storefront.

*  **Basic** (`base`): used as a fallback for files absent in `adminhtml` and `frontend` areas.

*  **Cron** (`crontab`): In `pub/cron.php`, the [`\Magento\Framework\App\Cron`](https://github.com/magento/magento2/blob/2.4/lib/internal/Magento/Framework/App/Cron.php#L68-L70) class always loads the 'crontab' area.

You can also send requests to the Commerce framework using the SOAP, REST and GraphQL APIs. These three areas

*  **Web API REST** (`webapi_rest`): entry point for this area is `pub/index.php`. The REST area has a front controller that understands how to do URL lookups for REST-based URLs.

*  **GraphQL** (`graphql`): entry point for this area is `pub/index.php`.

*  **Web API SOAP** (`webapi_soap`): entry point for this area is `pub/index.php`.

## How areas work with modules

Modules define which resources are visible and accessible in an area, as well as an area's behavior. The same module can influence several areas. For instance, the RMA module is represented partly in the `adminhtml` area and partly in the `frontend` area.

If your extension works in several different areas, ensure it has separate behavior and view components for each area.

Each area declares itself within a module. All resources specific for an area are located within the same module as well.

You can enable or disable an area within a module. If this module is enabled, it injects an area's routers into the general application's routing process. If this module is disabled, the Commerce framework will not load an area's routers and, as a result, an area's resources and specific functionality are not available.

### Module/area interaction guidelines

*  Modules should not depend on other modules' areas.

*  Disabling an area does not result in disabling the modules related to it.

*  Areas are registered in the Dependency Injection framework `di.xml` file.

### Note about request processing

The Commerce framework processes a URL request by first stripping off the base URL. The first path segment of the remaining URL identifies the request area.

After the area name, the URI segment specifies the *frontname*. When an HTTP request arrives, the Commerce framework extracts the handle from the URL and interprets it as follows:

```http
[frontName]/[controller folder]/[controller class]
```

The `frontName` is a value defined in the module. Using `catalog/product/view` as an example:

*  `catalog` is the [frontName](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/etc/frontend/routes.xml#L10) in the module area's `routes.xml` file
*  `product` is in the [controller folder](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/Controller/Product)
*  `view` is the [controller class](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Catalog/Controller/Product/View.php)

For deeper directory structures, the controller folders are separated with an underscore (`_`). For example:

```text
catalog/product_compare/add = Magento/Catalog/Controller/Product/Compare/Add.php
```

Note that only the **execute()** method of any given controller is executed.
