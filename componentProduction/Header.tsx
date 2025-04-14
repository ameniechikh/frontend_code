"use client"; 

import React, { useState, useEffect, useRef } from "react";
import { Bell, User, LogOut, Settings } from "lucide-react";
import Link from "next/link";

const HeaderProduction = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !(profileRef.current as any).contains(event.target)
      ) {
        setOpenProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !(notificationRef.current as any).contains(event.target)
      ) {
        setOpenNotificationMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Notification */}
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setOpenNotificationMenu(!openNotificationMenu)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {openNotificationMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-600">Pas de notifications.</p>
                </div>
              )}
            </div>

            {/* Profil */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg"
              >
                <User className="h-6 w-6 text-gray-600" />
              </button>

              {openProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={() => {
                      setShowProfileModal(true);
                      setOpenProfileMenu(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <Settings className="h-5 w-5" /> Modifier le profil
                  </button>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" /> Déconnexion
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modal de modification de profil */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Modifier le profil</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Prénom</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Adresse</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Téléphone</label>
                <input type="tel" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Photo de profil</label>
                <input type="file" className="w-full" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderProduction;