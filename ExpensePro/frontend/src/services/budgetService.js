import api from "./api";

/**
 * Get Department Budget
 */
export const getBudget = async () => {

    try {

        const response = await api.get("/budget");

        return response.data;

    }

    catch (error) {

        console.error("Error fetching budget:", error);

        throw error;

    }

};


/**
 * Get Expense Analytics
 */
export const getBudgetAnalytics = async () => {

    try {

        const response = await api.get("/budget/analytics");

        return response.data;

    }

    catch (error) {

        console.error("Error fetching analytics:", error);

        throw error;

    }

};