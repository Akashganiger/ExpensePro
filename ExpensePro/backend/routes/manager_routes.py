from flask import Blueprint, request, jsonify
from middleware.auth import manager_required
from database import mysql

manager_bp = Blueprint("manager", __name__)


@manager_bp.route("/manager/approvals", methods=["GET"])
@manager_required
def pending_expenses():

    manager = request.user

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            expenses.id,
            users.full_name,
            expenses.amount,
            expenses.category,
            expenses.description
        FROM expenses
        JOIN users
        ON expenses.employee_id = users.id
        WHERE
            expenses.status = 'pending'
        AND
            users.department = %s
    """, (manager["department"],))

    rows = cursor.fetchall()

    cursor.execute("""
        SELECT
            monthly_limit,
            spent_amount
        FROM department_budgets
        WHERE department = %s
    """, (manager["department"],))

    budget = cursor.fetchone()

    warning_limit = 0
    current_spent = 0

    if budget:
        warning_limit = float(budget[0])
        current_spent = float(budget[1])

    result = []

    for row in rows:

        amount = float(row[2])

        budget_warning = False

        if warning_limit > 0:
            budget_warning = (
                current_spent + amount
            ) >= (0.90 * warning_limit)

        result.append({

            "expense_id": row[0],
            "employee": row[1],
            "amount": amount,
            "category": row[3],
            "description": row[4],
            "budget_warning": budget_warning

        })

    cursor.close()

    return jsonify(result)


@manager_bp.route("/manager/approvals/<int:id>", methods=["PUT"])
@manager_required
def approve_reject(id):

    data = request.get_json()

    status = data.get("status")

    if status not in ["approved", "rejected"]:

        return jsonify({

            "success": False,
            "message": "Invalid status."

        }), 400

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            status,
            amount,
            employee_id
        FROM expenses
        WHERE id=%s
    """, (id,))

    expense = cursor.fetchone()

    if not expense:

        cursor.close()

        return jsonify({

            "success": False,
            "message": "Expense not found."

        }), 404

    current_status = expense[0]
    amount = float(expense[1])
    employee_id = expense[2]

    if current_status != "pending":

        cursor.close()

        return jsonify({

            "success": False,
            "message": "Expense has already been processed."

        }), 400

    cursor.execute("""
        UPDATE expenses
        SET status=%s
        WHERE id=%s
    """, (status, id))

    if status == "approved":

        cursor.execute("""
            SELECT department
            FROM users
            WHERE id=%s
        """, (employee_id,))

        department = cursor.fetchone()[0]

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

    return jsonify({

        "success": True,
        "status": status,
        "message": f"Expense {status} successfully."

    })