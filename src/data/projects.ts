export type ProjectStatus =
  | "Locally verified"
  | "In development"
  | "Planned"
  | "Gated";

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  engineeringFocus: string[];
  evidenceGate: string;
  architecture?: string;
  evidence?: string[];
  tradeoffs?: string[];
  lessons?: string[];
  limitations?: string[];
  repositoryStatus?: string;
  repositoryUrl?: string;
  demoStatus?: string;
  verification?: string;
}

export const projects: Project[] = [
  {
    slug: "servicepulse",
    name: "ServicePulse",
    status: "Locally verified",
    summary:
      "An independent incident-management platform with a verified local workflow for service catalog administration, workspace access, incident response, collaboration, and failed-delivery operations.",
    problem:
      "Development teams need a clear record of services, incident decisions, ownership, timelines, and follow-up work without stitching together disconnected tools.",
    engineeringFocus: [
      "Java and Spring Boot modular monolith",
      "PostgreSQL migrations and transactional workflows",
      "Authentication and role-based authorization",
      "React and TypeScript user flows",
      "Tests, observability, and Docker/CI configuration",
    ],
    evidenceGate:
      "The implemented slice is verified locally and through public GitHub Actions. Release still requires current screenshots and either a working live link or an explicit local-demo label.",
    architecture:
      "A React and TypeScript client calls a Spring Boot modular monolith. PostgreSQL is the intended system of record; Flyway manages the schema, workspace membership enforces tenant access, and a transactional outbox feeds a bounded notification worker. An unprivileged NGINX tier is configured to serve the client and proxy same-origin API traffic.",
    evidence: [
      "68 backend tests pass with an enforced 80% line gate; observed coverage is 94.6% lines and 69.4% branches.",
      "20 frontend tests pass across authentication, dashboard, service catalog administration, workspace membership administration, failed-notification operations, skip-link landmark behavior, incident workflows, viewer controls, HTTP refresh behavior, and problem mapping.",
      "Automated axe scans report no violations across 12 current route states, including service catalog, membership, and failed-notification administrator/viewer states.",
      "A real local browser flow verified sign-in, workspace discovery, declaration, transition, assignment, comments, and responsive layout.",
      "Runtime OpenAPI inspection verified all 19 paths, build metadata, and the bearer JWT boundary.",
      "The current backend package produced a 68,078,270-byte executable JAR with SHA-256 recorded in the local test report.",
      "Public ServicePulse CI run 30521691031 passed on GitHub Actions for the frontend job and backend verify job at commit 7d947f7ccbb28978e7576663733b5e30edffcb4b.",
    ],
    tradeoffs: [
      "A modular monolith keeps transactions and authorization deep without manufacturing microservice overhead.",
      "H2 in PostgreSQL mode gives fast local feedback, while Testcontainers remains the mandatory real-database gate.",
      "The access token stays in memory and the refresh token is tab-scoped; an HttpOnly-cookie design remains a deployment decision.",
      "The notification adapter logs locally so retry and idempotency behavior can be verified without claiming an external integration.",
    ],
    lessons: [
      "Flush ordering matters when JPA state and JDBC outbox writes share a transaction.",
      "Operational features need an inspection path, not only retry logic; failed jobs now have an admin-only bounded read model.",
      "Generated documentation must be tested for security semantics, not merely endpoint presence.",
    ],
    limitations: [
      "Docker is unavailable locally, so Compose health remains unexecuted in this workspace; public GitHub Actions verified the backend container image, frontend container image, frontend checks, and PostgreSQL integration test job.",
      "No live deployment, production traffic, or external notification delivery is claimed.",
      "Registration, invitations, external notification delivery, service deletion, distributed/edge rate limits, signing-key rotation, and database-enforced audit immutability remain future work.",
      "Physical-keyboard, contrast, zoom, and screen-reader checks remain before public release.",
    ],
    repositoryStatus: "Published on GitHub",
    repositoryUrl: "https://github.com/Tirthrajsinh28/servicepulse",
    demoStatus: "Verified locally; no live URL",
    verification: "68 backend + 20 frontend tests; public ServicePulse CI run 30521691031 passed",
  },
  {
    slug: "cloudfileflow",
    name: "CloudFileFlow",
    status: "Locally verified",
    summary:
      "An independent file-ingestion and processing API with a verified local workflow for quarantine, durable jobs, bounded retries, audit history, and owner-authorized downloads.",
    problem:
      "File-processing pipelines need to treat uploads as untrusted, preserve ownership and job state, bound failure behavior, and prevent quarantined content from becoming directly downloadable.",
    engineeringFocus: [
      "Python 3.13, FastAPI, SQLAlchemy, and Alembic",
      "Streaming quarantine and clean-storage adapters",
      "Idempotency, retries, and dead-letter handling",
      "Authorization, audit records, and structured logs",
      "Hash-locked builds, Docker/Compose, and CI configuration",
    ],
    evidenceGate:
      "The local adapter slice is verified. Publication still requires a public repository, current screenshots or short demo media, and either executed Docker/CI evidence or precise labels that those gates remain unverified.",
    architecture:
      "A FastAPI process authenticates synthetic JWT principals and streams allowlisted files into generated quarantine paths while committing file, job, and audit rows to migrated SQLite. A separate polling worker atomically claims due jobs, validates bounded content, promotes valid objects, schedules exponential retries, recovers stale claims, and dead-letters exhausted work. Owner-scoped API queries expose metadata, job state, audit history, and READY-only downloads; a configured operator gets bounded sanitized job operations.",
    evidence: [
      "31 tests pass in a fresh hash-locked environment; measured coverage is 91% of lines with an enforced 80% minimum.",
      "An empty database upgrades to Alembic revision 20260704_01, startup rejects an unmigrated schema, and the model-drift check reports no pending operations.",
      "A real local Uvicorn and installed-worker flow verified health, HTTP 201 upload, READY promotion, chronological audit, owner download, cross-owner HTTP 404, operator counts, and correlated JSON logs.",
      "A separate non-editable runtime-lock install passed pip check and processed an upload through the continuously polling daemon.",
      "Wheel and source distributions build without network-isolated build dependencies; pip-audit reported no known vulnerabilities at the recorded check.",
      "Dockerfile, Compose, GitHub Actions, Dependabot, and security/order contracts parse and pass structural assertions.",
    ],
    tradeoffs: [
      "SQLite and the filesystem make the complete failure model runnable at CAD 0, but they are not evidence of S3 durability or SQS visibility semantics.",
      "A database-backed claim uses an atomic state guard and stale timeout; a future distributed adapter must preserve stable IDs, bounded attempts, and dead-letter behavior.",
      "Content validation reads at most the configured bounded object in the worker so JSON syntax and UTF-8 can be checked; these checks are explicitly not malware scanning.",
      "Storage moves and database commits cannot share one transaction, so promotion/rejection paths compensate and reconciliation remains future work.",
    ],
    lessons: [
      "Idempotency needs both a pre-check and unique-constraint race recovery; the losing upload now deletes its object and returns the winner.",
      "Audit chronology must be causally deterministic when recovery and completion happen in the same worker turn.",
      "Removing build isolation exposed an undeclared editable-build dependency, which is now explicit in a separate hash lock.",
    ],
    limitations: [
      "Docker is unavailable locally, so the non-root image, Compose health, and GitHub Actions container job are configured but unexecuted.",
      "No LocalStack, S3, SQS, PostgreSQL, external identity provider, live deployment, users, traffic, or cloud reliability is claimed.",
      "Signature and syntax checks are not malware scanning; rate limiting, reconciliation, replay, key rotation, metrics export, and alerting remain future work.",
      "The repository and live demo are not published, and project screenshots or demo media remain a release gate.",
    ],
    repositoryStatus: "Not published",
    demoStatus: "Verified locally; no live URL",
    verification: "31 tests; local API, one-shot worker, daemon, migration, and build checks",
  },
  {
    slug: "releaseguard",
    name: "ReleaseGuard",
    status: "Locally verified",
    summary:
      "An independent TypeScript CLI that turns build, test, coverage, dependency, and repository evidence into transparent release-readiness reports.",
    problem:
      "Teams need understandable release signals and CI-friendly exit codes without pretending that automation can guarantee security or replace human release judgment.",
    engineeringFocus: [
      "TypeScript 6 command-line design on Node 24",
      "Strict JSON configuration and bounded artifact parsing",
      "Coverage, test, dependency, changelog, and required-file policy checks",
      "Human-readable and machine-readable reports",
      "GitHub Actions, Dependabot, and package-boundary configuration",
    ],
    evidenceGate:
      "The local CLI slice is verified. Publication still requires a public repository, remote GitHub Actions evidence, npm publication/provenance decisions, and current screenshots or short demo media.",
    architecture:
      "ReleaseGuard reads a versioned repository configuration file, validates configured artifact paths against lexical and realpath containment checks, parses caller-provided build, Istanbul coverage, JUnit, npm-audit, changelog, and repository files, then evaluates deterministic policy checks. It emits a bounded human report or JSON document and exits with 0 for ready, 1 for policy failures, and 2 for configuration or input errors. The CLI never executes commands from the evaluated repository.",
    evidence: [
      "13 tests pass with coverage enabled; observed coverage is 89.61% lines, 86.45% branches, and 94% functions.",
      "A clean local gate passed ESLint, strict TypeScript, unit/filesystem integration tests, coverage thresholds, and the production build.",
      "The compiled CLI returned exit 0 for the ready example, exit 1 for the synthetic failing-policy config, and exit 2 for invalid input.",
      "JSON output parsed as ready with zero failures, and the human report summarized 7 passed checks for the ready example.",
      "The package archive contained 25 runtime files, measured 13,584 bytes, and excluded tests, examples, CI metadata, TypeScript sources, coverage, and node_modules.",
      "GitHub Actions, Dependabot, issue template, schema, and example fixtures parse and pass structural assertions; remote execution is not claimed.",
    ],
    tradeoffs: [
      "ReleaseGuard consumes existing CI artifacts instead of running repository commands, which keeps the tool safer but means artifact provenance is supplied by the caller.",
      "The first slice targets common JUnit aggregate attributes rather than every XML dialect so the parser remains explainable and testable.",
      "A dependency-free runtime reduces install surface, while development tooling remains lockfile-pinned and audited.",
      "Path containment uses both lexical resolution and nearest-existing-parent realpath checks to reduce symlink escape risk without requiring a full sandbox.",
    ],
    lessons: [
      "Release automation should report evidence and limits plainly; a passing quality gate is not a security guarantee.",
      "Harnesses need to assert actual repository paths and output fields instead of guessing from intent.",
      "Package inspection matters because tests can pass while unnecessary files still leak into a publishable artifact.",
    ],
    limitations: [
      "No public repository, npm registry release, provenance attestation, remote CI run, users, downloads, or deployment is claimed.",
      "ReleaseGuard does not prove artifact freshness, test completeness, vulnerability database freshness, or release safety.",
      "It is not a vulnerability scanner, penetration test, dependency-review substitute, or security guarantee.",
      "Screenshots or short demo media remain pending before public portfolio publication.",
    ],
    repositoryStatus: "Not published",
    demoStatus: "Verified locally; no live URL",
    verification:
      "13 tests; local CLI ready/failing/error runs; package and workflow structure checks",
  },
  {
    slug: "api-harbor",
    name: "API Harbor",
    status: "Gated",
    summary:
      "An optional API catalog for fictional services, focused on discovery, lifecycle metadata, and developer experience.",
    problem:
      "API consumers need one place to find ownership, versions, documentation, examples, and deprecation state.",
    engineeringFocus: [
      "OpenAPI lifecycle",
      "API version and ownership metadata",
      "Search, tags, and role-based administration",
      "Accessible documentation experience",
    ],
    evidenceGate:
      "This project will proceed only if the first three projects pass their gates and it adds distinct hiring evidence.",
  },
];
