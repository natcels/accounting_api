const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPG, WEBP, and GIF files are allowed.'));
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 512 * 1024, // 512KB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
