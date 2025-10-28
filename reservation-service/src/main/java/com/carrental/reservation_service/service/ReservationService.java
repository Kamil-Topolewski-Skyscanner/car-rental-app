package com.carrental.reservation_service.service;

import com.carrental.reservation_service.model.Reservation;
import com.carrental.reservation_service.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReservationService {
  private final ReservationRepository reservationRepository;

  public Reservation addReservation(Reservation reservationRequest) {
    return reservationRepository.save(reservationRequest);
  }
}
