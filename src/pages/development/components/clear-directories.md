---
title: Directory and Cache Clearing | Commerce PHP Extensions
description: Ensure that your Adobe Commerce and Magento Open Source code is functioning properly by routinely clearing specific directories and caches.
keywords:
  - Extensions
---

# Directory and cache clearing

While you're developing components (modules, themes, and language packages), your rapidly changing environment requires you to periodically clear certain directories and caches. Otherwise, your code runs with exceptions and won't function properly.

This topic provides guidelines on what directories to clear and when to clear them.
All directories discussed in this topic are default locations. It's possible to customize these locations but doing so is beyond the scope of this topic.

When you're developing components (modules, themes, and language packages), the following directories contain temporary or generated files you can clear periodically:

Directory | Description
--- | ---
`generated/code` | Contains [generated code][]
`generated/metadata`| Contains the compiled dependency injection configuration for all modules.
`pub/static`| Contains `js` and `html` files for each store view.
`var/cache` | All cacheable objects _except the page cache_. This directory is empty if you use a third-party cache storage such as Redis.
`var/composer_home` | Home directory for Setup Wizard artifacts. Do not touch this directory unless you are an experienced developer familiar with the plug-in system.
`var/page_cache` | Cached pages from the full page cache mechanism. This directory is empty if you use a third-party HTTP accelerator such as Varnish.
`var/view_preprocessed` | Contains minified templates and compiled LESS (meaning LESS, CSS, and HTML).

## What directories to clear

The following table provides guidelines on what you should clear and when.

Action | Directories to clear
--- | ---
Change a class if there is a plugin related to it | `generated/metadata`, `generated/code`
A change that results in generated factories or proxies | `generated/metadata`, `generated/code`
A change in `di.xml` | `generated/metadata`, `generated/code` (also need to run the code compiler again)
Add, remove, enable, or disable modules | `generated/metadata`, `generated/code`, `var/cache`, `var/page_cache`
Add or edit a layout or theme | `var/view_preprocessed`, `var/cache`, `var/page_cache`
Change LESS or templates | `var/view_preprocessed`, `var/cache`, `var/page_cache`, `pub/static`
Change `*.js` or `*.html` files | `pub/static`
Add or edit a CMS page, cacheable block, or use the Admin to change the configuration |`var/cache`, `var/page_cache`

## How to clear the directories

To only clear directories and not perform other actions, log in to the application server as the <a href="https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/prerequisites/file-system/overview">file system owner</a> and clear directories using a command like the following:

```bash
rm -r <magento_root>/generated/*/*
```

You can also use the following command-line tools clear some directories for you. These commands perform other tasks as well; consult the linked documentation for more details.

| Tool name | Brief description | What it clears |
| --- | --- | --- |
| [`magento setup:upgrade`][]| Update the database schema and data | `generated/metadata` and `generated/code` |
| [`magento setup:di:compile`][]|Generates code | `generated/code` prior to compiling |
| [`magento deploy:mode:set {mode}`][]|Switch between `developer` and `production` mode | `generated/metadata`, `generated/code`, `var/view_preprocessed`|
| [`magento cache:clean {type}`][]|Clears the cache | `var/cache` and `var/page_cache`|

[`magento setup:upgrade`]: https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/database-upgrade
[`magento setup:di:compile`]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/code-compiler.html
[`magento deploy:mode:set {mode}`]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/set-mode.html
[`magento cache:clean {type}`]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/cli/manage-cache.html
[generated code]: code-generation.md
