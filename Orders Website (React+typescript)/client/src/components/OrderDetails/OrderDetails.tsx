import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiResponse from '@/Utils/ApiResponse';
import { Order } from '@/Utils/Type';

import './OrderDetails.css'; 

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>(); 
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await ApiResponse({
          method: 'GET',
          url: `myorder/${id}`
        });
        setOrder(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="order-details-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={`order-details-box ${order?.payment_status === 'Success' ? 'success' : 'pending'}`}>
          <h2>Order Details</h2>
          <p><b>Order ID:</b> {order?.id}</p>
          <p><b>Date:</b> {order?.date}</p>
          <p><b>Customer ID:</b> {order?.customer_id}</p>
          <p><b>Payment Status: </b>{order?.payment_status}</p>
          <p><b>Total:</b> {order?.total}</p>
          <p><b>Delivery:</b> {order?.delivery}</p>
          <p><b>Items:</b> {order?.items}</p>
          <p><b>Fulfillment: </b>{order?.fulfilment}</p>
          <p><b>Product ID:</b> {order?.product_id}</p>
          
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
