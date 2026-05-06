package jsp.flightbooking.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.swing.text.AbstractDocument.BranchElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jsp.flightbooking.dao.BookingDao;
import jsp.flightbooking.dto.ResponseStructure;
import jsp.flightbooking.entity.Booking;
import jsp.flightbooking.entity.Status;
import jsp.flightbooking.entity.Users;
import jsp.flightbooking.exception.FlightNotFoundException;
import jsp.flightbooking.exception.IdNotFoundException;
import jsp.flightbooking.exception.NoBookingAvailableException;
import jsp.flightbooking.exception.PassengerNotFoundException;
import jsp.flightbooking.exception.PaymentNotFoundException;
import jsp.flightbooking.entity.Flight;
import jsp.flightbooking.entity.Passenger;
import jsp.flightbooking.entity.Payment;
import jsp.flightbooking.repository.FlightRepository;
import jsp.flightbooking.repository.PassengerRepository;
import jsp.flightbooking.repository.UsersRepository;

@Service
public class BookingService {
	@Autowired
	private BookingDao bookingDao;
	
	@Autowired
	private FlightRepository flightRepository;
	
	@Autowired
	private PassengerRepository passengerRepository;
	
	@Autowired
	private UsersRepository usersRepository;
	
	public ResponseEntity<ResponseStructure<Booking>> createBooking(Booking booking) {

	    if (booking.getFlight() == null) {
	        throw new FlightNotFoundException("Flight id has not been passed hence booking cannot be created");
	    }

	    Integer flightId = booking.getFlight().getId();
	    Optional<Flight> opt = flightRepository.findById(flightId);

	    if (opt.isPresent()) {

	        Flight flight = opt.get();
	        booking.setFlight(flight);

	        List<Passenger> passengers = booking.getPassengers();

	        if (passengers == null || passengers.isEmpty()) {
	            throw new PassengerNotFoundException("Passengers are required for booking");
	        }

	        // 🔥 STEP 1: Duplicate seat check (within request)
	        Set<String> seatSet = new HashSet<>();
	        for (Passenger p : passengers) {
	            if (!seatSet.add(p.getSeatNumber())) {
	                throw new RuntimeException("Duplicate seat number in request: " + p.getSeatNumber());
	            }
	        }

	        // 🔥 STEP 2: Already booked seats from DB
	        List<Passenger> existingPassengers =
	                passengerRepository.findPassengersByFlightId(flightId);

	        Set<String> bookedSeats = existingPassengers.stream()
	                .map(Passenger::getSeatNumber)
	                .collect(Collectors.toSet());

	        for (Passenger p : passengers) {
	            if (bookedSeats.contains(p.getSeatNumber())) {
	                throw new RuntimeException("Seat already booked: " + p.getSeatNumber());
	            }
	        }

	        // 🔥 STEP 3: Capacity check
	        int totalBookedSeats = bookedSeats.size();

	        if (totalBookedSeats + passengers.size() > flight.getTotalSeats()) {
	            throw new RuntimeException("Flight is fully booked");
	        }

	        // 💰 Amount calculation
	        int totalPassenger = passengers.size();
	        double totalAmount = totalPassenger * flight.getPrice();

	        Payment payment = booking.getPayment();

	        if (payment == null) {
	            throw new PaymentNotFoundException("Payment has not been passed");
	        }

	        payment.setAmount(totalAmount);
	        payment.setBooking(booking);
	        booking.setPayment(payment);

	        // 🔥🔥 IMPORTANT FIX (USER MAPPING)
	        for (Passenger passenger : passengers) {

	            passenger.setBooking(booking);

	            if (passenger.getUser() == null) {
	                throw new RuntimeException("User ID missing in request");
	            }

	            Users user = usersRepository.findById(passenger.getUser().getId())
	                    .orElseThrow(() -> new RuntimeException("User not found"));

	            passenger.setUser(user);
	            booking.setUser(user);
	        }
	        Booking savedBooking = bookingDao.createBooking(booking);

	        ResponseStructure<Booking> response = new ResponseStructure<>();
	        response.setStatuscode(HttpStatus.CREATED.value());
	        response.setMessage("Booking successful");
	        response.setData(savedBooking);

	        return new ResponseEntity<>(response, HttpStatus.CREATED);

	    } else {
	        throw new IdNotFoundException("Flight ID not found");
	    }
	}
	
