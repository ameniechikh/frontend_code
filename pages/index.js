import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirige vers la page de login
  }, []);

  return null; // Ne rien afficher
};

export default Home;
