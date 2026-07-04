import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    let user = null;
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            user = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Error parsing user data");
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path 
            ? 'bg-brandGreen text-white shadow-lg shadow-green-500/30' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brandCard hover:text-brandGreen dark:hover:text-brandGreen transition-all duration-300';
    };

    // Determine the exact name to display based on the user's role
    const displayName = user?.role === 'admin' ? 'Admin' : (user?.firstName || 'User');

    return (
        <>
            {/* Floating Welcome Badge - Bottom Right */}
            {user && (
                <div className="fixed bottom-6 right-6 z-[100] bg-white dark:bg-brandCard px-6 py-3 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex items-center gap-3 animate-fadeIn">
                    <span className="text-2xl">👋</span>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide">
                        Welcome, <span className="text-brandGreen">{displayName}</span>
                    </p>
                </div>
            )}

            {/* Sidebar */}
            <div className="w-72 h-screen flex flex-col bg-white dark:bg-brandDark border-r border-gray-100 dark:border-gray-800 shadow-2xl transition-colors duration-300 z-50 relative">
                
                <div className="p-8 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brandGreen flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">EditLabMedia</h2>
                    </div>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
                    
                    <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${isActive('/dashboard')}`}>
                        <span className="text-lg">📊</span> Dashboard
                    </Link>
                    
                    {user?.role !== 'admin' && (
                        <Link to="/account" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${isActive('/account')}`}>
                            <span className="text-lg">👤</span> My Profile
                        </Link>
                    )}

                    {user?.role === 'admin' && (
                        <Link to="/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${isActive('/users')}`}>
                            <span className="text-lg">👥</span> User Management
                        </Link>
                    )}
                </nav>
                
                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm"
                    >
                        <span>🚪</span> Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;