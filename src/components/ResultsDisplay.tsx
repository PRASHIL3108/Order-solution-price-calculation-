import React from 'react';
import { Calculator, Info } from 'lucide-react';
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
          {/* <IndianRupee className="text-green-600" size={32} /> */}
          <div className="text-center">
            <p className="text-sm text-gray-600 uppercase tracking-wide">Final Solution Price</p>
            <p className="text-4xl font-bold text-green-600">
              {formatCurrency(result.finalSolutionPrice)}
            </p>
            {/* {result.totalSquareFeet && ( */}
            <p className="text-sm text-gray-500 mt-2">
              Total Square Feet: {result.totalSquareFeet && result.totalSquareFeet.toFixed(2)}
            </p>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* SqFt Breakdown */}
      <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
        <h4 className="font-semibold text-blue-700 mb-2">Square Feet Calculation</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Calculated SqFt:</span>
            <span className="font-medium">{breakdown.calculatedSquareFeet?.toFixed(2) ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span>Minimum SqFt:</span>
            <span className="font-medium">{breakdown.minSquareFeet?.toFixed(2) ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span>Chargeable SqFt:</span>
            <span className="font-medium">{breakdown.chargeableSquareFeet?.toFixed(2) ?? '-'}</span>
          </div>
        </div>
      </div>

      {/* Step-by-step Calculation Breakdown */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Calculation Steps</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Profile Price:</span>
            <span className="font-medium">{formatCurrency(breakdown.profilePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Hardware Price:</span>
            <span className="font-medium">{formatCurrency(breakdown.hardwarePrice)}</span>
          </div>
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
          <div className="flex justify-between">
            <span>Design Price:</span>
            <span className="font-medium">{formatCurrency(breakdown.designPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Accessories Price:</span>
            <span className="font-medium">{formatCurrency(breakdown.accessoriesPrice)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Total Before Factor:</span>
            <span className="font-medium">{formatCurrency(breakdown.totalBeforeFactor)}</span>
          </div>
          <div className="flex justify-between">
            <span>Primary Factor:</span>
            <span className="font-medium">{breakdown.factor}x</span>
          </div>
          <div className="flex justify-between">
            <span>Secondary Factor:</span>
            <span className="font-medium">{breakdown.secFactor}x</span>
          </div>
          {breakdown.totalGlassPrice !== undefined && (
            <div className="flex justify-between">
              <span>Total Glass Price (after factors):</span>
              <span className="font-medium">{formatCurrency(breakdown.totalGlassPrice)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-2 font-bold text-green-700">
            <span>Final Solution Price:</span>
            <span>{formatCurrency(result.finalSolutionPrice)}</span>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Info className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Detailed Calculation Breakdown</h3>
        </div>

        {isGlassCalculation ? (
          // Glass-specific breakdown
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-green-600">Glass Components Calculation</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-700 mb-2">Base Glass Price Calculation:</p>
                  <div className="space-y-1 text-xs text-gray-600 ml-4">
                    <div className="flex justify-between">
                      <span>• Glass Variant Price:</span>
                      <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice1)}</span>
                    </div>
                    {breakdown.glassFinishPrice1 && breakdown.glassFinishPrice1 > 0 && (
                      <div className="flex justify-between">
                        <span>• Glass Finish Price:</span>
                        <span className="font-medium">{formatCurrency(breakdown.glassFinishPrice1)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>• Matte Price (if selected):</span>
                      <span className="font-medium">{formatCurrency(breakdown.mattePrice1)}</span>
                    </div>
                    <div className="border-t pt-1 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Base Glass Price:</span>
                        <span>{formatCurrency((breakdown.glassVariantPrice1 || 0) + (breakdown.glassFinishPrice1 || 0) + breakdown.mattePrice1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium text-gray-700 mb-2">Factor Applications:</p>
                  <div className="space-y-1 text-xs text-gray-600 ml-4">
                    <div className="flex justify-between">
                      <span>• Glass Factor Applied:</span>
                      <span className="font-medium">{breakdown.glassFactor}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Secondary Factor Applied:</span>
                      <span className="font-medium">{breakdown.secFactor}x</span>
                    </div>
                    <div className="border-t pt-1 mt-2">
                      <div className="flex justify-between font-medium text-green-600">
                        <span>Final Glass Price per SqFt:</span>
                        <span>{formatCurrency(breakdown.totalGlassPrice || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="font-medium text-green-700 mb-2">Final Calculation:</p>
                  <div className="space-y-1 text-xs text-green-600 ml-4">
                    <div className="flex justify-between">
                      <span>• Total Square Feet:</span>
                      <span className="font-medium">{result.totalSquareFeet?.toFixed(2)} sqft</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Price per SqFt:</span>
                      <span className="font-medium">{formatCurrency(breakdown.totalGlassPrice || 0)}</span>
                    </div>
                    <div className="border-t pt-1 mt-2">
                      <div className="flex justify-between font-bold text-green-700">
                        <span>Final Solution Price:</span>
                        <span>{formatCurrency(result.finalSolutionPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Standard calculation breakdown
          <div className="grid grid-cols-1 gap-4">
            {/* Hardware Components */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-blue-600">Hardware Components</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-medium text-blue-700 mb-2">Hardware Price Calculation:</p>
                  <div className="space-y-1 text-xs text-blue-600 ml-4">
                    <p>• Calculated from Door Count (D) and Fixed Partition Count (F) in orientation</p>
                    <div className="flex justify-between">
                      <span>Hardware Price:</span>
                      <span className="font-medium">{formatCurrency(breakdown.hardwarePrice)}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Lock Price:</span>
                    <span className="font-medium">{formatCurrency(breakdown.lockPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Handle Price (× Door Count):</span>
                    <span className="font-medium">{formatCurrency(breakdown.handlePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Door Closer (× Door Count):</span>
                    <span className="font-medium">{formatCurrency(breakdown.doorCloserPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Door Seal (× Door Count):</span>
                    <span className="font-medium">{formatCurrency(breakdown.doorSealPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Components */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-purple-600">Profile Components</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-purple-50 p-3 rounded">
                  <p className="font-medium text-purple-700 mb-2">Profile Price Calculation:</p>
                  <div className="space-y-1 text-xs text-purple-600 ml-4">
                    <p>• Profile Cost × Max(Min Profile SqFt, Calculated SqFt)</p>
                    <div className="flex justify-between">
                      <span>Profile Price:</span>
                      <span className="font-medium">{formatCurrency(breakdown.profilePrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Components */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-green-600">Glass Components</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-700 mb-2">Glass Variant 1 Calculation:</p>
                  <div className="space-y-1 text-xs text-green-600 ml-4">
                    <p>• Glass Variant Price × Square Feet × (GL One Percent / 100)</p>
                    <div className="flex justify-between">
                      <span>Glass Variant 1:</span>
                      <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matte Price 1:</span>
                      <span className="font-medium">{formatCurrency(breakdown.mattePrice1)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-700 mb-2">Glass Variant 2 Calculation:</p>
                  <div className="space-y-1 text-xs text-green-600 ml-4">
                    <p>• Glass Variant Price × Square Feet × (GL Two Percent / 100)</p>
                    <div className="flex justify-between">
                      <span>Glass Variant 2:</span>
                      <span className="font-medium">{formatCurrency(breakdown.glassVariantPrice2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matte Price 2:</span>
                      <span className="font-medium">{formatCurrency(breakdown.mattePrice2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-700 mb-2">Outer Glass Calculation:</p>
                  <div className="space-y-1 text-xs text-green-600 ml-4">
                    <p>• Outer Variant Price × Square Feet</p>
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
              </div>
            </div>

            {/* Design & Accessories */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-orange-600">Design & Accessories</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-medium text-orange-700 mb-2">Additional Components:</p>
                  <div className="space-y-1 text-xs text-orange-600 ml-4">
                    <div className="flex justify-between">
                      <span>Design Price (Design Cost × SqFt):</span>
                      <span className="font-medium">{formatCurrency(breakdown.designPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accessories (Variant Price × Quantity):</span>
                      <span className="font-medium">{formatCurrency(breakdown.accessoriesPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Calculation */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-red-600">Final Calculation Process</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-700 mb-2">Step-by-Step Calculation:</p>
                  <div className="space-y-1 text-xs text-red-600 ml-4">
                    <p className="font-medium">1. Sum all component prices:</p>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>Profile + Hardware + Glass + Design + Accessories:</span>
                        <span className="font-medium">{formatCurrency(breakdown.totalBeforeFactor)}</span>
                      </div>
                    </div>

                    <p className="font-medium mt-2">2. Apply factors:</p>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>Primary Factor:</span>
                        <span className="font-medium">{breakdown.factor}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Secondary Factor:</span>
                        <span className="font-medium">{breakdown.secFactor}x</span>
                      </div>
                    </div>

                    <p className="font-medium mt-2">3. Final calculation:</p>
                    <div className="ml-4">
                      <p className="text-xs">Total × Primary Factor × Secondary Factor = Final Price</p>
                      <div className="flex justify-between font-bold text-red-700 border-t pt-1 mt-1">
                        <span>Final Solution Price:</span>
                        <span>{formatCurrency(result.finalSolutionPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};