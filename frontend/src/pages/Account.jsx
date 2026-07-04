import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import API from '../services/api';

const Account = () => {
    const [userData, setUserData] = useState({
        firstName: '', lastName: '', phone: '', location: '', jobTitle: '', aboutMe: ''
    });
    
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('https://via.placeholder.com/150');
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await API.get('/users/me');
                setUserData(data);
                if (data.profileImage) {
                    setPreviewImage(`http://localhost:5000/${data.profileImage.replace(/\\/g, '/')}`);
                }
            } catch (error) {
                console.error("Error fetching data");
            }
        };
        fetchUser();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', userData.firstName);
            formData.append('lastName', userData.lastName);
            formData.append('phone', userData.phone);
            formData.append('location', userData.location);
            formData.append('jobTitle', userData.jobTitle);
            formData.append('aboutMe', userData.aboutMe);
            
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            const { data } = await API.put('/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            localStorage.setItem('user', JSON.stringify(data.user));
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile.");
        }
        setLoading(false);
    };

    const inputClasses = "w-full p-3 mt-1 bg-gray-50 dark:bg-brandDark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl outline-none focus:border-brandGreen dark:focus:border-brandGreen transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800";

    return (
        <div className="flex h-screen bg-brandLight dark:bg-brandDark transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-3xl mx-auto bg-white dark:bg-brandCard shadow-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-800 transition-colors">
                    
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Edit Profile</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Update your information and photo</p>
                        </div>
                        <button 
                            onClick={() => editMode ? handleSave() : setEditMode(true)}
                            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md ${editMode ? 'bg-brandGreen text-white hover:bg-green-700' : 'bg-gray-100 dark:bg-gray-800 text-brandGreen hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                        >
                            {loading ? "Saving..." : (editMode ? "Save Changes" : "Edit Profile")}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <img src={previewImage} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover border-4 border-brandGreen shadow-lg" />
                            {editMode && (
                                <label className="cursor-pointer bg-brandGreen text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition">
                                    Change Photo
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>

                        {/* Form Fields Section */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">First Name</label>
                                <input disabled={!editMode} className={inputClasses} value={userData.firstName || ''} onChange={e => setUserData({...userData, firstName: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Name</label>
                                <input disabled={!editMode} className={inputClasses} value={userData.lastName || ''} onChange={e => setUserData({...userData, lastName: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</label>
                                <input disabled={!editMode} className={inputClasses} value={userData.jobTitle || ''} onChange={e => setUserData({...userData, jobTitle: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</label>
                                <input disabled={!editMode} className={inputClasses} value={userData.phone || ''} onChange={e => setUserData({...userData, phone: e.target.value})} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</label>
                                <input disabled={!editMode} className={inputClasses} value={userData.location || ''} onChange={e => setUserData({...userData, location: e.target.value})} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bio / About Me</label>
                                <textarea disabled={!editMode} rows="3" className={`${inputClasses} resize-none`} value={userData.aboutMe || ''} onChange={e => setUserData({...userData, aboutMe: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;