
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  customer_id: { type: String, required: true },
  payment_status: { type: String, required: true },
  total: { type: Number, required: true },
  delivery: { type: String, required: true },
  items: { type: Number, required: true },
  fulfilment: { type: String, required: true },
  product_id: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
