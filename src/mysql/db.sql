-- Creating the database

CREATE DATABASE nodejsmysqlana;

-- Using the database

use nodejsmysqlana;

-- Creating a table

CREATE TABLE customers (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

-- Describing the table

describe nodejsmysqlana;