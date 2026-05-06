-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_number VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- =========================
-- FLIGHT TABLE
-- =========================
CREATE TABLE flight (
    id INT PRIMARY KEY AUTO_INCREMENT,
    airline VARCHAR(255),
    source VARCHAR(255),
    destination VARCHAR(255),
    departure_time DATETIME,
    arrival_time DATETIME,
    total_seats INT,
    price DOUBLE
);

-- =========================
-- BOOKING TABLE
-- =========================
CREATE TABLE booking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),

    user_id INT,
    flight_id INT,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_id) REFERENCES flight(id)
);

-- =========================
-- PASSENGER TABLE
-- =========================
CREATE TABLE passenger (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    age INT,
    gender VARCHAR(20),
    contact_number VARCHAR(20),
    seat_number VARCHAR(10),

    booking_id INT,
    user_id INT,

    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================
-- PAYMENT TABLE
-- =========================
CREATE TABLE payment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payment_date DATE DEFAULT CURRENT_DATE,
    amount DOUBLE,
    mode_of_transaction VARCHAR(50),
    status VARCHAR(50),

    booking_id INT UNIQUE,

    FOREIGN KEY (booking_id) REFERENCES booking(id)
);