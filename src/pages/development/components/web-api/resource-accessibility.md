---
title: Resource accessibility | Commerce PHP Extensions
description: Describes how resources accessibility is configured.
keywords:
  - Extensions
  - REST
  - Security
---

# Resource accessibility

The list of resources that you can access depends on your user type. All customers have the same permissions, and as a result the same resources accessible. The preceding statement is true for guest users as well.
Each administrator or integration user can have a unique set of permissions which is configured in the Admin.
Permissions required to access particular resource are configured in the `webapi.xml` file. This table lists the resources that each user type can access:

User type | Accessible resources (defined in `webapi.xml`)
--- | ---
Administrator or Integration | Resources for which administrators or integrators are authorized. For example, if administrators are authorized for the `Magento_Customer::group` resource, they can make a `GET /V1/customerGroups/:id` call.
Customer | Resources with `anonymous` or `self` permission
Guest user | Resources with `anonymous` permission

## Relationship between `acl.xml` and `webapi.xml`

The `acl.xml` file defines the access control list (ACL) for a given module. It defines the available set of permissions to access resources.

All `acl.xml` files across all modules are consolidated to build an ACL tree, which is used to select allowed Admin role resources or third-party integration access (**System** > **Extension** > **Integration** > **Add New Integration** > **Available APIs**).

### Sample customer `acl.xml`

For example, account management, customer configuration, and customer group resource permissions are defined in the Customer module's [`acl.xml`](https://github.com/magento/magento2/tree/2.4/app/code/Magento/Customer/etc/acl.xml).

When a developer creates the Web API configuration file (`webapi.xml`), the permissions defined in acl.xml are referenced to create access rights for each API resource.

### Sample (truncated) customer `webapi.xml`

```xml
<routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Webapi:etc/webapi.xsd">
    <!-- Customer Group -->
    <route url="/V1/customerGroups/:id" method="GET">
        <service class="Magento\Customer\Api\GroupRepositoryInterface" method="getById"/>
        <resources>
            <resource ref="Magento_Customer::group"/>
        </resources>
    </route>
............
.......
.....
    <!-- Customer Account -->
    <route url="/V1/customers/:customerId" method="GET">
        <service class="Magento\Customer\Api\CustomerRepositoryInterface" method="getById"/>
        <resources>
            <resource ref="Magento_Customer::customer"/>
        </resources>
    </route>
    <route url="/V1/customers" method="POST">
        <service class="Magento\Customer\Api\AccountManagementInterface" method="createAccount"/>
        <resources>
            <resource ref="anonymous"/>
        </resources>
    </route>
    <route url="/V1/customers/:customerId" method="PUT">
        <service class="Magento\Customer\Api\CustomerRepositoryInterface" method="save"/>
        <resources>
            <resource ref="Magento_Customer::manage"/>
        </resources>
    </route>
    <route url="/V1/customers/me" method="PUT">
        <service class="Magento\Customer\Api\CustomerRepositoryInterface" method="save"/>
        <resources>
            <resource ref="self"/>
        </resources>
        <data>
            <parameter name="customer.id" force="true">%customer_id%</parameter>
        </data>
    </route>
..........
.....
...
```

For example, in the preceding `webapi.xml` for the customerGroups resource, only a user with `Magento_Customer::group` authorization can `GET /V1/customerGroups/:id`. On the other hand, you can create a customer using `POST /V1/customers` anonymously (or by a guest).

Authorization is granted to either an administrator (or an integration) defined in the Admin with the customer group selected as one of the resources in the ACL tree.

<InlineAlert variant="info" slots="text, text"/>

A guest or anonymous is a special permission that doesn't need to be defined in `acl.xml` (and will not show up in the permissions tree in the Admin). It just indicates that the current resource in `webapi.xml` can be accessed without the need for authentication.

Similarly, self is a special access used if you already have an authenticated session with the system. Self access enables a user to access resources they own. For example, `GET /V1/customers/me` fetches the logged-in customer's details. This is typically useful for JavaScript-based widgets.

