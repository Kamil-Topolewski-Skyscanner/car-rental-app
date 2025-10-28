# Implementation Plan: Modern Car Rental Frontend

**Branch**: `001-car-reservation-system` | **Date**: 2025-10-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-car-reservation-system/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Building a modern, sleek car rental website frontend that allows users to browse and reserve cars of different types (Sedan, SUV, Van). The frontend will be built using React with TypeScript, focusing on minimal dependencies and modern web standards.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.0+, React 18+
**Primary Dependencies**: React DOM, CSS Modules
**Storage**: Browser LocalStorage for temporary data, REST APIs for persistence
**Testing**: React Testing Library, Jest
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single Page Web Application

**Backend Services**:
1. Cars API (http://localhost:8083/api/cars)
   - GET /cars - List all cars
   - GET /cars/{type} - List cars by type
   - GET /cars/availability - Check car availability

2. Reservations API (http://localhost:8082/api/reservations)
   - POST /reservations - Create new reservation
     - Request body:
       ```typescript
       interface ReservationRequest {
         customerId: string;
         reservationStartDate: string; // Format: "2025-12-17T12:00:00"
         duration: number;
         carType: CarType;
       }
       ```
   - GET /reservations/{id} - Get reservation details
   - GET /reservations?customerId={customerId} - Get customer's reservations
     - Response format:
       ```typescript
       interface Reservation {
         id: number;
         customerId: string;
         carId: string;
         reservationStartDate: string;  // Format: "2025-12-17T12:00:00"
         reservationEndDate: string;    // Format: "2025-12-17T12:00:00"
         duration: number;
         price: number;
         createdAt: string;
         updatedAt: string;
       }
       ```

**API Integration**:
- Development proxy configuration in Vite for both services
- TypeScript interfaces for all API requests/responses
- Error handling and retry mechanisms
- Loading states and user feedback

**Performance Goals**:
- Initial page load < 2s
- Interaction response < 200ms
- Smooth animations (60fps)
- API response handling < 300ms

**Constraints**:
- No direct backend code modification
- Use existing REST APIs from cars-service and reservation-service
- Minimal external dependencies
- Handle API errors gracefully
- Validate all user inputs before API calls

**Scale/Scope**:
- 3 car types (Sedan, SUV, Van)
- 5 main views (Home, Car List, Car Details, Reservation Form, Confirmation)
- Support for multiple concurrent users
- Handle concurrent reservations safely

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. ✅ Frontend Architecture
   - Using React with TypeScript as specified
   - Components will be modular and reusable
   - State management using React Context (centralized)
   - Unit tests planned for UI components
   - Responsive design implemented with CSS
   - Strong typing with TypeScript for API interfaces
   - Date formatting utilities for consistent format ("YYYY-MM-DDThh:mm:ss")
   - Validation for all API request payloads

2. ✅ Backend Integration
   - Using existing services:
     - Cars API at http://localhost:8083/api/cars
     - Reservations API at http://localhost:8082/api/reservations
   - No backend code generation (as per constitution update)
   - Will consume REST APIs provided by the services
   - API proxies configured in Vite for development

3. ✅ Testing Strategy
   - React Testing Library for component testing
   - Test coverage will be maintained at >80%
   - Integration tests planned for API interactions

4. ✅ Development Workflow
   - Feature branch created (001-car-reservation-system)
   - PR will be created with all required checks
   - Linting and tests will be part of CI/CD

All constitutional requirements are met. No violations or exceptions needed.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/                # Frontend application root
├── package.json        # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite build configuration
├── index.html         # Entry HTML file
├── src/
│   ├── components/    # Shared UI components
│   │   ├── common/   # Basic reusable components
│   │   │   ├── Button/
│   │   │   ├── Calendar/
│   │   │   ├── Image/      # Image components with fallback handling
│   │   │   └── Input/
│   │   └── layout/   # Layout components
│   │       ├── Header/
│   │       └── Footer/
│   ├── features/     # Feature-specific components
│   │   ├── cars/    # Car listing related
│   │   │   ├── CarList/
│   │   │   ├── CarCard/    # Card component with image handling
│   │   │   │   ├── CarCard.tsx
│   │   │   │   ├── CarCard.module.css
│   │   │   │   └── utils/
│   │   │   │       └── imageHandlers.ts  # Image URL generation and fallback logic
│   │   │   ├── CarCard/
│   │   │   └── CarDetails/
│   │   └── reservations/  # Reservation related
│   │       ├── ReservationForm/
│   │       └── ReservationConfirmation/
│   ├── services/    # API integration
│   │   ├── api.ts  # Base API setup
│   │   ├── cars.ts # Cars service integration
│   │   └── reservations.ts # Reservations service integration
│   ├── contexts/   # React Context definitions
│   │   ├── CarsContext.tsx
│   │   └── ReservationContext.tsx
│   ├── utils/     # Shared utilities
│   │   ├── date.ts
│   │   └── validation.ts
│   └── types/    # TypeScript type definitions
│       ├── cars.ts
│       └── reservations.ts
├── public/
│   └── images/
│       └── cars/  # Car type images
│           ├── sedan/
│           ├── suv/
│           └── van/
└── tests/
    └── integration/  # API integration tests

cars-service/         # Existing backend service (no modifications)
└── ...

reservation-service/  # Existing backend service (no modifications)
└── ...
```

**Structure Decision**: The application will be created in a new `frontend` directory at the repository root, maintaining a clear separation from the existing backend services. The frontend follows a feature-based structure with shared components, using modern React best practices. The structure emphasizes:

1. Clear separation of frontend and backend code
2. Feature-based organization within the frontend
3. Shared components and utilities
4. Dedicated type definitions
5. Modern build setup with Vite
6. Static assets management in public directory

Backend services (`cars-service` and `reservation-service`) remain unchanged and are only referenced for API integration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
