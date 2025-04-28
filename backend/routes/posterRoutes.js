import express from 'express';
import { uploadPoster ,getPostersByCategory } from '../controllers/posterController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.post('/upload', protect, adminOnly, upload.single('image'), uploadPoster);

router.get('/category/:category', getPostersByCategory);

export default router;
