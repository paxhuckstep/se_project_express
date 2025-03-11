const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const { validateCardBody, validateItemId } = require("../middlewares/validation");

router.get("/", getItems);
router.post("/", validateCardBody, auth, createItem);
router.delete("/:itemId", validateItemId, auth, deleteItem);
router.put("/:itemId/likes", validateItemId ,auth, likeItem);
router.delete("/:itemId/likes", validateItemId, auth, unlikeItem);

module.exports = router;
