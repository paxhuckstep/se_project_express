const router = require('express').Router();

const { createItem } = require('../controllers/clothingItem')

//CRUD

router.post('/', createItem )

module.exports = router;