import { Search } from "lucide-react";

export const AnalysisPlaceholder = () => (
  <div className="sticky top-4 sm:top-6 bg-gray-50 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 text-center shadow-lg">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">
      En attente d'analyse
    </h3>
    <p className="text-gray-500 text-sm sm:text-base px-2">
      Sélectionnez un suspect et un crime pour commencer l'enquête
    </p>
  </div>
);
