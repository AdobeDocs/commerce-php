---
title: NewRelicReporting
description: N/A
---

# Magento_NewRelicReporting module

This module implements integration New Relic APM and New Relic Insights with Magento, giving real-time visibility into business and performance metrics for data-driven decision making.

## Installation

Before installing this module, note that the Magento_NewRelicReporting is dependent on the following modules:

- `Magento_Store`
- `Magento_Customer`
- `Magento_Backend`
- `Magento_Catalog`
- `Magento_ConfigurableProduct`
- `Magento_Config`

This module creates the following tables in the database:

- `reporting_counts`
- `reporting_module_status`
- `reporting_orders`
- `reporting_users`
- `reporting_system_updates`

For information about a module installation in Magento 2, see [Enable or disable modules](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/tutorials/manage-modules).

## Extensibility

Extension developers can interact with the Magento_NewRelicReporting module. For more information about the Magento extension mechanism, see [Magento plug-ins](https://developer.adobe.com/commerce/php/development/components/plugins/).

[The Magento dependency injection mechanism](https://developer.adobe.com/commerce/php/development/components/dependency-injection/) enables you to override the functionality of the Magento_NewRelicReporting module.

## Additional information

[Learn more about New Relic Reporting](https://experienceleague.adobe.com/en/docs/commerce-admin/start/reporting/new-relic-reporting).

### Console commands

The Magento_NewRelicReporting provides console commands:

#### newrelic:create:deploy-marker

Creates deployment markers in New Relic to track application deployments and changes.

**Syntax:**
```bash
bin/magento newrelic:create:deploy-marker <message> [<changelog>] [<user>] [<revision>] [options]
```

**Arguments:**
- `<message>` - Required: Deployment description/title
- `[<changelog>]` - Optional: Summary of changes in this deployment
- `[<user>]` - Optional: User who performed the deployment (defaults to system user)
- `[<revision>]` - Optional: Version or revision identifier

**Options (NerdGraph enhanced):**
- `--commit="<hash>"` - Git commit hash for this deployment
- `--deep-link="<url>"` - Deep link to deployment details
- `--group-id="<id>"` - Group ID for organizing deployments

**Examples:**

Basic usage (works with both APIs):
```bash
bin/magento newrelic:create:deploy-marker "Release v1.2.0" "Bug fixes and performance improvements"
```

With user and revision:
```bash
bin/magento newrelic:create:deploy-marker "Release v1.2.0" "Bug fixes and performance improvements" "dev-team" "v1.2.0"
```

Enhanced usage with NerdGraph options:
```bash
bin/magento newrelic:create:deploy-marker "Production Deploy" "Updates and new features" "ops-user" "v1.2.0" \
  --commit="abc123def456" \
  --deep-link="https://github.com/company/project/releases/tag/v1.2.0" \
  --group-id="production"
```


[Learn more about command's parameters](https://experienceleague.adobe.com/en/docs/commerce-operations/tools/cli-reference/commerce-on-premises#newreliccreatedeploy-marker).

### Configuration

The module supports both v2 REST API and modern NerdGraph GraphQL API for deployment tracking.

#### Admin Configuration

Navigate to **Stores** > **Configuration** > **General** > **New Relic Reporting**:

1. **Enable New Relic Integration**: Yes
2. **Deployment API Mode**: Choose your preferred API:
    - **v2_rest**: Legacy REST API (backward compatible)
    - **nerdgraph**: Modern GraphQL API (recommended)

#### NerdGraph Configuration (Recommended)

When **Deployment API Mode** is set to **nerdgraph**, additional fields appear:

- **New Relic API URL (NerdGraph)**:
    - US: `https://api.newrelic.com/graphql`
    - EU: `https://api.eu.newrelic.com/graphql`
- **Entity GUID (NerdGraph)**: Your application's entity GUID
- **New Relic API Key**: Create a user key, see [New Relic API Keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/) documentation

#### V2 REST Configuration

When **Deployment API Mode** is set to **v2_rest**, configure:

- **New Relic API URL (v2 REST)**: API endpoint
- **New Relic Application ID**: Found in APM URL after "/applications/"
- **New Relic API Key**: Your REST API key

### NerdGraph Features

When using NerdGraph mode, the module provides:

#### Enhanced Metadata Support
- **Commit Hash**: Git commit tracking
- **Deep Links**: Links to deployment details
- **Group ID**: Environment/team organization
- **Automatic Timestamps**: Precise deployment timing
- **Version Tracking**: Automatic or manual version assignment

### Cron options

Cron group configuration can be set at `etc/crontab.xml`:

- `magento_newrelicreporting_cron` - runs collecting all new relic reports

[Learn how to configure and run cron in Magento.](https://experienceleague.adobe.com/en/docs/commerce-operations/configuration-guide/cli/configure-cron-jobs).

<InlineAlert slots="text" />
The version of this module is 100.4.6.
