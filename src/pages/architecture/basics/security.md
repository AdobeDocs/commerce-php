---
title: Security | Commerce PHP Extensions
description: Learn how the Adobe Secure Product Lifecycle has influenced the development of the Commerce framework.
keywords:
  - Extensions
  - Security
---

# Security

The security of your data and digital experiences is our priority. To better protect Adobe Commerce and Magento Open Source installations from the physical layer up, we have implemented hundreds of processes and controls to help us comply with [industry-accepted standards](https://experienceleague.adobe.com/en/docs/commerce-admin/start/compliance/privacy/privacy-policy), regulations, and certifications. To help protect installations from the software layer down, we build in security measures that are based on the [Adobe Secure Product Lifecyle](https://www.adobe.com/trust/security/product-security.html).

Although there is no single way to eliminate all security risks, there are many steps you can take to harden your installations and make them a less attractive target for bad actors. The [Security Best Practices Guide](https://experienceleague.adobe.com/en/docs/commerce-operations/implementation-playbook/best-practices/launch/security-best-practices) offers insight and practical guidelines to help protect all installations from security incidents.

## Examples of built-in security measures

### Enhanced password management

Adobe has strengthened the hashing algorithms (SHA-256) used in password management. The Adobe Commerce and Magento Open Source framework (Commerce framework) now supports Argon2ID13 through the PHP sodium extension, which requires the libsodium library version 1.0.13 or higher.

### Improved prevention of cross-site scripting (XSS) attacks by making escaped data the default

The Commerce framework has adopted conventions that regulate the escaping of data in output. These conventions include the ability to escape  output for HTML pages (HTML, JSON, and JavaScript) and email. Where possible, escaping is transparent to client code. See [Security measures against XSS attacks](https://developer.adobe.com/commerce/php/development/security/cross-site-scripting/) in the Frontend Developer Guide.

### More flexible file system ownership and permissions

Starting in version 2.0.6, the Commerce framework no longer explicitly sets file system permissions. Instead, we recommend that certain files and directories be writable in a development environment and read-only in a production environment.

To provide you with a simple way to restrict access to the file system in production, we provide the flexibility for you to further restrict those permissions using a [umask](https://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html).

For an overview, see [Overview of ownership and permissions](https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/file-system/overview.html).

For details about ownership and permissions in development and production, see [ownership and permissions in development and production](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/deployment/file-system-permissions.html).

### Improved prevention of clickjacking exploits

The Commerce framework safeguards your store from clickjacking attacks by using an X-Frame-Options HTTP request header. For more information, see [X-Frame-Options header](https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/security/xframe-options.html).

### Use of non-default Admin URL

A simple Admin URL (like `admin` or `backend`) makes it easy to target attacks on specific locations using automated password guessing. To prevent against this type of attack, the Commerce framework by default creates a random Admin URI when you install the product. The CLI command `php bin/magento info:adminuri` is provided so that you can  see the URI if you forget it. You can also use the CLI to change this URI.  Although the use of a non-default admin URL will not secure the site, its use will help prevent large-scale automated attacks. See [Display or change the Admin URI](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/admin-uri) in Configuration Guide for more information.
