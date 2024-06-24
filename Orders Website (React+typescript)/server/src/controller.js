const Order = require('./model');

async function getAllOrders(req, res) {
  try {
    let query = {};

    
    const paymentStatus = req.query.payment_status;
    if (paymentStatus) {
      query.payment_status = paymentStatus;
    }

    const fulfilment = req.query.fulfilment;
    if (fulfilment) {
      query.fulfilment = fulfilment;
    }

    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

  
    let sortQuery = {};
    const sortBy = req.query.sort_by; 
    const sortOrder = req.query.sort_order; 

    if (sortBy && sortOrder) {
  
      if (sortBy === 'total' || sortBy === 'items') {

        sortQuery[sortBy] = sortOrder === 'asc' ? 1 : -1;
      } else if (sortBy === 'payment_status') {
    
        sortQuery[sortBy] = sortOrder === 'asc' ? 1 : -1;
      }
    }

  
    const orders = await Order.find(query).sort(sortQuery);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getOrderById(req, res) {
    try {
      const orderId = req.params.id; 
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  async function updateOrder(req, res) {
    try {
      const { id, payment_status, fulfilment } = req.body; 
  
      
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      
      if (payment_status && payment_status !== order.payment_status) {
        order.payment_status = payment_status;
      }
  
     
      if (fulfilment && fulfilment !== order.fulfilment) {
        order.fulfilment = fulfilment;
      }
  
     
      await order.save();
  
      res.json({ message: 'Order status updated successfully', order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  


  

module.exports = { getAllOrders, getOrderById,updateOrder };
