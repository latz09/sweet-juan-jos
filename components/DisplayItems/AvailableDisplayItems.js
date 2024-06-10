'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

const AvailableDisplayItems = ({ data }) => (
  <div className='grid gap-x-8 gap-y-16 lg:grid-cols-3 place-items-center max-w-5xl mx-auto'>
    {data.map((item, index) => (
      <DisplayItem key={index} item={item} />
    ))}
  </div>
);

const DisplayItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isModalOpen]);

  const handleBackgroundClick = (e) => {
    // Close modal only if the background is clicked, not the modal content
    if (e.target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  return (
    <div className='grid shadow-lg shadow-primary/30'>
      <Image
        src={item.imageUrl}
        alt='Available Display Items'
        width={400}
        height={400}
        className='cursor-pointer'
        onClick={openModal}
      />
      <div className='bg-dark text-light p-3 flex justify-between lg:text-xl '>
        <div className='flex items-center gap-4'>
          <span>Sizes:</span>
          <span className='font-bold'>{item.sizes.join(' | ')}</span>
        </div>
        <div className='flex items-center gap-4'>
          <span>Qty:</span>
          <span className='font-bold'>{item.quantity}</span>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-dark/70 backdrop-blur modal-background'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackgroundClick}
          >
            <motion.div
              className='relative p-4 rounded-lg max-w-full max-h-full overflow-auto scrollbar-hide'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when modal content is clicked
            >
              <Image
                src={item.imageUrl}
                alt='Available Display Items'
                width={450}
                height={450}
                className='objectcontain rounded-sm shadow-lg shadow-pr'
              />
              <button
                className='absolute top-4 right-4 p-3 m-4 bg-dark/60 text-light rounded-full shadow-lg shadow-primary/30 hover:bg-dark hover:text-primary transition-colors duration-300'
                onClick={closeModal}
              >
                <AiOutlineClose />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableDisplayItems;
