import React from 'react';
import OrderClient from './components/Client';
import prismadb from '@/lib/prismadb';
import { OrderColumn } from './components/Columns';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

interface Props {}

const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(item => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItem
      .map(orderItem => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItem.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex-1 space-y-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
