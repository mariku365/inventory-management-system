CREATE DATABASE test;

USE test;

CREATE TABLE users(
	id INT PRIMARY KEY IDENTITY(1,1),
	username NVARCHAR(50) UNIQUE,
	userPassword NVARCHAR(255)
);


CREATE TABLE items(
	id INT PRIMARY KEY IDENTITY(1,1),
	itemName VARCHAR(100) NOT NULL,
	quantity INT,
	price DECIMAL(10,2)
);



INSERT INTO users(username, userPassword) VALUES ('MGR_Mark', 'MGR_M@rk123');

SELECT * FROM users;

INSERT INTO items(itemName, quantity, price) VALUES ('Acer Laptop', 5, 49000);
INSERT INTO items(itemName, quantity, price) VALUES ('Acer Monitor', 10, 10000);
INSERT INTO items(itemName, quantity, price) VALUES ('Lenovo Laptop', 8, 42000);
INSERT INTO items(itemName, quantity, price) VALUES ('Lenovo Monitor', 6, 15000);
INSERT INTO items(itemName, quantity, price) VALUES ('Cisco Switch', 12, 1500);
INSERT INTO items(itemName, quantity, price) VALUES ('Desktop Computer', 20, 18000);
INSERT INTO items(itemName, quantity, price) VALUES ('Cisco Router', 10, 1300);
INSERT INTO items(itemName, quantity, price) VALUES ('Phicomm Router', 8, 1000);
INSERT INTO items(itemName, quantity, price) VALUES ('Tenda Router', 10, 850);
INSERT INTO items(itemName, quantity, price) VALUES ('RX 580 8gb', 5, 3500);
INSERT INTO items(itemName, quantity, price) VALUES ('NVIDIA GEFORE RTX 3060 12gb', 3, 15000);

TRUNCATE TABLE items;

SELECT price as 'Price (PHP)' FROM items;

SELECT * FROM items;