const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads")
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