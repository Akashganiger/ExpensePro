import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/common/Card";
import ExpenseTable from "../components/employee/ExpenseTable";
import ExpenseModal from "../components/employee/ExpenseModal";

import { getExpenses } from "../services/expenseService";

export default function EmployeeDashboard() {

    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        loadExpenses();
    }, [refresh]);

    async function loadExpenses() {

        try {

            const data = await getExpenses();

            setExpenses(data);

        } catch (error) {

            console.error(error);

        }

    }

    const totalExpenses = expenses.reduce(

        (sum, expense) => sum + Number(expense.amount),

        0

    );

    const pending = expenses.filter(

        expense => expense.status === "pending"

    ).length;

    const approved = expenses.filter(

        expense => expense.status === "approved"

    ).length;

    const rejected = expenses.filter(

        expense => expense.status === "rejected"

    ).length;

    return (

        <DashboardLayout title="Employee Dashboard">

            <div className="cards">

                <Card
                    title="Total Expenses"
                    value={`₹${totalExpenses}`}
                />

                <Card
                    title="Pending"
                    value={pending}
                />

                <Card
                    title="Approved"
                    value={approved}
                />

                <Card
                    title="Rejected"
                    value={rejected}
                />

            </div>

            <button

                className="primary-btn"

                onClick={() => setOpen(true)}

            >

                + Submit Expense

            </button>

            <br /><br />

            <ExpenseTable
                expenses={expenses}
            />

            {

                open &&

                <ExpenseModal

                    reload={() => setRefresh(!refresh)}

                    close={() => setOpen(false)}

                />

            }

        </DashboardLayout>

    );

}