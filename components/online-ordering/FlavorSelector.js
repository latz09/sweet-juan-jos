'use client';

import CustomSelect from './CustomSelect';

const FlavorSelector = ({ flavorOptions, selectedFlavor, setSelectedFlavor }) => {
  if (!flavorOptions?.length) return null;

  return (
    <CustomSelect
      label="Flavor"
      options={flavorOptions}
      selectedOption={selectedFlavor}
      setSelectedOption={setSelectedFlavor}
      getOptionLabel={(option) => option.name}
      getOptionPrice={(option) => option.upcharge}
      type="upcharge"
    />
  );
};

export default FlavorSelector;
