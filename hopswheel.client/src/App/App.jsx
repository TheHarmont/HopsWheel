import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import UserListPage from '../pages/UserListPage';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';

// Установка токена при запуске (если есть)
import axios from 'axios';
import authService from '../services/authService';

const token = localStorage.getItem('jwtToken');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/user"
                    element={
                        <PrivateRoute requiredRole="barmen">
                            <UserPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <PrivateRoute requiredRole="barmen">
                            <UserListPage />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
        </Router>
    );
};

export default App;