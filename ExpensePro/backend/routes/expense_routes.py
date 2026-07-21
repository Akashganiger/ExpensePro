from flask import Blueprint, request, jsonify
from middleware.auth import employee_required
from database import mysql

expense_bp = Blueprint("expense", __name__)


@expense_bp.route("/expenses/history", methods=["GET"])
@employee_required
def expense_history():

    user = request.user

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
    """, (user["id"],))

    expenses = cursor.fetchall()

    cursor.close()

    data = []

    for expense in expenses:
        data.append({
            "id": expense[0],
            "amount": float(expense[1]),
            "category": expense[2],
            "description": expense[3],
            "status": expense[4],
            "created_at": expense[5]
        })

    return jsonify(data)


@expense_bp.route("/expenses/submit", methods=["POST"])
@employee_required
def submit_expense():

    user = request.user

    data = request.get_json()

    try:
        amount = float(data.get("amount", 0))
    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "message": "Invalid amount"
        }), 400

    category = data.get("category")
    description = data.get("description", "").strip()

    if amount <= 0:
        return jsonify({
            "success": False,
            "message": "Amount must be greater than zero"
        }), 400

    if not category:
        return jsonify({
            "success": False,
            "message": "Category is required"
        }), 400

    if not description:
        return jsonify({
            "success": False,
            "message": "Description is required"
        }), 400

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT spent_amount, monthly_limit
        FROM department_budgets
        WHERE department = %s
    """, (user["department"],))

    budget = cursor.fetchone()

    warning = False

    if budget:
        spent = float(budget[0])
        limit = float(budget[1])

        if (spent + amount) >= (0.90 * limit):
            warning = True

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
        (%s, %s, %s, %s, 'pending')
    """, (
        user["id"],
        amount,
        category,
        description
    ))

    mysql.connection.commit()
    cursor.close()

    return jsonify({
        "success": True,
        "budget_warning": warning,
        "message": "Expense Submitted Successfully"
    }), 201