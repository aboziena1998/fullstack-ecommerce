import React from 'react';
import BillboardClient from './components/Client';

interface Props {}

const Billboards = (props: Props) => {
  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default Billboards;
