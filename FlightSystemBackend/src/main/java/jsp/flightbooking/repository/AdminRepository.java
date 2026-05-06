package jsp.flightbooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.flightbooking.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
	public Optional<Admin> findByEmail(String email);
}
