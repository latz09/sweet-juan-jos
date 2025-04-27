'use client';

import CustomSelect from './CustomSelect';

const FrostingSelector = ({ frostingOptions, selectedFrosting, setSelectedFrosting }) => {
  if (!frostingOptions?.length) return null;

  return (
    <CustomSelect
      label="Frosting"
      options={frostingOptions}
      selectedOption={selectedFrosting}
      setSelectedOption={setSelectedFrosting}
      getOptionLabel={(option) => option.name}
      getOptionPrice={(option) => option.upcharge}
      type="upcharge"
    />
  );
};

export default FrostingSelector;
