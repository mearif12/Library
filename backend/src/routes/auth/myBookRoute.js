const router = require("express").Router();
const { addToMyBooks, getMyBooks, removeMyBook } = require("../../controllers/auth/myBookController");
const {authenticateJWT} = require("../../middlewares/authMiddleware");

router.post("/", authenticateJWT, addToMyBooks);
router.get("/", authenticateJWT, getMyBooks);
router.delete("/:id", authenticateJWT, removeMyBook);

module.exports = router;
