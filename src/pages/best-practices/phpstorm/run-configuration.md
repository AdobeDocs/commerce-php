---
title: Run the Upgrade Compatibility Tool | Commerce PHP Extensions
description: Set up a run configuration to integrate the Adobe Commerce and Magento Open Source PHPStorm plugin with the Upgrade Compatibility Tool.
keywords:
  - Extensions
  - Upgrade
---

# Run the Upgrade Compatibility Tool

Run Configurations are used to run internal and external processes from within IntelliJ Platform-based products.

## Setup the Run Configuration

See the [Run/Debug configurations topic](https://www.jetbrains.com/help/idea/run-debug-configuration.html) in the IntelliJ IDEA to understand the concept of a run configuration.

The Run Configuration is a Graphical User Interface (GUI) for the Upgrade Compatibility Tool. This allows the Upgrade Compatibility Tool instance to be configured using Composer. We recommend that you install the Upgrade Compatibility Tool in the current project. However, if the Upgrade Compatibility Tool is located outside the current project, a message displays providing an option to download and install it in the current project.

<InlineAlert variant="warning" slots="text"/>

The Upgrade Compatibility Tool is an Adobe Commerce feature. You need your Adobe Commerce license key to install it.

![](../../images/best-practices/phpstorm/uct-run-configuration-1-min.gif)

When you create a new run configuration for a specific tool, create it from one of the dedicated configuration templates. Templates implement the startup logic and define the list of parameters and their default values.

The Upgrade Compatibility Tool Run Configuration template is located in the PHPStorm plugin menu, under **Run/Debug configurations** > **Add New Configuration** > **Upgrade Compatibility Tool**.

![](../../images/best-practices/phpstorm/uct-run-configuration-template-position.png)

These are the main components of the Upgrade Compatibility Tool Run Configuration template:

![](../../images/best-practices/phpstorm/uct-run-configuration-template-view.png)

*  *Upgrade Compatibility Tool (UCT) executable*: Path where the Upgrade Compatibility Tool executable script is located. Determined by the `bin/uct` path from the Upgrade Compatibility Tool source root directory.
*  *Project root*: Current PHPStorm plugin root directory.
*  *Path*: Path to analyze. Restricts the search to a specific folder. This is an optional field.
*  *Coming version*: The Adobe Commerce targeted version.
*  *Min issue level*: The minimum issue level to show in the report. Default is [WARNING]. This is an optional field.
*  *Ignore current version compatibility issues*: use this option when you do not want to include known critical issues, errors and warnings in your Upgrade Compatibility Tool report. This is an optional field.
*  *Message*: Message that appears if the Upgrade Compatibility Tool cannot be located for the current PHPStorm plugin project.
*  *Link*: Link to install the Upgrade Compatibility Tool for the current PHPStorm plugin project.

See [run the tool](https://experienceleague.adobe.com/en/docs/commerce-operations/upgrade-guide/upgrade-compatibility-tool/use-upgrade-compatibility-tool/run) for more information on these specific options of the Upgrade Compatibility Tool.

After you correctly configure the template, you can run the Upgrade Compatibility Tool with a single click in your Run Configuration GUI.

## Run the tool

To run the Upgrade Compatibility Tool click `UCT Run`.

![](../../images/best-practices/phpstorm/uct-run-configuration-3-min.gif)

The results are displayed in the console, including handy navigation to the compatibility issues in the code.

The output of the tool is displayed in the PHPStorm console with the ability to click and navigate to the references:

*  Code that has an issue.
*  Issue code description in the documentation.
*  Report file.
