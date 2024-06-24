const express = require('express');
const {getAllOrders, getOrderById, updateOrder} = require('./controller');
const router = express.Router();

router.get('/orders', getAllOrders);
router.get('/myorder/:id',getOrderById);
router.put('/update',updateOrder)
module.exports = router;