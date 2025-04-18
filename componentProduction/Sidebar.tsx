"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  Factory,
  ClipboardList,
  Gauge,
  Settings,
  Wrench,
  PackageCheck
} from "lucide-react";
import Image from "next/image";

const SidebarProduction = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/AgentProduction/Dashboard",
      icon: LayoutDashboard,
      label: "Tableau de bord",
      aria: "Accéder au tableau de bord"
    },
    {
      href: "/AgentProduction/demandesproduction",
      icon: Settings, // 🔄 Demander production
      label: "Demander production",
      aria: "Planifier la production"
    },
    {
      href: "/AgentProduction/SuiviProduction",
      icon: Wrench, // 🛠️ Gérer la production
      label: "Gérer la production",
      aria: "Gérer la production"
    },
    {
      href: "/AgentProduction/GestionProduitsFinis",
      icon: PackageCheck, // 📦 Gérer produits finis
      label: "Gérer produits finis",
      aria: "Gérer les produits finis"
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-blue-600 text-white z-50 shadow-lg">
      <div className="p-4">
        {/* Logo circulaire */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image
              src="/logo6.png"
              alt="Logo de l'entreprise"
              width={76}
              height={76}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Titre de la section */}
        <div className="flex items-center gap-3 mb-6 px-2 justify-center">
          <Factory className="h-6 w-6 text-white" />
          <h2 className="text-lg font-semibold">Production</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.aria}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive ? "bg-blue-700" : "hover:bg-blue-500"}
                  focus:outline-none focus:ring-2 focus:ring-white`}
              >
                <item.icon className="h-5 w-5 text-white" aria-hidden="true" />
                <span className="text-white font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarProduction;
