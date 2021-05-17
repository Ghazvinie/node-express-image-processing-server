const { Router } = require('express');
const multer = require('multer');
const { request } = require('../app');

const router = Router();

const storage = multer.diskStorage({ destination: 'api/uploads/', filename: filename });

function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'));
    } else {
        callback(null, true);
    }
}

function filename(request, file, callback) {
    callback(null, file.originalname);
}

const upload = multer({ key: fileFilter, storage: storage });

router.post('/upload', upload.single('photo'), (req, res) => {
    if (request.fileValidationError) {
        res.status(400).json({ error: req.fileValidationError });
    } else {
        res.status(201).json({ success: true });
    }
});


module.exports = router;

