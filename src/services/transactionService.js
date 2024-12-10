import {transactions} from "../../data/transactions.js";

export const GetTransactions = (accountId) =>{
    return transactions.filter(transaction => transaction.AccountId === accountId);
}

export const GetTransaction = (transactionId) =>{
    return transactions.find(transaction => transaction.TransactionId === transactionId);
}

