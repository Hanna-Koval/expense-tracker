import { Dispatch, SetStateAction, useState } from 'react'
import AddTransaction from '../add-transaction/addTransaction'
import TotalBalance from '../total-balance/totalBalance'
import TransactionsHistory from '../transactions-history/transactionsHistory'
import { STORAGE_KEY, Transaction } from '../types'
import './mainPage.css'

function loadTransactions(): Transaction[] {
        try {
            const rawData = localStorage.getItem(STORAGE_KEY);
            if (!rawData) return [];
            const parsedData = JSON.parse(rawData)
            return parsedData? parsedData: []
        } catch {
            return []
        }
    }

const MainPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions)
    return (
        <div className='main-container'>
            <div className='header-container'>
                <p className='header-title'>Personal finance</p>
                <p className='header-title2'>Expense tracker</p>
                <p className='header-description'>Record income and spending, tag categories, and watch your balance.</p>
            </div>
            <div className='body'>
                <TotalBalance />
                <div className='section grid'>
                    <AddTransaction transactions={transactions} setTransactions={setTransactions}/>
                    <TransactionsHistory transactions={transactions} setTransactions={setTransactions} />
                </div>
            </div> 
        </div>
    )
}

export default MainPage