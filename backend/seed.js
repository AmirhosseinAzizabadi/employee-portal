const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amitdb');
        
        await User.deleteMany({});
        
        const salt = await bcrypt.genSalt(10);
        // Password is 'admin'
        const hashedPassword = await bcrypt.hash('admin', salt);

        await User.create({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin', // Username is 'admin'
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Database reset and Admin created (User: admin, Pass: admin)');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedAdmin();