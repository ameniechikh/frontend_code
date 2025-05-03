import "../styles/globals.css"; // ✅ Import du fichier de styles global 
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";

// Connexion au backend Socket.io
const socket = io("http://localhost:5000"); // Remplace par ton URL backend si nécessaire

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connexion à Socket.io et écoute des événements
    socket.on("connect", () => {
      console.log("Connecté à Socket.io avec l'ID :", socket.id);
    });

    // Écoute des nouvelles notifications en temps réel
    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [...prev, notif]);
    });

    // Écoute des nouveaux messages en temps réel
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup pour enlever les écouteurs lors du démontage du composant
    return () => {
      socket.off("newNotification");
      socket.off("newMessage");
    };
  }, []); // Ne dépend d'aucune variable car ce code doit être exécuté une seule fois

  return (
    // Passer les props à chaque composant de la page
    <ApolloProvider client={client}>
       <Component
      {...pageProps}
      socket={socket}
      notifications={notifications}
      messages={messages}
    />
    </ApolloProvider>
  );
}
