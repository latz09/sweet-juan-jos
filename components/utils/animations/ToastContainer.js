'use client';

import useToastStore from '@/lib/useToastStore';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50 }} // 👈 Start lower
            animate={{ opacity: 1, y: 0 }}  // 👈 Animate up to center
            exit={{ opacity: 0, y: 50 }}     // 👈 Exit down again
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="bg-dark text-light px-6 py-3 rounded-sm shadow-lg font-bold text-center text-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
