package com.carrental.cars_service.controller;

import com.carrental.cars_service.model.Car;
import com.carrental.cars_service.model.CarType;
import com.carrental.cars_service.service.CarService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars")
@Slf4j
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  @GetMapping("/{carType}")
  public ResponseEntity<List<String>> getCarsIds(@PathVariable CarType carType) {
    return ResponseEntity.ok(carService.getCarsByType(carType));
  }

  @PostMapping
  public ResponseEntity<Car> addCar(@RequestBody Car car) {
    return new ResponseEntity<>(carService.addCar(car), HttpStatus.CREATED);
  }
}
