import { XCircle } from "lucide-react";

export const ErrorDisplay = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center backdrop-blur-sm animate-pulse">
      <XCircle className="w-6 h-6 text-red-500 mr-0 sm:mr-3 mb-2 sm:mb-0" />
      <span className="text-red-700 text-base sm:text-lg">{message}</span>
    </div>
  );
};
