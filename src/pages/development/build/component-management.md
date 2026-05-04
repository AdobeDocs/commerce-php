---
title: Enable or disable a component | Commerce PHP Extensions
description: Manage Adobe Commerce and Magento Open Source components using the command-line interface.
keywords:
  - Extensions
---

# Enable or disable a component

After you have built the component and are ready to enable it in your environment, do the following:

1. Disable the cache under `System->Cache Management`.
1. Enter the following in the command line:

   ```bash
   bin/magento module:enable --clear-static-content Component_Name
   ```

   ```bash
   bin/magento setup:upgrade
   ```

   ```bash
   bin/magento cache:clean
   ```

   Where `Component_Name` is the name of the component you are enabling.

1. Check that the component is enabled:

   ```bash
   bin/magento module:status <extension-name>
   ```

   An extension name uses the format: `<VendorName>_<ComponentName>`.

   Sample response:

   ```terminal
   Module is enabled
   ```

## Order of operations

The general order of operations for `setup:upgrade` is:

1. **Schema install/upgrade.**
1. **Schema post-upgrade**— handles any additional updates. These recurring upgrades occur independently and regardless of any changes to the schema.
1. **Data install/upgrade** — installs the data. Taken from `setup/InstallData.php`.

## Disable a component

To disable a component, enter the following at the command line:

```bash
bin/magento module:disable --clear-static-content Component_Name
```

For more on enabling and disabling components, see [enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules#module-enable-disable).
