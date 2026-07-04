const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.phone = req.body.phone || user.phone;
            user.location = req.body.location || user.location;
            user.jobTitle = req.body.jobTitle || user.jobTitle;
            user.aboutMe = req.body.aboutMe || user.aboutMe;
            
            if (req.file) {
                user.profileImage = req.file.path;
            }

            const updatedUser = await user.save();
            res.json({ user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

module.exports = { getUsers, deleteUser, updateProfile };