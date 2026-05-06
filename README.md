# FlightSystemTravlyte
Overview

FlightBookingSystem is a full-stack web application designed to simplify flight search, booking, and management. The system allows users to browse available flights, book tickets, manage their profile, and view booking history. It also provides backend support for handling users, flights, bookings, passengers, and payments efficiently.

Features
User Features
User registration and login
Search and view available flights
Book flights with passenger details
View booking history in user profile
Download ticket option (if implemented in frontend)
Logout functionality
Booking Features
Multiple passenger support per booking
Flight selection with source and destination
Booking status tracking
Payment details linked to bookings
System Features
RESTful APIs using Spring Boot
MySQL database integration
Entity relationships (User, Booking, Flight, Passenger, Payment)
Structured response handling using ResponseStructure
**Tech Stack**
**Frontend**
React.js
Axios
Bootstrap / CSS
**Backend**
Java
Spring Boot
Spring Data JPA
Hibernate
**Database**
PostgrSQL

**API Endpoints**
Booking APIs
GET /booking/users/{userId}
Get all bookings of a specific user
User APIs
User authentication and management (login/register)
Flight APIs
Manage available flights (add/view/search)
**How to Run the Project**
**Backend Setup**
Clone the repository
Configure SQL database in application.properties
Run Spring Boot application:
mvn spring-boot:run
**Frontend Setup**
npm install
npm start

**Database Schema**

**Main entities:**

Users
Booking
Flight
Passenger
Payment

**Secondary Entity**
Admin

**Relationships:**

User → Bookings (One-to-Many)
Booking → Passengers (One-to-Many)
Booking → Flight (Many-to-One)
Booking → Payment (One-to-One)
Flight → Booking (One-to-Many)
Passenger → Booking (Many-to-One) 
Passenger → User (Many-to-One)

**Screenshots**
Frontpage
<img width="1902" height="975" alt="image" src="https://github.com/user-attachments/assets/ae757a7b-eb32-4789-b5f1-df160f281578" />



Booking Page
<img width="1881" height="953" alt="image" src="https://github.com/user-attachments/assets/f0493848-449b-4b5b-96ab-df8765ec1849" />

Booking Confirmed Page
<img width="1895" height="966" alt="image" src="https://github.com/user-attachments/assets/d5663375-0c28-4776-ad44-f4653f3ededb" />

Admin Dashboard
<img width="1892" height="970" alt="image" src="https://github.com/user-attachments/assets/bf01020c-8ad0-4740-bfe4-d8f2f06316ad" />

Flights Management
<img width="1878" height="818" alt="image" src="https://github.com/user-attachments/assets/a02bdf91-761c-483a-ad49-53fd5c464ad0" />
Add Flight
<img width="1902" height="917" alt="image" src="https://github.com/user-attachments/assets/d998497b-6973-48ac-8b6b-d7e2839cf750" />

All Booking Details of Passengers
<img width="1862" height="901" alt="image" src="https://github.com/user-attachments/assets/0a57a53d-0a7e-4969-b4cf-e104225f67d4" />

Passenger Details
<img width="1908" height="977" alt="image" src="https://github.com/user-attachments/assets/83dab23c-2bfb-4958-9723-c8b16f13b8c6" />


**Future Improvements**
JWT Authentication & Security
Admin dashboard for flight management
Email confirmation for bookings
Ticket PDF generation and download
Seat selection UI
Payment gateway integration

**Author**
Developed by: Prakruti Tailor
