import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { OrderFilterFormProps, Filters, PaymentStatus, FulfillmentStatus, SortBy, SortOrder } from '@/Utils/Type'; 

import './Filter.css';


const OrderFilterForm: React.FC<OrderFilterFormProps> = ({
  fetchFilteredOrders,
}) => {
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus>(PaymentStatus.EMPTY); 
  const [fulfillmentFilter, setFulfillmentFilter] = useState<FulfillmentStatus>(FulfillmentStatus.EMPTY); 
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.EMPTY); 
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC); 

  
  const handleSortByChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(e.target.value as SortBy);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortOrder(e.target.value as SortOrder);
  };

  const applyFilters = () => {
    const filters: Filters = {
      payment_status: paymentStatusFilter,
      fulfilment: fulfillmentFilter,
      start_date: startDateFilter,
      end_date: endDateFilter,
      sort_by: sortBy,
      sort_order: sortOrder,
    };
    fetchFilteredOrders(filters);
  };

  return (
    <div className="filter-form-container">
      <FormControl className="filter-form-control">
        <InputLabel id="payment-status-label">Payment Status</InputLabel>
        <Select
          labelId="payment-status-label"
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value as PaymentStatus)}
          className="filter-select"
        >
          <MenuItem value={PaymentStatus.EMPTY}>All</MenuItem>
          <MenuItem value={PaymentStatus.SUCCESS}>Success</MenuItem>
          <MenuItem value={PaymentStatus.PENDING}>Pending</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="filter-form-control">
        <InputLabel id="fulfillment-label">Fulfillment Status</InputLabel>
        <Select
          labelId="fulfillment-label"
          value={fulfillmentFilter}
          onChange={(e) => setFulfillmentFilter(e.target.value as FulfillmentStatus)}
          className="filter-select"
        >
          <MenuItem value={FulfillmentStatus.EMPTY}>All</MenuItem>
          <MenuItem value={FulfillmentStatus.FULFILLED}>Fulfilled</MenuItem>
          <MenuItem value={FulfillmentStatus.UNFULFILLED}>Unfulfilled</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="filter-form-control">
        <TextField
          label="Start Date"
          type="date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className="filter-date-input"
        />
      </FormControl>
      <FormControl className="filter-form-control">
        <TextField
          label="End Date"
          type="date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className="filter-date-input"
        />
      </FormControl>
      <FormControl className="filter-form-control">
        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={handleSortByChange}
          className="filter-select"
        >
          <MenuItem value={SortBy.EMPTY}>None</MenuItem>
          <MenuItem value={SortBy.TOTAL}>Total</MenuItem>
          <MenuItem value={SortBy.PAYMENT_STATUS}>Payment Status</MenuItem>
          <MenuItem value={SortBy.ITEMS}>Items</MenuItem>
        </TextField>
      </FormControl>
      <FormControl className="filter-form-control">
        <TextField
          select
          label="Sort Order"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="filter-select"
        >
          <MenuItem value={SortOrder.ASC}>Ascending</MenuItem>
          <MenuItem value={SortOrder.DESC}>Descending</MenuItem>
        </TextField>
      </FormControl>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default OrderFilterForm;
