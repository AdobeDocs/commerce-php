---
title: DateTime Library | Commerce PHP Extensions
description: Use this library in your Adobe Commerce and Magento Open Source components to manipulate date and time formatting.
contributor_name: Rakesh Jesadiya
contributor_link: https://github.com/RakeshJesadiya
keywords:
  - Extensions
---

# DateTime library

The DateTime library provides utilities to work with date and time formatting. Provided methods in this library are described below.

## Usage

|Method|Description|
|--- |--- |
| `formatDate` | Format the date to the internal format |
| `isEmptyDate` | Check whether provided date value is empty or null |

### Example

The following example shows how to format the current date and time into the internal format.

```php
<?php

use Magento\Framework\Stdlib\DateTime;

...
    /**
     * @var DateTime
     */
    private $dateTime;

    /**
     * SomeClass constructor.
     *
     * @param DateTime $dateTime
     */
    public function __construct(DateTime $dateTime)
    {
        $this->dateTime = $dateTime;
    }

    /**
     * display current date to internal format time zone
     *
     * @return string
     */
    public function getFormatDate(): string
    {
    return $this->dateTime->formatDate(time());
    }
...
```
