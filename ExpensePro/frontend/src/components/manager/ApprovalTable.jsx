import { useEffect, useState } from "react";

import ApprovalRow from "./ApprovalRow";

import { getPendingExpenses } from "../../services/managerService";

export default function ApprovalTable() {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadExpenses() {

        try {

            const data = await getPendingExpenses();

            setExpenses(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadExpenses();

    }, []);

    if (loading)

        return <h2>Loading...</h2>;

    if (expenses.length === 0)

        return <h2>No Pending Approvals</h2>;

    return (

        <table className="expense-table">

            <thead>

                <tr>

                    <th>Employee</th>

                    <th>Category</th>

                    <th>Amount</th>

                    <th>Description</th>

                    <th>Budget Warning</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    expenses.map(

                        expense => (

                            <ApprovalRow

                                key={expense.expense_id}

                                expense={expense}

                                reload={loadExpenses}

                            />

                        )

                    )

                }

            </tbody>

        </table>

    );

}