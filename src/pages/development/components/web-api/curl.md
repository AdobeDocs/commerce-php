---
title: cURL service wrapper | Commerce PHP Extensions
description: Learn how to use the curl service wrapper to make calls.
keywords:
  - Extensions
---

# Using the cURL service wrapper

Adobe Commerce and Magento Open Source provide a service-wrapper for using cURL instead of using the default PHP cURL. The class ``Magento\Framework\HTTP\Client\Curl`` may be used to work with HTTP protocol using cURL library.

First, create an instance of `Magento\Framework\HTTP\Client\Curl`.

```php
/**
* Constructor.
*
* @param Magento\Framework\HTTP\Client\Curl $curl
*/
public function __construct(
   Magento\Framework\HTTP\Client\Curl $curl
) {
   $this->curl = $curl;
}
```

## Make a GET request

```php
// get method
$this->curl->get($url);

// output of curl request
$result = $this->curl->getBody();
```

where `$url` is the endpoint URL.

## Make a POST request

```php
// post method
$this->curl->post($url, $params);

// output of curl requestt
$result = $this->curl->getBody();
```

where  `$url` is the endpoint URL, `$params` is an array of data that is being sent via the POST request. Other parameters may be added in the URL directly.
A `$params` example:

```php
$params = [
  'user[email]' => $user->getEmail(),
  'user[cellphone]' => $providerInfo['phone_number'],
  'user[country_code]' => $providerInfo['country_code'],
]
```

The cURL client can also add headers, basic authorization, additional cURL options, and cookies in the cURL request. The cURL client provides these methods before using `get` or `post` method.

## Set a cURL header using the `addHeader` method

The `addHeader` method accepts two parameters. The cURL header name and a cURL header value.

```php
$this->curl->addHeader("Content-Type", "application/json");
$this->curl->addHeader("Content-Length", 200);
```

## Set a cURL header using the `setHeaders` method

The `setHeaders` method accepts an array as a parameter.

```php
$headers = ["Content-Type" => "application/json", "Content-Length" => "200"];
$this->curl->setHeaders($headers);
```

## Set basic authorization in cURL

Set the basic authorization using the `setCredentials` method.

```php
$userName = "User_Name";
$password = "User_Password";

$this->curl->setCredentials($userName, $password);
```

It is equivalent to setting CURLOPT_HTTPHEADER value:

```php
"Authorization : " . "Basic " . base64_encode($userName . ":" . $password)
```

## Set cURL options usingthe `setOption` method

The `setOption` method accepts two parameters. The cURL option name and the cURL option value.

```php
$this->curl->setOption(CURLOPT_RETURNTRANSFER, true);
$this->curl->setOption(CURLOPT_PORT, 8080);
```

## Set cURL options using the `setOptions` method

The `setOptions` method accepts an array as a parameter.

```php
$options = [CURLOPT_RETURNTRANSFER => true, CURLOPT_PORT => 8080];

$this->curl->setOptions($options);
```

## Set cURL cookies using the `addCookie` method

The `addCookie` method accepts an array as a parameter. The cookie name and the cookie value.

```php
$this->curl->addCookie("cookie-name", "cookie-value");
```

## Set cURL cookies using the `setCookies` method

The ``setCookies`` method accepts an array as a parameter.

```php
$cookies = ["cookie-name-1" => "cookie-value-1", "cookie-name-2" => "cookie-value-2"];
$this->curl->setCookies($cookies);
```

## Example usage

For example, the `Magento\Marketplace\Model\Partners` class gets partners info using cURL from the API of Magento connect.

```php
namespace Magento\Marketplace\Model;

use Magento\Framework\HTTP\Client\Curl;
use Magento\Marketplace\Helper\Cache;
use Magento\Backend\Model\UrlInterface;

/**
 * @api
 * @since 100.0.2
 */
class Partners
{
    /**
     * @var Curl
     */
    protected $curlClient;

    /**
     * @var string
     */
    protected $urlPrefix = 'https://';

    /**
     * @var string
     */
    protected $apiUrl = 'magento.com/magento-connect/platinumpartners/list';

    /**
     * @var \Magento\Marketplace\Helper\Cache
     */
    protected $cache;

    /**
     * @var UrlInterface
     */
    private $backendUrl;

    /**
     * @param Curl $curl
     * @param Cache $cache
     * @param UrlInterface $backendUrl
     */
    public function __construct(Curl $curl, Cache $cache, UrlInterface $backendUrl)
    {
        $this->curlClient = $curl;
        $this->cache = $cache;
        $this->backendUrl = $backendUrl;
    }

    /**
     * @return string
     */
    public function getApiUrl()
    {
        return $this->urlPrefix . $this->apiUrl;
    }

    /**
     * Gets partners json
     *
     * @return array
     */
    public function getPartners()
    {
        $apiUrl = $this->getApiUrl();
        try {
            $this->getCurlClient()->post($apiUrl, []);
            $this->getCurlClient()->setOptions(
                [
                    CURLOPT_REFERER => $this->getReferer()
                ]
            );
            $response = json_decode($this->getCurlClient()->getBody(), true);
            if ($response['partners']) {
                $this->getCache()->savePartnersToCache($response['partners']);
                return $response['partners'];
            } else {
                return $this->getCache()->loadPartnersFromCache();
            }
        } catch (\Exception $e) {
            return $this->getCache()->loadPartnersFromCache();
        }
    }

    /**
     * @return Curl
     */
    public function getCurlClient()
    {
        return $this->curlClient;
    }

    /**
     * @return cache
     */
    public function getCache()
    {
        return $this->cache;
    }

    /**
     * @return string
     */
    public function getReferer()
    {
        return \Magento\Framework\App\Request\Http::getUrlNoScript($this->backendUrl->getBaseUrl())
        . 'admin/marketplace/index/index';
    }
}
```

All cURL client instances are created in `__construct`.
The `getPartners` method uses the cURL client to make a POST request, the `post` method takes the first parameter the URL to the API of `magento-connect`, while the second parameter is an empty array. Then, the option `CURLOPT_REFERER` is added by the `setOptions` method of the cURL client.
As a result, the script calls the `getBody` method of the cURL client.
