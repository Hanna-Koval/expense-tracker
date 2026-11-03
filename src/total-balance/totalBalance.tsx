import { useState } from 'react'
import './totalBalance.css'

const TotalBalance = () => {
    const [balance, setBalance] = useState<number>(0);
    const [income, setIncome] = useState<number>(0);
    const [expanses, setExpances] = useState<number>(0);

    return (
        <div className=' balance-card-container panel'>
            <p className='balance-title'>Total balance</p>
            <p className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>EUR€{balance.toFixed(2)}</p>
            <hr className='break-style'/>
            <div className='details-money'>
                <div className='income-title'>
                    <span>Income</span>
                    <span className='income-amount'>EUR€{income.toFixed(2)}</span>
                </div>
                <div className='expanse-title'>
                    <span>Expanses</span>
                    <span className='expanse-amount'>EUR€{expanses.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default TotalBalance