import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/users');
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/users/${id}/status`, { status });
            alert(`Application ${status}!`);
            fetchUsers(); 
        } catch (error) { 
            alert("Action failed."); 
        }
    };

    const getFileUrl = (path) => path ? `http://localhost:5000/${path.replace(/\\/g, '/')}` : null;

    return (
        <div className="flex h-screen bg-brandLight dark:bg-brandDark transition-colors">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto relative">
                <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin Control Center</h1>
                    <p className="text-gray-500">Analyze every detail and manage applications.</p>
                </header>

                {loading ? <p className="text-brandGreen font-bold">Connecting to database...</p> : (
                    <div className="space-y-8">
                        {users.map((u) => (
                            <div key={u._id} className="bg-white dark:bg-brandCard rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all">
                                
                                {/* Header (Status & Actions) */}
                                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-4">
                                        <img src={getFileUrl(u.profileImage) || 'https://via.placeholder.com/150'} className="w-16 h-16 rounded-2xl object-cover border-2 border-brandGreen" alt="Profile" />
                                        <div>
                                            <h2 className="text-xl font-bold dark:text-white">{u.firstName} {u.lastName}</h2>
                                            <span className={`text-[10px] uppercase px-2 py-1 rounded-full font-bold ${u.applicationStatus === 'Accepted' ? 'bg-green-100 text-green-700' : u.applicationStatus === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                Status: {u.applicationStatus || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button onClick={() => updateStatus(u._id, 'Accepted')} className="bg-brandGreen text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition">Accept Applicant</button>
                                        <button onClick={() => updateStatus(u._id, 'Rejected')} className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition">Reject</button>
                                    </div>
                                </div>

                                {/* Detailed Data Grid */}
                                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                                    
                                    {/* 1. Basic & Contact */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-brandGreen uppercase border-b border-gray-100 dark:border-gray-700 pb-1">1. Contact & Demographics</h4>
                                        <p className="text-xs dark:text-gray-300"><b>Email:</b> {u.email}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Phone:</b> {u.phone}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Location:</b> {u.location}, {u.country}</p>
                                        <p className="text-xs dark:text-gray-300"><b>DOB:</b> {u.dob || 'N/A'}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Gender:</b> {u.gender || 'N/A'}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Marital:</b> {u.maritalStatus || 'N/A'}</p>
                                        <div className="mt-2 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-100 dark:border-yellow-800 break-words">
                                            <p className="text-[10px] text-yellow-800 dark:text-yellow-500"><b>Encrypted Password:</b> <br/>{u.password}</p>
                                        </div>
                                    </div>

                                    {/* 2. Professional Identity */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-brandGreen uppercase border-b border-gray-100 dark:border-gray-700 pb-1">2. Professional Goal</h4>
                                        <p className="text-xs dark:text-gray-300"><b>Role:</b> {u.jobTitle}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Salary Req:</b> {u.expectedSalary || 'N/A'}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Work Model:</b> {u.workModel || 'N/A'}</p>
                                        <p className="text-xs dark:text-gray-300"><b>Status:</b> {u.jobHuntStatus || 'N/A'}</p>
                                        <p className="text-xs dark:text-gray-300 mt-2"><b>Bio:</b> {u.aboutMe}</p>
                                        {u.careerObjective && <p className="text-xs dark:text-gray-300"><b>Objective:</b> {u.careerObjective}</p>}
                                        {u.achievements && <p className="text-xs dark:text-gray-300"><b>Achievements:</b> {u.achievements}</p>}
                                    </div>

                                    {/* 3. Experience & Education */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-brandGreen uppercase border-b border-gray-100 dark:border-gray-700 pb-1">3. Background</h4>
                                        
                                        <div>
                                            <p className="text-xs font-bold dark:text-gray-300 mb-1">Work Experience:</p>
                                            {u.experience && u.experience.length > 0 ? u.experience.map((exp, i) => (
                                                <div key={i} className="text-[10px] bg-gray-50 dark:bg-gray-800 p-2 rounded mb-1 dark:text-gray-300">
                                                    <b>{exp.title}</b> at {exp.company} <br/> ({exp.startDate} to {exp.endDate}) - {exp.type}
                                                </div>
                                            )) : <p className="text-[10px] text-gray-400">None provided</p>}
                                        </div>

                                        <div className="mt-3">
                                            <p className="text-xs font-bold dark:text-gray-300 mb-1">Education:</p>
                                            {u.education && u.education.length > 0 ? u.education.map((edu, i) => (
                                                <div key={i} className="text-[10px] bg-gray-50 dark:bg-gray-800 p-2 rounded mb-1 dark:text-gray-300">
                                                    <b>{edu.degree} in {edu.field}</b> <br/> {edu.university} ({edu.year})
                                                </div>
                                            )) : <p className="text-[10px] text-gray-400">None provided</p>}
                                        </div>
                                    </div>

                                    {/* 4. Skills, Languages & Files */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black text-brandGreen uppercase border-b border-gray-100 dark:border-gray-700 pb-1">4. Skills & Assets</h4>
                                        
                                        <div>
                                            <p className="text-[10px] font-bold dark:text-gray-400">Skills:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {u.skills && u.skills.length > 0 ? u.skills.map((s, i) => (
                                                    <span key={i} className="text-[9px] bg-brandGreen/10 text-brandGreen px-2 py-0.5 rounded font-bold border border-brandGreen/20">{s.name} ({s.level})</span>
                                                )) : <span className="text-[10px] text-gray-400">None provided</span>}
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <p className="text-[10px] font-bold dark:text-gray-400">Languages:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {u.languages && u.languages.length > 0 ? u.languages.map((l, i) => (
                                                    <span key={i} className="text-[9px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-bold">{l.name} ({l.level})</span>
                                                )) : <span className="text-[10px] text-gray-400">None provided</span>}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            {u.resumeUrl ? (
                                                <a href={getFileUrl(u.resumeUrl)} target="_blank" rel="noopener noreferrer" className="text-center bg-gray-900 dark:bg-gray-700 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-black transition">
                                                    📄 DOWNLOAD RESUME
                                                </a>
                                            ) : <p className="text-[10px] text-red-500 italic text-center">No Resume File</p>}
                                            
                                            <div className="flex justify-center gap-3 mt-1">
                                                {u.socialLinks?.linkedin && <a href={u.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline">LinkedIn</a>}
                                                {u.socialLinks?.github && <a href={u.socialLinks.github} target="_blank" rel="noreferrer" className="text-[11px] text-gray-700 dark:text-gray-300 font-bold hover:underline">GitHub</a>}
                                                {u.socialLinks?.portfolio && <a href={u.socialLinks.portfolio} target="_blank" rel="noreferrer" className="text-[11px] text-purple-600 dark:text-purple-400 font-bold hover:underline">Portfolio</a>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;