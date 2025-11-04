'use client';

import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = ({ contactInfo, setContactInfo, showForm = true }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {showForm && (
        <motion.section
          key="contact-form"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="origin-top overflow-hidden space-y-4"
        >
          <h2 className="text-2xl font-bold">Your Contact Details</h2>

          <input
            type="text"
            placeholder="Name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            className="online-order-form-input"
          />
          <input
            type="text"
            placeholder="Phone Number" 
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="online-order-form-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="online-order-form-input"
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
