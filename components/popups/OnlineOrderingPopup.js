'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const OnlineOrderingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed inset-x-0 bottom-4 flex justify-center z-40"
        >
          {isMinimized ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={toggleMinimize}
              className="bg-dark text-light rounded-full shadow-lg shadow-primary/30 cursor-pointer px-6 py-2 flex items-center gap-2"
            >
              <span className="font-semibold">Order Online</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-dark rounded-lg shadow-lg shadow-primary/30 py-5 px-12 text-light grid place-items-center gap-4"
            >
              <button
                onClick={toggleMinimize}
                className="absolute top-1 right-1 size-6 flex items-center justify-center text-light text-2xl rounded-full bg-primary/40"
                aria-label="Minimize Popup"
              >
                &minus;
              </button>

              <Link href="/online-ordering" className="grid place-items-center gap-2">
                <h2 className="text-xl lg:text-2xl font-bold">Order Online Now!</h2>
                <div className="text-lg">
                  <span className="hidden md:block">Click here to get started</span>
                  <span className="md:hidden">Tap here to get started</span>
                </div>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnlineOrderingPopup;
