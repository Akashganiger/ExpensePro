export default function BudgetAlert({
    percentage = 0,
    message
}) {

    if (percentage < 90)
        return null;

    return (

        <div className="budget-alert">

            <div className="budget-alert-icon">

                ⚠

            </div>

            <div>

                <h3>

                    Budget Warning

                </h3>

                <p>

                    {
                        message ||
                        `Department has used ${percentage}% of its monthly budget.`
                    }

                </p>

            </div>

        </div>

    );

}