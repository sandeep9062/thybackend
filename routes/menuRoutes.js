import express from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  reorderMenuItems,
} from '../controllers/menuController.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', createMenuItem);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);
router.put('/reorder/all', reorderMenuItems);

export default router;
