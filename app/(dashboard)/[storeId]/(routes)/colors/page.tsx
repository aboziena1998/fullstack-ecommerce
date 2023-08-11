import React from 'react';
import ColorClient from './components/Client';
import prismadb from '@/lib/prismadb';
import { ColorColumn } from './components/Columns';
import { format } from 'date-fns';

const Colors = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map(item => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col px-4 ">
      <div className="flex-1 space-y-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default Colors;
