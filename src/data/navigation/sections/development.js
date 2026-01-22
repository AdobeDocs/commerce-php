module.exports = [
    {
      title: "Introduction",
      path: "/development/",
      pages: [
        {
          title: "Developer roadmap",
          path: "/development/roadmap/",
        },
        {
          title: "Composer",
          path: "/development/composer/",
        },
        {
          title: "Common terms",
          path: "/development/common-terms/",
        },
        {
          title: "Backward-incompatible changes",
          path: "/development/backward-incompatible-changes/",
          pages: [
            {
              title: "Commerce reference",
              path: "/development/backward-incompatible-changes/reference/",
            },
            {
              title: "Magento reference",
              path: "/development/backward-incompatible-changes/magento-reference/",
            },
          ],
        },
      ],
    },
    {
      title: "Prepare",
      path: "/development/prepare/",
      pages: [
        {
          title: "Component types",
          path: "/development/prepare/component-types/",
        },
        {
          title: "Component file structure",
          path: "/development/prepare/component-file-structure/",
        },
        {
          title: "Extension repository structure",
          path: "/development/prepare/extension-repository-structure",
        },
        {
          title: "Component development roadmap",
          path: "/development/prepare/development-roadmap/",
        },
        {
          title: "Extension lifecycle",
          path: "/development/prepare/extension-lifecycle/",
        },
      ],
    },
    {
      title: "Build",
      path: "/development/build/",
      pages: [
        {
          title: "Dependency injection configuration",
          path: "/development/build/dependency-injection-file/",
        },
        {
          title: "Optimal development environment",
          path: "/development/build/development-environment/",
        },
        {
          title: "Composer integration",
          path: "/development/build/composer-integration/",
        },
        {
          title: "Required configuration files",
          path: "/development/build/required-configuration-files/",
        },
        {
          title: "Create component file structure",
          path: "/development/build/component-file-structure/",
        },
        {
          title: "Register a component",
          path: "/development/build/component-registration/",
        },
        {
          title: "URN schema validation",
          path: "/development/build/schema-validation/",
        },
        {
          title: "Name a component",
          path: "/development/build/component-name/",
        },
        {
          title: "Component load order",
          path: "/development/build/component-load-order/",
        },
        {
          title: "Enable/disable a component",
          path: "/development/build/component-management/",
        },
      ],
    },
    {
      title: "Package",
      path: "/development/package/",
      pages: [
        {
          title: "Package a component",
          path: "/development/package/component/",
        },
        {
          title: "Distribute a component",
          path: "/development/package/distribute-component/",
        },
      ],
    },
    {
      title: "Validate",
      path: "/development/validate/",
      pages: [
        {
          title: "Test a component",
          path: "/development/validate/test-component/",
        },
      ],
    },
    {
      title: "Partial caching",
      path: "/development/cache/partial/",
      pages: [
        {
          title: "Create custom cache engines",
          path: "/development/cache/partial/database-caching/",
        },
        {
          title: "Create a cache type",
          path: "/development/cache/partial/cache-type/",
        },
      ],
    },
    {
      title: "Full page caching",
      path: "/development/cache/page/",
      pages: [
        {
          title: "Public content",
          path: "/development/cache/page/public-content/",
        },
        {
          title: "Private content",
          path: "/development/cache/page/private-content/",
        },
      ],
    },
    {
      title: "CLI commands",
      path: "/development/cli-commands/",
      pages: [
        {
          title: "Naming guidelines",
          path: "/development/cli-commands/naming-guidelines/",
        },
        {
          title: "Create a custom command",
          path: "/development/cli-commands/custom/",
        },
      ],
    },
    {
      title: "Staging",
      path: "/development/staging/",
    },
    {
      title: "Advanced reporting",
      path: "/development/advanced-reporting/",
      pages: [
        {
          title: "Modules",
          path: "/development/advanced-reporting/modules/",
        },
        {
          title: "Data collection",
          path: "/development/advanced-reporting/data-collection/",
        },
        {
          title: "Report XML",
          path: "/development/advanced-reporting/report-xml/",
        },
      ],
    },
    {
      title: "Component development",
      path: "/development/components/",
      pages: [
        {
          title: "GraphQL Application Server compatibility",
          path: "/development/components/app-server/",
        },
        {
          title: "Asynchronous and deferred operations",
          path: "/development/components/async-operations/",
        },
        {
          title: "Service contracts",
          path: "/development/components/service-contracts/",
          pages: [
            {
              title: "Design patterns",
              path: "/development/components/service-contracts/design-patterns/",
            },
          ],
        },
        {
          title: "Public interfaces and APIs",
          path: "/development/components/api-concepts/",
        },
        {
          title: "Dependency injection",
          path: "/development/components/dependency-injection/",
        },
        {
          title: "Object manager",
          path: "/development/components/object-manager/",
          pages: [
            {
              title: "Object manager helper",
              path: "/development/components/object-manager/helper/"
            },
          ],
        },
        {
          title: "Events and observers",
          path: "/development/components/events-and-observers/",
          pages: [
            {
              title: "List of events",
              path: "/development/components/events-and-observers/event-list/"
            },
          ],
        },
        {
          title: "Factories",
          path: "/development/components/factories/",
        },
        {
          title: "Proxies",
          path: "/development/components/proxies/",
        },
        {
          title: "Code generation",
          path: "/development/components/code-generation/",
        },
        {
          title: "EAV and extension attributes",
          path: "/development/components/attributes/",
        },
        {
          title: "Plugins (interceptors)",
          path: "/development/components/plugins/",
        },
        {
          title: "Routing",
          path: "/development/components/routing/",
        },
        {
          title: "Indexing",
          path: "/development/components/indexing/",
          pages: [
            {
              title: "Indexer optimization",
              path: "/development/components/indexing/optimization/",
            },
            {
              title: "Create a custom indexer",
              path: "/development/components/indexing/custom-indexer/",
            },
          ],
        },
        {
          title: "Declarative schema",
          path: "/development/components/declarative-schema/",
          pages: [
            {
              title: "Migration scripts",
              path: "/development/components/declarative-schema/migration-scripts/",
            },
            {
              title: "Configuration",
              path: "/development/components/declarative-schema/configuration/",
            },
            {
              title: "Data and schema patches",
              path: "/development/components/declarative-schema/patches/",
            },
          ],
        },
        {
          title: "Web APIs",
          path: "/development/components/web-api/",
          pages: [
            {
              title: "Configure services as web APIs",
              path: "/development/components/web-api/services/",
            },
            {
              title: "Resource accessibility",
              path: "/development/components/web-api/resource-accessibility/",
            },
            {
              title: "Set custom routes",
              path: "/development/components/web-api/custom-routes/",
            },
            {
              title: "Request processor pool",
              path: "/development/components/web-api/request-processor-pool/",
            },
            {
              title: "cURL service wrapper",
              path: "/development/components/web-api/curl/",
            },
            {
              title: "Inventory Management API reference",
              path: "/development/components/web-api/inventory-management/",
            },
          ],
        },
        {
          title: "Message queues",
          path: "/development/components/message-queues/",
          pages: [
            {
              title: "Asynchronous configuration",
              path: "/development/components/message-queues/async-configuration/",
            },
            {
              title: "Topics in asynchronous API",
              path: "/development/components/message-queues/async-topics/",
            },
            {
              title: "Bulk operations",
              path: "/development/components/message-queues/bulk-operations/",
            },
            {
              title: "Example bulk operation implementation",
              path: "/development/components/message-queues/bulk-operations-example/",
            },
            {
              title: "Configure message queues",
              path: "/development/components/message-queues/configuration/",
            },
            {
              title: "Handling outdated in-memory object states",
              path: "/development/components/message-queues/object-states/",
            },
            {
              title: "Requests for specific stores",
              path: "/development/components/message-queues/stores/",
            },
            {
              title: "Migrate configuration",
              path: "/development/components/message-queues/migration/",
            },
          ],
        },
        {
          title: "Add extension attributes to entities",
          path: "/development/components/add-attributes",
        },
        {
          title: "Add an admin grid",
          path: "/development/components/add-admin-grid/",
        },
        {
          title: "Price adjustments",
          path: "/development/components/price-adjustments/",
        },
        {
          title: "Searching with repositories",
          path: "/development/components/searching-with-repositories/",
        },
        {
          title: "Directory and cache clearing",
          path: "/development/components/clear-directories/",
        },
        {
          title: "Adapters",
          path: "/development/components/adapters/",
        },
        {
          title: "View models",
          path: "/development/components/view-models/",
        },
        {
          title: "Variable pool",
          path: "/development/components/variable-pool/",
        },
        {
          title: "Extend catalog rule conditions",
          path: "/development/components/catalog-rules/",
        },
      ],
    },
    {
      title: "Payment Provider Gateway",
      path: "/development/payments-integrations/",
      pages: [
        {
          title: "Commerce payment provider gateway",
          path: "/development/payments-integrations/payment-gateway/",
          pages: [
            {
              title: "Payment provider gateway structure",
              path: "/development/payments-integrations/payment-gateway/payment-gateway-structure/",
            },
            {
              title: "Gateway command",
              path: "/development/payments-integrations/payment-gateway/gateway-command/",
            },
            {
              title: "Gateway command pool",
              path: "/development/payments-integrations/payment-gateway/command-pool/",
            },
            {
              title: "Request Builder",
              path: "/development/payments-integrations/payment-gateway/request-builder/",
            },
            {
              title: "Gateway client",
              path: "/development/payments-integrations/payment-gateway/gateway-client/",
            },
            {
              title: "Response Validator",
              path: "/development/payments-integrations/payment-gateway/response-validator/",
            },
            {
              title: "Response handler",
              path: "/development/payments-integrations/payment-gateway/response-handler/",
            },
            {
              title: "Error code mapping",
              path: "/development/payments-integrations/payment-gateway/error-code-mapper/",
            },
          ],
        },
        {
          title: "Adding a new payment integration (payment method)",
          path: "/development/payments-integrations/base-integration/",
          pages: [
            {
              title: "Payment method module configuration",
              path: "/development/payments-integrations/base-integration/module-configuration/",
            },
            {
              title: "Payment method configuration",
              path: "/development/payments-integrations/base-integration/payment-option-config/",
            },
            {
              title: "Payment method facade",
              path: "/development/payments-integrations/base-integration/facade-configuration/",
            },
            {
              title: "Payment info rendering in Admin checkout",
              path: "/development/payments-integrations/base-integration/formblocktype/",
            },
            {
              title: "Add a payment action",
              path: "/development/payments-integrations/base-integration/payment-action/",
            },
            {
              title: "Get payment information from frontend to backend",
              path: "/development/payments-integrations/base-integration/get-payment-info/",
            },
            {
              title: "Configure payment method by area",
              path: "/development/payments-integrations/base-integration/admin-integration/",
            },
          ],
        },
        {
          title: "Adding vault integration",
          path: "/development/payments-integrations/vault/",
          pages: [
            {
              title: "Add vault to module dependencies",
              path: "/development/payments-integrations/vault/module-configuration/",
            },
            {
              title: "Vault payment configuration",
              path: "/development/payments-integrations/vault/vault-payment-configuration/",
            },
            {
              title: "Vault DI configuration",
              path: "/development/payments-integrations/vault/vault-di/",
            },
            {
              title: "Enable vault",
              path: "/development/payments-integrations/vault/enabler/",
            },
            {
              title: "Payment token",
              path: "/development/payments-integrations/vault/payment-token/",
            },
            {
              title: "Token UI component provider",
              path: "/development/payments-integrations/vault/token-ui-component-provider/",
            },
            {
              title: "Display the stored information",
              path: "/development/payments-integrations/vault/customer-stored-payments/",
            },
            {
              title: "Vault implementation for Admin",
              path: "/development/payments-integrations/vault/admin-integration/",
            },
          ],
        },
        {
          title: "CardinalCommerce 3-D Secure",
          path: "/development/payments-integrations/cardinal/",
        },
      ],
    },
    {
      title: "Configuration",
      path: "/development/configuration/",
      pages: [
        {
          title: "Importers",
          path: "/development/configuration/importers/",
        },
        {
          title: "Sensitive and environment-specific settings",
          path: "/development/configuration/sensitive-environment-settings/",
        },
      ],
    },
    {
      title: "Framework",
      path: "/development/framework/",
      pages: [
        {
          title: "Array manager",
          path: "/development/framework/array-manager/",
        },
        {
          title: "DateTime library",
          path: "/development/framework/datetime-library/",
        },
        {
          title: "Float comparator",
          path: "/development/framework/float-comparator/",
        },
        { 
          title: "Inventory Management",
          path: "/development/framework/inventory-management/",
          pages: [
            {
              title: "Reservations",
              path: "/development/framework/inventory-management/reservations/",
            },
            {
              title: "Source selection algorithms",
              path: "/development/framework/inventory-management/source-selection-algorithms/",
            },
          ],
        },
        {
          title: "Serialize library",
          path: "/development/framework/serialize-library/",
        },
        {
          title: "Math random",
          path: "/development/framework/math-random/",
        },
        {
          title: "URL library",
          path: "/development/framework/url-library/",
        },
      ],
    },
    {
      title: "Security",
      path: "/development/security/",
      pages: [
        {
          title: "Authorization",
          path: "/development/security/authorization/",
        },
        {
          title: "Brute force attacks",
          path: "/development/security/brute-force/",
        },
        {
          title: "Content security policies",
          path: "/development/security/content-security-policies/",
        },
        {
          title: "Cross-site request forgery",
          path: "/development/security/cross-site-request-forgery/",
        },
        {
          title: "Cross-site scripting",
          path: "/development/security/cross-site-scripting/",
        },
        {
          title: "Data re-encryption",
          path: "/development/security/data-encryption/",
        },
        {
          title: "Denial of service (DoS) attacks",
          path: "/development/security/denial-of-service-attacks/",
        },
        {
          title: "File uploads",
          path: "/development/security/file-uploads/",
        },
        {
          title: "Mass assignment",
          path: "/development/security/mass-assignment/",
        },
        {
          title: "Non-secure functions",
          path: "/development/security/non-secure-functions/",
        },
        {
          title: "Sensitive information",
          path: "/development/security/sensitive-information/",
        },
        {
          title: "Server-side request forgery prevention",
          path: "/development/security/server-side-request-forgery/",
        },
        {
          title: "Subresource Integrity",
          path: "/development/security/subresource-integrity/",
        },
      ],
    },
    {
      title: "Versioning",
      path: "/development/versioning/",
      pages: [
        {
          title: "Check the application version",
          path: "/development/versioning/check-version/",
        },
        {
          title: "Code changes",
          path: "/development/versioning/code-changes/",
        },
        {
          title: "Dependencies",
          path: "/development/versioning/dependencies/",
        },
        {
          title: "MFTF and backward compatibility",
          path: "/development/versioning/tests/",
        },
      ],
    },
  ];