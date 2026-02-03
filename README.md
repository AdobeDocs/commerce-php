# Adobe Commerce Developer Documentation

Welcome! This site contains the latest Adobe Commerce and Magento Open Source developer documentation for ongoing releases of both products. For additional information, see our [Contribution Guide](https://developer.adobe.com/commerce/contributor/).

## Contributors

Our goal is to provide the Adobe Commerce and Magento Open Source communities with comprehensive and quality technical documentation. We believe that to accomplish that goal we need experts from the community to share their knowledge with us and each other. We are thankful to all of our contributors for improving the documentation.

![Commerce contributors](https://raw.githubusercontent.com/wiki/magento/magento2/images/dev_docs_contributors.png)

## Local development

This is a [Gatsby](https://www.gatsbyjs.com/) project that uses the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

To build the site locally:

1. Clone this repo.
1. Install project dependencies.

   ```bash
   yarn install
   ```

1. Launch the project in development mode.

   ```bash
   yarn dev
   ```

## Components

To achieve specific user experience goals for Commerce documentation, this repo overrides the original [`Edition`](https://github.com/adobe/aio-theme/blob/main/packages/gatsby-theme-aio/src/components/Edition/index.js) component from the upstream [`aio-theme`](https://github.com/adobe/aio-theme/) repo that we use as a dependency.

### Edition

The custom `Edition` component in this repo displays a badge indicating whether a feature or functionality is available in specific Adobe Commerce environments. It has been customized to align with the badges that we use in Experience League docs.

#### Usage

```yaml
# Page-level (metadata)
edition: saas # For SaaS-only features
edition: paas # For PaaS-only features
```

```md
<!-- Section-level (inline) -->
<Edition name="paas" />  <!-- For PaaS-only features -->
<Edition name="saas" />  <!-- For SaaS-only features -->
```

## Resources

See the following resources to learn more about using the theme:

- [Arranging content structure](https://github.com/adobe/aio-theme#content-structure)
- [Linking to pages](https://github.com/adobe/aio-theme#links)
- [Using assets](https://github.com/adobe/aio-theme#assets)
- [Configuring global navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Configuring side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Using content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Writing enhanced Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)
- [Deploying the site](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites) _(Adobe employees only)_

If you have questions, open an issue and ask us. We look forward to hearing from you!
