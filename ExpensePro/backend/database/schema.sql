CREATE DATABASE IF NOT EXISTS expense_management;
USE expense_management;

CREATE TABLE users(

id INT AUTO_INCREMENT PRIMARY KEY,

email VARCHAR(255) UNIQUE NOT NULL,

password_hash VARCHAR(255) NOT NULL,

full_name VARCHAR(100) NOT NULL,

department ENUM(
'sales',
'engineering',
'hr',
'marketing'
),

role ENUM(
'employee',
'manager'
),

session_token VARCHAR(255)
);



CREATE TABLE department_budgets(

id INT AUTO_INCREMENT PRIMARY KEY,

department VARCHAR(50) UNIQUE,

monthly_limit DECIMAL(12,2),

spent_amount DECIMAL(12,2) DEFAULT 0
);



CREATE TABLE expenses(

id INT AUTO_INCREMENT PRIMARY KEY,

employee_id INT,

amount DECIMAL(10,2),

category ENUM(
'travel',
'meals',
'software',
'hardware'
),

description TEXT,

status ENUM(
'pending',
'approved',
'rejected'
) DEFAULT 'pending',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(employee_id)
REFERENCES users(id)
ON DELETE CASCADE
);