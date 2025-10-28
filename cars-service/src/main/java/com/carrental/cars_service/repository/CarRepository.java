package com.carrental.cars_service.repository;

import com.carrental.cars_service.model.Car;
import com.carrental.cars_service.model.CarType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, String> {
  List<Car> findByCarType(CarType carType);
}
