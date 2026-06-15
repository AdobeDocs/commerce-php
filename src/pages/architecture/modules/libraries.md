---
title: Third-Party Libraries | Commerce PHP Extensions
description: Learn how the Commerce framework uses third-party libraries.
keywords:
  - Extensions
---

# Third-Party Libraries

Commerce depends on a set of external libraries. You can use Composer to manage these dependencies. Composer downloads all of the external libraries that are included in its main configuration file and installs them under its default installation directory (`vendor/`). Third-party libraries include the Zend framework files and the Symfony libraries.

There are some required libraries that Composer does not load. These reside in `lib/` and include JavaScript libraries (none of which are loaded by Composer) and a few PHP libraries. (You can also use Composer to manage dependencies between various components within Commerce.)

If you are extending your storefront to interact with third-party applications, you might need to include additional external libraries. These external libraries can be as simple as a wrapper for an API of a third-party product you are integrating with your storefront, or an entire framework.
