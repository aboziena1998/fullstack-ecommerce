import prismadb from '@/lib/prismadb';
import React from 'react';
import SizeForm from './components/SizeForm';

const page = async ({ params }: { params: { billboardId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex flex-col px-4">
      <div className="flex-1 space-x-8 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default page;
