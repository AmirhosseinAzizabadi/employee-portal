import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', country: '', phone: '', location: '', dob: '', gender: '', maritalStatus: '',
        jobTitle: '', aboutMe: '', careerObjective: '', jobHuntStatus: 'Active', expectedSalary: '', workModel: 'Hybrid',
        socialLinks: { linkedin: '', github: '', portfolio: '' },
        experience: [], education: [], projects: [],
        skills: [], languages: [], certificates: [], achievements: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [resume, setResume] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const savedDraft = localStorage.getItem('profileDraft');
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft);
                setFormData(prev => ({ ...prev, ...parsed }));
            } catch (e) { console.error("Draft error"); }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const draft = { ...formData };
            delete draft.password; 
            localStorage.setItem('profileDraft', JSON.stringify(draft));
        }, 1000);
        return () => clearTimeout(timer);
    }, [formData]);

    const handleArrayAdd = (field, emptyObject) => {
        setFormData({ ...formData, [field]: [...formData[field], emptyObject] });
    };

    const handleArrayChange = (field, index, key, value) => {
        const updatedArray = [...formData[field]];
        updatedArray[index][key] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleArrayRemove = (field, index) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
        if (!formData.phone || formData.phone.length < 8) return setError("Please enter a valid phone number.");
        
        setIsSubmitting(true);
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (['experience', 'education', 'projects', 'skills', 'languages', 'certificates', 'socialLinks'].includes(key)) {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        if (resume) data.append('resume', resume);
        if (profileImage) data.append('profileImage', profileImage);

        try {
            await API.post('/auth/register', data);
            localStorage.removeItem('profileDraft');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Check network or required fields.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full p-3 bg-gray-50 dark:bg-brandDark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl outline-none focus:border-brandGreen dark:focus:border-brandGreen transition-colors text-sm";
    const labelClasses = "block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider";

    return (
        <div className="min-h-screen py-10 bg-brandLight dark:bg-brandDark transition-colors duration-300 flex justify-center items-center px-4">
            <div className="w-full max-w-5xl bg-white dark:bg-brandCard p-8 rounded-3xl shadow-2xl border border-green-100 dark:border-gray-800">
                
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-brandGreen text-center mb-6">EditLabMedia Careers</h2>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                        <div className="bg-brandGreen h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                    </div>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400 font-bold">STEP {step} OF {totalSteps}</p>
                    <p className="text-center text-xs text-green-600 dark:text-green-400 mt-1">Draft auto-saves every second.</p>
                </div>
                
                {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-bold border border-red-200 dark:border-red-800">{error}</div>}

                <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                    
                    {/* STEP 1: Personal Info */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                            <div><label className={labelClasses}>First Name *</label><input type="text" required className={inputClasses} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} /></div>
                            <div><label className={labelClasses}>Last Name *</label><input type="text" required className={inputClasses} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} /></div>
                            <div><label className={labelClasses}>Email Address *</label><input type="email" required className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                            
                            <div>
                                <label className={labelClasses}>Password *</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} required className={inputClasses} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-brandGreen font-bold text-xs">{showPassword ? "HIDE" : "SHOW"}</button>
                                </div>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClasses}>Phone Number (Auto-Detects) *</label>
                                    <PhoneInput
                                        country={'us'}
                                        enableSearch={true}
                                        value={formData.phone}
                                        onChange={(phone, countryData) => {
                                            setFormData({ ...formData, phone: '+' + phone, country: countryData?.name || formData.country });
                                        }}
                                        containerClass="!w-full"
                                        inputClass="!w-full !p-3 !pl-12 !bg-gray-50 dark:!bg-brandDark !border !border-gray-200 dark:!border-gray-700 !text-gray-900 dark:!text-white !rounded-xl !outline-none focus:!border-brandGreen dark:focus:!border-brandGreen !transition-colors !text-sm !h-[50px]"
                                        buttonClass="!border-gray-200 dark:!border-gray-700 !bg-gray-100 dark:!bg-gray-800 !rounded-l-xl"
                                        dropdownClass="!bg-white dark:!bg-brandCard dark:!text-white dark:!border-gray-700"
                                        searchClass="!bg-gray-50 dark:!bg-brandDark !text-gray-900 dark:!text-white"
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Country *</label>
                                    <input type="text" required className={inputClasses} value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="Auto-filled from phone..." />
                                </div>
                            </div>

                            <div><label className={labelClasses}>Date of Birth *</label><input type="date" required className={inputClasses} value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} /></div>
                            <div><label className={labelClasses}>City / Location *</label><input type="text" required className={inputClasses} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                            
                            <div>
                                <label className={labelClasses}>Gender (Optional)</label>
                                <select className={inputClasses} value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                    <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Marital Status (Optional)</label>
                                <select className={inputClasses} value={formData.maritalStatus} onChange={e => setFormData({...formData, maritalStatus: e.target.value})}>
                                    <option value="">Select Status</option><option value="Single">Single</option><option value="Married">Married</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Professional Details */}
                    {step === 2 && (
                        <div className="space-y-5 animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div><label className={labelClasses}>Target Job Title *</label><input type="text" placeholder="e.g. Frontend Developer" required className={inputClasses} value={formData.jobTitle} onChange={e => setFormData({...formData, jobTitle: e.target.value})} /></div>
                                <div>
                                    <label className={labelClasses}>Expected Salary (Optional)</label>
                                    <input type="text" placeholder="e.g. $80,000 / year" className={inputClasses} value={formData.expectedSalary} onChange={e => setFormData({...formData, expectedSalary: e.target.value})} />
                                </div>
                            </div>
                            
                            <div><label className={labelClasses}>Professional Summary *</label><textarea rows="3" required className={`${inputClasses} resize-none`} value={formData.aboutMe} onChange={e => setFormData({...formData, aboutMe: e.target.value})} /></div>
                            <div><label className={labelClasses}>Career Objective (Optional)</label><textarea rows="2" className={`${inputClasses} resize-none`} value={formData.careerObjective} onChange={e => setFormData({...formData, careerObjective: e.target.value})} /></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div><label className={labelClasses}>LinkedIn URL</label><input type="url" className={inputClasses} value={formData.socialLinks.linkedin} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})} /></div>
                                <div><label className={labelClasses}>GitHub URL</label><input type="url" className={inputClasses} value={formData.socialLinks.github} onChange={e => setFormData({...formData, socialLinks: {...formData.socialLinks, github: e.target.value}})} /></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClasses}>Job Hunt Status</label>
                                    <select className={inputClasses} value={formData.jobHuntStatus} onChange={e => setFormData({...formData, jobHuntStatus: e.target.value})}>
                                        <option value="Active">Actively Looking</option><option value="Passive">Passive / Open to offers</option><option value="Not Looking">Not Looking</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>Preferred Work Model</label>
                                    <select className={inputClasses} value={formData.workModel} onChange={e => setFormData({...formData, workModel: e.target.value})}>
                                        <option value="Hybrid">Hybrid</option><option value="Remote">Remote</option><option value="On-site">On-site</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Experience & Education */}
                    {step === 3 && (
                        <div className="space-y-8 animate-fadeIn">
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className={`${labelClasses} mb-0`}>Work Experience</label>
                                    <button type="button" onClick={() => handleArrayAdd('experience', { company: '', title: '', startDate: '', endDate: '', type: 'Full-time' })} className="text-xs bg-brandGreen text-white px-3 py-1 rounded hover:bg-green-700">+ Add Job</button>
                                </div>
                                {formData.experience.map((exp, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-brandDark rounded-xl mb-3 border border-gray-200 dark:border-gray-700 relative">
                                        <button type="button" onClick={() => handleArrayRemove('experience', index)} className="absolute top-3 right-4 text-red-500 font-bold text-xs">X</button>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <input placeholder="Company Name" className={inputClasses} value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} />
                                            <input placeholder="Job Title" className={inputClasses} value={exp.title} onChange={e => handleArrayChange('experience', index, 'title', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-3 gap-3 mb-3">
                                            <input type="date" className={inputClasses} value={exp.startDate} onChange={e => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                                            <input type="date" className={inputClasses} value={exp.endDate} onChange={e => handleArrayChange('experience', index, 'endDate', e.target.value)} />
                                            <select className={inputClasses} value={exp.type} onChange={e => handleArrayChange('experience', index, 'type', e.target.value)}>
                                                <option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Freelance">Freelance</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-3">
                                    <label className={`${labelClasses} mb-0`}>Education</label>
                                    <button type="button" onClick={() => handleArrayAdd('education', { degree: '', field: '', university: '', year: '' })} className="text-xs bg-brandGreen text-white px-3 py-1 rounded hover:bg-green-700">+ Add Education</button>
                                </div>
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-brandDark rounded-xl mb-3 border border-gray-200 dark:border-gray-700 relative">
                                        <button type="button" onClick={() => handleArrayRemove('education', index)} className="absolute top-3 right-4 text-red-500 font-bold text-xs">X</button>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <input placeholder="Degree (e.g. BSc)" className={inputClasses} value={edu.degree} onChange={e => handleArrayChange('education', index, 'degree', e.target.value)} />
                                            <input placeholder="Field of Study" className={inputClasses} value={edu.field} onChange={e => handleArrayChange('education', index, 'field', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input placeholder="University Name" className={inputClasses} value={edu.university} onChange={e => handleArrayChange('education', index, 'university', e.target.value)} />
                                            <input placeholder="Graduation Year" type="number" className={inputClasses} value={edu.year} onChange={e => handleArrayChange('education', index, 'year', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Skills, Languages & Uploads */}
                    {step === 4 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className={`${labelClasses} mb-0`}>Top Skills</label>
                                        <button type="button" onClick={() => handleArrayAdd('skills', { name: '', level: 'Intermediate' })} className="text-[10px] bg-brandGreen text-white px-2 py-1 rounded hover:bg-green-700">+ Add Skill</button>
                                    </div>
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input placeholder="e.g. React.js" className={`${inputClasses} py-2`} value={skill.name} onChange={e => handleArrayChange('skills', index, 'name', e.target.value)} />
                                            <select className={`${inputClasses} py-2 w-1/2`} value={skill.level} onChange={e => handleArrayChange('skills', index, 'level', e.target.value)}>
                                                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Expert">Expert</option>
                                            </select>
                                            <button type="button" onClick={() => handleArrayRemove('skills', index)} className="text-red-500 font-bold px-2">X</button>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className={`${labelClasses} mb-0`}>Languages</label>
                                        <button type="button" onClick={() => handleArrayAdd('languages', { name: '', level: 'B2' })} className="text-[10px] bg-brandGreen text-white px-2 py-1 rounded hover:bg-green-700">+ Add Lang</button>
                                    </div>
                                    {formData.languages.map((lang, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input placeholder="e.g. English" className={`${inputClasses} py-2`} value={lang.name} onChange={e => handleArrayChange('languages', index, 'name', e.target.value)} />
                                            <select className={`${inputClasses} py-2 w-1/2`} value={lang.level} onChange={e => handleArrayChange('languages', index, 'level', e.target.value)}>
                                                <option value="A1/A2">A1/A2</option><option value="B1/B2">B1/B2</option><option value="C1/C2">C1/C2</option><option value="Native">Native</option>
                                            </select>
                                            <button type="button" onClick={() => handleArrayRemove('languages', index)} className="text-red-500 font-bold px-2">X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <label className={labelClasses}>Notable Achievements (Optional)</label>
                                <textarea rows="2" placeholder="Awards, special recognition..." className={`${inputClasses} resize-none`} value={formData.achievements} onChange={e => setFormData({...formData, achievements: e.target.value})} />
                            </div>

                            {/* UPLOAD SECTION (Profile Photo & Resume) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                                <div className="bg-gray-50 dark:bg-brandDark/50 p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center transition-colors">
                                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">PROFILE PHOTO (JPG/PNG)</p>
                                    <input type="file" accept="image/*" className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer" onChange={e => setProfileImage(e.target.files[0])} />
                                </div>

                                <div className="bg-green-50 dark:bg-brandDark/50 p-6 rounded-xl border-2 border-dashed border-green-200 dark:border-green-800 text-center transition-colors">
                                    <p className="text-sm font-bold text-brandGreen mb-3">UPLOAD RESUME (PDF) *</p>
                                    <input type="file" accept=".pdf" required={step === 4} className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brandGreen file:text-white hover:file:bg-green-700 cursor-pointer" onChange={e => setResume(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-8">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Back</button>
                        ) : <div></div>}
                        
                        {step < totalSteps ? (
                            <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-brandGreen text-white hover:bg-green-700 transition shadow-lg shadow-green-500/30">Next Step</button>
                        ) : (
                            <button type="submit" disabled={isSubmitting} className={`px-8 py-3 rounded-xl font-bold text-white transition shadow-lg shadow-green-500/30 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brandGreen hover:bg-green-700'}`}>
                                {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;