---
title: Create a Custom Command | Commerce PHP Extensions
description: Learn how to create custom CLI commands for Adobe Commerce and Magento Open Source.
---

# Create a custom command

Adobe Commerce and Magento Open Source enables your component to add commands to our [Symfony-like command-line interface (CLI)](https://symfony.com/doc/current/components/console.html).

Commerce has one command-line interface that performs both installation and configuration tasks: `<magento_root>/bin/magento`. The new interface performs multiple tasks, including:

-  Installing Commerce (and related tasks such as creating or updating the database schema, creating the deployment configuration, and so on).
-  Clearing the cache.
-  Managing indexes, including reindexing.
-  Creating translation dictionaries and translation packages.
-  Generating non-existent classes such as factories and interceptors for plug-ins, generating the dependency injection configuration for the object manager.
-  Deploying static view files.
-  Creating CSS from Less.

Other benefits:

-  A single command (`<magento_root>/bin/magento list`) lists all available installation and configuration commands.
-  Consistent user interface based on Symfony.
-  The CLI is extensible so third party developers can "plug in" to it. This has the additional benefit of eliminating users' learning curve.
-  Commands for disabled modules do not display.

## Prerequisites

Before you begin, make sure you understand the following:

-  All Magento command-line interface (CLI) commands rely on the application and must have access to its context, dependency injections, plug-ins, and so on.
-  All CLI commands should be implemented in the scope of your module and should depend on the module's status.
-  Your command can use the Object Manager and dependency injection features; for example, it can use [constructor dependency injection](../components/dependency-injection.md#constructor-injection).
-  Your command should have an unique `name`, defined in the `configure()` method of the Command class:

    ```php
    protected function configure(): void
    {
        $this->setName('my:first:command');
        $this->setDescription('This is my first console command.');

        parent::configure();
    }
    ...
    ```

   or in the `di.xml` file:

    ```xml
    <?xml version="1.0"?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
        ...
        <type name="Magento\CommandExample\Console\Command\SomeCommand">
            <arguments>
                <!-- configure the command name via constructor $name argument -->
                <argument name="name" xsi:type="string">my:first:command</argument>
            </arguments>
        </type>
        ...
    </config>
    ```

    or in the `__construct` method (declaration is similar to `di.xml`):

    ```php
    public function __construct()
    {
        parent::__construct('my:first:command');
    }
    ```

   Otherwise the [Symfony](https://github.com/symfony/console/blob/master/Application.php#L470) framework will return an `The command defined in "<Command class>" cannot have an empty name.` error.

## Add CLI commands using dependency injection

The sample modules provide a demonstration of many programming techniques, including adding a CLI command using dependency injection. Look at the [`sample-module-command`](https://github.com/magento/magento2-samples/tree/master/sample-module-command) for an example. The module's [README.md](https://github.com/magento/magento2-samples/blob/master/sample-module-command/README.md) discusses how to install it.

Following is a summary of the process:

1. Create a Command class (the recommended location is `<your component root dir>/Console/Command`).

   See [`<Magento_Store_module_dir>/Console/Command/StoreListCommand.php`](https://github.com/magento/magento2/blob/2.4/app/code/Magento/Store/Console/Command/StoreListCommand.php) for example.

    ```php
    <?php
   
    declare(strict_types=1);
   
    namespace Magento\CommandExample\Console\Command;

    use Magento\Framework\Exception\LocalizedException;
    use Symfony\Component\Console\Command\Command;
    use Symfony\Component\Console\Input\InputInterface;
    use Symfony\Component\Console\Input\InputOption;
    use Symfony\Component\Console\Output\OutputInterface;

    class SomeCommand extends Command
    {
        private const NAME = 'name';

        protected function configure(): void
        {
            $this->setName('my:first:command');
            $this->setDescription('This is my first console command.');
            $this->addOption(
                self::NAME,
                null,
                InputOption::VALUE_REQUIRED,
                'Name'
            );

            parent::configure();
        }

        /**
         * Execute the command
         *
         * @param InputInterface $input
         * @param OutputInterface $output
         *
         * @return int
         */
         protected function execute(InputInterface $input, OutputInterface $output): int
         {
             $exitCode = 0;
             
             if ($name = $input->getOption(self::NAME)) {
                 $output->writeln('<info>Provided name is `' . $name . '`</info>');
             }

             $output->writeln('<info>Success message.</info>');
             $output->writeln('<comment>Some comment.</comment>');

             try {
                 if (rand(0, 1)) {
                    throw new LocalizedException(__('An error occurred.'));
                 }
             } catch (LocalizedException $e) {
                 $output->writeln(sprintf(
                     '<error>%s</error>',
                     $e->getMessage()
                 ));
                 $exitCode = 1;
             }
             
             return $exitCode;
         }
    }
    ```

    Style the output text by using `<error>`, `<info>`, or `<comment>` tags. See [Symfony](https://symfony.com/doc/current/console/coloring.html) documentation for more information about styling.

1. Declare your Command class in `Magento\Framework\Console\CommandListInterface` and configure the command name using dependency injection (`<your component root dir>/etc/di.xml`):

    ```xml
    <?xml version="1.0"?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
        ...
        <type name="Magento\Framework\Console\CommandListInterface">
            <arguments>
                <argument name="commands" xsi:type="array">
                    <item name="commandexample_somecommand" xsi:type="object">Magento\CommandExample\Console\Command\SomeCommand</item>
                </argument>
            </arguments>
        </type>
        ...
    </config>
    ```

1. Clean the cache:

    ```bash
    bin/magento cache:clean
    ```

1. Regenerate the code:

    ```bash
    bin/magento setup:di:compile
    ```

### Result

As a result, the new command `my:first:command` that accepts a `--name` parameter is ready to use.

```bash
bin/magento my:first:command --name 'John'
```
