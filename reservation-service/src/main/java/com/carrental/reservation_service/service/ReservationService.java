package com.carrental.reservation_service.service;

import com.carrental.reservation_service.dto.ReservationRequest;
import com.carrental.reservation_service.model.Reservation;
import com.carrental.reservation_service.repository.ReservationRepository;
import com.carrental.reservation_service.service.rest.CarService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationService {
  private final ReservationRepository reservationRepository;
  private final CarService carService;

  public Reservation addReservation(ReservationRequest reservationRequest) {
    List<String> cars = carService.getCarsByType(reservationRequest.getCarType());
    Optional<String> carId = availableCars(cars, reservationRequest);
    if (carId.isPresent()) {
      Reservation reservation = map(reservationRequest, carId.get());
      return reservationRepository.save(reservation);
    }
    throw new RuntimeException("No cars available!");
  }

  private Optional<String> availableCars(List<String> cars, ReservationRequest reservationRequest) {
    int duration = reservationRequest.getDuration();
    LocalDateTime reservationStartDate = reservationRequest.getReservationStartDate();
    LocalDateTime reservationEndDate =
        reservationRequest.getReservationStartDate().plusDays(duration);
    return cars.stream()
        .filter(
            carId -> {
              List<Reservation> existingReservations = reservationRepository.findByCarId(carId);
              return existingReservations.stream()
                  .noneMatch(
                      reservation ->
                          reservationEndDate.isBefore(reservation.getReservationEndDate())
                              || reservationStartDate.isAfter(
                                  reservation.getReservationStartDate()));
            })
        .findFirst();
  }

  private Reservation map(ReservationRequest reservationRequest, String carId) {
    Reservation reservation = new Reservation();
    reservation.setCustomerId(reservationRequest.getCustomerId());
    reservation.setCarId(carId);
    reservation.setReservationStartDate(reservationRequest.getReservationStartDate());
    reservation.setReservationEndDate(
        reservationRequest.getReservationStartDate().plusDays(reservationRequest.getDuration()));
    reservation.setDuration(reservationRequest.getDuration());
    reservation.setPrice(100.0f);
    // TODO: Get price from Car Service

    return reservation;
  }
}
