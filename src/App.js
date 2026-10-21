import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    axios.get("/data/expenses.json", { signal: controller.signal })
      .then(res => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const togglePaid = (id) => {
    setExpenses(expenses.map(item =>
      item.id === id ? { ...item, paid: !item.paid } : item
    ));
  };

  const addExpense = (newObj) => {
    const maxId = expenses.length > 0 ? Math.max(...expenses.map(i => i.id)) : 0;
    const itemToAdd = { ...newObj, id: maxId + 1, paid: false };
    setExpenses([...expenses, itemToAdd]);
    navigate("/expenses", { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="expenses" element={
          <ExpenseList
            expenses={expenses}
            loading={loading}
            error={error}
            onDelete={deleteExpense}
            onToggle={togglePaid}
          />
        } />
        <Route path="expenses/new" element={<AddExpense onAdd={addExpense} />} />
        <Route path="expenses/:id" element={<ExpenseDetail expenses={expenses} />} />
      </Route>
    </Routes>
  );
};

export default App;