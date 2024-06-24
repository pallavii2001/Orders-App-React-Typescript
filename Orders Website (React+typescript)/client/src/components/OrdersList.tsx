import { useState, useEffect } from 'react';
import OrderTable from '@/components/OrderTable';
import OrderFilterForm from '@/components/Filter/Filter';
import OrderModal from '@/components/Modal/OrderModal';
import ApiResponse from '@/Utils/ApiResponse';
import { Order, Filters, PaymentStatus, FulfillmentStatus, SortBy, SortOrder } from '@/Utils/Type'; 

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openFulfillmentModal, setOpenFulfillmentModal] = useState(false);
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [newFulfillmentStatus, setNewFulfillmentStatus] = useState('');

  const fetchFilteredOrders = async (filters: Filters) => {
    setLoading(true);
    try {
      const response = await ApiResponse({
        method: 'GET',
        url: 'orders',
        params: filters,
      });
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchFilteredOrders({
      payment_status: PaymentStatus.EMPTY,
        fulfilment: FulfillmentStatus.EMPTY,
        start_date: '',
        end_date: '',
        sort_by: SortBy.EMPTY,
        sort_order: SortOrder.ASC,
    });
  }, []);

  const handlePaymentStatusUpdate = async () => {
    try {
      await ApiResponse({
        method: 'PUT',
        url: 'update',
        data: {
          id: selectedOrderId,
          payment_status: newPaymentStatus,
        }
      });
      setOpenPaymentModal(false);
      fetchFilteredOrders({
        payment_status: PaymentStatus.EMPTY,
        fulfilment: FulfillmentStatus.EMPTY,
        start_date: '',
        end_date: '',
        sort_by: SortBy.EMPTY,
        sort_order: SortOrder.ASC,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleFulfillmentUpdate = async () => {
    try {
      await ApiResponse({
        method: 'PUT',
        url: 'update',
        data: {
          id: selectedOrderId,
          fulfilment: newFulfillmentStatus,
        }
      });
      setOpenFulfillmentModal(false);
      fetchFilteredOrders({
        payment_status: PaymentStatus.EMPTY,
        fulfilment: FulfillmentStatus.EMPTY,
        start_date: '',
        end_date: '',
        sort_by: SortBy.EMPTY,
        sort_order: SortOrder.ASC,
      });
    } catch (error) {
      console.error('Error updating fulfillment status:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <OrderFilterForm fetchFilteredOrders={fetchFilteredOrders} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrderTable
          orders={orders}
          handlePaymentModalOpen={() => setOpenPaymentModal(true)}
          handleFulfillmentModalOpen={() => setOpenFulfillmentModal(true)}
          setSelectedOrderId={setSelectedOrderId}
        />
      )}

      <OrderModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        title="Update Payment Status"
        value={newPaymentStatus}
        onChange={(value: string) => setNewPaymentStatus(value)}
        options={["Success", "Pending"]}
        onUpdate={handlePaymentStatusUpdate}
      />

      <OrderModal
        open={openFulfillmentModal}
        onClose={() => setOpenFulfillmentModal(false)}
        title="Update Fulfillment Status"
        value={newFulfillmentStatus}
        onChange={(value: string) => setNewFulfillmentStatus(value)}
        options={["Fulfilled", "Unfulfilled"]}
        onUpdate={handleFulfillmentUpdate}
      />
    </div>
  );
};

export default OrdersList;
