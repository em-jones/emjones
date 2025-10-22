# Em Jones Portfolio Constitution


## Core Principles

I. Mono-Repo structure
As programming languages and tools are added to the project, rely on the common standards for that programming language or tool.

#### Example: A Typescript Mono-Repo managed by PNPM
- Use `pnpm` as the package manager
- Use workspaces to manage multiple packages
- Use the standard `apps` and `packages` directories for applications and shared libraries respectively

II. Evolutionary Architecture
Design the architecture to evolve over time based on feedback and changing requirements.

III. Prioritize Maintainability/Developer Experience
- Ensure common IDE support (e.g., VSCode)
- Ensure language/framework/library integration with standard ops tools: error reporting (Sentry, Datadog, etc.)
- Prefer opentelemetry-compatible tools and libraries
- Use standard linting and formatting tools (e.g., ESLint, Prettier for Typescript)
- Provide clear documentation, onboarding guides, and runbooks
- Automate repetitive tasks (e.g., code generation, deployment scripts)
- Standardize common operations (e.g. linting, testing, building, deploying) across all relevant modules
- Follow best practices for the chosen technology stack

IV.  Programming style
- Give preference to Functional Programming principles where possible.
  - Make use of the [designing with types](https://fsharpforfunandprofit.com/series/designing-with-types/) principles using 
  language-specific features or libraries (e.g. `effect` in Typescript and native syntax for `F#`).
- When Object-Oriented Programming is used, follow SOLID principles.

V. Library-First
Every domain starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries

VI. Test-First (NON-NEGOTIABLE)

TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced
When testing CLI-based ops tooling integrations, validate their use against the codebase (e.g. linting, building, deploying)

### [PRINCIPLE_4_NAME]
<!-- Example: IV. Integration Testing -->
[PRINCIPLE_4_DESCRIPTION]
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### [PRINCIPLE_5_NAME]
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
[PRINCIPLE_5_DESCRIPTION]
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## [SECTION_2_NAME]
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

[SECTION_2_CONTENT]
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## [SECTION_3_NAME]
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

[SECTION_3_CONTENT]
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

[GOVERNANCE_RULES]
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: [CONSTITUTION_VERSION] | **Ratified**: [RATIFICATION_DATE] | **Last Amended**: [LAST_AMENDED_DATE]
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
