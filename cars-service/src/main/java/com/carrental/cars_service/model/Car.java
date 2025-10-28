package com.carrental.cars_service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "cars")
@Data
public class Car {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String carId;

  @Column(nullable = false)
  private CarType carType;

  @Column(nullable = false)
  private Integer pricePerDay;
}
