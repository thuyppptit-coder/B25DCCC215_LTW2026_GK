import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ expense, onDelete, onToggle }) => {
    const { id, title, amount, category, date, paid } = expense;

    return (
        <tr>
            <td>
                <Link to={`/expenses/${id}`}>{title}</Link>
            </td>
            <td>{formatMoney(amount)}</td>
            <td className="col-category">{category}</td>
            <td className="col-date">{date}</td>
            <td>
                <span style={{ color: paid ? 'inherit' : 'orange', fontWeight: 'bold' }}>
                    {paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
            </td>
            <td>
                <button onClick={() => onToggle(id)}>
                    {paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
                </button>
                <button onClick={() => onDelete(id)}>Xóa</button>
            </td>
        </tr>
    );
};

export default ExpenseRow;