---
title: ApplicationServer
description: README.md contents of the module from the source code
---

# ApplicationServer module

The ApplicationServer module provides possibility to use Application Server (Container) to decrease bootstrapping time of each request.

## Prerequisites

To take advantage of the Application Server, ensure that you have installed either the OpenSwoole or Swoole PHP extension and configure your Web Server to route all GraphQL requests to the Application Server.

### PHP extension installation

Install either the OpenSwoole or Swoole PHP extension, and ensure that corresponding Composer package are also installed to be able to run this extension.

Example of the installation command:

`pecl install openswoole-22.0.0 | composer require openswoole/core:22.1.1`

### Routing requests to Application Server

Configure Web Server to route all GraphQL requests to Application Server.

Here is an example configuration for Nginx:

```nginx
location /graphql {
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:9501/graphql;
}
```

## How to run Application Server

To launch the Application Server, execute the following CLI command: `bin/magento server:run`. This will start HTTP service on 9501 port for GraphQl area
