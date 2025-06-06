---
title: ReleaseNotification
description: N/A
---

# Magento_ReleaseNotification module

This module serves to provide a notification delivery platform for displaying new features of a Magento installation or upgrade as well as any other required release notifications.

## Installation

The Magento_ReleaseNotification module creates the `release_notification_viewer_log` table in the database.

All database schema changes made by this module are rolled back when the module gets disabled and setup:upgrade command is run.

For information about a module installation in Magento 2, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

## Extensibility

Extension developers can interact with the Magento_ReleaseNotification module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_ReleaseNotification module.

### UI components

You can extend release notification updates using the configuration files located in the `view/adminhtml/ui_component` directory:

- `release_notification`

For information about a UI component in Magento 2, see [Overview of UI components](https://developer.adobe.com/commerce/frontend-core/ui-components/).

## Additional information

### Purpose and Content

- Provides a method of notifying administrators of changes, features, and functionality being introduced in a Magento release.
- Displays a modal containing a high level overview of the features included in the installed or upgraded release of Magento upon the initial login of each administrator into the Admin Panel for a given Magento version.
- The modal is enabled with pagination functionality to allow for easy navigation between each modal page.
- Each modal page includes detailed information about a highlighted feature of the Magento release or other notification.
- Release Notification modal content is determined and provided by Magento Marketing.

### Content Retrieval

Release notification content is maintained by Magento for each Magento version, edition, and locale. To retrieve the content, a response is returned from a request with the following parameters:

-  **version** = The Magento version that the client has installed (ex. 2.4.0).
-  **edition** = The Magento edition that the client has installed (ex. Community).
-  **locale** = The chosen locale of the admin user (ex. en_US).

The module will make three attempts to retrieve content for the parameters in the order listed:

1. Version/Edition/Locale
2. Version/Edition/en_US (default locale)
3. Version (default file for a Magento version)

If there is no content to be retrieved after these requests, the release notification modal will not be displayed to the admin user.

### Content Guidelines

The modal system in the ReleaseNotification module can have up to four modal pages. The admin user can navigate between pages using the "< Prev" and "Next >" buttons at the bottom of the modal. The last modal page will have a "Done" button that will close the modal and record that the admin user has seen the notification.

Each modal page can have the following optional content:

- Main Content
    - Title
    - URL to the image to be displayed alongside the title
    - Text body
    - Bullet point list
- Sub Headings (highlighted overviews of the content to be detailed on subsequent modal pages) - one to three Sub Headings may be displayed
    - Sub heading title
    - URL to the image to be display before the sub heading title
    - Sub heading content
- Footer
    - Footer content text

The Sub Heading section is ideally used on the first modal page as a way to describe one to three highlighted features that will be presented in greater detail on the following modal pages. It is recommended to use the Main Content -> Text Body and Bullet Point lists as the paragraph and list content displayed on a highlighted feature's detail modal page.

A clickable link to internal or external content in any text field will be created by using the following format and opened in a new browser tab. Providing the URL for the link followed by the text to be displayed for that link in brackets will cause a clickable link to be created. The text between the brackets [text] will be the text that the clickable link shows.

#### Link Format Example:

The text: `https://developer.adobe.com/commerce/docs/ [Adobe Commerce Developer Documentation].` will appear as [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/).

<InlineAlert slots="text" />
The version of this module is 100.4.6.
