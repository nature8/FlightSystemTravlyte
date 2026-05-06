package jsp.flightbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jsp.flightbooking.dto.LoginRequest;
import jsp.flightbooking.dto.ResponseStructure;
import jsp.flightbooking.entity.Users;
import jsp.flightbooking.service.UsersService;

@RequestMapping("/users")
@RestController
public class UsersController {
	@Autowired
	private UsersService usersService;
	
	@PostMapping
	public ResponseEntity<ResponseStructure<Users>> registerUser(@RequestBody Users user){
		return usersService.registerUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Users>> userLogin(@RequestBody LoginRequest log){
		return usersService.userLogin(log.getEmail(), log.getPassword());
		
		
	}
}
