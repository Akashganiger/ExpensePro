import { useState } from "react";
import { submitExpense } from "../../services/expenseService";

export default function ExpenseModal({ close, reload }) {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("travel");
    const [description, setDescription] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        // Validation
        if (!amount || Number(amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (!description.trim()) {
            alert("Description cannot be empty.");
            return;
        }

        try {

            const response = await submitExpense({
                amount: Number(amount),
                category,
                description: description.trim()
            });

            if (response.budget_warning) {
                alert("⚠ Warning: Department budget has exceeded 90%.");
            } else {
                alert("Expense submitted successfully!");
            }

            // Reset form
            setAmount("");
            setCategory("travel");
            setDescription("");

            reload();
            close();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to submit expense."
            );
        }
    }

    return (

        <div className="modal">

            <form
                className="modal-content"
                onSubmit={handleSubmit}
            >

                <h2>Submit Expense</h2>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="travel">Travel</option>
                    <option value="meals">Meals</option>
                    <option value="software">Software</option>
                    <option value="hardware">Hardware</option>
                </select>

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    required
                />

                <div style={{ display: "flex", gap: "10px" }}>

                    <button type="submit">
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={close}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );
}