import { useState } from "react";
import { FaRegComment } from 'react-icons/fa';
import HeaderAgentCommercial from "../../componentCommercial/Header";
import SidebarAgentCommercial from "../../componentCommercial/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";
import Button from "../../componentFournisseur/button";
import { MapPin, Truck, CheckCircle, AlertCircle } from "lucide-react";

const Livraisons = () => {
  const [positionCamion, setPositionCamion] = useState({ lat: 48.8566, lng: 2.3522 }); // Example position (Paris)
  const [alertes, setAlertes] = useState([]);
  const [preuveLivraison, setPreuveLivraison] = useState(null);
  const [feedbackClient, setFeedbackClient] = useState({
    satisfaction: "",
    reclamation: "",
    suggestions: ""
  });

  // Simulate feedback analysis (use NLP in a real app)
  const analyseFeedback = (feedback) => {
    // Example logic for detecting dissatisfaction based on keyword
    if (feedback.includes("mauvais") || feedback.includes("pas satisfait")) {
      return "Insatisfaction détectée";
    }
    return "Satisfaction OK";
  };

  const handleFeedbackSubmit = () => {
    const result = analyseFeedback(feedbackClient.satisfaction);
    setAlertes((prevAlertes) => [...prevAlertes, result]);
    // Further processing (e.g., send to API)
  };

  const handlePreuveLivraison = (file) => {
    setPreuveLivraison(file); // Handle proof of delivery file (photo or signature)
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-purple-100 h-full fixed left-0 top-0 p-5 z-50 shadow-xl">
        <SidebarAgentCommercial />
      </div>

      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <HeaderAgentCommercial />
        </div>

        <div className="flex justify-center items-start p-6 flex-1">
          <div className="w-full max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>🚚 Suivi Livraisons</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Carte GPS et Suivi en Temps Réel */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold">Position Camion en Temps Réel</h3>
                  </div>
                  <div className="border border-gray-300 rounded-lg h-64">
                    {/* Carte de suivi GPS, par exemple avec un outil comme Google Maps API */}
                    <div className="w-full h-full">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?q=${positionCamion.lat},${positionCamion.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Alertes Livraisons</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {alertes.map((alerte, index) => (
                        <li key={index} className="text-red-500">
                          <AlertCircle className="inline-block w-4 h-4 text-red-500" /> {alerte}
                        </li>
                      ))}
                      {/* Simulate alert logic */}
                      <li className="text-yellow-500">
                        <AlertCircle className="inline-block w-4 h-4 text-yellow-500" /> Retard > 2h
                      </li>
                      <li className="text-yellow-500">
                        <AlertCircle className="inline-block w-4 h-4 text-yellow-500" /> Déviation itinéraire
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Preuves Livraison */}
                <div className="space-y-6 mt-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="font-semibold">Preuve de Livraison</h3>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="file"
                      onChange={(e) => handlePreuveLivraison(e.target.files[0])}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {preuveLivraison && (
                      <div>
                        <h4 className="font-semibold">Preuve de Livraison :</h4>
                        <img src={URL.createObjectURL(preuveLivraison)} alt="Preuve de Livraison" className="w-32 h-32 object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback Client */}
                <div className="space-y-6 mt-6">
                  <div className="flex items-center space-x-3">
                    <FaRegComment className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold">Feedback Client</h3>
                  </div>
                  <div className="space-y-3">
                    <textarea
                      placeholder="Satisfaction client..."
                      value={feedbackClient.satisfaction}
                      onChange={(e) => setFeedbackClient({ ...feedbackClient, satisfaction: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      placeholder="Réclamations..."
                      value={feedbackClient.reclamation}
                      onChange={(e) => setFeedbackClient({ ...feedbackClient, reclamation: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      placeholder="Suggestions..."
                      value={feedbackClient.suggestions}
                      onChange={(e) => setFeedbackClient({ ...feedbackClient, suggestions: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <Button onClick={handleFeedbackSubmit} variant="primary">Envoyer Feedback</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Livraisons;
