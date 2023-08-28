-- mysql -u root -p
CREATE TABLE users (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, email varchar(255) NOT NULL, password varchar(255));
create index emailIndex on users(email);