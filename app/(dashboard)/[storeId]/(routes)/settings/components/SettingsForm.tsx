'use client';
import { Store } from '@prisma/client';
import Heading from '@/components/ui/Heading';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react/';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/ApiAlert';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const theOrigin = useOrigin();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('store updated');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store Deleted');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferances" />
        <Button
          disabled={loading}
          variant={'destructive'}
          size={'icon'}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="h-4 w-4 " />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Change
          </Button>
        </form>
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${theOrigin}/api/${params.storeId}`}
          variant="public"
        />
      </Form>
    </>
  );
};

export default SettingsForm;
