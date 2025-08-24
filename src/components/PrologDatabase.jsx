import {
  CreditCard,
  Database,
  Eye,
  Fingerprint,
  MapPin,
  Target,
  UserX,
} from "lucide-react";

export const PrologDatabase = ({ baseFaits }) => (
  <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl">
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-3 sm:mb-0">
        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Base de données Prolog
      </h2>
    </div>

    {baseFaits && (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Type de fait : Motifs */}
        <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
          <h3 className="font-bold text-blue-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" /> Motifs
          </h3>
          <div className="space-y-2">
            {baseFaits.mobiles.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                mobile({s}, {c}).
              </div>
            ))}
          </div>
        </div>

        {/* Type de fait : Présence */}
        <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200">
          <h3 className="font-bold text-purple-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> Présence
          </h3>
          <div className="space-y-2">
            {baseFaits.pres_scene.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                pres_de_scene({s}, {c}).
              </div>
            ))}
          </div>
        </div>

        {/* Type de fait : Empreintes */}
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
          <h3 className="font-bold text-pink-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" /> Empreintes
          </h3>
          <div className="space-y-2">
            {baseFaits.empreintes.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                empreinte({s}, {c}).
              </div>
            ))}
          </div>
        </div>

        {/* Type de fait : Transactions */}
        <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200">
          <h3 className="font-bold text-amber-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" /> Transactions
          </h3>
          <div className="space-y-2">
            {baseFaits.transactions.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                transaction({s}, {c}).
              </div>
            ))}
          </div>
        </div>

        {/* Type de fait : Fausses ID */}
        <div className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-200">
          <h3 className="font-bold text-red-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <UserX className="w-4 h-4 sm:w-5 sm:h-5" /> Fausses ID
          </h3>
          <div className="space-y-2">
            {baseFaits.fausses_id.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                fausse_identite({s}, {c}).
              </div>
            ))}
          </div>
        </div>

        {/* Type de fait : Témoins */}
        <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
          <h3 className="font-bold text-green-600 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> Témoins
          </h3>
          <div className="space-y-2">
            {baseFaits.temoins.map(([s, c], i) => (
              <div
                key={i}
                className="text-gray-700 font-mono text-xs sm:text-sm bg-white/70 p-2 rounded border"
              >
                temoin({s}, {c}).
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
