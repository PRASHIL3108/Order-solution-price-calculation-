import React from 'react';

interface RadioOption<T> {
  value: T;
  label: string;
}

interface RadioGroupProps<T> {
  label: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function RadioGroup<T>({
  label,
  options,
  value,
  onChange,
  className = ""
}: RadioGroupProps<T>) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={String(option.value)} className="flex items-center cursor-pointer">
            <input
              type="radio"
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 capitalize">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}