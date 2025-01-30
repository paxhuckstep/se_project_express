const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/constants");
const { createUser, login } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", userRouter);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
