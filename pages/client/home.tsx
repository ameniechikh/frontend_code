import React, { useState } from "react";
import Header from "../../componentclient/Header";
import Sidebar from "../../componentclient/Sidebar";
import Footer from "../../componentclient/Footer";

const Home = () => {
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajouter ici la logique d'envoi (API, email, etc.)
    console.log('Données du formulaire:', formData);
    alert('Merci pour votre message ! Nous vous répondrons sous 24h.');
    setFormData({ name: '', email: '', message: '' });
    setShowContact(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r sticky top-0">
        <Sidebar isOpen={true} toggle={() => {}} />
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <Header toggleSidebar={() => {}} />
        </header>

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-auto p-6">
          {/* Section Bienvenue */}
          <section className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">🏗️ Bienvenue chez Fère Industries</h1>
            <p className="text-gray-600 mt-2">
              Votre partenaire de confiance pour l'acier et les matériaux métalliques de haute qualité.
            </p>
          </section>

          {/* Section Image & Description */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg p-4">
              <img 
                src="/fer10.jpg" 
                alt="Production de Fer" 
                className="w-full h-60 object-cover rounded"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">🔍 À propos de nous</h2>
              <p className="text-gray-700 mt-2">
                Fère Industries est une société spécialisée dans la production et la distribution 
                de fer et d’acier de haute qualité. Grâce à notre expertise et nos installations modernes, 
                nous fournissons des matériaux robustes adaptés à tous types de projets industriels 
                et de construction.
              </p>
            </div>
          </section>

          {/* Section Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">🔧 Nos Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Découpe sur mesure",
                  image: "/image1.jpg",
                  description: "Précision millimétrique pour vos besoins spécifiques"
                },
                {
                  id: 2,
                  title: "Livraison express",
                  image: "/image2.jpg",
                  description: "Service rapide dans toute la France"
                },
                {
                  id: 3,
                  title: "Qualité certifiée",
                  image: "/image3.jpg",
                  description: "Normes ISO 9001 garanties"
                }
              ].map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-3">{service.title}</h3>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section Contact Dynamique */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Contactez-nous</h2>
              <button
                onClick={() => setShowContact(!showContact)}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {showContact ? 'Masquer les options' : 'Nous Contacter'}
              </button>
            </div>

            {showContact && (
              <div className="mt-8 pt-8 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Formulaire */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Nom complet *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Message *</label>
                      <textarea
                        rows="4"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Envoyer le message
                    </button>
                  </form>

                  {/* Autres contacts */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">📌 Contact direct</h3>
                      <div className="space-y-3">
                        <p className="flex items-center">
                          📞 <a href="tel:+33123456789" className="ml-2 hover:text-blue-600">+33 1 23 45 67 89</a>
                        </p>
                        <p className="flex items-center">
                          📧 <a href="mailto:contact@fere-industries.com" className="ml-2 hover:text-blue-600">contact@fere-industries.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">📍 Notre adresse</h3>
                      <p className="text-gray-600">
                        12 Rue de l'Acier<br/>
                        75000 Paris<br/>
                        France
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">🌐 Réseaux sociaux</h3>
                      <div className="flex space-x-4 justify-center">
                        <a href="#" className="text-blue-600 hover:text-blue-800">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
       
          
        
      </div>
    </div>
  );
};

export default Home;