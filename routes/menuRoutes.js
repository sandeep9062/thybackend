import express from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  reorderMenuItems,
} from '../controllers/menuController.js';
import { checkAdmin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/',protect,checkAdmin, createMenuItem);
router.put('/:id',protect,checkAdmin,  updateMenuItem);
router.delete('/:id',protect,checkAdmin,  deleteMenuItem);
router.put('/reorder/all',protect,checkAdmin,  reorderMenuItems);

export default router;
