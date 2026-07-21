from database import mysql


class ExpenseModel:

    @staticmethod
    def create(employee_id, amount, category, description):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            INSERT INTO expenses
            (
                employee_id,
                amount,
                category,
                description,
                status
            )
            VALUES
            (%s,%s,%s,%s,'pending')
        """, (
            employee_id,
            amount,
            category,
            description
        ))

        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def get_by_employee(employee_id):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                id,
                amount,
                category,
                description,
                status,
                created_at
            FROM expenses
            WHERE employee_id=%s
            ORDER BY created_at DESC
        """, (employee_id,))

        expenses = cursor.fetchall()
        cursor.close()

        return expenses

    @staticmethod
    def get_pending_by_department(department):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                e.id,
                u.full_name,
                e.amount,
                e.category,
                e.description
            FROM expenses e
            JOIN users u
            ON e.employee_id=u.id
            WHERE
                e.status='pending'
            AND
                u.department=%s
        """, (department,))

        rows = cursor.fetchall()
        cursor.close()

        return rows

    @staticmethod
    def get_by_id(expense_id):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                id,
                employee_id,
                amount,
                status
            FROM expenses
            WHERE id=%s
        """, (expense_id,))

        expense = cursor.fetchone()
        cursor.close()

        return expense

    @staticmethod
    def update_status(expense_id, status):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            UPDATE expenses
            SET status=%s
            WHERE id=%s
        """, (status, expense_id))

        mysql.connection.commit()
        cursor.close()