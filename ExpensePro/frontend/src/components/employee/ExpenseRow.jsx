export default function ExpenseRow({

expense

}){

return(

<tr>

<td>{expense.category}</td>

<td>₹{expense.amount}</td>

<td>{expense.description}</td>

<td>{expense.status}</td>

<td>

{new Date(expense.created_at)

.toLocaleDateString()}

</td>

</tr>

);

}