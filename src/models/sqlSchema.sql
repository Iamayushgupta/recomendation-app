-- To access the MySQL shell with the root user and prompt for the password
mysql -u root -p

-- Create a table named 'users'
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
  email varchar(255) NOT NULL,               -- Email column, cannot be empty
  password varchar(255)                      -- Password column
);

-- Create an index named 'emailIndex' on the 'email' column of the 'users' table
CREATE INDEX emailIndex ON users(email);