package com.carrental.reservation_service.service.rest;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
@RequiredArgsConstructor
@Slf4j
public class CarService {
  public final WebClient carServiceWebClient;

  public List<String> getCarsByType(CarType carType) {
    log.info("Calling Car Service API for car: {}", carType);

    try {
      return Arrays.stream(
              Objects.requireNonNull(
                  carServiceWebClient
                      .get()
                      .uri("api/cars/" + carType)
                      .retrieve()
                      .bodyToMono(String[].class)
                      .block()))
          .toList();

    } catch (WebClientResponseException e) {
      if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
        throw new RuntimeException("Car type not found: " + carType);
      } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
        throw new RuntimeException("Invalid car type: " + carType);
      }
    }
    return List.of();
  }
}
