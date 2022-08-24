# Commerce PHP Documentation

This site uses Yarn 3 to manage package dependencies.
If you do not have Yarn 3 installed, follow these instructions:

1. Install [Node.js LTS](https://nodejs.org/en/download/). At the time of writing, the latest LTS version is `v16.15.1`.
2. Install Yarn 3 by running the following command:

   ```bash
   corepack enable
   ```

Corepack is a binary shipped with all Node.js releases starting from 16.10.

3. Update Yarn to the latest version by running the following command:

   ```bash
   yarn set version stable
   ```

4. Make sure you are now using version 3.2.2 of Yarn:.

   ```bash
   yarn --version
   ```

That's it. For more information on Yarn 3 usage, see [Yarn usage](https://yarnpkg.com/getting-started/usage).

## How to build the documentation

To build this site locally and contribute changes, follow these steps:

1. Fork the repo into your own account, then clone it to a local directory.

   ```bash
   git clone git@github.com:AdobeDocs/commerce-php.git
   ```

2. In the repo's root, run this command to install dependencies:

   ```bash
   yarn install
   ```

3. Run this command to build the site locally and auto-launch your browser:

   ```bash
   yarn dev
   ```

## Contributor resources

For the documentation contributor or developer, please read these sections on how to:

- [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
- [Linking to pages](https://github.com/adobe/aio-theme#links)
- [Using assets](https://github.com/adobe/aio-theme-aio#assets)
- [Setting Global Navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Setting Side Navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Using content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Notes on using Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).
