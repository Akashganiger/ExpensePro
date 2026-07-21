import { updateExpenseStatus } from "../../services/managerService";

export default function ApprovalRow({

    expense,

    reload

}) {

    async function update(status) {

        try {

            await updateExpenseStatus(

                expense.expense_id,

                status

            );

            reload();

        }

        catch (err) {

            console.error(err);

        }

    }

    return (

        <tr>

            <td>

                {expense.employee}

            </td>

            <td>

                {expense.category}

            </td>

            <td>

                ₹{expense.amount}

            </td>

            <td>

                {expense.description}

            </td>

            <td>

                {

                    expense.budget_warning ?

                    <span className="warning">

                        ⚠ Near Budget Limit

                    </span>

                    :

                    <span className="safe">

                        Safe

                    </span>

                }

            </td>

            <td>

                <button

                    className="approve-btn"

                    onClick={() =>

                        update("approved")

                    }

                >

                    Approve

                </button>

                <button

                    className="reject-btn"

                    onClick={() =>

                        update("rejected")

                    }

                >

                    Reject

                </button>

            </td>

        </tr>

    );

}