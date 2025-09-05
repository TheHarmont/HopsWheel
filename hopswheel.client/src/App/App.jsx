import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage';
import WheelPage from '../pages/WheelPage';
import UserPage from '../pages/UserPage';
import UserListPage from '../pages/UserListPage';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';

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
                            <WheelPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/user"
                    element={
                        <PrivateRoute requiredRole={["admin","barmen"]}>
                            <UserPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <PrivateRoute requiredRole="admin">
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