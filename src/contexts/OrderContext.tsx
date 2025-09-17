import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface OrderItem {
  id: number;
  title: string;
  author: string;
  price: string;
  cover: string;
  quantity: number;
  condition: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'online' | 'cod';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
  };
}

interface OrderState {
  orders: Order[];
}

type OrderAction = 
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'CANCEL_ORDER'; payload: string };

const initialState: OrderState = {
  orders: []
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled' as const }
            : order
        )
      };
    default:
      return state;
  }
};

interface OrderContextType {
  state: OrderState;
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderDate: new Date().toISOString()
    };
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  const cancelOrder = (orderId: string) => {
    dispatch({ type: 'CANCEL_ORDER', payload: orderId });
  };

  return (
    <OrderContext.Provider value={{ state, addOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};