export default function BudgetProgress({

    spent,

    limit

}) {

    const percentage = limit
        ? Math.round((spent / limit) * 100)
        : 0;

    let color = "#22c55e";

    if (percentage >= 90)
        color = "#ef4444";

    else if (percentage >= 75)
        color = "#f59e0b";

    return (

        <div className="budget-progress">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px"
                }}
            >
                <strong>Budget Utilization</strong>

                <span>{percentage}%</span>

            </div>

            <div
                style={{
                    width: "100%",
                    height: "18px",
                    background: "#ddd",
                    borderRadius: "10px",
                    overflow: "hidden"
                }}
            >

                <div
                    style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: color,
                        transition: "0.4s"
                    }}
                />

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px"
                }}
            >

                <span>

                    ₹{spent.toLocaleString()}

                </span>

                <span>

                    ₹{limit.toLocaleString()}

                </span>

            </div>

        </div>

    );

}