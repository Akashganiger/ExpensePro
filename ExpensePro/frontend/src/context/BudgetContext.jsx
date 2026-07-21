import { createContext, useState, useEffect } from "react";
import {
    getBudget,
    getBudgetAnalytics
} from "../services/budgetService";

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {

    const [budget, setBudget] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadBudget() {

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

    useEffect(() => {

        loadBudget();

    }, []);

    return (

        <BudgetContext.Provider

            value={{

                budget,

                analytics,

                loading,

                refreshBudget: loadBudget

            }}

        >

            {children}

        </BudgetContext.Provider>

    );

}