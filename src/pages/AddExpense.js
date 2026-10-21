import React, { useState } from 'react';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [date, setDate] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !amount || !category || !date) {
            setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
            return;
        }
        const numAmount = Number(amount);
        if (!Number.isInteger(numAmount) || numAmount < 1000 || numAmount > 100000000) {
            setErrorMsg('Số tiền phải từ 1.000 đến 100.000.000');
            return;
        }
        setErrorMsg('');
        onAdd({
            title,
            amount: numAmount,
            category,
            date
        });
    };

    return (
        <div>
            <h2>Thêm khoản chi mới</h2>
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Tên khoản chi</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Số tiền</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Danh mục</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Ngày chi</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
};

export default AddExpense;