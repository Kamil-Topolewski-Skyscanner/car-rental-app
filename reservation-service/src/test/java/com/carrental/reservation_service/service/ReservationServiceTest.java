package com.carrental.reservation_service.service;

import com.carrental.reservation_service.dto.ReservationRequest;
import com.carrental.reservation_service.model.Reservation;
import com.carrental.reservation_service.repository.ReservationRepository;
import com.carrental.reservation_service.service.rest.CarService;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import com.carrental.reservation_service.service.rest.CarType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservationServiceTest {

    private ReservationRepository reservationRepository;
    private CarService carService;
    private ReservationService reservationService;

    @BeforeEach
    void setUp() {
        reservationRepository = mock(ReservationRepository.class);
        carService = mock(CarService.class);
        reservationService = new ReservationService(reservationRepository, carService);
    }

    @Test
    void addReservation_success() {
        ReservationRequest request = new ReservationRequest();
        request.setCarType(CarType.SUV);
        request.setCustomerId("cust1");
        request.setDuration(2);
        request.setReservationStartDate(LocalDateTime.now());

        when(carService.getCarsByType(CarType.SUV)).thenReturn(List.of("car1"));
        when(reservationRepository.findByCarId("car1")).thenReturn(Collections.emptyList());
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Reservation reservation = reservationService.addReservation(request);

        assertNotNull(reservation);
        assertEquals("cust1", reservation.getCustomerId());
        assertEquals("car1", reservation.getCarId());
        assertEquals(2, reservation.getDuration());
    }

    @Test
    void addReservation_noAvailableCars_throwsException() {
        ReservationRequest request = new ReservationRequest();
        request.setCarType(CarType.SUV);
        request.setCustomerId("cust1");
        request.setDuration(2);
        request.setReservationStartDate(LocalDateTime.now());

        when(carService.getCarsByType(CarType.SUV)).thenReturn(List.of("car1"));
        Reservation existing = new Reservation();
        existing.setReservationStartDate(request.getReservationStartDate().minusDays(1));
        existing.setReservationEndDate(request.getReservationStartDate().plusDays(3));
        when(reservationRepository.findByCarId("car1")).thenReturn(List.of(existing));

        assertThrows(RuntimeException.class, () -> reservationService.addReservation(request));
    }
}