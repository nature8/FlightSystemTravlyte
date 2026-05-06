package jsp.flightbooking.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jsp.flightbooking.entity.Users;
import jsp.flightbooking.exception.NoRecordAvailableException;
import jsp.flightbooking.repository.UsersRepository;

@Repository
public class UsersDao {
	@Autowired
	private UsersRepository usersRepository;
	
	public Users registerUser(Users user) {
		return usersRepository.save(user);
	}
	
	public Users userLogin(String email) {
		Optional<Users> opt = usersRepository.findByEmail(email);
		if(opt.isPresent()) {
			return opt.get();
		}
		else {
			throw new NoRecordAvailableException("User not found with "+email);
		}
	}
}
