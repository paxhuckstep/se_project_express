const Item = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner})
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from", e });
    });
};

const deleteItem = (req, res) => {

  const clothingItemId = req.params;
  Item.findByIdAndRemove(clothingItemId)
    .orFail()
    .then(() => {
      res.status();
    })
    .catch((err) => {
      console.error(err);
    });
};

const getItems = (req, res) => {
  console.log(req);
  console.log(req.body);

  Item.find({}).then((clothingItems) => {
    res.status(200).send(clothingItems);
  });
};

const likeItem = () => {
  clothimgItemId = req.params.itemId; // right?, how does .params work?
  userLiking = req.user._id; //where does req.user._id come from?
  Item.findByIdAndUpdate(clothingItemId, { $addToSet: {likes: userLiking } }, { new: true } )
    .orFail()
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
    });
};

const unlikeItem = () => {
  clothimgItemId = req.params;
  userUnliking = req.user._id;
  Item.findByIdandUpdate(clothingItemId, {$pull: {liked: userUnliking}}, {new: true})
    .orFail()
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { createItem, getItems, deleteItem, likeItem, unlikeItem };
