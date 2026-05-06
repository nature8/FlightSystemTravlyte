package jsp.flightbooking.exception;

public class AdminNotFoundException extends RuntimeException{
	public AdminNotFoundException(String msg){
		super(msg);
	}
}
