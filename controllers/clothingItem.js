const clothingItem = require('../models/clothingItem')

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const {name, weather, imageURL} = req.body;

  clothingItem.create({name, weather, imageURL}).then((item) =>{
    console.log(item);
    res.send({data:item})
  }).catch((e) => {
    res.status(500).send({message: 'Error from', e})
  })
};

const deleteItem (req, res) => {
  console.log(req);
  console.log(req.body);

  const clothingItemId = req.params;
  clothingItem.findById(clothingItemId).orFail().then((clothingItem) => {
    //delete clothing item from database
    res.status(//successful deletion #
      )
  }).catch((err) => {
    console.error(err)
  })


};

const getItems (req, res) => {
  console.log(req)
  console.log(req.body)

  clothingItem.find({}).then((clothingItems) => {
    res.status(200).send(clothingItems)
  })
}

const likeItem () => {
  clothimgItemId = req.params;
  clothingItem.findById(clothingItemId).orFail().then((clothingItem) => {
    //liking the card code
  }).catch((err) => {
    console.error(err);
  })
}

const unlikeItem () => {
  clothimgItemId = req.params;
  clothingItem.findById(clothingItemId).orFail().then((clothingItem) => {
    //unliking the card code
  }).catch((err) => {
    console.error(err);
  })
}



module.exports = { createItem, getItems, deleteItem }