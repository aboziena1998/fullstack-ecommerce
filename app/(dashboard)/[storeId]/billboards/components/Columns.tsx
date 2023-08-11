'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type BillbaordColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillbaordColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
