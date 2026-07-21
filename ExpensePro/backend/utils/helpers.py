from datetime import datetime


def current_timestamp():
    """
    Returns current timestamp.
    """

    return datetime.now()


def calculate_percentage(spent, limit):

    if limit == 0:
        return 0

    return round((spent / limit) * 100, 2)


def remaining_budget(limit, spent):

    return round(limit - spent, 2)


def budget_status(percentage):

    if percentage < 75:
        return {
            "status": "Safe",
            "color": "green"
        }

    elif percentage < 90:
        return {
            "status": "Warning",
            "color": "orange"
        }

    return {
        "status": "Critical",
        "color": "red"
    }


def serialize_expense(expense):

    return {

        "id": expense[0],

        "amount": float(expense[1]),

        "category": expense[2],

        "description": expense[3],

        "status": expense[4],

        "created_at": str(expense[5])

    }


def serialize_budget(budget):

    return {

        "department": budget[0],

        "monthly_limit": float(budget[1]),

        "spent_amount": float(budget[2])

    }