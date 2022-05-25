module.exports = [
    {
      title: "Introduction",
      path: "/developer/",
      pages: [
        {
          title: "Developer roadmap",
          path: "/developer/roadmap/",
        },
        {
          title: "Composer",
          path: "/developer/composer/"
        },
        {
          title: "Common terms",
          path: "/developer/common-terms/"
        },
      ],
    },
    {
      title: "Prepare",
      path: "/developer/prepare/",
      pages: [
        {
          title: "Component types",
          path: "/developer/prepare/component-types/",
        },
        {
          title: "Component file structure",
          path: "/developer/prepare/component-file-structure/",
        },
        {
          title: "Extension repository structure",
          path: "/developer/prepare/extension-repository-structure",
        },
        {
          title: "Component development roadmap",
          path: "/developer/prepare/development-roadmap/",
        },
        {
          title: "Extension lifecycle",
          path: "/developer/prepare/extension-lifecycle/",
        },
      ],
    },
    {
      title: "Build",
      path: "/developer/build/",
      pages: [
        {
          title: "Dependency injection configuration",
          path: "/developer/build/dependency-injection-file/",
        },
        {
          title: "Optimal development environment",
          path: "/developer/build/development-environment/",
        },
        {
          title: "Composer integration",
          path: "/developer/build/composer-integration/",
        },
        {
          title: "Required configuration files",
          path: "/developer/build/required-configuration-files/",
        },
        {
          title: "Create component file structure",
          path: "/developer/build/component-file-structure/",
        },
        {
          title: "Register a component",
          path: "/developer/build/component-registration/",
        },
        {
          title: "URN schema validation",
          path: "/developer/build/schema-validation/",
        },
        {
          title: "Name a component",
          path: "/developer/build/component-name/",
        },
        {
          title: "Component load order",
          path: "/developer/build/component-load-order/",
        },
        {
          title: "Enable/disable a component",
          path: "/developer/build/component-management/",
        },
      ],
    },
    {
      title: "Package",
      path: "/developer/package/",
      pages: [
        {
          title: "Paclage a component",
          path: "/developer/package/component/",
        },
        {
          title: "Distribute a package",
          path: "/developer/package/distribute-component/",
        },
      ],
    },
    {
      title: "Validate",
      path: "/developer/validate/",
      pages: [
        {
          title: "Test a component",
          path: "/developer/validate/test-component/",
        },
      ],
    },
    {
      title: "Partial caching",
      path: "/developer/cache/partial/",
      pages: [
        {
          title: "Create custom cache engines",
          path: "/developer/cache/partial/database-caching/",
        },
        {
          title: "Create a cache type",
          path: "/developer/cache/partial/cache-type/",
        },
      ],
    },
    {
      title: "Full page caching",
      path: "/developer/cache/page/",
      pages: [
        {
          title: "Public content",
          path: "/developer/cache/page/public-content/",
        },
        {
          title: "Private content",
          path: "/developer/cache/page/private-content/",
        },
      ],
    },
    {
      title: "CLI commands",
      path: "/developer/cli-commands/",
      pages: [
        {
          title: "Naming guidelines",
          path: "/developer/cli-commands/naming-guidelines/",
        },
        {
          title: "Create a new command",
          path: "/developer/cli-commands/custom",
        },
      ],
    },
    {
      title: "Staging",
      path: "/developer/staging/",
    },
    {
      title: "Component development",
      path: "/developer/components/",
      pages: [
        {
          title: "Asynchronous and deferred operations",
          path: "/developer/components/async-operations/",
        },
        {
          title: "Service contracts",
          path: "/developer/components/service-contracts/",
          pages: [
            {
              title: "Design patterns",
              path: "/developer/components/service-contracts/design-patterns/",
            },
          ],
        },
        {
          title: "Public interfaces and APIs",
          path: "/developer/components/api-concepts/",
        },
        {
          title: "Dependency injection",
          path: "/developer/components/dependency-injection/",
        },
        {
          title: "Object manager",
          path: "/developer/components/object-manager/",
          pages: [
            {
              title: "Object manager helper",
              path: "/developer/components/object-manager/helper/"
            },
          ],
        },
        {
          title: "Events and observers",
          path: "/developer/components/events-and-observers/",
          pages: [
            {
              title: "List of events",
              path: "/developer/components/events-and-observers/event-list/"
            },
          ],
        },
        {
          title: "Factories",
          path: "/developer/components/factories/",
        },
        {
          title: "Proxies",
          path: "/developer/components/proxies/",
        },
        {
          title: "Code generation",
          path: "/developer/components/code-generation/",
        },
        {
          title: "EAV and extension attributes",
          path: "/developer/components/attributes/",
        },
        {
          title: "Plugins (interceptors)",
          path: "/developer/components/plugins/",
        },
        {
          title: "Routing",
          path: "/developer/components/routing/",
        },
        {
          title: "Indexing",
          path: "/developer/components/indexing/",
          pages: [
            {
              title: "Indexer optimization",
              path: "/developer/components/indexing/optimization/",
            },
            {
              title: "Create a custom indexer",
              path: "/developer/components/indexing/custom-indexer/",
            },
          ],
        },
        {
          title: "Declarative schema",
          path: "/developer/components/declarative-schema/",
          pages: [
            {
              title: "Migration scripts",
              path: "/developer/components/declarative-schema/migration-scripts/",
            },
            {
              title: "Configuration",
              path: "/developer/components/declarative-schema/configuration/",
            },
            {
              title: "Data and schema patches",
              path: "/developer/components/declarative-schema/patches/",
            },
          ],
        },
        {
          title: "Web APIs",
          path: "/developer/components/web-api/",
          pages: [
            {
              title: "Configure services as web APIs",
              path: "/developer/components/web-api/services/",
            },
            {
              title: "Set custom routes",
              path: "/developer/components/web-api/custom-routes/",
            },
            {
              title: "Request processor pool",
              path: "/developer/components/web-api/request-processor-pool/",
            },
          ],
        },
        {
          title: "Message queues",
          path: "/developer/components/message-queues/",
          pages: [
            {
              title: "Asynchronous configuration",
              path: "/developer/components/message-queues/async-configuration/",
            },
            {
              title: "Topics in asynchronous API",
              path: "/developer/components/message-queues/async-topics/",
            },
            {
              title: "Bulk operations",
              path: "/developer/components/message-queues/bulk-operations/",
            },
            {
              title: "Example bulk operation implemntation",
              path: "/developer/components/message-queues/bulk-operations-example/",
            },
            {
              title: "Configure message queues",
              path: "/developer/components/message-queues/configuration/",
            },
            {
              title: "Handling outdated in-memory object states",
              path: "/developer/components/message-queues/object-states/",
            },
            {
              title: "Requests for specific stores",
              path: "/developer/components/message-queues/stores/",
            },
            {
              title: "Migrate configuration",
              path: "/developer/components/message-queues/migration/",
            },
          ],
        },
        {
          title: "Add extension attributes to entities",
          path: "/developer/components/add-attributes",
        },
        {
          title: "Add an admin grid",
          path: "/developer/components/add-admin-grid/",
        },
        {
          title: "Price adjustments",
          path: "/developer/components/price-adjustments/",
        },
        {
          title: "Searching with repositories",
          path: "/developer/components/searching-with-repositories/",
        },
        {
          title: "Directory and cache clearing",
          path: "/developer/components/clear-directories/",
        },
        {
          title: "Adapters",
          path: "/developer/components/adapters/",
        },
        {
          title: "View models",
          path: "/developer/components/view-models/",
        },
        {
          title: "Variable pool",
          path: "/developer/components/variable-pool/",
        },
        {
          title: "Extend catalog rule conditions",
          path: "/developer/components/catalog-rules/",
        },
      ],
    },
    {
      title: "Configuration",
      path: "/developer/configuration/",
      pages: [
        {
          title: "Importers",
          path: "/developer/configuration/importers/",
        },
        {
          title: "Sensitive environment settings",
          path: "/developer/configuration/sensitive-environment-settings/",
        },
      ],
    },
    {
      title: "Framework",
      path: "/developer/framework/",
      pages: [
        {
          title: "Array manager",
          path: "/developer/framework/array-manager/",
        },
        {
          title: "DateTime library",
          path: "/developer/framework/datetime-library/",
        },
        {
          title: "Float comparator",
          path: "/developer/framework/float-comparator/",
        },
        {
          title: "Serialize library",
          path: "/developer/framework/serialize-library/",
        },
        {
          title: "Math random",
          path: "/developer/framework/math-random/",
        },
        {
          title: "URL library",
          path: "/developer/framework/url-library/",
        },
      ],
    },
    {
      title: "Security",
      path: "/developer/security/",
      pages: [
        {
          title: "Content security policies",
          path: "/developer/security/content-security-policies/",
        },
        {
          title: "Non-secure functions",
          path: "/developer/security/non-secure-functions/",
        },
        {
          title: "Cross-site scripting prevention",
          path: "/developer/security/cross-site-scripting-prevention/",
        },
        {
          title: "Sensitive information",
          path: "/developer/security/sensitive-information/",
        },
        {
          title: "Denial of service (DoS) attacks",
          path: "/developer/security/denial-of-service-attacks/",
        },
        {
          title: "Mass assignment",
          path: "/developer/security/mass-assignment/",
        },
        {
          title: "Server-side request forgery prevention",
          path: "/developer/security/server-side-request-forgery/",
        },
        {
          title: "Authorization",
          path: "/developer/security/authorization/",
        },
        {
          title: "Brute force attacks",
          path: "/developer/security/brute-force/",
        },
        {
          title: "Cross-site request forgery",
          path: "/developer/security/cross-site-request-forgery/",
        },
        {
          title: "File uploads",
          path: "/developer/security/file-uploads/",
        },
      ],
    },
    {
      title: "Versioning",
      path: "/developer/versioning/",
      pages: [
        {
          title: "Check the application version",
          path: "/developer/versioning/check-version/",
        },
        {
          title: "Code changes",
          path: "/developer/versioning/code-changes/",
        },
        {
          title: "Dependencies",
          path: "/developer/versioning/dependencies/",
        },
        {
          title: "MFTF and backward compatibility",
          path: "/developer/versioning/tests/",
        },
      ],
    },
  ];