import React from 'react';
import BillboardClient from './components/Client';
import prismadb from '@/lib/prismadb';
import { BillbaordColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {}

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillbaordColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex-1 space-y-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
