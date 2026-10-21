import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="filter-bar" style={{ marginBottom: '15px' }}>
            <div>
                <label htmlFor="search">Tìm kiếm</label>
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập tên khoản chi..."
                />
            </div>
            <div>
                <label htmlFor="filter-category">Danh mục</label>
                <select
                    id="filter-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="Tất cả">Tất cả</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;