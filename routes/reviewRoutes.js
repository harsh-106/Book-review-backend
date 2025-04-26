import express from 'express';
import {
  getReviewsByBook,
  submitReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getReviewsByBook); // ?bookId=xyz this use way
router.post('/', submitReview);

export default router;
