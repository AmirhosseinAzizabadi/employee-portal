const multer = require('multer');
const fs = require('fs');

// Define the upload directory path
const dir = './uploads';

// Check if the 'uploads' directory exists; if not, create it synchronously
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Configure storage settings for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder for uploaded files
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        // Create a unique filename using the current timestamp to prevent overwriting
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize Multer with the defined storage engine
const upload = multer({ storage: storage });

module.exports = upload;