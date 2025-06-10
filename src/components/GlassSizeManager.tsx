import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { GlassSize, GlassSolutionDrawing } from '../types';
import { InputField } from './InputField';
import { RadioGroup } from './RadioGroup';

interface GlassSizeManagerProps {
  glassSizes: GlassSize[];
  onChange: (glassSizes: GlassSize[]) => void;
}

export const GlassSizeManager: React.FC<GlassSizeManagerProps> = ({
  glassSizes,
  onChange
}) => {
  const addGlassSize = () => {
    onChange([...glassSizes, {
      width: 0,
      height: 0,
      quantity: 1,
      drawing: GlassSolutionDrawing.STANDARD
    }]);
  };

  const removeGlassSize = (index: number) => {
    onChange(glassSizes.filter((_, i) => i !== index));
  };

  const updateGlassSize = (index: number, field: keyof GlassSize, value: GlassSize[keyof GlassSize]) => {
    const updated = glassSizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    onChange(updated);
  };

  const drawingOptions = [
    { value: GlassSolutionDrawing.STANDARD, label: 'Standard' },
    { value: GlassSolutionDrawing.CUSTOM, label: 'Custom' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-medium text-gray-800">Glass Sizes</h4>
        <button
          onClick={addGlassSize}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus size={16} />
          Add Glass Size
        </button>
      </div>

      {glassSizes.map((size, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-gray-700">Glass Size #{index + 1}</h5>
            <button
              onClick={() => removeGlassSize(index)}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              label="Width (mm)"
              value={size.width}
              onChange={(value) => updateGlassSize(index, 'width', parseFloat(value) || 0)}
            />
            <InputField
              label="Height (mm)"
              value={size.height}
              onChange={(value) => updateGlassSize(index, 'height', parseFloat(value) || 0)}
            />
            <InputField
              label="Quantity"
              value={size.quantity}
              onChange={(value) => updateGlassSize(index, 'quantity', parseInt(value) || 0)}
              step={1}
            />
          </div>

          <RadioGroup
            label="Drawing Type"
            options={drawingOptions}
            value={size.drawing}
            onChange={(value) => updateGlassSize(index, 'drawing', value as GlassSolutionDrawing)}
          />
        </div>
      ))}

      {glassSizes.length === 0 && (
        <p className="text-gray-500 text-sm italic">No glass sizes added yet</p>
      )}
    </div>
  );
};