package com.carrental.reservation_service.dto;

import com.carrental.reservation_service.service.rest.CarType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ReservationRequest {
  @NotBlank(message = "CustomerId cannot be empty")
  private String customerId;

  @Enumerated(EnumType.STRING)
  private CarType carType;

  @NotNull(message = "Reservation Start Date cannot be empty")
  @Future(message = "Reservation Start Date must be in the future")
  private LocalDateTime reservationStartDate;

  @Min(value = 1, message = "Duration must be greater than 1")
  private Integer duration;
}
