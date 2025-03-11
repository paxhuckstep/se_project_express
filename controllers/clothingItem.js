const ForbiddenError = require("../errors/forbidden-error");
const Item = require("../models/clothingItem");
const { handleError } = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

const deleteItem = (req, res, next) => {
  return Item.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Cannot delete other user's items"))
      }
      return Item.deleteOne(item)
        .then(() => {
          return res.send({ message: "Item has been deleted" });
        })
        .catch(next);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getItems = (req, res, next) => {
  Item.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

const likeItem = (req, res, next) => {
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
      handleError(err, res, next);
    });
};

const unlikeItem = (req, res, next) => {
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
      handleError(err, res, next);
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
