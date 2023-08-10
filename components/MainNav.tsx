'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

interface Props {}

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName === `/${params.storeId}/settings`,
    },  
  ];
  return (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {routes.map(route => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm  font-md transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground'
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};