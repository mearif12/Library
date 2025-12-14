const express = require('express');
const router = express.Router();

const { authenticateJWT,authorizeRole } = require('../../middlewares/authMiddleware');
const { getAllBooks,getBookById,searchBook } = require('../../controllers/student/bookController');

router.get('/',authenticateJWT,authorizeRole('STUDENT'),getAllBooks);

router.get('/:id',authenticateJWT,authorizeRole('STUDENT'),getBookById);

router.get('/search/:sem',authenticateJWT,authorizeRole('STUDENT'),searchBook);

module.exports = router;