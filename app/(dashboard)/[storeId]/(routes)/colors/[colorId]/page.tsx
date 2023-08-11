import prismadb from '@/lib/prismadb';
import React from 'react';
import ColorForm from './components/ColorForm';

const page = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex flex-col px-4">
      <div className="flex-1 space-x-8 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default page;
