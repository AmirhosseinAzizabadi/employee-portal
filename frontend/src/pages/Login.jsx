import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-brandLight dark:bg-brandDark transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-brandCard p-8 rounded-2xl shadow-xl border border-green-100 dark:border-gray-800 transition-colors duration-300">
                <h2 className="text-3xl font-black text-center text-brandGreen mb-6">EditLabMedia</h2>
                
                {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-center text-sm font-bold border border-red-200 dark:border-red-800">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username or Email</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-brandDark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brandGreen dark:focus:border-brandGreen transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-brandDark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brandGreen dark:focus:border-brandGreen transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-brandGreen font-bold text-xs focus:outline-none"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-brandGreen text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300 shadow-md">
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link to="/register" className="text-brandGreen hover:underline font-bold">Apply Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;