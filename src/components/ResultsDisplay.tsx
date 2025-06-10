import React from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { CalculationResult } from '../types';

interface ResultsDisplayProps {
  result: CalculationResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const breakdown = result.breakdown;
  const isGlassCalculation = breakdown.totalGlassPrice !== undefined;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Calculator className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Price Calculation Results</h2>
      </div>

      {/* Final Price */}
      <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-200">
        <div className="flex items-center justify-center gap-3">
          <IndianRupee className="text-green-600" size={32} />
          <div className="text-center">
            <p className="text-sm text-gray-600 uppercase tracking-wide">Final Solution Price</p>
            <p className="text-4xl font-bold text-green-600">
              {formatCurrency(result.finalSolutionPrice)}
            </p>
            {result.totalSquareFeet && (
              <p className="text-sm text-gray-500 mt-2">
                Total Square Feet: {result.totalSquareFeet.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Breakdown */}
      {isGlassCalculation ? (
        // Glass-specific breakdown
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Glass Components</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Glass Variant Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice1)}</span>
              </div>
              {breakdown.glassFinishPrice1 && breakdown.glassFinishPrice1 > 0 && (
                <div className="flex justify-between">
                  <span>Glass Finish Price:</span>
                  <span className="font-medium">{formatCurrency(breakdown.glassFinishPrice1)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Matte Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.mattePrice1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Glass Factor:</span>
                <span className="font-medium">{breakdown.glassFactor}x</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary Factor:</span>
                <span className="font-medium">{breakdown.secFactor}x</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-green-600">
                <span>Total Glass Price:</span>
                <span>{formatCurrency(breakdown.totalGlassPrice || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Standard breakdown
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Core Components</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Hardware Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.hardwarePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Profile Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.profilePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lock Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.lockPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Handle Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.handlePrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Additional Components</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Door Closer:</span>
                <span className="font-medium">{formatCurrency(breakdown.doorCloserPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Drop Seal:</span>
                <span className="font-medium">{formatCurrency(breakdown.dropSealPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Design Price:</span>
                <span className="font-medium">{formatCurrency(breakdown.designPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Accessories:</span>
                <span className="font-medium">{formatCurrency(breakdown.accessoriesPrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Glass Components</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Glass Variant 1:</span>
                <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Matte Price 1:</span>
                <span className="font-medium">{formatCurrency(breakdown.mattePrice1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Glass Variant 2:</span>
                <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Matte Price 2:</span>
                <span className="font-medium">{formatCurrency(breakdown.mattePrice2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Outer Glass Variant:</span>
                <span className="font-medium">{formatCurrency(breakdown.outerGlassVariantPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Outer Glass Matte:</span>
                <span className="font-medium">{formatCurrency(breakdown.outerGlassMattePrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Final Calculation</h3>
            <div className="space-y-2 text-sm ">
              <div className="flex justify-between">
                <span>Total Before Factor:</span>
                <span className="font-medium">{formatCurrency(breakdown.totalBeforeFactor)}</span>
              </div>
              <div className="flex justify-between">
                <span>Factor:</span>
                <span className="font-medium">{breakdown.factor}x</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary Factor:</span>
                <span className="font-medium">{breakdown.secFactor}x</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-green-600">
                <span>Final Price:</span>
                <span>{formatCurrency(result.finalSolutionPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};