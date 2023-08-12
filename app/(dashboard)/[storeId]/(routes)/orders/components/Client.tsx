'use client';

import Heading from '@/components/ui/Heading';
import React from 'react';
import { OrderColumn, columns } from './Columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-tabel';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
