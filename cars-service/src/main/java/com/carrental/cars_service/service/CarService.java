package com.carrental.cars_service.service;

import com.carrental.cars_service.model.Car;
import com.carrental.cars_service.model.CarType;
import com.carrental.cars_service.repository.CarRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarService {
  private final CarRepository carRepository;

  public List<String> getCarsByType(CarType carType) {
    return carRepository.findByCarType(carType).stream().map(Car::getCarId).toList();
  }

  public Car addCar(Car car) {
    return carRepository.save(car);
  }

  public List<Car> getCars() {
    return carRepository.findAll();
  }
}