	public ResponseEntity<ResponseStructure<List<Booking>>> getAllBooking(){
		ResponseStructure<List<Booking>> response = new ResponseStructure<List<Booking>>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records saved");
        response.setData(bookingDao.getAllBooking());
        return new ResponseEntity<ResponseStructure<List<Booking>>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<Booking>> getBookingById(Integer id){
		ResponseStructure<Booking> response = new ResponseStructure<Booking>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records fetched");
        response.setData(bookingDao.getBookingById(id));
        return new ResponseEntity<ResponseStructure<Booking>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<List<Booking>>> getBookingByFlight(Integer flightId){
		ResponseStructure<List<Booking>> response = new ResponseStructure<List<Booking>>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records fetched");
        response.setData(bookingDao.getBookingByFlight(flightId));
        return new ResponseEntity<ResponseStructure<List<Booking>>>(response, HttpStatus.OK) ;
	}
	
	
	public ResponseEntity<ResponseStructure<List<Booking>>> getBookingByBookingDate(LocalDateTime date){
		ResponseStructure<List<Booking>> response = new ResponseStructure<List<Booking>>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records fetched");
        response.setData(bookingDao.getBookingByBookingDate(date));
        return new ResponseEntity<ResponseStructure<List<Booking>>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<List<Booking>>> getBookingByStatus(Status status){
		ResponseStructure<List<Booking>> response = new ResponseStructure<List<Booking>>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records fetched");
        response.setData(bookingDao.getBookingByStatus(status));
        return new ResponseEntity<ResponseStructure<List<Booking>>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<List<Passenger>>> getAllPassengerByBookingId(Integer id){
		ResponseStructure<List<Passenger>> response = new ResponseStructure<List<Passenger>>();
		response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking records fetched as Passenger list");
        response.setData(bookingDao.getAllPassengerByBookingId(id));
        return new ResponseEntity<ResponseStructure<List<Passenger>>>(response, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<Payment>> getPaymentDetailsByBookingId(Integer id){
		ResponseStructure<Payment> response = new ResponseStructure<Payment>();
		response.setStatuscode(HttpStatus.OK.value());
		response.setMessage("Payment details fetched from booking");
		response.setData(bookingDao.getPaymentDetailsByBookingId(id));
		return new ResponseEntity<ResponseStructure<Payment>>(response, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<Booking>> updateBookingStatus(Integer id, Status status){
		ResponseStructure<Booking> response = new ResponseStructure<Booking>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking status has been updated");
        response.setData(bookingDao.updateBookingStatus(id, status));
        return new ResponseEntity<ResponseStructure<Booking>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<String>> deleteBooking(Integer id){
		ResponseStructure<String> response = new ResponseStructure<String>();
		bookingDao.deleteBooking(id);
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking deleted");
        response.setData("Success");
        return new ResponseEntity<ResponseStructure<String>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<List<Booking>>> getBookingsByUserId(Integer userId){
		
		ResponseStructure<List<Booking>> response = new ResponseStructure<>();
		
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking Found");
        response.setData(bookingDao.getBookingsByUserId(userId));
        return new ResponseEntity<ResponseStructure<List<Booking>>>(response, HttpStatus.OK) ;
	}
	
	public ResponseEntity<ResponseStructure<Page<Booking>>> getBookingByPaginationAndSorting(int pageNumber, int pageSize, String field){
		ResponseStructure<Page<Booking>> response = new ResponseStructure<Page<Booking>>();
        response.setStatuscode(HttpStatus.OK.value());
        response.setMessage("Booking status has been updated");
        response.setData(bookingDao.getBookingByPaginationAndSorting(pageNumber, pageSize, field));
        return new ResponseEntity<ResponseStructure<Page<Booking>>>(response, HttpStatus.OK) ;
	}
}
