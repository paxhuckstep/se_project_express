const Item = require("../models/clothingItem");
const { handleError } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then(() => {
      res.send({ message: "Item has been deleted" });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getItems = (req, res) => {
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
      handleError(err, res);
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
      handleError(err, res);
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
