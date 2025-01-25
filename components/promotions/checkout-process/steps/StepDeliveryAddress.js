'use client';

import { useState } from 'react';
import AnimateUp from '@/components/utils/animations/AnimateUp'; // Ensure this path is correct

export default function StepDeliveryAddress({
  deliveryDetails,
  onNext,
  onBack,
}) {
  // Local state for address fields
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  // Handle the "Next" button click
  function handleNext() {
    // Basic validation
    if (!street.trim() || !city.trim() || !zip.trim()) {
      alert('Please fill out all address fields.');
      return;
    }

    // Concatenate address fields into a single string
    const fullAddress = `${street}, ${city}, ${zip}`;
    onNext(fullAddress); // Proceed to the next step with the address
  }

  return (
    <div>
      <AnimateUp>
        <p className="text-dark/80 font-bold italic text-center">
          Delivery details: {deliveryDetails}
        </p>
        <h3 className="mb-2 text-lg font-semibold mt-8">Delivery Address</h3>

        {/* Street Address */}
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="promotion-form-input"
        />

        {/* City/Town */}
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City/Town
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City/Town"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="promotion-form-input"
        />

        {/* Zip Code */}
        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
          Zip Code
        </label>
        <input
          type="text"
          id="zip"
          name="zip"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="promotion-form-input"
        />

        <div className="flex gap-2">
          <div className="flex gap-8 mx-auto items-center mt-8">
            <button
              className="px-4 py-2 rounded-sm border border-dark/60"
              onClick={onBack}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg hover:bg-primary-dark transition"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </AnimateUp>
    </div>
  );
}
