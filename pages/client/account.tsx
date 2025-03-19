import React, { useState, useEffect } from "react";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const Account = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "/default-avatar.png",
  });

  useEffect(() => {
    // Charger les infos utilisateur depuis localStorage
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (storedUserInfo.firstName) {
      setUserInfo(storedUserInfo);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserInfo({ ...userInfo, profilePic: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("Informations mises à jour !");
    window.dispatchEvent(new Event("storage")); // Déclencher un événement pour le Header
  };

  return (
    <div className="flex h-screen relative">
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} isMobile={isMobile} />

      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "ml-0"
      }`}>
        <Header />

        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Mon Compte</h1>
          <p>Gérez vos informations personnelles.</p>

          <div className="bg-white p-6 shadow rounded-lg mt-4">
            <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>

            <div className="flex items-center space-x-4">
              <img src={userInfo.profilePic} alt="Profil" className="w-24 h-24 rounded-full border" />
              <input type="file" accept="image/*" onChange={handleImageChange} className="block" />
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <button
                onClick={handleUpdate}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </main>

     
      </div>
    </div>
  );
};

export default Account;
