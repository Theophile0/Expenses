import {transactions} from "../../data/transactions.js";

export const GetTransactions = (accountId) =>{
    return transactions.filter(transaction => transaction.AccountId === accountId);

}