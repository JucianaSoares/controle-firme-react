import { useState, useEffect } from 'react';
import { Transaction, FinancialSummary } from '../types/finance';

export function useFinance() {
  // Inicializa o estado com o que estiver salvo no localStorage ou uma lista vazia
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const localData = localStorage.getItem('@ControleFirme:transactions');
    return localData ? JSON.parse(localData) : [];
  });

  // Salva no localStorage sempre que a lista de transações mudar
  useEffect(() => {
    localStorage.setItem('@ControleFirme:transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Função para adicionar uma nova transação
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
id: String(Date.now()),
      date: new Date().toLocaleDateString('pt-BR'), // Guarda a data atual formatada
    };

    setTransactions((state) => [newTransaction, ...state]);
  };

  // Função para deletar uma transação
  const deleteTransaction = (id: string) => {
    setTransactions((state) => state.filter((item) => item.id !== id));
  };

  // Calcula o resumo de forma inteligente
  const summary = transactions.reduce<FinancialSummary>(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.balance += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.balance -= transaction.amount;
      }
      return acc;
    },
    { balance: 0, income: 0, outcome: 0 }
  );

  return {
    transactions,
    summary,
    addTransaction,
    deleteTransaction,
  };
}
