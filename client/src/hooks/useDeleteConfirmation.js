// hooks/useDeleteConfirmation.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing delete confirmation modal state
 * 
 * Usage:
 * const { deleteModal, openDeleteModal, closeDeleteModal } = useDeleteConfirmation();
 * 
 * // Then in your component:
 * <DeleteConfirmationModal
 *   isOpen={deleteModal.isOpen}
 *   onClose={closeDeleteModal}
 *   onConfirm={() => handleDelete(deleteModal.id, deleteModal.type)}
 *   itemName={deleteModal.name}
 *   isLoading={deleteMutation.isPending}
 * />
 */
export function useDeleteConfirmation() {
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    type: null,
    name: '',
  });

  const openDeleteModal = useCallback((id, type, name = '') => {
    setDeleteModal({
      isOpen: true,
      id,
      type,
      name,
    });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({
      isOpen: false,
      id: null,
      type: null,
      name: '',
    });
  }, []);

  return {
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
  };
}