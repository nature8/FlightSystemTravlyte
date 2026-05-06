package jsp.flightbooking.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(unique = true,  nullable=false)
	private String email;
	
	@Column(nullable = false, unique = true)
    private String contactNumber;

    @Column(nullable = false)
    private String password;
    
//    @JsonIgnore
//    @OneToOne(mappedBy = "user")
//    private Passenger passenger;
    
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Booking> bookings;
}
