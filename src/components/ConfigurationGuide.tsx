import React from 'react';
import { BookOpen, Calculator, Settings, Layers } from 'lucide-react';
import { Category } from '../types';

interface ConfigurationGuideProps {
  category: Category;
}

export const ConfigurationGuide: React.FC<ConfigurationGuideProps> = ({ category }) => {
  const getGuideContent = () => {
    switch (category) {
      case Category.GLASS:
        return {
          icon: <Layers className="text-green-600" size={24} />,
          title: "Glass Solution Configuration Guide",
          steps: [
            {
              title: "Add Glass Sizes",
              description: "Add one or more glass panels with width (mm), height (mm), quantity, and drawing type (Standard/Custom)."
            },
            {
              title: "Set Glass Pricing",
              description: "Enter either Glass Variant Price OR Glass Finish Price (not both). Add Matte Price if matte finish is required."
            },
            {
              title: "Configure Factors",
              description: "Set Glass Factor (default: 1.0), Custom Factor % for custom drawings, and Secondary Factor for final adjustments."
            },
            {
              title: "Review Calculation",
              description: "The system calculates: (Glass Price + Matte if selected) × Glass Factor × Secondary Factor × Total Square Feet."
            }
          ]
        };
      
      case Category.WALTZ:
        return {
          icon: <Calculator className="text-blue-600" size={24} />,
          title: "Waltz Solution Configuration Guide",
          steps: [
            {
              title: "Set Orientation Pattern",
              description: "Enter pattern like 'DFD' or 'DFDF' where D=Door and F=Fixed Partition. This determines hardware quantities."
            },
            {
              title: "Choose Charging Method",
              description: "Select 'Square Feet' to enter area directly, or 'Dimension' to calculate from width × height."
            },
            {
              title: "Configure Costs",
              description: "Enter Door Cost, Fixed Partition Cost, Profile Cost, and hardware prices (locks, handles, closers, seals)."
            },
            {
              title: "Set Glass Options",
              description: "Configure glass variants with percentages, outer glass options, and design pattern costs as needed."
            }
          ]
        };
      
      default:
        return {
          icon: <Settings className="text-purple-600" size={24} />,
          title: "Accessory Configuration Guide",
          steps: [
            {
              title: "Select Category",
              description: "Choose the appropriate category for your pricing calculation."
            },
            {
              title: "Configure Parameters",
              description: "Fill in the required parameters based on your selected category."
            },
            {
              title: "Review Results",
              description: "Check the calculated price and detailed breakdown on the right panel."
            }
          ]
        };
    }
  };

  const guide = getGuideContent();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          {guide.icon}
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="text-gray-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">{guide.title}</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {guide.steps.map((step, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <h4 className="font-medium text-gray-800 text-sm">{step.title}</h4>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};