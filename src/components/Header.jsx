import { GraduationCap, Shield, Users, Zap } from "lucide-react";

export const Header = () => (
  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200/60 shadow-sm transition-all duration-500 mb-6 sm:mb-8 lg:mb-10">
    {/* Container principal responsive */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
      {/* Section gauche - Branding */}
      <div className="flex-1 min-w-0">
        {/* Logo et titre */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Shield className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white drop-shadow-sm" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-tight tracking-tight">
              CRIMAINALYZER
            </h1>
            {/* Badge version mobile */}
            <div className="sm:hidden mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                <Zap className="w-3 h-3" />
                React + Prolog
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium">
            Système d'Investigation Criminelle Intelligent
          </p>

          {/* Badge version desktop */}
          <div className="hidden sm:flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-sm font-medium rounded-full border border-amber-200/80">
              <Zap className="w-4 h-4" />
              Powered by React + Prolog
            </span>
          </div>
        </div>
      </div>

      {/* Section droite - Informations du groupe */}
      <div className="w-full lg:w-auto lg:min-w-[300px]">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-inner">
          {/* En-tête de la section */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-800 uppercase tracking-wide">
              Matricule des membres du groupe
            </h3>
          </div>

          {/* Liste des matricules */}
          <div className="space-y-2 grid grid-cols-2 gap-1">
            {[
              "1332 H-F",
              "1324 H-F",
              "1281 H-F",
              "1294 H-F",
              "1235 H-F",
              "1334 H-F",
              "1339 H-F",
            ].map((membre, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 bg-white/60 rounded-lg border border-gray-200/50 hover:bg-white/80 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-gray-700 group-hover:text-gray-900 transition-colors">
                  {membre}
                </span>
              </div>
            ))}
          </div>

          {/* Footer de la section */}
          <div className="mt-4 pt-3 border-t border-gray-200/60">
            <p className="text-xs text-gray-500 text-center font-medium">
              ENI Fianarantsoa • M1 IG G1
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Barre de progression décorative */}
    <div className="mt-6 sm:mt-8">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-sm"></div>
    </div>
  </div>
);
