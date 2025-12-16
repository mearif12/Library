const MyBook = require("../../models/MyBook");

exports.addToMyBooks = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  const exists = await MyBook.findOne({ user: userId, book: bookId });
  if (exists) {
    return res.status(400).json({ message: "Already added" });
  }

  const myBook = await MyBook.create({
    user: userId,
    book: bookId
  });

  res.status(201).json(myBook);
};

exports.getMyBooks = async (req, res) => {
    const books = await MyBook.find({ user: req.user.id })
      .populate("book");
  
    res.json(books);
  };
  

exports.removeMyBook = async (req, res) => {
    await MyBook.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
};
  
