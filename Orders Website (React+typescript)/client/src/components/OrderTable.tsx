import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import UpgradeSharpIcon from '@mui/icons-material/UpgradeSharp';
import { OrderTableProps } from '@/Utils/Type';


const OrderTable: React.FC<OrderTableProps> = ({ orders, handlePaymentModalOpen, handleFulfillmentModalOpen, setSelectedOrderId }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Fulfillment</TableCell>
            <TableCell>Product ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order._id}>
              <TableCell><Link to={`/myorder/${order._id}`}>{order.id}</Link></TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customer_id}</TableCell>
              <TableCell>{order.payment_status}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.delivery}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.fulfilment}</TableCell>
              <TableCell>{order.product_id}</TableCell>
              <TableCell>
                <IconButton onClick={() => {
                  setSelectedOrderId(order._id);
                  handlePaymentModalOpen(order._id);
                }}>
                  <PaidSharpIcon />
                </IconButton>
                <IconButton onClick={() => {
                  setSelectedOrderId(order._id);
                  handleFulfillmentModalOpen(order._id);
                }}>
                  <UpgradeSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OrderTable;









