import React, { useState, useEffect } from 'react';
import { Calculator, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { FormData, Category, ChargeBy, CalculationResult, AccessoryOnlyFormData } from './types';
import { calculatePrice, calculateAccessoryOnlyPrice } from './utils/calculations';
import { FormSection } from './components/FormSection';
import { InputField } from './components/InputField';
import { RadioGroup } from './components/RadioGroup';
import { AccessoryManager } from './components/AccessoryManager';
import { GlassSizeManager } from './components/GlassSizeManager';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ConfigurationGuide } from './components/ConfigurationGuide';

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
  glassFactor: 1,
  customFactor: 0,
  glassFinishPrice1: 0,
  matte1: false,
  glassSizes: []
};

const initialAccessoryOnlyFormData: AccessoryOnlyFormData = {
  accessoryFactor: 1,
  glassPrice: 0,
  secondaryFactor: '',
  quantity: 1,
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [accessoryOnlyFormData, setAccessoryOnlyFormData] = useState<AccessoryOnlyFormData>(initialAccessoryOnlyFormData);

  const updateFormData = <T extends keyof FormData>(
    field: T,
    value: FormData[T]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  console.log('formData', formData);
  useEffect(() => {
    const calculatedResult = calculatePrice(formData);
    setResult(calculatedResult);
  }, [formData]);

  const categoryOptions = [
    { value: Category.WALTZ, label: 'Waltz' },
    { value: Category.GLASS, label: 'Glass' },
    { value: Category.ACCESSORY_ONLY, label: 'Accessory Only' },
  ];

  const chargeByOptions = [
    { value: ChargeBy.SQFT, label: 'Square Feet' },
    { value: ChargeBy.DIMENSION, label: 'Dimension' },
  ];

  const isGlassCategory = formData.category === Category.GLASS;
  const isAccessoryOnlyCategory = formData.category === Category.ACCESSORY_ONLY;

  // Check if basic configuration is complete
  const isBasicConfigComplete = formData.category &&
    (isGlassCategory || formData.orientation) &&
    (isGlassCategory || formData.chargeBy);

  // Check if dimensions are set
  const areDimensionsSet = isGlassCategory
    ? formData.glassSizes.length > 0
    : (formData.width > 0 && formData.height > 0) || formData.squareFeet > 0;

  // Check if costs are configured
  const areCostsConfigured = isGlassCategory
    ? formData.glassVariantPrice1 > 0 || formData.glassFinishPrice1 > 0
    : formData.doorCost > 0 || formData.fixedpartitionCost > 0 || formData.profileCost > 0;

  const configurationSteps = [
    {
      id: 1,
      title: 'Select Category & Basic Settings',
      completed: isBasicConfigComplete,
      description: isGlassCategory
        ? 'Choose Glass category and configure basic settings'
        : 'Choose category, orientation pattern (e.g., DFD), and charging method'
    },
    {
      id: 2,
      title: 'Set Dimensions',
      completed: areDimensionsSet,
      description: isGlassCategory
        ? 'Add glass sizes with width, height, and quantity'
        : 'Enter width, height, or square feet based on your charging method'
    },
    {
      id: 3,
      title: 'Configure Costs',
      completed: areCostsConfigured,
      description: isGlassCategory
        ? 'Set glass variant/finish prices and factors'
        : 'Enter door costs, partition costs, profile costs, and hardware prices'
    }
  ];

  useEffect(() => {
    if (isAccessoryOnlyCategory) {
      calculateAccessoryOnlyPrice(accessoryOnlyFormData).then((finalPrice) => {
        setResult({
          finalSolutionPrice: finalPrice,
          breakdown: {
            hardwarePrice: 0,
            profilePrice: 0,
            lockPrice: 0,
            handlePrice: 0,
            doorCloserPrice: 0,
            doorSealPrice: 0,
            glassVariantPrice1: accessoryOnlyFormData.glassPrice,
            glassVariantPrice2: 0,
            mattePrice1: 0,
            mattePrice2: 0,
            outerGlassVariantPrice: 0,
            outerGlassMattePrice: 0,
            designPrice: 0,
            accessoriesPrice: 0,
            totalBeforeFactor: accessoryOnlyFormData.glassPrice * accessoryOnlyFormData.quantity,
            factor: accessoryOnlyFormData.accessoryFactor,
            secFactor: parseFloat(accessoryOnlyFormData.secondaryFactor) || 1,
            category: Category.ACCESSORY_ONLY,
            quantity: accessoryOnlyFormData.quantity,
          },
        });
      });
    } else {
      const calculatedResult = calculatePrice(formData);
      setResult(calculatedResult);
    }
  }, [formData, accessoryOnlyFormData, isAccessoryOnlyCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Calculator className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Waltz Solution Price Calculator
            </h1>
          </div>

          {/* Configuration Progress */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Configuration Progress</h3>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Info size={16} />
                  {showGuide ? 'Hide Guide' : 'Show Guide'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {configurationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                      }`}>
                      {step.completed ? <CheckCircle size={16} /> : step.id}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${step.completed ? 'text-green-600' : 'text-gray-700'
                        }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                    {index < configurationSteps.length - 1 && (
                      <ArrowRight className="hidden md:block text-gray-300 mt-2" size={16} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Guide */}
        {showGuide && (
          <div className="mb-8">
            <ConfigurationGuide category={formData.category} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Configuration */}
            <FormSection title="Basic Configuration" priority={!isBasicConfigComplete}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RadioGroup<Category>
                  label="Category"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => updateFormData('category', value)}
                />
                {!isGlassCategory && !isAccessoryOnlyCategory && (
                  <RadioGroup<ChargeBy>
                    label="Charge By"
                    options={chargeByOptions}
                    value={formData.chargeBy}
                    onChange={(value) => updateFormData('chargeBy', value)}
                  />
                )}
              </div>

              {!isGlassCategory && !isAccessoryOnlyCategory && (
                <InputField
                  label="Orientation Pattern"
                  value={formData.orientation}
                  onChange={(value) => updateFormData('orientation', value)}
                  type="text"
                  placeholder="e.g., DFD, DFDF (D=Door, F=Fixed Partition)"
                />
              )}

              {/* Show Location Descope for both Waltz and Glass (not Accessory Only) */}
              {!isAccessoryOnlyCategory && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="actionName"
                    checked={formData.actionName}
                    onChange={(e) => updateFormData('actionName', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="actionName" className="text-sm font-medium text-gray-700">
                    Location Descope (Fixed Price: ₹29,500)
                  </label>
                </div>
              )}
            </FormSection>
            {isAccessoryOnlyCategory && (
              <FormSection title="Accessory Only Configuration">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Glass Price"
                    value={accessoryOnlyFormData.glassPrice}
                    onChange={(value) => setAccessoryOnlyFormData(prev => ({ ...prev, glassPrice: parseFloat(value) || 0 }))}
                    placeholder="Glass Price"
                    type="number"
                  />
                  <InputField
                    label="Accessory Factor"
                    value={accessoryOnlyFormData.accessoryFactor}
                    onChange={(value) => setAccessoryOnlyFormData(prev => ({ ...prev, accessoryFactor: parseFloat(value) || 1 }))}
                    placeholder="Accessory Factor"
                  />
                  <InputField
                    label="Secondary Factor"
                    value={accessoryOnlyFormData.secondaryFactor}
                    onChange={(value) => setAccessoryOnlyFormData(prev => ({ ...prev, secondaryFactor: value }))}
                    placeholder="Secondary Factor"
                    type="text"
                  />
                  <InputField
                    label="Quantity"
                    value={accessoryOnlyFormData.quantity}
                    onChange={(value) => setAccessoryOnlyFormData(prev => ({ ...prev, quantity: parseInt(value) || 1 }))}
                    placeholder="Quantity"
                    type="number"
                    step={1}
                    min={1}
                  />
                </div>
              </FormSection>
            )}
            {!isAccessoryOnlyCategory && (
              <>
                {/* Glass and Waltz sections (original, unchanged) */}
                {/* Glass Sizes */}
                {isGlassCategory && (
                  <FormSection title="Glass Sizes" priority={!areDimensionsSet}>
                    <GlassSizeManager
                      glassSizes={formData.glassSizes}
                      onChange={(glassSizes) => updateFormData('glassSizes', glassSizes)}
                    />
                  </FormSection>
                )}
                {/* Glass Configuration */}
                {isGlassCategory && (
                  <FormSection title="Glass Configuration" priority={!areCostsConfigured}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Glass Variant Price (₹)"
                        value={formData.glassVariantPrice1}
                        onChange={(value) => updateFormData('glassVariantPrice1', parseFloat(value) || 0)}
                        placeholder="Enter glass variant price"
                      />
                      <InputField
                        label="Glass Finish Price (₹)"
                        value={formData.glassFinishPrice1}
                        onChange={(value) => updateFormData('glassFinishPrice1', parseFloat(value) || 0)}
                        placeholder="Enter glass finish price"
                      />
                      <InputField
                        label="Matte Price (₹)"
                        value={formData.mattePrice1}
                        onChange={(value) => updateFormData('mattePrice1', parseFloat(value) || 0)}
                        placeholder="Enter matte finish price"
                      />
                      <InputField
                        label="Min Profile SqFt Cost"
                        value={formData.minProfileSqFeetCost}
                        onChange={(value) => updateFormData('minProfileSqFeetCost', parseFloat(value) || 0)}
                        placeholder="Minimum square feet cost"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField
                        label="Glass Factor"
                        value={formData.glassFactor}
                        onChange={(value) => updateFormData('glassFactor', parseFloat(value) || 1)}
                        step={0.1}
                        placeholder="1.0"
                      />
                      <InputField
                        label="Custom Factor (%)"
                        value={formData.customFactor}
                        onChange={(value) => updateFormData('customFactor', parseFloat(value) || 0)}
                        placeholder="0"
                      />
                      <InputField
                        label="Secondary Factor"
                        value={formData.secFactor}
                        onChange={(value) => updateFormData('secFactor', parseFloat(value) || 1)}
                        step={0.1}
                        placeholder="1.0"
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
                )}
                {/* Waltz/Standard sections */}
                {!isGlassCategory && (
                  <>
                    <FormSection title="Dimensions & Area" priority={!areDimensionsSet}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                          label="Width (mm)"
                          value={formData.width}
                          onChange={(value) => updateFormData('width', parseFloat(value) || 0)}
                          placeholder="Enter width in mm"
                        />
                        <InputField
                          label="Height (mm)"
                          value={formData.height}
                          onChange={(value) => updateFormData('height', parseFloat(value) || 0)}
                          placeholder="Enter height in mm"
                        />
                        {formData.chargeBy === ChargeBy.SQFT && (
                          <InputField
                            label="Square Feet"
                            value={formData.squareFeet}
                            onChange={(value) => updateFormData('squareFeet', parseFloat(value) || 0)}
                            placeholder="Enter square feet"
                          />
                        )}
                      </div>
                    </FormSection>
                    <FormSection title="Cost Parameters" priority={!areCostsConfigured}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="Door Cost (₹)"
                          value={formData.doorCost}
                          onChange={(value) => updateFormData('doorCost', parseFloat(value) || 0)}
                          placeholder="Cost per door"
                        />
                        <InputField
                          label="Fixed Partition Cost (₹)"
                          value={formData.fixedpartitionCost}
                          onChange={(value) => updateFormData('fixedpartitionCost', parseFloat(value) || 0)}
                          placeholder="Cost per fixed partition"
                        />
                        <InputField
                          label="Min Profile SqFt Cost"
                          value={formData.minProfileSqFeetCost}
                          onChange={(value) => updateFormData('minProfileSqFeetCost', parseFloat(value) || 0)}
                          placeholder="Minimum profile cost"
                        />
                        <InputField
                          label="Profile Cost (₹)"
                          value={formData.profileCost}
                          onChange={(value) => updateFormData('profileCost', parseFloat(value) || 0)}
                          placeholder="Profile cost per sqft"
                        />
                      </div>
                    </FormSection>
                    <FormSection title="Hardware Costs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                          label="Lock Price (₹)"
                          value={formData.lockPrice}
                          onChange={(value) => updateFormData('lockPrice', parseFloat(value) || 0)}
                          placeholder="Lock cost"
                        />
                        <InputField
                          label="Handle Price (₹)"
                          value={formData.handlePrice}
                          onChange={(value) => updateFormData('handlePrice', parseFloat(value) || 0)}
                          placeholder="Handle cost per door"
                        />
                        <InputField
                          label="Door Closer Cost (₹)"
                          value={formData.doorCloserCost}
                          onChange={(value) => updateFormData('doorCloserCost', parseFloat(value) || 0)}
                          placeholder="Door closer cost per door"
                        />
                        <InputField
                          label="Door Seal Cost (₹)"
                          value={formData.doorSealCost}
                          onChange={(value) => updateFormData('doorSealCost', parseFloat(value) || 0)}
                          placeholder="Door seal cost per door"
                        />
                      </div>
                    </FormSection>
                    {/* Glass Configuration */}
                    <FormSection title="Glass Configuration">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800">Glass Variant 1</h4>
                          <InputField
                            label="Glass Variant Price 1 (₹)"
                            value={formData.glassVariantPrice1}
                            onChange={(value) => updateFormData('glassVariantPrice1', parseFloat(value) || 0)}
                            placeholder="Glass variant 1 price"
                          />
                          <InputField
                            label="GL One Percent (%)"
                            value={formData.glOnePercent}
                            onChange={(value) => updateFormData('glOnePercent', parseFloat(value) || 0)}
                            placeholder="Percentage for variant 1"
                          />
                          <InputField
                            label="Matte Price 1 (₹)"
                            value={formData.mattePrice1}
                            onChange={(value) => updateFormData('mattePrice1', parseFloat(value) || 0)}
                            placeholder="Matte price for variant 1"
                          />
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800">Glass Variant 2</h4>
                          <InputField
                            label="Glass Variant Price 2 (₹)"
                            value={formData.glassVariantPrice2}
                            onChange={(value) => updateFormData('glassVariantPrice2', parseFloat(value) || 0)}
                            placeholder="Glass variant 2 price"
                          />
                          <InputField
                            label="GL Two Percent (%)"
                            value={formData.glTwoPercent}
                            onChange={(value) => updateFormData('glTwoPercent', parseFloat(value) || 0)}
                            placeholder="Percentage for variant 2"
                          />
                          <InputField
                            label="Matte Price 2 (₹)"
                            value={formData.mattePrice2}
                            onChange={(value) => updateFormData('mattePrice2', parseFloat(value) || 0)}
                            placeholder="Matte price for variant 2"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <InputField
                          label="Outer Variant Price (₹)"
                          value={formData.outerVariantPrice}
                          onChange={(value) => updateFormData('outerVariantPrice', parseFloat(value) || 0)}
                          placeholder="Outer glass variant price"
                        />
                        <InputField
                          label="Outer Glass Matte Price (₹)"
                          value={formData.outerGlassMattePrice}
                          onChange={(value) => updateFormData('outerGlassMattePrice', parseFloat(value) || 0)}
                          placeholder="Outer glass matte price"
                        />
                      </div>
                    </FormSection>
                    <FormSection title="Design & Factors">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField
                          label="Design Pattern Cost (₹)"
                          value={formData.designPatternCost}
                          onChange={(value) => updateFormData('designPatternCost', parseFloat(value) || 0)}
                          placeholder="Design cost per sqft"
                        />
                        <InputField
                          label="Primary Factor"
                          value={formData.factor}
                          onChange={(value) => updateFormData('factor', parseFloat(value) || 1)}
                          step={0.1}
                          placeholder="1.0"
                        />
                        <InputField
                          label="Secondary Factor"
                          value={formData.secFactor}
                          onChange={(value) => updateFormData('secFactor', parseFloat(value) || 1)}
                          step={0.1}
                          placeholder="1.0"
                        />
                      </div>
                    </FormSection>
                    <FormSection title="Accessories">
                      <AccessoryManager
                        accessories={formData.accessories}
                        onChange={(accessories) => updateFormData('accessories', accessories)}
                      />
                    </FormSection>
                  </>
                )}
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