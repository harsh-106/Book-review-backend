import Book from '../models/Book.js';


export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 100;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const count = await Book.countDocuments();

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({book});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create book', error });
  }
};
