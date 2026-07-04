import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsedUser = JSON.parse(stored);
            setUser(parsedUser);

            if (parsedUser.role !== 'admin') {
                const interval = setInterval(async () => {
                    try {
                        const { data } = await API.get('/users/me');
                        setUser(data);
                        localStorage.setItem('user', JSON.stringify(data));
                    } catch (error) {
                        console.error("Real-time sync error");
                    }
                }, 2000); 

                return () => clearInterval(interval);
            }
        }
    }, []);

    const getStatusColor = (status) => {
        if (status === 'Accepted') return 'bg-green-500 text-white';
        if (status === 'Rejected') return 'bg-red-500 text-white';
        return 'bg-yellow-500 text-gray-900';
    };

    return (
        <div className="flex h-screen bg-brandLight dark:bg-brandDark transition-colors">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 border-b dark:border-gray-800 pb-4">
                    <h1 className="text-3xl font-black dark:text-white">User Dashboard</h1>
                </header>

                {user && user.role !== 'admin' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`p-8 rounded-3xl shadow-2xl flex flex-col justify-center transition-all duration-500 ${getStatusColor(user.applicationStatus)}`}>
                            <h2 className="text-2xl font-black mb-2">Application Status</h2>
                            <p className="text-5xl font-black">{user.applicationStatus || 'Pending'}</p>
                            <p className="mt-4 opacity-90 font-medium">
                                {user.applicationStatus === 'Accepted' ? 'Congratulations! Your application has been approved by EditLabMedia.' : 
                                 user.applicationStatus === 'Rejected' ? 'We regret to inform you that your application was not successful at this time.' : 
                                 'Your application is currently pending review by our team. This page updates automatically.'}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-brandCard p-8 rounded-3xl shadow-xl border dark:border-gray-800">
                            <div className="flex items-center gap-6 mb-6">
                                <img src={user.profileImage ? `http://localhost:5000/${user.profileImage.replace(/\\/g, '/')}` : 'https://via.placeholder.com/150'} className="w-24 h-24 rounded-3xl object-cover border-4 border-brandGreen" alt="Profile" />
                                <div>
                                    <h3 className="text-2xl font-bold dark:text-white">{user.firstName} {user.lastName}</h3>
                                    <p className="text-brandGreen font-bold">{user.jobTitle || 'Applicant'}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm italic">"{user.aboutMe || 'No summary provided.'}"</p>
                        </div>
                    </div>
                )}

                {user && user.role === 'admin' && (
                    <div className="bg-white dark:bg-brandCard p-8 rounded-3xl shadow-xl border dark:border-gray-800 text-center">
                        <h2 className="text-2xl font-black text-brandGreen mb-2">Welcome to Admin Panel</h2>
                        <p className="text-gray-500 dark:text-gray-400">Please navigate to "User Management" to review applications.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;