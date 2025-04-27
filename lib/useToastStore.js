'use client';

import { create } from 'zustand';

const useToastStore = create((set) => ({
  toasts: [],
  
  addToast: (message) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message }]
    }));

    // Automatically remove after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id)
      }));
    }, 3000);
  }
}));

export default useToastStore;
