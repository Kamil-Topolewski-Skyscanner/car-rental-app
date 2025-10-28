package com.carrental.reservation_service.controller;

import com.carrental.reservation_service.model.Reservation;
import com.carrental.reservation_service.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> addReservation(
            @Valid @RequestBody Reservation reservationRequest) {
        return new ResponseEntity<>(
                reservationService.addReservation(reservationRequest), HttpStatus.CREATED);
    }

    // TODO: /getReservationList
}
