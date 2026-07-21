import api from "./api";

export async function getExpenses(){

const response=await api.get(

"/expenses/history"

);

return response.data;

}

export async function submitExpense(expense){

const response=await api.post(

"/expenses/submit",

expense

);

return response.data;

}