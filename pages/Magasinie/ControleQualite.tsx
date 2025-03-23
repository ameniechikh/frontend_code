import { useState } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { Camera, FileText, CheckCircle } from "lucide-react";
import Button from "../../componentFournisseur/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/Card";

const ControleQualite = () => {
  const [defauts, setDefauts] = useState([]);
  const [photo, setPhoto] = useState(null);

  const handleAddDefaut = () => {
    const description = prompt("Décrivez le défaut détecté :");
    if (description) {
      setDefauts([...defauts, { description, photo }]);
    }
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>✅ Contrôle Qualité</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">✔ Checklist Normes ISO/EN</h3>
              <ul className="list-disc ml-6">
                <li>Contrôle dimensionnel</li>
                <li>Tests mécaniques</li>
                <li>Analyse chimique</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4">🛑 Enregistrement des défauts</h3>
              <input type="file" accept="image/*" onChange={handleUploadPhoto} className="mb-2" />
              {photo && <img src={photo} alt="Défaut" className="w-40 h-40 border rounded-lg" />}
              <Button onClick={handleAddDefaut} className="mt-2"><Camera size={18} /> Ajouter Défaut</Button>
              
              {defauts.length > 0 && (
                <ul className="mt-4">
                  {defauts.map((defaut, index) => (
                    <li key={index} className="border p-2 rounded-lg flex items-center">
                      {defaut.photo && <img src={defaut.photo} alt="Defaut" className="w-16 h-16 mr-2" />}
                      <span>{defaut.description}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <h3 className="text-lg font-semibold mt-4">📜 Émission de certificats matériaux</h3>
              <Button variant="primary" className="mt-2">
                <FileText size={18} /> Générer Certificat PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ControleQualite;
