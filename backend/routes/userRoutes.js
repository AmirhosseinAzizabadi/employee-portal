const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, updateProfile } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

router.route('/')
    .get(protect, adminOnly, getUsers);

router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

router.put('/profile', protect, upload.single('profileImage'), updateProfile);

router.route('/:id')
    .delete(protect, adminOnly, deleteUser);

router.put('/:id/status', protect, adminOnly, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { applicationStatus: req.body.status }, 
            { new: true }
        );

        let subject = '';
        let message = '';

        if (req.body.status === 'Accepted') {
            subject = 'EditLabMedia - Application Accepted! 🎉';
            message = `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #059669;">Congratulations!</h2>
                    <p>Dear <strong>${user.firstName}</strong>,</p>
                    <p>We are thrilled to inform you that your application for the <strong>${user.jobTitle}</strong> position has been <strong>Accepted</strong>!</p>
                    <p>We were very impressed with your background, skills, and the portfolio you shared. One of our team members will be contacting you shortly via phone or email to discuss the next steps, including interview scheduling and further details.</p>
                    <p>Welcome to the next stage of the process!</p>
                    <br/>
                    <p>Best regards,</p>
                    <p><strong>The EditLabMedia Team</strong></p>
                </div>
            `;
        } else if (req.body.status === 'Rejected') {
            subject = 'EditLabMedia - Application Update';
            message = `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #dc2626;">Application Update</h2>
                    <p>Dear <strong>${user.firstName}</strong>,</p>
                    <p>Thank you very much for taking the time to apply for the <strong>${user.jobTitle}</strong> position at EditLabMedia, and for sharing your background with us.</p>
                    <p>After careful consideration of your profile and our current requirements, we regret to inform you that we will not be moving forward with your application at this time.</p>
                    <p>This was a difficult decision, as we received many strong applications. We truly appreciate your interest in joining our team and wish you the absolute best in your future career endeavors.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p><strong>The EditLabMedia Team</strong></p>
                </div>
            `;
        }

        if (subject && message) {
            try {
                await sendEmail({ email: user.email, subject, message });
            } catch (emailError) {
                console.error("Status email could not be sent", emailError);
            }
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating status' });
    }
});

module.exports = router;