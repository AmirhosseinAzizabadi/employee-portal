const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    location: { type: String, default: '' },
    dob: { type: String, default: '' },
    gender: { type: String, default: '' },
    maritalStatus: { type: String, default: '' },
    
    profileImage: { type: String, default: '' },
    applicationStatus: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },

    jobTitle: { type: String, default: '' },
    aboutMe: { type: String, default: '' },
    careerObjective: { type: String, default: '' },
    experience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    certificates: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    languages: { type: Array, default: [] },
    achievements: { type: String, default: '' },
    socialLinks: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        portfolio: { type: String, default: '' }
    },
    resumeUrl: { type: String, default: '' }, 
    jobHuntStatus: { type: String, enum: ['Active', 'Passive', 'Not Looking'], default: 'Active' },
    expectedSalary: { type: String, default: '' },
    workModel: { type: String, enum: ['On-site', 'Remote', 'Hybrid'], default: 'Hybrid' },
    lastLogin: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);