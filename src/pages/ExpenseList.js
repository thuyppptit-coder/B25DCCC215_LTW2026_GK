import React from 'react';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, loading, error, onDelete, onToggle }) => {
    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Không tải được dữ liệu</div>;

    return (
        <div>
            <h2>Danh sách khoản chi</h2>
            <ExpenseTable
                expenses={expenses}
                onDelete={onDelete}
                onToggle={onToggle}
            />
        </div>
    );
};

export default ExpenseList;