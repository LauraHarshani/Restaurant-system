import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ title = "Payment Failed", message = "Your card was declined. Please try a different payment method or contact your bank." }) => {
  return (
    <div className="flex items-start gap-3 bg-[#160505] border border-[#ff3b3b]/40 rounded-xl p-4 max-w-md shadow-[0_0_15px_rgba(255,59,59,0.15)] text-white">
      <div className="text-[#ff3b3b] mt-0.5">
        <AlertCircle size={22} />
      </div>
      <div>
        <h4 className="text-[#ff3b3b] font-bold text-sm mb-1">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;