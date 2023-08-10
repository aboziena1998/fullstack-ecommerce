'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Copy, Server } from 'lucide-react/';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const TextMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('API route copied to the clipboard.');
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        {title}
        <Badge variant={variantMap[variant]}>{TextMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[.3rem] py-[.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={'outline'} size={'icon'}>
          <Copy size={16} onClick={onCopy} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
