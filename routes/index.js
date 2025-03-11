const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateLoginAttempt,
  validateNewUserData,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/not-found-error");

router.post("/signin", validateLoginAttempt, login);
router.post("/signup", validateNewUserData, createUser);
router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
  return next(new NotFoundError("Router not found"));
});

module.exports = router;
