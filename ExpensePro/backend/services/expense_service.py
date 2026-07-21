from models.expense_model import ExpenseModel
from models.budget_model import BudgetModel


class ExpenseService:

    @staticmethod
    def submit_expense(user, amount, category, description):

        budget = BudgetModel.get_department_budget(
            user["department"]
        )

        warning = False

        if budget:

            monthly_limit = float(budget[1])
            spent_amount = float(budget[2])

            percentage = (
                (spent_amount + amount)
                / monthly_limit
            ) * 100

            if percentage >= 90:
                warning = True

        ExpenseModel.create(

            user["id"],
            amount,
            category,
            description

        )

        return {

            "success": True,
            "budget_warning": warning

        }

    @staticmethod
    def get_history(user_id):

        return ExpenseModel.get_by_employee(user_id)