import React from 'react';
import CategoryClient from './components/Client';
import prismadb from '@/lib/prismadb';
import { CategoryColumn } from './components/Columns';
import { format } from 'date-fns';

interface Props {}

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map(item => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col px-4">
      <div className="flex-1 space-y-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
