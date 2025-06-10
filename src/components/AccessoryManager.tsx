import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Accessory } from '../types';
import { InputField } from './InputField';

interface AccessoryManagerProps {
  accessories: Accessory[];
  onChange: (accessories: Accessory[]) => void;
}

export const AccessoryManager: React.FC<AccessoryManagerProps> = ({
  accessories,
  onChange
}) => {
  const addAccessory = () => {
    onChange([...accessories, { accVariantPrice: 0, quantity: 1 }]);
  };

  const removeAccessory = (index: number) => {
    onChange(accessories.filter((_, i) => i !== index));
  };

  const updateAccessory = (index: number, field: keyof Accessory, value: number) => {
    const updated = accessories.map((accessory, i) => 
      i === index ? { ...accessory, [field]: value } : accessory
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-800">Accessories</h4>
        <button
          onClick={addAccessory}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Accessory
        </button>
      </div>
      
      {accessories.map((accessory, index) => (
        <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 rounded-lg">
          <InputField
            label="Variant Price"
            value={accessory.accVariantPrice}
            onChange={(value) => updateAccessory(index, 'accVariantPrice', parseFloat(value) || 0)}
            className="flex-1"
          />
          <InputField
            label="Quantity"
            value={accessory.quantity}
            onChange={(value) => updateAccessory(index, 'quantity', parseInt(value) || 0)}
            className="flex-1"
            step={1}
          />
          <button
            onClick={() => removeAccessory(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      
      {accessories.length === 0 && (
        <p className="text-gray-500 text-sm italic">No accessories added yet</p>
      )}
    </div>
  );
};