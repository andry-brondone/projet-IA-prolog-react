import axios from "axios";
import {
  CreditCard,
  Eye,
  Fingerprint,
  MapPin,
  Target,
  UserX,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnalysisPlaceholder } from "./AnalysisPlaceholder";
import { AnalysisResult } from "./AnalysisResult";
import { ErrorDisplay } from "./ErrorDisplay";
import { Header } from "./Header";
import { InvestigationControls } from "./InvestigationControls";
import { PrologDatabase } from "./PrologDatabase";

export const CrimeInvestigation = () => {
  const [listeSuspects, setListeSuspects] = useState([]);
  const [listeCrimes, setListeCrimes] = useState([]);
  const [suspectChoisi, setSuspectChoisi] = useState("");
  const [crimeChoisi, setCrimeChoisi] = useState("");
  const [resultatAnalyse, setResultatAnalyse] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [baseFaits, setBaseFaits] = useState(null);
  const [erreur, setErreur] = useState("");

  // Association icônes / preuves
  const iconesPreuves = {
    mobile: <Target className="w-4 h-4" />,
    pres_scene: <MapPin className="w-4 h-4" />,
    empreinte: <Fingerprint className="w-4 h-4" />,
    temoin: <Eye className="w-4 h-4" />,
    transaction: <CreditCard className="w-4 h-4" />,
    fausse_identite: <UserX className="w-4 h-4" />,
  };

  const libellesPreuves = {
    mobile: "Motif identifié",
    pres_scene: "Présence sur le lieu du crime",
    empreinte: "Empreinte digitale",
    temoin: "Identification par témoin",
    transaction: "Transaction douteuse",
    fausse_identite: "Utilisation d'une fausse identité",
  };

  // Chargement des données initiales (suspects, crimes, faits)
  useEffect(() => {
    fetchDonneesInitiales();
  }, []);

  const fetchDonneesInitiales = async () => {
    try {
      setErreur("");
      const [resSuspects, resCrimes, resFaits] = await Promise.all([
        axios.get("api/suspects"),
        axios.get("api/crimes"),
        axios.get("api/facts"),
      ]);
      setListeSuspects(resSuspects.data.suspects);
      setListeCrimes(resCrimes.data.crimes);
      setBaseFaits(resFaits.data);
    } catch (err) {
      setErreur(
        "Impossible de récupérer les données. Assurez-vous que le serveur Prolog tourne sur le port 8080."
      );
      console.error("Erreur API:", err);
    }
  };

  const analyserDossier = async () => {
    if (!suspectChoisi || !crimeChoisi) {
      setErreur("Vous devez choisir un suspect ET un type de crime.");
      return;
    }

    setChargement(true);
    setErreur("");

    try {
      const payload = { suspect: suspectChoisi, crime: crimeChoisi };
      const reponse = await axios.post("api/evaluer", payload);
      setResultatAnalyse(reponse.data);
    } catch (err) {
      setErreur("Analyse impossible. Vérifiez la connexion au backend Prolog.");
      console.error("Erreur analyse:", err);
    } finally {
      setChargement(false);
    }
  };

  // Gestion erreur initiale (ex: serveur éteint)
  if (erreur && !listeSuspects.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-lg shadow-xl max-w-md w-full">
          <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Connexion échouée
          </h2>
          <p className="text-red-700 mb-3 sm:mb-4 text-base sm:text-lg">
            {erreur}
          </p>
          <p className="text-sm text-gray-600 mb-4 sm:mb-6">
            Vérifiez que le serveur Prolog répond bien sur le port 8080.
          </p>
          <button
            onClick={fetchDonneesInitiales}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animations d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-50 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 relative z-10 max-w-7xl">
        <Header />
        <ErrorDisplay message={erreur} />

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Colonne gauche : Configuration + Base Prolog */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <InvestigationControls
              listeSuspects={listeSuspects}
              listeCrimes={listeCrimes}
              suspectChoisi={suspectChoisi}
              setSuspectChoisi={setSuspectChoisi}
              crimeChoisi={crimeChoisi}
              setCrimeChoisi={setCrimeChoisi}
              chargement={chargement}
              analyserDossier={analyserDossier}
            />
            <PrologDatabase baseFaits={baseFaits} />
          </div>

          {/* Colonne droite : Résultats */}
          <div className="lg:col-span-1">
            {resultatAnalyse ? (
              <AnalysisResult
                resultatAnalyse={resultatAnalyse}
                iconesPreuves={iconesPreuves}
                libellesPreuves={libellesPreuves}
              />
            ) : (
              <AnalysisPlaceholder />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
