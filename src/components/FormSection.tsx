import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className = "",
  priority = false
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 p-6 ${priority
      ? 'border-orange-200 bg-orange-50/30 shadow-orange-100'
      : 'border-gray-200 hover:shadow-md'
      } ${className}`}>
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        {priority && <AlertCircle className="text-orange-500" size={18} />}
        <h3 className={`text-lg font-semibold ${priority ? 'text-orange-700' : 'text-gray-900'
          }`}>
          {title}
        </h3>
        {priority && (
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
            Required
          </span>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};