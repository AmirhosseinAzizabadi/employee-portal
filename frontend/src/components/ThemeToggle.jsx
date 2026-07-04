import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button 
            onClick={toggleTheme} 
            className="fixed top-6 right-6 z-[100] flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-brandCard shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none"
            title="Toggle Dark/Light Mode"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;