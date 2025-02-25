const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateUpdateUserData } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", validateUpdateUserData, auth, updateUser);

module.exports = router;
