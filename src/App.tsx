import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { FormData, Category, ChargeBy, CalculationResult } from './types';
import { calculatePrice } from './utils/calculations';
import { FormSection } from './components/FormSection';
import { InputField } from './components/InputField';
import { RadioGroup } from './components/RadioGroup';
import { AccessoryManager } from './components/AccessoryManager';
import { GlassSizeManager } from './components/GlassSizeManager';
import { ResultsDisplay } from './components/ResultsDisplay';

const initialFormData: FormData = {
  category: Category.WALTZ,
  orientation: '',
  doorCost: 0,
  fixedpartitionCost: 0,
  width: 0,
  height: 0,
  chargeBy: ChargeBy.SQFT,
  squareFeet: 0,
  minProfileSqFeetCost: 0,
  profileCost: 0,
  actionName: false,
  lockPrice: 0,
  handlePrice: 0,
  doorCloserCost: 0,
  doorSealCost: 0,
  factor: 1,
  glassVariantPrice1: 0,
  glOnePercent: 0,
  mattePrice1: 0,
  glassVariantPrice2: 0,
  glTwoPercent: 0,
  mattePrice2: 0,
  outerVariantPrice: 0,
  outerGlassMattePrice: 0,
  designPatternCost: 0,
  accessories: [],
  secFactor: 1,

  // Glass-specific fields
  glassFactor: 1,
  customFactor: 0,
  glassFinishPrice1: 0,
  matte1: false,
  glassSizes: [],
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const calculatedResult = calculatePrice(formData);
    setResult(calculatedResult);
  }, [formData]);

  const categoryOptions = [
    { value: Category.WALTZ, label: 'Waltz' },
    { value: Category.GLASS, label: 'Glass' },
    // { value: Category.ACCESSORY, label: 'Accessory' }
  ];

  const chargeByOptions = [
    { value: ChargeBy.SQFT, label: 'Square Feet' },
    { value: ChargeBy.DIMENSION, label: 'Dimension' }
  ];

  const isGlassCategory = formData.category === Category.GLASS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Calculator className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Solution Price Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Configure your project parameters and get instant pricing calculations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Configuration */}
            <FormSection title="Basic Configuration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioGroup
                  label="Category"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => updateFormData('category', value as Category)}
                />
                {!isGlassCategory && (
                  <RadioGroup
                    label="Charge By"
                    options={chargeByOptions}
                    value={formData.chargeBy}
                    onChange={(value) => updateFormData('chargeBy', value as ChargeBy)}
                  />
                )}
              </div>

              {!isGlassCategory && (
                <InputField
                  label="Orientation (e.g., DFD, DFDF)"
                  value={formData.orientation}
                  onChange={(value) => updateFormData('orientation', value)}
                  type="text"
                  placeholder="Enter orientation pattern"
                />
              )}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="actionName"
                  checked={formData.actionName}
                  onChange={(e) => updateFormData('actionName', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="actionName" className="text-sm font-medium text-gray-700">
                  Location Descope
                </label>
              </div>
            </FormSection>

            {/* Glass-specific sections */}
            {isGlassCategory && (
              <>
                {/* Glass Sizes */}
                <FormSection title="Glass Sizes">
                  <GlassSizeManager
                    glassSizes={formData.glassSizes}
                    onChange={(glassSizes) => updateFormData('glassSizes', glassSizes)}
                  />
                </FormSection>

                {/* Glass Configuration */}
                <FormSection title="Glass Configuration">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Glass Variant Price"
                      value={formData.glassVariantPrice1}
                      onChange={(value) => updateFormData('glassVariantPrice1', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Glass Finish Price"
                      value={formData.glassFinishPrice1}
                      onChange={(value) => updateFormData('glassFinishPrice1', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Matte Price"
                      value={formData.mattePrice1}
                      onChange={(value) => updateFormData('mattePrice1', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Min Profile SqFt Cost"
                      value={formData.minProfileSqFeetCost}
                      onChange={(value) => updateFormData('minProfileSqFeetCost', parseFloat(value) || 0)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Glass Factor"
                      value={formData.glassFactor}
                      onChange={(value) => updateFormData('glassFactor', parseFloat(value) || 1)}
                      step={0.1}
                    />
                    <InputField
                      label="Custom Factor (%)"
                      value={formData.customFactor}
                      onChange={(value) => updateFormData('customFactor', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Secondary Factor"
                      value={formData.secFactor}
                      onChange={(value) => updateFormData('secFactor', parseFloat(value) || 1)}
                      step={0.1}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="matte1"
                      checked={formData.matte1}
                      onChange={(e) => updateFormData('matte1', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="matte1" className="text-sm font-medium text-gray-700">
                      Include Matte Finish
                    </label>
                  </div>
                </FormSection>
              </>
            )}

            {/* Standard sections for non-glass categories */}
            {!isGlassCategory && (
              <>
                {/* Dimensions & Area */}
                <FormSection title="Dimensions & Area">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Width"
                      value={formData.width}
                      onChange={(value) => updateFormData('width', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Height"
                      value={formData.height}
                      onChange={(value) => updateFormData('height', parseFloat(value) || 0)}
                    />
                    {formData.chargeBy === ChargeBy.SQFT && (
                      <InputField
                        label="Square Feet"
                        value={formData.squareFeet}
                        onChange={(value) => updateFormData('squareFeet', parseFloat(value) || 0)}
                      />
                    )}
                  </div>
                </FormSection>

                {/* Cost Parameters */}
                <FormSection title="Cost Parameters">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Door Cost"
                      value={formData.doorCost}
                      onChange={(value) => updateFormData('doorCost', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Fixed Partition Cost"
                      value={formData.fixedpartitionCost}
                      onChange={(value) => updateFormData('fixedpartitionCost', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Min Profile SqFt Cost"
                      value={formData.minProfileSqFeetCost}
                      onChange={(value) => updateFormData('minProfileSqFeetCost', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Profile Cost"
                      value={formData.profileCost}
                      onChange={(value) => updateFormData('profileCost', parseFloat(value) || 0)}
                    />
                  </div>
                </FormSection>

                {/* Hardware Costs */}
                <FormSection title="Hardware Costs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Lock Price"
                      value={formData.lockPrice}
                      onChange={(value) => updateFormData('lockPrice', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Handle Price"
                      value={formData.handlePrice}
                      onChange={(value) => updateFormData('handlePrice', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Door Closer Cost"
                      value={formData.doorCloserCost}
                      onChange={(value) => updateFormData('doorCloserCost', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Door Seal Cost"
                      value={formData.doorSealCost}
                      onChange={(value) => updateFormData('doorSealCost', parseFloat(value) || 0)}
                    />
                  </div>
                </FormSection>

                {/* Glass Configuration */}
                <FormSection title="Glass Configuration">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">Glass Variant 1</h4>
                      <InputField
                        label="Glass Variant Price 1"
                        value={formData.glassVariantPrice1}
                        onChange={(value) => updateFormData('glassVariantPrice1', parseFloat(value) || 0)}
                      />
                      <InputField
                        label="GL One Percent"
                        value={formData.glOnePercent}
                        onChange={(value) => updateFormData('glOnePercent', parseFloat(value) || 0)}
                      />
                      <InputField
                        label="Matte Price 1"
                        value={formData.mattePrice1}
                        onChange={(value) => updateFormData('mattePrice1', parseFloat(value) || 0)}
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800">Glass Variant 2</h4>
                      <InputField
                        label="Glass Variant Price 2"
                        value={formData.glassVariantPrice2}
                        onChange={(value) => updateFormData('glassVariantPrice2', parseFloat(value) || 0)}
                      />
                      <InputField
                        label="GL Two Percent"
                        value={formData.glTwoPercent}
                        onChange={(value) => updateFormData('glTwoPercent', parseFloat(value) || 0)}
                      />
                      <InputField
                        label="Matte Price 2"
                        value={formData.mattePrice2}
                        onChange={(value) => updateFormData('mattePrice2', parseFloat(value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <InputField
                      label="Outer Variant Price"
                      value={formData.outerVariantPrice}
                      onChange={(value) => updateFormData('outerVariantPrice', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Outer Glass Matte Price"
                      value={formData.outerGlassMattePrice}
                      onChange={(value) => updateFormData('outerGlassMattePrice', parseFloat(value) || 0)}
                    />
                  </div>
                </FormSection>

                {/* Design & Factors */}
                <FormSection title="Design & Factors">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                      label="Design Pattern Cost"
                      value={formData.designPatternCost}
                      onChange={(value) => updateFormData('designPatternCost', parseFloat(value) || 0)}
                    />
                    <InputField
                      label="Factor"
                      value={formData.factor}
                      onChange={(value) => updateFormData('factor', parseFloat(value) || 1)}
                      step={0.1}
                    />
                    <InputField
                      label="Secondary Factor"
                      value={formData.secFactor}
                      onChange={(value) => updateFormData('secFactor', parseFloat(value) || 1)}
                      step={0.1}
                    />
                  </div>
                </FormSection>

                {/* Accessories */}
                <FormSection title="Accessories">
                  <AccessoryManager
                    accessories={formData.accessories}
                    onChange={(accessories) => updateFormData('accessories', accessories)}
                  />
                </FormSection>
              </>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {result && <ResultsDisplay result={result} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;