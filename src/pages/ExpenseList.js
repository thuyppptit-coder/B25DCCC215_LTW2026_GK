import React, { useState, useEffect } from 'react';
import ExpenseTable from '../components/ExpenseTable';
import FilterBar from '../components/FilterBar';

const ExpenseList = ({ expenses = [], loading, error, onDelete, onToggle }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width < 768;

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Không tải được dữ liệu</div>;

    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    const filteredExpenses = safeExpenses.filter(item => {
        const matchTitle = item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const matchCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
        return matchTitle && matchCategory;
    });

    return (
        <div>
            <h2>Danh sách khoản chi</h2>
            <p>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</p>

            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <p>Tìm thấy {filteredExpenses.length} khoản chi</p>

            {filteredExpenses.length === 0 ? (
                <p>Không có dữ liệu</p>
            ) : (
                <div className={`table-wrap ${isMobile ? 'mobile' : ''}`}>
                    <ExpenseTable
                        expenses={filteredExpenses}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                </div>
            )}
        </div>
    );
};

export default ExpenseList;