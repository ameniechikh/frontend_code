import { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../componentMagasinie/Header";
import Sidebar from "../../componentMagasinie/Sidebar";
import { QrCode, ClipboardList, Save, X } from "lucide-react";

interface InventoryItem {
  id: string;
  reference: string;
  nom: string;
  quantiteSysteme: number;
  quantiteReelle: number | null;
  ecart: number;
  notes: string;
}

const Inventaire = () => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { 
      id: "P-001",
      reference: "AC-S355",
      nom: "Acier Haute Résistance",
      quantiteSysteme: 150,
      quantiteReelle: null,
      ecart: 0,
      notes: ""
    },
    { 
      id: "P-002",
      reference: "AL-6061",
      nom: "Profilé Aluminium",
      quantiteSysteme: 85,
      quantiteReelle: null,
      ecart: 0,
      notes: ""
    }
  ]);

  // Gestion du flux vidéo
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
      }
    };

    if (scanning) {
      initCamera();
    }

    return () => {
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [scanning]);

  // Scanner QR
  const scanQRCode = useCallback(async () => {
    if (!videoRef.current || !scanning) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Utilisation dynamique de jsQR pour éviter les problèmes SSR
    const jsQR = (await import('jsqr')).default;
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      const product = inventory.find(p => p.reference === code.data);
      if (product) {
        setInventory(prev => prev.map(item => 
          item.id === product.id ? { 
            ...item, 
            quantiteReelle: item.quantiteReelle ?? item.quantiteSysteme,
            ecart: (item.quantiteReelle ?? item.quantiteSysteme) - item.quantiteSysteme
          } : item
        ));
      }
    }

    if (scanning) requestAnimationFrame(scanQRCode);
  }, [scanning, inventory]);

  useEffect(() => {
    if (scanning) {
      requestAnimationFrame(scanQRCode);
    }
  }, [scanning, scanQRCode]);

  const handleUpdateQuantity = (id: string, value: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const quantiteReelle = Number(value);
        return {
          ...item,
          quantiteReelle,
          ecart: quantiteReelle - item.quantiteSysteme
        };
      }
      return item;
    }));
  };

  const handleAddNote = (id: string, note: string) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, notes: note } : item
    ));
  };

  const handleSubmitInventory = () => {
    console.log("Inventaire soumis:", inventory);
    alert("Inventaire mis à jour avec succès!");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ClipboardList size={24} />
                Inventaire du Stock
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setScanning(!scanning)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <QrCode size={18} className="mr-2" />
                  {scanning ? "Arrêter le scan" : "Scanner QR"}
                </button>
                <button
                  onClick={handleSubmitInventory}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Valider l'inventaire
                </button>
              </div>
            </div>

            {scanning && (
              <div className="p-4 border-b">
                <div className="relative w-full max-w-md mx-auto">
                  <video 
                    ref={videoRef} 
                    className="rounded-lg w-full"
                    autoPlay
                    playsInline
                  />
                  <button
                    onClick={() => setScanning(false)}
                    className="absolute top-2 right-2 text-red-600 bg-white p-1 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Référence</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Produit</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantité système</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantité réelle</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Écart</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Notes/dommages</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.reference}</td>
                      <td className="px-4 py-3">{item.nom}</td>
                      <td className="px-4 py-3">{item.quantiteSysteme}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantiteReelle ?? ""}
                          onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                          className="w-24 px-2 py-1 border rounded"
                        />
                      </td>
                      <td className={`px-4 py-3 font-medium ${
                        Math.abs(item.ecart) > 5 ? "text-red-600" : "text-green-600"
                      }`}>
                        {item.ecart}
                      </td>
                      <td className="px-4 py-3">
                        <textarea
                          value={item.notes}
                          onChange={(e) => handleAddNote(item.id, e.target.value)}
                          className="w-64 px-2 py-1 border rounded text-sm"
                          placeholder="Entrez vos observations..."
                          rows={2}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600">Articles vérifiés</h3>
                  <p className="text-2xl font-bold mt-1">
                    {inventory.filter(item => item.quantiteReelle !== null).length}/{inventory.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-600">Écarts acceptables (±5)</h3>
                  <p className="text-2xl font-bold mt-1">
                    {inventory.filter(item => Math.abs(item.ecart) <= 5).length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-red-600">Écarts critiques</h3>
                  <p className="text-2xl font-bold mt-1">
                    {inventory.filter(item => Math.abs(item.ecart) > 5).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventaire;