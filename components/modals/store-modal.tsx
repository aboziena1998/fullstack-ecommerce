'use client';

import React from 'react';
import Modal from '@/components/ui/Modal';
import { useStoreModal } from '@/hooks/use-store-modal';
const storeModal = () => {
  const { isOpen, onClose } = useStoreModal();

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};

export default storeModal;
