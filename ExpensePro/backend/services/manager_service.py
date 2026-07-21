from models.expense_model import ExpenseModel
from models.budget_model import BudgetModel
from models.user_model import UserModel


class ManagerService:

    @staticmethod
    def pending_expenses(department):

        return ExpenseModel.get_pending_by_department(
            department
        )

    @staticmethod
    def update_status(expense_id, status):

        expense = ExpenseModel.get_by_id(expense_id)

        if not expense:

            return False

        ExpenseModel.update_status(
            expense_id,
            status
        )

        if status == "approved":

            user = UserModel.get_by_id(
                expense[1]
            )

            department = user[3]

            BudgetModel.update_spent_amount(

                department,

                expense[2]

            )

        return True