import  { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

// interface TransactionInput {
//    title: string;
//    amount: number;
//    type: string;
//    category: string;
//}

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;


interface TransactioNProviderProps{
    children: ReactNode; // Any content valid
}

interface TransactionContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData // force
);

export function TransactionProvider({children} : TransactioNProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions, 
            transaction,

            // immutability concept
        ]);
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionContext);

    return context;
}