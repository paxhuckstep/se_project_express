const Item = require("../models/clothingItem");
const { FORBIDDEN } = require("../utils/constants");
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
  return Item.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .send({ message: "Cannot delete other user's items" });
      }
      return Item.deleteOne(item)
        .then(() => {
          return res.send({ message: "Item has been deleted" });
        })
        .catch((err) => {
          handleError(err, res);
        });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getItems = (req, res) => {
  Item.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const likeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
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
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
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
