// components/admin/ContactFormsListWrapper.js
'use client';

import { useState } from 'react';
import ContactFormsList from './ContactFormsList';

const ContactFormsListWrapper = ({ initialData }) => {
  const [forms, setForms] = useState(initialData);

  return <ContactFormsList initialData={forms} />;
};

export default ContactFormsListWrapper;
