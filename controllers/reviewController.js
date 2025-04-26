




import Review from '../models/Review.js';


export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const reviews = await Review.find({ bookId })
      .populate('userId', 'name')  
      .sort({ createdAt: -1 }); 

    res.json(reviews);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};


export const submitReview = async (req, res) => {
  try {
    const { comment, rating, bookId, userId } = req.body;

    if (!comment || !rating || !bookId || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const review = new Review({ comment, rating, bookId, userId });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);  
    res.status(400).json({ message: 'Failed to submit review', error });
  }
};
