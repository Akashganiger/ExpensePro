from flask import Blueprint, jsonify, request
from middleware.auth import token_required
from database import mysql

budget_bp = Blueprint("budget", __name__)


# ==========================================
# Department Budget
# ==========================================

@budget_bp.route("/budget", methods=["GET"])
@token_required
def get_department_budget():

    user = request.user

    cursor = mysql.connection.cursor()

    # Get department budget limit
    cursor.execute("""
        SELECT
            department,
            monthly_limit
        FROM department_budgets
        WHERE department=%s
    """, (user["department"],))

    budget = cursor.fetchone()

    if not budget:
        cursor.close()

        return jsonify({
            "success": False,
            "message": "Department budget not found"
        }), 404

    department = budget[0]
    monthly_limit = float(budget[1])

    # Calculate spent amount from approved expenses
    cursor.execute("""
        SELECT
            COALESCE(SUM(expenses.amount),0)
        FROM expenses
        INNER JOIN users
            ON expenses.employee_id = users.id
        WHERE
            users.department=%s
        AND
            expenses.status='approved'
    """, (department,))

    spent_amount = float(cursor.fetchone()[0])

    cursor.close()

    remaining_budget = monthly_limit - spent_amount

    percentage_used = 0

    if monthly_limit > 0:
        percentage_used = round(
            (spent_amount / monthly_limit) * 100,
            2
        )

    return jsonify({

        "success": True,

        "department": department,

        "monthly_limit": monthly_limit,

        "spent_amount": spent_amount,

        "remaining_budget": remaining_budget,

        "percentage_used": percentage_used

    })


# ==========================================
# Expense Analytics (Pie Chart)
# ==========================================

@budget_bp.route("/budget/analytics", methods=["GET"])
@token_required
def budget_analytics():

    user = request.user

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            expenses.category,
            COALESCE(SUM(expenses.amount),0)
        FROM expenses
        INNER JOIN users
            ON expenses.employee_id = users.id
        WHERE
            users.department=%s
        AND
            expenses.status='approved'
        GROUP BY expenses.category
    """, (user["department"],))

    rows = cursor.fetchall()

    cursor.close()

    analytics = []

    for row in rows:

        analytics.append({

            "category": row[0],

            "amount": float(row[1])

        })

    return jsonify(analytics)


# ==========================================
# Manager Dashboard Stats
# ==========================================

@budget_bp.route("/manager/stats", methods=["GET"])
@token_required
def manager_stats():

    user = request.user

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT
            COUNT(*),
            COALESCE(SUM(amount),0)
        FROM expenses
        INNER JOIN users
            ON expenses.employee_id = users.id
        WHERE users.department=%s
    """, (user["department"],))

    total = cursor.fetchone()

    cursor.execute("""
        SELECT
            COUNT(*)
        FROM expenses
        INNER JOIN users
            ON expenses.employee_id = users.id
        WHERE
            users.department=%s
        AND
            status='pending'
    """, (user["department"],))

    pending = cursor.fetchone()[0]

    cursor.close()

    return jsonify({

        "success": True,

        "total_claims": total[0],

        "total_amount": float(total[1]),

        "pending_claims": pending

    })