import api from "./api";

/**
 * Get all pending expense approvals
 */
export const getPendingExpenses = async () => {

    try {

        const response = await api.get("/manager/approvals");

        return response.data;

    }

    catch (error) {

        console.error("Error fetching pending expenses:", error);

        throw error;

    }

};


/**
 * Approve or Reject an expense
 */
export const updateExpenseStatus = async (id, status) => {

    try {

        const response = await api.put(

            `/manager/approvals/${id}`,

            {
                status
            }

        );

        return response.data;

    }

    catch (error) {

        console.error("Error updating expense:", error);

        throw error;

    }

};


/**
 * Optional:
 * Get manager dashboard statistics
 */
export const getManagerStats = async () => {

    try {

        const response = await api.get("/manager/stats");

        return response.data;

    }

    catch (error) {

        console.error("Error fetching manager stats:", error);

        throw error;

    }

};