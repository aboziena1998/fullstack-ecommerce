'use client';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react/';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ProductColumn, columns } from './Columns';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-tabel';
import ApiList from '@/components/ui/ApiList';

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
