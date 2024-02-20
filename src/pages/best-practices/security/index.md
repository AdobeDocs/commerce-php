---
title: Security | Commerce PHP Extensions
description: Review best practices for writing secure code for Adobe Commerce and Magento Open Source extensions.
keywords:
  - Extensions
  - Security
---

# Security

Using PHP features that are known to be exploitable or non-secure can lead to remote code execution or weak cryptography.
As a developer, you should avoid using features that introduce vulnerabilities in your code.

## PHP functions to avoid

The following is a list of PHP functions that are known to be vulnerable and exploitable.
Avoid using these functions in your code.

*  [`eval`](https://www.php.net/manual/en/function.eval.php) - Using `eval` is considered bad practice because of its ability to [execute arbitrary PHP code](https://www.owasp.org/index.php/PHP_Security_Cheat_Sheet#Code_Injection).
*  [`serialize`](https://www.php.net/manual/en/function.serialize.php)/[`unserialize`](https://www.php.net/manual/en/function.unserialize.php) - Attackers can create an exploit for these functions by passing a string with a serialized arbitrary object to the `unserialize` function to [run arbitrary code](https://www.owasp.org/index.php/PHP_Object_Injection).
*  [`md5`](https://www.php.net/manual/en/function.md5.php) - The algorithm for this function is known to have [cryptographic weaknesses](https://www.owasp.org/index.php/Guide_to_Cryptography#Hashes).
   You should never use this function for hashing passwords or any other sensitive data.
*  [`srand`](https://www.php.net/manual/en/function.srand.php) - Using a predetermined number to seed the random number generator results in a [predictable sequence of numbers](https://programmers.stackexchange.com/questions/76229/predicting-the-output-of-phps-rand).
*  [`mt_srand`](https://www.php.net/manual/en/function.mt-rand.php) - This function is a pseudo-random number generator (PRNG) and is [not cryptographically secure](http://phpsecurity.readthedocs.io/en/latest/Insufficient-Entropy-For-Random-Values.html).

## Standard PHP library classes to avoid

*  [`ArrayObject`](https://www.php.net/manual/en/class.arrayobject.php) - Using `ArrayObject` class is not recommended because it contains `unserialize` method, which attackers can use to create an exploit.

   If you need to use the `ArrayObject` class, override the `serialize`/`unserialize` methods so that they use secure logic.
   Convert objects into arrays to serialize them, and reconstruct the objects using arrays during unserialization.

   You can use [Serialize Library](../../development/framework/serialize-library.md) in framework for a secure way of serializing/unserializing data.
