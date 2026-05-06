package jsp.flightbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jsp.flightbooking.dto.LoginRequest;
import jsp.flightbooking.dto.ResponseStructure;
import jsp.flightbooking.entity.Admin;
import jsp.flightbooking.service.AdminService;

@RequestMapping("/admin")
@RestController
public class AdminController {
	
	@Autowired
	AdminService adminService;
	
	@PostMapping
	public ResponseEntity<ResponseStructure<Admin>> saveAdminInfo(@RequestBody Admin admin){
		return adminService.saveAdminInfo(admin);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Admin>> adminLogin(@RequestBody LoginRequest logReq){
		return adminService.adminLogin(logReq.getEmail(), logReq.getPassword());
	}
}
