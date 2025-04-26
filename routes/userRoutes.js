import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  createUser, 
  getAllUsers,
  checkEmailExistence
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); 
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);
router.get('/', getAllUsers); 
router.get('/email/:email', checkEmailExistence);



export default router;
