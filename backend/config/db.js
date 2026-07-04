const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connecting to the specific local database
        await mongoose.connect('mongodb://127.0.0.1:27017/amitdb');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;