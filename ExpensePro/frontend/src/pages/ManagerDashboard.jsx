import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Card from "../components/common/Card";
import BudgetAlert from "../components/manager/BudgetAlert";
import BudgetProgress from "../components/charts/BudgetProgress";
import ExpensePieChart from "../components/charts/ExpensePieChart";

import {
    getBudget,
    getBudgetAnalytics
} from "../services/budgetService";

export default function ManagerDashboard() {

    const navigate = useNavigate();

    const [budget, setBudget] = useState(null);

    const [analytics, setAnalytics] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const budgetData = await getBudget();

            const analyticsData = await getBudgetAnalytics();

            setBudget(budgetData);

            setAnalytics(analyticsData);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout title="Manager Dashboard">

                <h2>Loading Dashboard...</h2>

            </DashboardLayout>

        );

    }

    const spent = Number(budget.spent_amount);

    const limit = Number(budget.monthly_limit);

    const remaining = limit - spent;

    const percentage = Math.round((spent / limit) * 100);

    return (

        <DashboardLayout title="Manager Dashboard">

            <BudgetAlert
                percentage={percentage}
            />

            <div className="cards">

                <Card
                    title="Monthly Budget"
                    value={`₹${limit.toLocaleString()}`}
                />

                <Card
                    title="Spent"
                    value={`₹${spent.toLocaleString()}`}
                />

                <Card
                    title="Remaining"
                    value={`₹${remaining.toLocaleString()}`}
                />

                <Card
                    title="Budget Used"
                    value={`${percentage}%`}
                />

            </div>

            <br />

            <BudgetProgress

                spent={spent}

                limit={limit}

            />

            <br />

            <div className="chart-card">

                <h2>

                    Expense Category Breakdown

                </h2>

                <ExpensePieChart

                    data={analytics}

                />

            </div>

            <br />

            <button

                className="primary-btn"

                onClick={() =>

                    navigate("/manager/approvals")

                }

            >

                View Approval Queue

            </button>

        </DashboardLayout>

    );

}