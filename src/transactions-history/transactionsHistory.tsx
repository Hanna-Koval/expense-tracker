import { useMemo } from 'react'
import './transactionsHistory.css'
import { AddTransactionProps } from '../types';

const TransactionsHistory = ({transactions, setTransactions}: AddTransactionProps) => {

  const sortedTransactions = useMemo(
      () => 
        [...transactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      [transactions]
    );

  console.log(sortedTransactions)

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((el) => el.id !== id))
  }


    return (
        <div className='panel'>
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
                        {t.category} · {(t.date)}
                      </span>
                    </div>
                    <div className="transaction-actions">
                      <span className="transaction-amount">
                        {t.type === 'income' ? '+' : '−'}
                        {(t.amount)}
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
        </div>
    )
}

export default TransactionsHistory