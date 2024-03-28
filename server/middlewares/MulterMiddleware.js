const multer = require("multer");
const path = require("path");
const fs = require('fs');

const uploadPath = path.join(__dirname, '../public', 'uploads');

fs.access(uploadPath, fs.constants.F_OK, (err) => {
    if (err) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                console.error('خطأ في إنشاء المجلد:', err);
            } else {
                console.log('تم إنشاء المجلد بنجاح.');
            }
        });
    } else {
        console.log('المجلد موجود بالفعل.');
    }
});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadMiddleware = multer({ 
    storage: storage, 
    fileFilter });

module.exports = uploadMiddleware;