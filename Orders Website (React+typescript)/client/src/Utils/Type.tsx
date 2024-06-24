export interface Order {
    _id: string;
    id: string;
    date: string;
    customer_id: string;
    payment_status: string;
    total: number;
    delivery: string;
    items: number;
    fulfilment: string;
    product_id: string;
  }

export interface OrderModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    onUpdate: () => void;
  }

  export interface OrderFilterFormProps {
  fetchFilteredOrders: (filters: Filters) => Promise<void>;
  }

  export interface OrderTableProps {
    orders: Order[];
    handlePaymentModalOpen: (orderId: string) => void;
    handleFulfillmentModalOpen: (orderId: string) => void;
    setSelectedOrderId: (orderId: string | null) => void;
  }

  export enum PaymentStatus {
    EMPTY = "",
    SUCCESS = "Success",
    PENDING = "Pending",
  }
  
  export enum FulfillmentStatus {
    EMPTY = "",
    FULFILLED = "Fulfilled",
    UNFULFILLED = "Unfulfilled",
  }
  
  export enum SortBy {
    EMPTY = "",
    TOTAL = "total",
    PAYMENT_STATUS = "payment_status",
    ITEMS = "items",
  }
  
  export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
  }
  
  
  export interface Filters {
    payment_status: PaymentStatus;
    fulfilment: FulfillmentStatus;
    start_date: string;
    end_date: string;
    sort_by: SortBy;
    sort_order: SortOrder;
  }
  
  