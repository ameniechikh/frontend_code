import { useState } from "react";
import { FaSearch, FaPaperclip, FaPhoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const Support = () => {
  // États
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [faqSearch, setFaqSearch] = useState("");
  const [ticket, setTicket] = useState({
    type: "",
    description: "",
    proof: null as File | null,
  });

  // Données FAQ
  const faqs = [
    { question: "Comment retourner un produit ?", answer: "Vous pouvez retourner un produit sous 30 jours via votre compte." },
    { question: "Quels sont les modes de paiement ?", answer: "Nous acceptons CB, PayPal et virement bancaire." },
    { question: "Comment suivre ma commande ?", answer: "Allez sur 'Mon Compte' > 'Suivi de commande' pour voir l'état de votre colis." },
  ];

  // Handlers
  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, `Vous: ${message}`]);
      setMessage("");
      setTimeout(() => setChat([...chat, `Vous: ${message}`, "Support: Un agent vous répondra bientôt."]), 1000);
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Votre réclamation a été envoyée !");
    setTicket({ type: "", description: "", proof: null });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Fixe à Gauche */}
      <div className="w-64 fixed left-0 top-0 h-full bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Contenu Principal */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header Fixe en Haut */}
        <div className="h-16 bg-white shadow-sm">
          <Header />
        </div>

        {/* Contenu Centré */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Support & Assistance</h1>

            {/* Section Chat */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FaPhoneAlt className="text-blue-500" />
                <h2 className="text-xl font-semibold">Chat en Direct</h2>
              </div>
              <div className="border-2 border-gray-100 rounded-lg p-4 h-48 overflow-y-auto mb-4">
                {chat.map((msg, i) => (
                  <div key={i} className="mb-2 p-2 bg-gray-50 rounded">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
                >
                  <IoSend size={20} />
                </button>
              </div>
            </div>

            {/* Section FAQ */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FaSearch className="text-green-500" />
                <h2 className="text-xl font-semibold">FAQ</h2>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                />
                <FaSearch className="absolute left-2 top-3 text-gray-400" />
              </div>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.question.toLowerCase().includes(faqSearch.toLowerCase()))
                  .map((faq, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      <p className="text-gray-600 mt-1">{faq.answer}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Formulaire de Réclamation */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Formulaire de Réclamation</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <select
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={ticket.type}
                  onChange={(e) => setTicket({ ...ticket, type: e.target.value })}
                >
                  <option value="">Type de problème</option>
                  <option value="retour">Retour produit</option>
                  <option value="paiement">Problème de paiement</option>
                  <option value="livraison">Problème de livraison</option>
                </select>
                
                <textarea
                  className="w-full p-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Décrivez votre problème en détail..."
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                ></textarea>
                
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <FaPaperclip className="inline-block mr-2" />
                    Joindre un fichier
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setTicket({ ...ticket, proof: e.target.files?.[0] || null })}
                    />
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors"
                >
                  Envoyer la réclamation
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* Footer Fixe en Bas */}
        <div className="bg-white border-t">
         
        </div>
      </div>
    </div>
  );
};

export default Support;