package jsp.flightbooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.flightbooking.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	public Optional<Users> findByEmail(String email); 
}
