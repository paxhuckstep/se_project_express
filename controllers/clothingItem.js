const Item = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "Error from", err });
    });
};

const deleteItem = (req, res) => {
  const clothingItemId = req.params.itemId;
  console.log(clothingItemId);
  Item.findByIdAndDelete(clothingItemId.itemId)
    .orFail()
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "invalidID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  console.log(req);
  console.log(req.body);

  Item.find({}).then((clothingItems) => {
    res.status(200).send(clothingItems);
  });
};

const likeItem = (req, res) => {
  clothingItemId = req.params.itemId; // right?, how does .params work?
  userLiking = req.user._id; //where does req.user._id come from?
  Item.findByIdAndUpdate(
    clothingItemId,
    { $addToSet: { likes: userLiking } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "invalidID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

const unlikeItem = (req, res) => {
  clothingItemId = req.params.itemId;
  userUnliking = req.user._id;
  Item.findByIdAndUpdate(
    clothingItemId,
    { $pull: { likes: userUnliking } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "invalidID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
