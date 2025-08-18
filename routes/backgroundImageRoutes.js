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
import { checkAdmin,protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBackgroundImages);
router.post('/',protect,checkAdmin,addBackgroundImage);
router.put('/:id',protect,checkAdmin,updateBackgroundImage);
router.delete('/:id',protect,checkAdmin,deleteBackgroundImage);
router.put('/reorder/all',protect,checkAdmin,reorderBackgroundImages);

export default router;
