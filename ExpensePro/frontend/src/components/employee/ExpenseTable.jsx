import { useEffect,useState } from "react";

import ExpenseRow from "./ExpenseRow";

import {

getExpenses

}

from "../../services/expenseService";

export default function ExpenseTable(){

const[expenses,setExpenses]=useState([]);

useEffect(()=>{

loadExpenses();

},[]);

async function loadExpenses(){

try{

const data=await getExpenses();

setExpenses(data);

}

catch(err){

console.log(err);

}

}

return(

<table className="expense-table">

<thead>

<tr>

<th>Category</th>

<th>Amount</th>

<th>Description</th>

<th>Status</th>

<th>Date</th>

</tr>

</thead>

<tbody>

{

expenses.map(expense=>

<ExpenseRow

key={expense.id}

expense={expense}

/>

)

}

</tbody>

</table>

);

}