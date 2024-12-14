const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  //Book.findAll();
  //TODO This sleep was added because fetch was not returning all books after post request, find a way to avoid sleep here
  //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //await sleep(100);
  Book.findAll()
    .then((books) => {
      console.log("get api :", books.length);
      res.json(books);
    })
    .catch((error) => res.status(500).json({ message: "Internal server error", error: error }));
};

exports.getBook = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).send({
        message: "Book not found!",
      });
    }

    res.status(201).json({
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.updateBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send({
      message: "Title , description cannot be empty!",
    });
  }
  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).send({
        message: "Book not found!",
      });
    } else {
      book.title = title;
      book.description = description;
      await book.save();

      res.status(201).json({
        message: "Book updated successfully",
        UpdatedBook: Book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.createBook = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send({
      message: "Title and description cannot be empty!",
    });
  }
  try {
    const newBook = await Book.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Book registered successfully",
      newBook: newBook,
    });
    console.log("Book controller - book created , ", newBook);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while registering the book",
    });
  }
};

exports.deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).send({
        message: "Book not found!",
      });
    }

    await book.destroy();

    res.status(201).json({
      message: "Book Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
