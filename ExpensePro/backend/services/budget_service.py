from models.budget_model import BudgetModel


class BudgetService:

    @staticmethod
    def department_summary(department):

        budget = BudgetModel.get_department_budget(
            department
        )

        if not budget:

            return None

        monthly_limit = float(budget[1])
        spent_amount = float(budget[2])

        percentage = (
            spent_amount /
            monthly_limit
        ) * 100

        if percentage < 75:

            status = "Safe"

            color = "green"

        elif percentage < 90:

            status = "Warning"

            color = "orange"

        else:

            status = "Critical"

            color = "red"

        return {

            "department": budget[0],

            "monthly_limit": monthly_limit,

            "spent_amount": spent_amount,

            "remaining_budget":
                monthly_limit - spent_amount,

            "percentage_used":
                round(percentage, 2),

            "status":
                status,

            "color":
                color

        }

    @staticmethod
    def all_departments():

        return BudgetModel.get_all_budgets()