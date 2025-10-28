# Rental Car App

A microservices-based car rental application built with Java and Spring Boot.

## Project Structure

- `cars-service/`  
  Manages car inventory, types, and availability.
- `reservation-service/`  
  Handles reservations, customer requests, and car allocation.

## Technologies

- Java 17+
- Spring Boot
- Maven
- JUnit & Mockito (for testing)

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven

### Build & Run
Build and run both services:
   ```
   cd cars-service
   mvn clean install
   mvn spring-boot:run
   
   cd ../reservation-service
   mvn clean install
   mvn spring-boot:run
   ```

## API Endpoints
- **Reservation Service:**
    - `8082` - port
    - `/reservations` - Create and manage reservations.

- **Cars Service:**
    - `8083` - port
    - `/cars` - List, add, and manage cars.
    - `/cars/{carType}` - Get list of all carIds of given type

## Configuration

Edit `src/main/resources/application.yml` in each service to adjust ports and database settings.
