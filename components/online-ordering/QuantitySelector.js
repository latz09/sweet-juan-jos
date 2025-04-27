'use client';

import CustomSelect from './CustomSelect';

const QuantitySelector = ({ quantityOptions, selectedQuantity, setSelectedQuantity }) => {
  if (!quantityOptions?.length) return null;

  return (
    <CustomSelect
      label="Quantity"
      options={quantityOptions}
      selectedOption={selectedQuantity}
      setSelectedOption={setSelectedQuantity}
      getOptionLabel={(option) => option.label}
      getOptionPrice={(option) => option.price}
      type="quantity" 
    />
  );
};

export default QuantitySelector;
