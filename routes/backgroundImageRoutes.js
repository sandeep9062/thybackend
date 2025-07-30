// routes/backgroundImageRoutes.js
import express from 'express';
import upload from '../middlewares/multer.js';
import {
  addBackgroundImage,
  getBackgroundImages,
  updateBackgroundImage,
  deleteBackgroundImage,
  reorderBackgroundImages,
} from '../controllers/backgroundImageController.js';

const router = express.Router();

router.get('/', getBackgroundImages);
router.post('/', upload.single('image'), addBackgroundImage);
router.put('/:id', upload.single('image'), updateBackgroundImage);
router.delete('/:id', deleteBackgroundImage);
router.put('/reorder/all', reorderBackgroundImages);

export default router;
