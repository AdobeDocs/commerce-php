---
title: Re-encrypt system and custom fields
description: Learn how to re-encrypt certain encrypted configuration values after rotating an encryption key.
keywords:
  - Extensions
  - Security
---

import BetaNote from '/src/_includes/notes/beta.md'

# Data re-encryption

<BetaNote />

Adobe Commerce and Magento Open Source provide functionality to re-encrypt certain encrypted system configuration, payment fields, and custom fields. These operations may be necessary after [rotating an encryption key](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/security/encryption-key).

# Default re-encryptors

The default re-encryption configuration provides two re-encryptors:

- **System configuration fields**—`Magento\Config\Model\Data\ReEncryptorList\CoreConfigDataReEncryptor`
- **Payment fields**—`Magento\Sales\Model\Data\ReEncryptorList\SalesOrderPaymentReEncryptor`

You can use the following command to run both re-encryptors after rotating an encryption key.

```bash
bin/magento encryption:data:re-encrypt core_config_data sales_order_payment
```

# Re-encrypting specific table columns

The `Magento\EncryptionKey\Model\Data\ReEncryptorList\ReEncryptor\SimpleHandler` class serves as a base for re-encryptors that simply tries to re-encrypt specific columns in a database table.

Follow these steps to re-encrypt specific columns in your tables and add a custom re-encryptor:

1. Create a virtual type handler for the `Magento\EncryptionKey\Model\Data\ReEncryptorList\ReEncryptor\SimpleHandler` class and provide the table name, primary key, and columns to encrypt as constructor arguments.

   ```xml
   <virtualType name="Vendor\MyModule\Model\Data\ReEncryptorList\MyCustomPaymentEncryptor\Handler" type="Magento\EncryptionKey\Model\Data\ReEncryptorList\ReEncryptor\SimpleHandler">
       <arguments>
           <argument name="tableName" xsi:type="string">my_custom_payment_table</argument>
           <argument name="identifierField" xsi:type="string">entity_id</argument>
           <argument name="fieldsToReEncrypt" xsi:type="array">
               <item name="cc_number_enc" xsi:type="string">cc_number_enc</item>
           </argument>
       </arguments>
   </virtualType>
   ```

1. Create a virtual type for the `Magento\EncryptionKey\Model\Data\ReEncryptorList\ReEncryptor` class and inject the handler created in the previous step as a constructor argument.

   ```xml
   <virtualType name="Vendor\MyModule\Model\Data\ReEncryptorList\MyCustomPaymentReEncryptor" type="Magento\EncryptionKey\Model\Data\ReEncryptorList\ReEncryptor">
       <arguments>
           <argument name="description" xsi:type="string">Re-encrypts 'cc_number_enc' column in the 'my_custom_payment_table' DB table.</argument>
           <argument name="handler" xsi:type="object">Vendor\MyModule\Model\Data\ReEncryptorList\MyCustomPaymentEncryptor\Handler</argument>
       </arguments>
   </virtualType>
   ```

1. Add the re-encryptor that you created in the previous step to the `Magento\EncryptionKey\Model\Data\ReEncryptorList` class.

   ```xml
   <type name="Magento\EncryptionKey\Model\Data\ReEncryptorList">
       <arguments>
           <argument name="reEncryptors" xsi:type="array">
               <item name="my_custom_payment_reencryptor" xsi:type="object">Vendor\MyModule\Model\Data\ReEncryptorList\MyCustomPaymentReEncryptor</item>
           </argument>
       </arguments>
   </type>
   ```

You can run the following command to test that the newly created re-encryptor shows up in the list of available encryptors and whether there were any errors.

```bash
bin/magento encryption:data:list-re-encryptors
```

If the previous step was successful, you can run the following command to re-encrypt specific columns in your database table using the re-encryptor.

```bash
bin/magento encryption:data:re-encrypt my_custom_payment_reencryptor
```
