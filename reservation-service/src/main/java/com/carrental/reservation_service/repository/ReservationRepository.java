package com.carrental.reservation_service.repository;

import com.carrental.reservation_service.model.Reservation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, String> {
  List<Reservation> findByCarId(String carId);
}
