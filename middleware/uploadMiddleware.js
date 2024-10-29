const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profile_pics'); // Define the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); // Set unique file name
    }
});

// File filter to allow only PNG and JPG
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only .png and .jpg files are allowed'));
    }
};

// Upload middleware configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } // Limit the file size to 1MB
});

module.exports = upload;
