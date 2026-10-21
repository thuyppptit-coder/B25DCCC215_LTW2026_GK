import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses = [], loading, error }) => {
    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Không tải được dữ liệu</div>;

    const totalCount = expenses.length;

    const totalPaidAmount = expenses
        .filter(item => item.paid)
        .reduce((sum, item) => sum + item.amount, 0);

    const totalUnpaidAmount = expenses
        .filter(item => !item.paid)
        .reduce((sum, item) => sum + item.amount, 0);

    return (
        <div>
            <h2>Chi tiêu cá nhân</h2>
            <p>Tổng số khoản chi: {totalCount}</p>
            <p>Tổng số tiền đã chi: {formatMoney(totalPaidAmount)}</p>
            <p>Tổng số tiền chưa thanh toán: {formatMoney(totalUnpaidAmount)}</p>
        </div>
    );
};

export default Home;