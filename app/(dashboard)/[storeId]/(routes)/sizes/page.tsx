import React from 'react';
import SizeClient from './components/Client';
import prismadb from '@/lib/prismadb';
import { SizeColumn } from './components/Columns';
import { format } from 'date-fns';

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex-1 space-y-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
