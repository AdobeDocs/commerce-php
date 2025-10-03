---
title: Configure Services as Web APIs | Commerce PHP Extensions
description: Configure an Adobe Commerce, Magento Open Source or third-party service as a web API.
contributor_name: Classy Llama
contributor_link: http://www.classyllama.com/
keywords:
  - Extensions
---

# Configure services as web APIs

You can configure an Adobe Commerce, Magento Open Source, or third-party service as a web API.

To [configure a web API](#configure-a-web-api), you define XML elements and attributes in the `webapi.xml` XML configuration file for the module for the service. The `etc/webapi.xsd` file for your module specifies an XML schema file for validation. The default XML schema validation rules are stored in `app/code/Magento/Webapi/etc/webapi.xsd` or `vendor/magento/module-webapi/etc/webapi.xsd` file.

Your module can use the default `webapi.xsd` file or you can create a customized XML schema file for validation.

Users can make REST or SOAP calls to access the web API.

To configure a web API, read these topics:

-  [Configure a web API](#configure-a-web-api)
-  [Service interface requirements](#service-interface-requirements)
-  [webapi.xml configuration options](#webapixml-configuration-options)
-  [Sample webapi.xml file](#sample-webapixml-file)
-  [webapi.xsd XML schema file](#webapixsd-xml-schema-file)
-  [Forcing Request Parameters](#forcing-request-parameters)

## Configure a web API

To configure a web API for a service, you define XML elements and attributes in the `app/code/Magento/<MODULE>/etc/webapi.xml` file, where `<MODULE> is the module name.` For example, the web API for the Customer service is defined in the `app/code/Magento/Customer/etc/webapi.xml` configuration file.

## Service interface requirements

After a service class is configured using the `webapi.xml` file, the application dynamically makes the service method available using the web API. Because this is automatically generated, it is important that the service class be formatted a very specific way.

This makes sense when you consider that while a service class possibly expects objects of a specific class type (such a save method) and possibly returns a result that is a class or array of classes, neither SOAP nor REST are guaranteed to have that class defined on the client end or even to have a concept similar to a PHP class. Because of this, the application uses reflection to automatically create these classes and sets data that you have submitted in JSON or HTTP array syntax onto an instance of the expected PHP class when calling the service method.

Conversely, if an object is returned from one of these methods, the application automatically converts that PHP object into a JSON or SOAP object before sending it over the web API.

To do this conversion, the application must know information about both the parameters the service method is expecting and the return type of the result the service method delivers. PHP 5.x does not allow for type-hinting for scalar parameters or for return types so in order to convert the array or JSON object to or from the appropriate class type, PHP relies on the PHP doc block. Specifically, the lines containing `@param` and `@return` must follow certain rules for the application to be able to correctly convert between types.

For SOAP and REST to work correctly, the following rules must be followed by the service interface's doc block:

-  All methods exposed by the web API must follow these rules
-  All methods on objects expected as parameters or returned must follow these rules
-  Parameters must be defined in the doc block as

   -  @param type $paramName

-  Return type must be defined in the doc block as

   -  @return type

-  Valid scalar types include: `mixed` (or `anyType`), `bool` (or `boolean`), `str` (or `string`), `integer` (or `int`), `float`, and `double`.
-  Valid object types include a fully qualified class name or a fully qualified interface name.
-  Any parameters or return values of type array can be denoted by following any of the previous types by an empty set of square brackets `[]`

Following are some examples of various types and what they would look like in the doc block:

-  A parameter $types which can be an array of strings:

   -  @param string[] $types

-  A parameter $id which can be an integer:

   -  @param int $id

-  A parameter $customer which is an object of class `\Magento\Customer\Api\Data\CustomerInterface`:

   -  @param \Magento\Customer\Api\Data\CustomerInterface $customer

      Note that even if the class `\Magento\Customer\Api\Data\CustomerInterface` is in the same namespace (or a sub-namespace) of the current class or a use statement has exists at the top of the class, the fully qualified namespace must be used or the web API throws an exception.

-  A return which is an array of objects of type `\Magento\Customer\Api\Data\CustomerInterface`:

   -  @return \Magento\Customer\Api\Data\CustomerInterface[]

<InlineAlert variant="info" slots="text"/>

If a service method argument is called `item`, there will be a problem during SOAP processing. All item nodes are removed during SOAP request processing. This is done to unwrap array items that are wrapped by the SOAP server into an `item` element.

## REST API constructor parameter validation

When a REST API call is made, the framework validates the constructor parameters of the class that implements the service interface. The framework checks that each parameter can be instantiated. If a parameter cannot be instantiated, the framework throws an exception.

Adobe Commerce 2.4.9 and all prior supported versions of Adobe Commerce have been patched to validate constructors.

Supported parameter types:

-  Simple types (string, int, float, boolean)
-  `*\Api\Data\*Interface` classes

Unsupported parameter types:

-  Models
-  Service classes
-  Other complex types

Unsupported parameters will not be instantiated from REST payloads.

Developers that previously defined REST APIs must review service interfaces and implementations for unsupported constructor parameters. Look for these patterns:

-  **Constructor Parameter Injection**: Look for nested objects in API payloads.

-  **Complex Object Types**: Check for references to `Model` classes or services.

-  **Custom Properties**: Identify any non-standard API parameters.

-  **Extension-specific APIs**: Review custom module API implementations.

REST calls that implement unsupported parameter types cause the following behavior:

-  On version 2.4.7 and higher, invalid parameters are silently ignored. Requests succeed, but data might be missing.
-  On version 2.4.6 and lower, invalid parameters might trigger 400/500 errors.

These error messages might appear in logs or responses:

-  Unsupported field names for version 2.4.7 and higher:

   ```{ "message": "\"{fieldName}\" is not supported. Correct the field name and try again." }```

-  Unsupported field names for 2.4.6 and lower:

   ```{ "message": "Property \"{fieldName}\" does not have accessor method \"{methodName}\" in class \"{className}\"." }```

When these errors occur, constructor parameters using complex types are rejected.

## webapi.xml configuration options

To define web API components, set these attributes on these XML elements in the
   `webapi.xml` configuration file, as follows:

<table style="width:100%">
   <tr bgcolor="lightgray">
      <th>XML element</th>
      <th>Description</th>
      <th>Attributes</th>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;routes&gt;</inlineCode>
      </td>
      <td>
         Required. Root element that defines the namespace and location of the XML schema file.
      </td>
      <td>
         <ul>
            <li>
               <inlineCode class="spectrum-Body--sizeS">xmlns:xsi</inlineCode>. Required. Defines the namespace for the XML schema instance.
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">xsi:noNamespaceSchemaLocation</inlineCode>. Required. Defines the path and file name of the XML schema file to use to validate the web API.
            </li>
         </ul>
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;route&gt;</inlineCode>
      </td>
      <td>
         Required. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;routes&gt;</inlineCode>. Defines the HTTP route for the web API method.
      </td>
      <td>
         <ul>
            <li>
               <inlineCode class="spectrum-Body--sizeS">method</inlineCode>. Required. String. HTTP method. Valid values are GET, POST, PUT, and DELETE.
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">url</inlineCode>. Required. String.
                  The URL to the resource. The string must begin with /V1 (or <inlineCode class="spectrum-Body--sizeS">&lt;integer&gt;</inlineCode>) to indicate the version number. You must prepend any template parameters with a colon. Example: /V1/products/:sku
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">secure</inlineCode>. Optional. Boolean. Indicates that the route is accessible over only HTTPS. Any attempts to access this route over non-secure causes an exception.
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">soapOperation</inlineCode>. Optional. String. Specifies the SOAP operation name to use instead of the interface's method name. Use this element to create multiple operations for the same service contract.
            </li>
         </ul>
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;service&gt;</inlineCode>
      </td>
      <td>
         Required. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;route&gt;</inlineCode>. Defines the implemented interface and the web API method name.
      </td>
      <td>
         <ul>
            <li>
               <inlineCode class="spectrum-Body--sizeS">class</inlineCode>. Required. String. Location and name of implemented interface.
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">method</inlineCode>. Required. String. Web API method name.
            </li>
         </ul>
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;resources&gt;</inlineCode>
      </td>
      <td>
         Required. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;route&gt;</inlineCode>. Container for one or more resource definitions.
      </td>
      <td>
         None.
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;resource&gt;</inlineCode>
      </td>
      <td>
         Required. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;resources&gt;</inlineCode>. Defines a resource to which the caller must have access.
      </td>
      <td>
         <ul>
            <li>
               <inlineCode class="spectrum-Body--sizeS">ref</inlineCode>.
                  Required. Referenced resource. Valid values are self, anonymous, or a resource, such as <inlineCode class="spectrum-Body--sizeS">Magento_Customer::group</inlineCode>.
               <strong>Note:</strong> The web API framework enables guest users to access resources that are configured with anonymous permission. Any user that the framework cannot authenticate through existing <a href="https://developer.adobe.com/commerce/webapi/get-started/authentication/">authentication mechanisms</a> is considered a guest user.
            </li>
         </ul>
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;data&gt;</inlineCode>
      </td>
      <td>
         Optional. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;route&gt;</inlineCode>. Container for one or more parameter definitions.
      </td>
      <td>
         None.
      </td>
   </tr>
   <tr>
      <td>
         <inlineCode class="spectrum-Body--sizeS">&lt;parameter&gt;</inlineCode>
      </td>
      <td>
         Required if <inlineCode class="spectrum-Body--sizeS">&lt;data&gt;</inlineCode> is specified. Child element of <inlineCode class="spectrum-Body--sizeS">&lt;data&gt;</inlineCode>. Defines a parameter.
      </td>
      <td>
         <ul>
            <li>
               <inlineCode class="spectrum-Body--sizeS">name</inlineCode>. String. Parameter name.
            </li>
            <li>
               <inlineCode class="spectrum-Body--sizeS">force</inlineCode>. Boolean. <a href="#forcing-request-parameters">Forcing Request Parameters</a>
            </li>
         </ul>
      </td>
   </tr>
</table>

## Sample webapi.xml file

This excerpt is from the `webapi.xml` file that defines the Customer service web API:

```xml
<?xml version="1.0"?>
    <routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Webapi:etc/webapi.xsd">
    <!-- Customer Group Service-->
    <route url="/V1/customerGroups/:id" method="GET">
        <service class="Magento\Customer\Api\GroupRepositoryInterface" method="getById"/>
        <resources>
            <resource ref="Magento_Customer::group"/>
        </resources>
    </route>
...
    <route url="/V1/customers/me/billingAddress" method="GET">
        <service class="Magento\Customer\Api\AccountManagementInterface" method="getDefaultBillingAddress"/>
        <resources>
            <resource ref="self"/>
        </resources>
        <data>
            <parameter name="customerId" force="true">%customer_id%</parameter>
        </data>
    </route>
</routes>
```

In this `webapi.xml` example:
<table style="width:100%">
   <tr bgcolor="lightgray">
      <th>Line</th>
      <th>Defines</th>
   </tr>
   <tr>
      <td>
         2
      </td>
      <td>
         The XML schema file that is used to validate the XML.
         The XML schema file is <inlineCode class="spectrum-Body--sizeS">xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Webapi:etc/webapi.xsd</inlineCode>.
      </td>
   </tr>
   <tr>
      <td>
         4
      </td>
      <td>
         The HTTP method and web resource through which to access the route.
         The HTTP method is GET.
         The resource is <inlineCode class="spectrum-Body--sizeS">/V1/customerGroups/:id</inlineCode>. Users must substitute a customer ID for the <inlineCode class="spectrum-Body--sizeS">id</inlineCode> template parameter.
      </td>
   </tr>
   <tr>
      <td>
         5
      </td>
      <td>
         The interface that the route implements and the name of the web API method.
         The route implements the <inlineCode class="spectrum-Body--sizeS">Magento\Customer\Api\GroupRepositoryInterface</inlineCode> interface.
         The web API method name is <inlineCode class="spectrum-Body--sizeS">getById</inlineCode>.
      </td>
   </tr>
   <tr>
      <td>
         7
      </td>
      <td>
         The resource to which the caller must have access.
         The caller must have access to <inlineCode class="spectrum-Body--sizeS">Magento_Customer::group</inlineCode> resource.
      </td>
   </tr>
   <tr>
      <td>
         17
      </td>
      <td>
         A required parameter.
         The <inlineCode class="spectrum-Body--sizeS">id</inlineCode> parameter is required on GET calls to <inlineCode class="spectrum-Body--sizeS">/V1/customers/me/billingAddress</inlineCode>.
      </td>
   </tr>
</table>

## webapi.xsd XML schema file

The `webapi.xml` file for your module must specify an XML schema file for validation. Your `webapi.xml` file can specify the default or a customized XML schema file.
The default `webapi.xsd` XML schema file can be found in the `app/code/Magento/Webapi/etc` directory.

The following table defines the `service` node attributes:

Attribute name | Required | Description
--- | --- | ---
`class` | Yes | The responsible class for handling the API request.
`method` | Yes | The class' method which handles the execution of the API.

## Forcing request parameters

Parameters in the `webapi.xml` can be forced. This ensures that on specific routes, a specific value is
always used. For instance, in the example "/V1/customers/me/billingAddress" route above, the `customerId`
parameter is forced to match the ID of the currently logged in user.
Additional parameter overrides can be registered via `di.xml` by adding new items to the
`paramOverriders` argument for `\Magento\Webapi\Controller\Rest\ParamsOverrider`. Parameter
overriders must implement `\Magento\Framework\Webapi\Rest\Request\ParamOverriderInterface`. An
example excerpt from `di.xml`

```xml
<type name="Magento\Webapi\Controller\Rest\ParamsOverrider">
    <arguments>
        <argument name="paramOverriders" xsi:type="array">
            <item name="%my_value%" xsi:type="object">VENDOR\MODULE\Controller\Rest\ParamOverriderMyValue</item>
        </argument>
    </arguments>
</type>
```

The above example create a new parameter override available for use in `webapi.xml`. The value passed for
   `%my_value%` will be the return value of
   `\VENDOR\MODULE\Controller\Rest\ParamOverriderMyValue::getOverriddenValue`. Example:

```xml
<route url="/V1/example/me/service" method="GET">
    ...
    <data>
        <parameter name="myValue" force="true">%my_value%</parameter>
    </data>
    ...
</route>
```
