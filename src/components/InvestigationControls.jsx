import { Search, Users } from "lucide-react";

export const InvestigationControls = ({
  listeSuspects,
  listeCrimes,
  suspectChoisi,
  setSuspectChoisi,
  crimeChoisi,
  setCrimeChoisi,
  chargement,
  analyserDossier,
}) => (
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl hover:shadow-blue-100 transition-all duration-500">
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Lancer une enquête
      </h2>
    </div>

    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Sélecteur suspects */}
      <div className="group">
        <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-700 group-hover:text-gray-900 transition-colors">
          🕵️ Suspect :
        </label>
        <select
          value={suspectChoisi}
          onChange={(e) => setSuspectChoisi(e.target.value)}
          className="w-full p-3 sm:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 text-gray-900 text-base sm:text-lg hover:bg-gray-100"
        >
          <option value="">-- Choisir un suspect --</option>
          {listeSuspects.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sélecteur crimes */}
      <div className="group">
        <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-700 group-hover:text-gray-900 transition-colors">
          ⚖️ Crime :
        </label>
        <select
          value={crimeChoisi}
          onChange={(e) => setCrimeChoisi(e.target.value)}
          className="w-full p-3 sm:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 text-gray-900 text-base sm:text-lg hover:bg-gray-100"
        >
          <option value="">-- Choisir un crime --</option>
          {listeCrimes.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Bouton d'analyse */}
    <button
      onClick={analyserDossier}
      disabled={chargement || !suspectChoisi || !crimeChoisi}
      className="w-full py-4 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl font-bold text-white text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 transform"
    >
      {chargement ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
          <span className="hidden sm:inline">Analyse en cours...</span>
          <span className="sm:hidden">Analyse...</span>
        </>
      ) : (
        <>
          <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          <span className="hidden sm:inline">Lancer l'enquête</span>
          <span className="sm:hidden">Enquête</span>
        </>
      )}
    </button>
  </div>
);
