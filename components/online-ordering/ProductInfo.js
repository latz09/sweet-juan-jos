'use client';

import QuantitySelector from './QuantitySelector';
import FlavorSelector from './FlavorSelector';
import FrostingSelector from './FrostingSelector';
import { SubHeading } from '../utils/Typography';

const ProductInfo = ({
  product,
  selectedQuantity,
  setSelectedQuantity,
  selectedFlavor,
  setSelectedFlavor,
  selectedFrosting,
  setSelectedFrosting,
  calculateTotalPrice
}) => {

  const readyToShowTotal = () => {
    if (!selectedQuantity) return false;
    if (product.flavorOptions && !selectedFlavor) return false;
    if (product.frostingOptions && !selectedFrosting) return false;
    return true;
  };

  return (
    <div className="flex flex-col justify-between w-full space-y-4">
      <SubHeading title={product.name} type="dark" />

      {product?.description && (
        <p className="text-dark/80 text-lg">{product.description}</p>
      )}

      <QuantitySelector
        quantityOptions={product.quantityOptions}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
      />

      {product?.flavorOptions && (
        <FlavorSelector
          flavorOptions={product.flavorOptions}
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
        />
      )}

      {product?.frostingOptions && (
        <FrostingSelector
          frostingOptions={product.frostingOptions}
          selectedFrosting={selectedFrosting}
          setSelectedFrosting={setSelectedFrosting}
        />
      )}

      {readyToShowTotal() && (
        <div className="text-lg font-bold mt-4">
          Total Price:{' '}
          <span className="text-primary">${calculateTotalPrice()}</span>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
