import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  FileText,
  ScrollText,
  XCircle,
} from "lucide-react";

export const AnalysisResult = ({
  resultatAnalyse,
  iconesPreuves,
  libellesPreuves,
}) => (
  <div className="sticky top-4 sm:top-6 bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl">
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Conclusion
      </h2>
    </div>

    <div
      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${
        resultatAnalyse.coupable === "vrai"
          ? "bg-red-50 border-red-300"
          : "bg-green-50 border-green-300"
      } backdrop-blur-sm`}
    >
      {/* Status principal */}
      <div className="text-center mb-6 sm:mb-8">
        {resultatAnalyse.coupable === "vrai" ? (
          <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto mb-3 sm:mb-4" />
        ) : (
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-3 sm:mb-4" />
        )}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {resultatAnalyse.individu.toUpperCase()}
        </h3>
        <p className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4 px-2">
          {resultatAnalyse.infraction}
        </p>
        <div
          className={`text-3xl sm:text-4xl font-black mb-2 ${
            resultatAnalyse.coupable === "vrai"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {resultatAnalyse.coupable === "vrai" ? "COUPABLE" : "INNOCENT"}
        </div>
        <div className="text-base sm:text-lg text-gray-600">
          Confiance:{" "}
          <span className="font-bold">{resultatAnalyse.confiance}%</span>
        </div>
      </div>

      {/* Preuves */}
      <div className="mb-4 sm:mb-6">
        <h4 className="font-bold mb-3 sm:mb-4 text-lg sm:text-xl text-gray-900 flex items-center gap-2">
          <ScrollText className="w-4 h-4 sm:w-5 sm:h-5" /> Preuves
        </h4>
        {resultatAnalyse.preuves && resultatAnalyse.preuves.length > 0 ? (
          <div className="space-y-2 sm:space-y-3">
            {resultatAnalyse.preuves.map((preuve, i) => (
              <div
                key={i}
                className="flex items-center p-2 sm:p-3 bg-gray-100 rounded-lg sm:rounded-xl border border-gray-200"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  {iconesPreuves[preuve] || (
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </div>
                <span className="text-gray-900 font-medium text-sm sm:text-base">
                  {libellesPreuves[preuve] || `Preuve inconnue: ${preuve}`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-3 sm:py-4 text-sm sm:text-base">
            Aucune preuve disponible
          </p>
        )}
      </div>

      {/* Requête Prolog */}
      <div className="bg-gray-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200">
        <h4 className="font-bold mb-2 sm:mb-3 text-gray-900 flex items-center gap-2 text-sm sm:text-base">
          <FileText className="w-4 h-4" /> Requête Prolog
        </h4>
        <code className="text-blue-700 font-mono text-xs sm:text-sm block mb-2 sm:mb-3 break-all">
          ?- culpable({resultatAnalyse.individu}, {resultatAnalyse.infraction}).
        </code>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-gray-700 text-sm sm:text-base">Résultat:</span>
          <span
            className={`font-bold px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm inline-block ${
              resultatAnalyse.coupable === "vrai"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {resultatAnalyse.coupable}
          </span>
        </div>
      </div>
    </div>
  </div>
);
