import prismadb from '@/lib/prismadb';
import React from 'react';
import BillboardForm from './components/BillboardForm';

const page = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default page;
