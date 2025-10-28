# Car Rental Application Constitution

<!--
SYNC IMPACT REPORT
Version change: 0.0.0 → 1.0.0 (Initial version)
Modified principles:
- Initial setup of all principles
Added sections:
- All sections are new
Removed sections:
- None
Templates requiring updates:
✅ No existing templates to update
Follow-up TODOs:
- None
-->

## Core Principles

### I. Microservice Architecture
Each service must be autonomous and independently deployable. Services communicate via REST APIs. Clear service boundaries and responsibilities are mandatory. Each service must have its own database and be responsible for its own data.

### II. API First Design
All service interfaces must be designed and documented before implementation. OpenAPI/Swagger documentation is mandatory. API versioning must follow semantic versioning. Breaking changes require explicit version increment.

### III. Testing Strategy
Unit tests are mandatory for all business logic. Integration tests required for API endpoints. Test coverage must be at least 80%. Mock external service dependencies in tests. Tests must run as part of CI/CD pipeline.

### IV. Frontend Architecture
Single Page Application using modern framework (React/Angular/Vue). Components must be modular and reusable. State management must be centralized. UI components must have unit tests. Responsive design is mandatory.

### V. Security & Error Handling
Authentication required for all API endpoints except public ones. CORS policies must be explicitly defined. All errors must be properly handled and logged. Sensitive data must be encrypted in transit and at rest.

## Technical Standards

- Backend: Java Spring Boot microservices
- Frontend: React.js with TypeScript
- Database: Each service uses its own PostgreSQL instance
- API Documentation: OpenAPI/Swagger
- Testing: JUnit, React Testing Library
- CI/CD: Must include build, test, and deployment stages
- Logging: Centralized logging with correlation IDs

## Development Workflow

1. Feature branches must be created from master
2. PR required for all changes
3. PR must pass:
   - All tests
   - Code review by at least one team member
   - Linting checks
   - SonarQube quality gates
4. No direct commits to master branch
5. Feature flags for major changes

## Governance

This constitution is the foundation for all development practices in the Car Rental Application. Changes to this constitution require:

1. Proposal with justification
2. Review by tech leads
3. Team consensus
4. Documentation of changes
5. Migration plan for existing code if needed

All pull requests must comply with these principles. Exceptions require explicit approval from tech leads with documented justification.

**Version**: 1.0.0 | **Ratified**: 2025-10-28 | **Last Amended**: 2025-10-28
