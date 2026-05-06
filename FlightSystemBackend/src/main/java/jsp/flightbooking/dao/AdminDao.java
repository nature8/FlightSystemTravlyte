package jsp.flightbooking.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jsp.flightbooking.entity.Admin;
import jsp.flightbooking.exception.AdminNotFoundException;
import jsp.flightbooking.repository.AdminRepository;

@Repository
public class AdminDao {
	@Autowired
	private AdminRepository adminRepository;
	
	public Admin saveAdminInfo(Admin admin) {
		return adminRepository.save(admin);
	}
	
	public Admin adminLogin(String email) {
		Optional<Admin> opt = adminRepository.findByEmail(email);
		if(opt.isPresent()) {
			return opt.get();
		}
		else {
			throw new AdminNotFoundException("No admin found with "+email);
		}
	}
}

