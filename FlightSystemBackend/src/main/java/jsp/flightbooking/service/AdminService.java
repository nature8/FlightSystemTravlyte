package jsp.flightbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jsp.flightbooking.dao.AdminDao;
import jsp.flightbooking.dto.ResponseStructure;
import jsp.flightbooking.entity.Admin;
import jsp.flightbooking.exception.AdminNotFoundException;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public ResponseEntity<ResponseStructure<Admin>> saveAdminInfo(Admin admin) {

	    admin.setPassword(passwordEncoder.encode(admin.getPassword()));

	    Admin savedAdmin = adminDao.saveAdminInfo(admin);

	    savedAdmin.setPassword(null);

	    ResponseStructure<Admin> response = new ResponseStructure<>();
	    response.setStatuscode(HttpStatus.CREATED.value());
	    response.setMessage("Admin created");
	    response.setData(savedAdmin);

	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	public ResponseEntity<ResponseStructure<Admin>> adminLogin(String email, String password) {

	    Admin admin = adminDao.adminLogin(email);

	    if (!passwordEncoder.matches(password, admin.getPassword())) {
	        throw new AdminNotFoundException("Invalid email or password");
	    }

	    admin.setPassword(null);

	    ResponseStructure<Admin> response = new ResponseStructure<>();
	    response.setStatuscode(HttpStatus.OK.value());
	    response.setMessage("Admin login successful");
	    response.setData(admin);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}



}
