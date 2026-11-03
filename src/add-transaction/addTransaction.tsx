import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import './addTransaction.css'
import { AddTransactionProps, EXPENSE_CATEGORIES, INCOME_CATEGORIES, STORAGE_KEY, Transaction, TransactionType } from '../types'



const AddTransaction = ({transactions, setTransactions}: 
        AddTransactionProps) => {
    const [activeButton, setActiveButton] = useState<TransactionType>('expense');
    const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0])
    const [amountTrans, setAmountTrans] = useState<string>('')
    const [description, setDescription] = useState<string>('');
    // const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    }, [transactions])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const transaction: Transaction = {
            id: crypto.randomUUID(),
            type: activeButton, 
            amount: +amountTrans,
            description,
            category, 
            date: new Date().toISOString(),
        }
        console.log(transaction)
        setTransactions((prev) => [transaction, ...prev])
        setAmountTrans('');
        setDescription('');
    }

    const typeOfTransaction = useMemo<string[]>(() => {
        if (activeButton === 'expense') {
            return EXPENSE_CATEGORIES
        } else {
            return INCOME_CATEGORIES;
        }
    }, [activeButton])

    const activeClassname = (str:string):string => {
        if (activeButton === str) {
            return `active-${str}`
        } else {
            return ''
        }
    }
    console.log(localStorage.getItem(STORAGE_KEY))

    return (
        <div className='panel'>
            <form onSubmit={handleSubmit} className='form-transaction'>
                    <h2>Add transaction </h2>
                    <div className='category-button-group'>
                        <button type='button' onClick={() => {
                            setActiveButton('expense')}} className={`button ${activeClassname('expense')}`} >Expense</button>
                        <button type='button' onClick={() => setActiveButton('income')} className={`button ${activeClassname('income')}`}>Income</button>
                    </div>
                    <label className="field">
                        <span>Amount</span>
                        <input type='number' 
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                            value={amountTrans} 
                            onChange={(e) => setAmountTrans(e.target.value)}></input>
                    </label>
                    <label className="field">
                        <span>Description</span>
                        <input type='text' 
                            placeholder='Coffee, paycheck, rent...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}></input>
                    </label>
                    <label className="field">
                        <span>Category</span>
                        <select 
                            name="categories" 
                            id="category-select" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            {
                            typeOfTransaction.map((el:string, i:number) => {
                                return <option key={el + i} >{el}</option>
                            })}
                        </select>
                    </label>
                    <button type='submit' className='add-transaction'>Add {activeButton}</button>
            </form>
        </div>
    )
}

export default AddTransaction