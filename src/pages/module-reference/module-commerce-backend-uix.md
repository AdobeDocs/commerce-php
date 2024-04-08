---
title: CommerceBackendUix
description: This module introduces UI extensibility in admin panel
---

# Adobe CommerceBackendUix module

When the `Magento_CommerceBackendUix` php module is installed on Adobe Commerce it allows out of process extensions to customize the Adobe Commerce Admin Panel.

## Installation

This is a regular in-process PHP commerce in Adobe Commerce. It can be installed using composer, by adding the dependency to the needed version.

To enable the extension in your Adobe Commerce, you can run `bin/magento module:enable Magento_CommerceBackendUix`

## Local development

Sync the repository to start your development. The project is already built and will work directly if you install the extension locally.

### Changes to the PHP code

Any change to the PHP code should be added to the local Adobe Commerce instance and compiled using the following command:

```bash
bin/magento setup:di:compile
```

Make sure to clear the cache if your change affect a static file such as an XML file. You can use the following command:

```bash
bin/magento cache:flush
```

## Local testing

After adding this package to Adobe Commerce, you can enable a local server in the admin panel (navigate to Stores > Settings > Configuration > Adobe Services > Backoffice SDK > Local testing):

- Enable the local server.
- Set the `Base URL` that points to your localhost.
- Set the `IMS Token`. You can use `dummyToken` for example as a token and set it in your `server.js` file.
- Set the `IMS Org Id`. You can use `imsOrg` for example as a token and set it in your `server.js` file.

Make sure that the configuration matches your local server input. If this is enabled, all calls will be automatically redirected to the local server instead of connecting to Adobe's App Registry.

### Example of a `server.js` implementation

```javascript
const http = require('https');
const fs = require('fs');
const url = require('url');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
 
console.log('Server will listen at :  https://localhost ');
http.createServer(options, function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });
    let json_response;
    
    console.log(url.parse(req.url,true).pathname);
    if (url.parse(req.url,true).pathname == "/config") {
        json_response = {
            baseUrl: "https://localhost:9090/",
            apiKey: "apiKey",
            auth: {
                schema: "Bearer",
                imsToken: "dummyToken"
            },
            imsOrg: "imsOrg",
            version: 1,
            service: "aem"
        }
    } else {
        json_response = [{
            "name": "<applicationName>",
            "title": "Test extension",
            "description": "No",
            "icon": "no",
            "publisher": "aQQ6300000008LEGAY",
            "endpoints": {
              "aem/commerce-admin.page-content.add/1": {
                "view": [{
                  "href": "https://localhost:9080/index.html"
                }]
              }
            },
            "xrInfo": {
              "supportEmail": "test@adobe.com",
              "appId": "4a4c7cf8-bd64-4649-b8ed-662cd0d9c918"
            },
            "status": "PUBLISHED" }]
    }
 
    res.end( JSON.stringify(json_response) );
}).listen(9090);
```
