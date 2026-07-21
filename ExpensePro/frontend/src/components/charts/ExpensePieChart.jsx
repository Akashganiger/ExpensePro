import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts";

const COLORS = [

    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444"

];

export default function ExpensePieChart({

    data

}) {

    if (!data || data.length === 0)

        return <h3>No Expense Data</h3>;

    return (

        <div
            style={{
                width: "100%",
                height: 350
            }}
        >

            <ResponsiveContainer>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="amount"

                        nameKey="category"

                        outerRadius={120}

                        label

                    >

                        {

                            data.map(

                                (_, index) => (

                                    <Cell

                                        key={index}

                                        fill={

                                            COLORS[
                                                index % COLORS.length
                                            ]

                                        }

                                    />

                                )

                            )

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}