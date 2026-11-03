import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  STORAGE_KEY,
  Transaction,
  TransactionType,
} from './types';
import MainPage from './main-page/mainPage';

function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Transaction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const categories =
      type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setCategory((prev) =>
      (categories as readonly string[]).includes(prev) ? prev : categories[0]
    );
  }, [type]);

  const { balance, totalIncome, totalExpense } = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const t of transactions) {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    }
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactions]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const parsed = parseFloat(amount);
    if (!amount.trim() || Number.isNaN(parsed) || parsed <= 0) {
      setFormError('Enter a valid amount greater than zero.');
      return;
    }
    if (!description.trim()) {
      setFormError('Add a short description.');
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: parsed,
      description: description.trim(),
      category,
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [transaction, ...prev]);
    setAmount('');
    setDescription('');
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const categories =
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="app">
      <div className="shell">
        <MainPage />
        <section className="balance-card" aria-label="Balance summary">
          <div className="balance-main">
            <span className="balance-label">Total balance</span>
            <span
              className={`balance-value ${balance >= 0 ? 'positive' : 'negative'}`}
            >
              {formatMoney(balance)}
            </span>
          </div>
          <div className="balance-split">
            <div className="split-item income">
              <span>Income</span>
              <strong>{formatMoney(totalIncome)}</strong>
            </div>
            <div className="split-item expense">
              <span>Expenses</span>
              <strong>{formatMoney(totalExpense)}</strong>
            </div>
          </div>
        </section>

        <div className="grid">
          <section className="panel form-panel">
            <h2>Add transaction</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="type-toggle" role="group" aria-label="Transaction type">
                <button
                  type="button"
                  className={type === 'expense' ? 'active expense' : ''}
                  onClick={() => setType('expense')}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={type === 'income' ? 'active income' : ''}
                  onClick={() => setType('income')}
                >
                  Income
                </button>
              </div>

              <label className="field">
                <span>Amount</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Coffee, paycheck, rent…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>

              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className="submit-btn">
                Add {type === 'income' ? 'income' : 'expense'}
              </button>
            </form>
          </section>

          <section className="panel list-panel">
            <div className="list-header">
              <h2>Transactions</h2>
              <span className="count">{transactions.length} total</span>
            </div>

            {sortedTransactions.length === 0 ? (
              <p className="empty-state">
                No transactions yet. Add your first income or expense on the
                left.
              </p>
            ) : (
              <ul className="transaction-list">
                {sortedTransactions.map((t) => (
                  <li key={t.id} className={`transaction ${t.type}`}>
                    <div className="transaction-info">
                      <span className="transaction-desc">{t.description}</span>
                      <span className="transaction-meta">
                        {t.category} · {formatDate(t.date)}
                      </span>
                    </div>
                    <div className="transaction-actions">
                      <span className="transaction-amount">
                        {t.type === 'income' ? '+' : '−'}
                        {formatMoney(t.amount)}
                      </span>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeTransaction(t.id)}
                        aria-label={`Remove ${t.description}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
