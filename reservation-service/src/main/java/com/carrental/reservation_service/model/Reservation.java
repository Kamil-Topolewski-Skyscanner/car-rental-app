package com.carrental.reservation_service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false)
    private String carId;

    @Column(nullable = false)
    private LocalDateTime reservationStartDate;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    @Positive
    private Float price; // TODO: handle currency

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
