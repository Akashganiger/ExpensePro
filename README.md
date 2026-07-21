# ExpensePro -- Expense Management & Budget Intelligence

## Overview

ExpensePro is a web-based expense management system that streamlines
employee reimbursement and departmental budget tracking. Employees can
submit expenses, while managers review and approve claims with real-time
budget monitoring.

------------------------------------------------------------------------

## Features

### Employee

-   Secure login
-   Submit expense claims
-   View expense history
-   Track claim status

### Manager

-   Approve or reject expenses
-   View pending requests
-   Monitor department budget

### Budget Management

-   Real-time budget tracking
-   90% budget warning
-   Automatic budget update after approval

------------------------------------------------------------------------

## Tech Stack

  Layer      Technology
  ---------- --------------
  Frontend   React.js
  Backend    Python Flask
  Database   MySQL
  API        REST API

------------------------------------------------------------------------

## Workflow

1.  Employee logs in.
2.  Submit expense.
3.  Budget validation.
4.  Expense saved as **Pending**.
5.  Manager approves/rejects.
6.  Budget updated after approval.

------------------------------------------------------------------------

## Database

### users

-   id
-   email
-   password_hash
-   full_name
-   department
-   role
-   session_token

### department_budgets

-   id
-   department
-   monthly_limit
-   spent_amount

### expenses

-   id
-   employee_id
-   amount
-   category
-   description
-   status
-   created_at

------------------------------------------------------------------------

## REST APIs

  Method   Endpoint
  -------- --------------------------------
  POST     /api/v1/expenses/submit
  GET      /api/v1/expenses/history
  GET      /api/v1/manager/approvals
  PUT      /api/v1/manager/approvals/{id}

------------------------------------------------------------------------

## Project Structure

``` text
ExpensePro/
├── frontend/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── database/
│   └── app.py
└── README.md
```

------------------------------------------------------------------------

## Future Enhancements

-   Email notifications
-   Analytics dashboard
-   Mobile application
-   AI-based fraud detection

------------------------------------------------------------------------

## Contributors

-   Team Member 1
-   Team Member 2
-   Team Member 3
-   Team Member 4

------------------------------------------------------------------------

## License

Developed for academic and learning purposes.
