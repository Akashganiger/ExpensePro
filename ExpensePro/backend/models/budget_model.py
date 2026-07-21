from database import mysql


class BudgetModel:

    @staticmethod
    def get_department_budget(department):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                department,
                monthly_limit,
                spent_amount
            FROM department_budgets
            WHERE department=%s
        """, (department,))

        budget = cursor.fetchone()
        cursor.close()

        return budget

    @staticmethod
    def update_spent_amount(department, amount):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            UPDATE department_budgets
            SET spent_amount = spent_amount + %s
            WHERE department=%s
        """, (
            amount,
            department
        ))

        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def get_all_budgets():
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                department,
                monthly_limit,
                spent_amount
            FROM department_budgets
        """)

        budgets = cursor.fetchall()
        cursor.close()

        return budgets