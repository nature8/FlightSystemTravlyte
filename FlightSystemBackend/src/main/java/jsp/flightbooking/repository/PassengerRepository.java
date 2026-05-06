package jsp.flightbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jsp.flightbooking.entity.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
	List<Passenger> findByContactNumber(String contact);
	List<Passenger> findByBookingFlightId(Integer id);
	@Query("SELECT p FROM Passenger p WHERE p.booking.flight.id = :flightId")
	List<Passenger> findPassengersByFlightId(@Param("flightId") Integer flightId);
}
