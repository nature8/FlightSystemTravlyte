package jsp.flightbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jsp.flightbooking.dao.UsersDao;
import jsp.flightbooking.dto.ResponseStructure;
import jsp.flightbooking.entity.Users;
import jsp.flightbooking.exception.NoRecordAvailableException;

@Service
public class UsersService {
	@Autowired
	private UsersDao usersDao;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public ResponseEntity<ResponseStructure<Users>> registerUser(Users user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		Users savedUser = usersDao.registerUser(user);
		
		savedUser.setPassword(null);
		
		ResponseStructure<Users> response = new ResponseStructure<Users>();
		response.setStatuscode(HttpStatus.CREATED.value());
		response.setMessage("Registration Successful");
		response.setData(savedUser);
		
		return new ResponseEntity<ResponseStructure<Users>>(response, HttpStatus.CREATED);
	}
	
	public ResponseEntity<ResponseStructure<Users>> userLogin(String email, String password){
		
		Users user = usersDao.userLogin(email);
		
		if(! passwordEncoder.matches(password, user.getPassword())) {
			throw new NoRecordAvailableException("User not found with the given email and password");
		}
		
		user.setPassword(null);
		
		ResponseStructure<Users> response = new ResponseStructure<Users>();
		response.setStatuscode(HttpStatus.OK.value());
		response.setMessage("User Login Successful");
		response.setData(user);
		
		return new ResponseEntity<ResponseStructure<Users>>(response, HttpStatus.OK);
	}
		
}
