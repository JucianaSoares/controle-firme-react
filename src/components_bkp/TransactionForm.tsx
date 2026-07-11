import React, { useState } from 'react';
import { PlusCircle, ArrowUpCircle, ArrowDownCircle, Tag, DollarSign } from 'lucide-react';
import { TransactionType } from '../types/finance';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
  }) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      type,
      category,
    });

    // Limpa o formulário após o envio
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-emerald-600" />
        Nova Transação
      </h3>

      {/* Campo: Descrição */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Descrição</label>
        <input
          type="text"
          placeholder="Ex: Aluguel, Mercado, Frete"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Grid para Valor e Categoria */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Categoria
          </label>
          <input
            type="text"
            placeholder="Ex: Moradia, Alimentação"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Botões de Tipo: Entrada ou Saída */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
            type === 'income'
              ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ArrowUpCircle className={`w-4 h-4 ${type === 'income' ? 'text-emerald-600' : 'text-slate-400'}`} />
          Entrada
        </button>

        <button
          type="button"
          onClick={() => setType('outcome')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all ${
            type === 'outcome'
              ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ArrowDownCircle className={`w-4 h-4 ${type === 'outcome' ? 'text-rose-600' : 'text-slate-400'}`} />
          Saída
        </button>
      </div>

      {/* Botão de Enviar */}
      <button
        type="submit"
        className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-emerald-700 transition-colors shadow-sm mt-2"
      >
        Confirmar Lançamento
      </button>
    </form>
  );
}
