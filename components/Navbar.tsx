import { UserButton, auth } from '@clerk/nextjs';
import React from 'react';
import { MainNav } from '@/components/MainNav';
import StoreSwitcher from './store-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

interface Props {}

const Navbar = async (props: Props) => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b ">
      <div className="flex gap-4 h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className=" ml-auto flex items-center gap-4 ">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
