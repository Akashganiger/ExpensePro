INSERT INTO department_budgets
(department,monthly_limit,spent_amount)

VALUES

('sales',50000,12000),

('engineering',100000,25000),

('hr',40000,7000),

('marketing',60000,18000);



INSERT INTO users
(email,password_hash,full_name,department,role)

VALUES

(
'manager.sales@expensepro.com',
'password',
'Rahul Sharma',
'sales',
'manager'
),

(
'manager.eng@expensepro.com',
'password',
'Priya Patel',
'engineering',
'manager'
),

(
'amit@expensepro.com',
'password',
'Amit Kumar',
'sales',
'employee'
),

(
'sneha@expensepro.com',
'password',
'Sneha Gupta',
'engineering',
'employee'
);



INSERT INTO expenses

(employee_id,amount,category,description,status)

VALUES

(3,1200,'travel','Client Visit','approved'),

(3,650,'meals','Business Lunch','pending'),

(4,2500,'software','VS Code License','approved'),

(4,1200,'hardware','Keyboard','rejected');