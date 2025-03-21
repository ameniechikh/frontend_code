import { useState } from "react";
import HeaderFournisseur from "../../componentFournisseur/HeaderFournisseur";
import SidebarFournisseur from "../../componentFournisseur/SidebarFournisseur";
import { Send, Paperclip, Smile, Trash } from "lucide-react";
import Input from "../../componentFournisseur/input";
import Button from "../../componentFournisseur/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../componentFournisseur/card";

const conversations = [
  { id: 1, nom: "Usine Alpha", lastMessage: "Livraison prévue demain ✔️", unread: 2 },
  { id: 2, nom: "SteelTech", lastMessage: "Besoin d’un ajustement de stock ⚙️", unread: 0 },
  { id: 3, nom: "Aciérie Global", lastMessage: "Facture proforma envoyée 📎", unread: 1 },
];

const messages = [
  { from: "Me", text: "Bonjour, la livraison est confirmée 🚛", time: "10:30", attachment: null },
  { from: "Usine Alpha", text: "Super, on vous attend demain !", time: "10:32", attachment: null },
  { from: "Me", text: "Facture jointe 📎", time: "10:35", attachment: "facture.pdf" },
];

const emojis = ["🚛", "🏗️", "⚙️", "📦", "📊"];

const Messagerie = () => {
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSendMessage = () => {
    if (message.trim() || file) {
      // Ajouter le message ou fichier envoyé
      messages.push({
        from: "Me",
        text: message,
        time: new Date().toLocaleTimeString(),
        attachment: file ? URL.createObjectURL(file) : null,
      });
      
      // Simulation d'une réponse
      setTimeout(() => {
        messages.push({
          from: selectedConversation.nom,
          text: `Réponse automatique à votre message: ${message}`,
          time: new Date().toLocaleTimeString(),
          attachment: null,
        });
        setMessage(""); // Réinitialiser le message
        setFile(null); // Réinitialiser le fichier
      }, 1000); // Réponse après 1 seconde
    }
  };

  const handleDeleteMessage = (index: number) => {
    messages.splice(index, 1); // Supprimer le message à l'index donné
    setSelectedConversation({ ...selectedConversation }); // Trigger re-render
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarFournisseur />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderFournisseur />

        <div className="flex flex-1 p-6">
          {/* Liste des conversations */}
          <Card className="w-1/4 mr-6">
            <CardHeader>
              <CardTitle>📩 Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 cursor-pointer rounded flex justify-between ${selectedConversation.id === conv.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <span style={{ color: conv.nom === "Usine Alpha" ? "blue" : "inherit" }}>
                    {conv.nom}
                  </span>
                  {conv.unread > 0 && <span className="bg-red-500 text-white px-2 rounded-full">{conv.unread}</span>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Zone de discussion */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>💬 {selectedConversation.nom}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Historique des messages */}
              <div className="flex-1 overflow-y-auto mb-4 border-b pb-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 flex ${msg.from === "Me" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-2 rounded-lg ${msg.from === "Me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                      <p>{msg.text}</p>
                      {msg.attachment && (
                        <p className="text-xs text-gray-700">
                          📎{" "}
                          {msg.attachment.includes("pdf") ? (
                            <a href={msg.attachment} download>{msg.attachment}</a>
                          ) : (
                            <img src={msg.attachment} alt="Attachment" className="max-w-xs mt-2" />
                          )}
                        </p>
                      )}
                      <span className="text-xs block mt-1">{msg.time}</span>
                      {/* Bouton de suppression */}
                      {msg.from === "Me" && (
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteMessage(index)}
                          className="mt-2"
                        >
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Barre d'envoi de message */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost">
                  <Paperclip size={20} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  />
                </Button>
                <Input
                  type="text"
                  placeholder="Écrire un message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" onClick={() => setEmojiVisible(!emojiVisible)}>
                  <Smile size={20} />
                  {emojiVisible && (
                    <div className="absolute mt-10 bg-white shadow-md p-2 rounded">
                      {emojis.map((emoji) => (
                        <span
                          key={emoji}
                          className="p-1 cursor-pointer text-lg"
                          onClick={() => setMessage((prev) => prev + emoji)}
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </Button>
                <Button className="bg-blue-600 text-white" onClick={handleSendMessage}>
                  <Send size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messagerie;
