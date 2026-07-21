from utils.constants import (
    CATEGORIES,
    APPROVED,
    REJECTED
)


def validate_login(email, password):

    if not email:
        return False, "Email is required"

    if not password:
        return False, "Password is required"

    return True, ""


def validate_expense(amount, category, description):

    if amount is None:
        return False, "Amount is required"

    try:
        amount = float(amount)
    except (ValueError, TypeError):
        return False, "Amount must be a number"

    if amount <= 0:
        return False, "Amount must be greater than zero"

    if category not in CATEGORIES:
        return False, "Invalid category"

    if not description:
        return False, "Description is required"

    return True, ""


def validate_status(status):

    if status not in [APPROVED, REJECTED]:
        return False

    return True