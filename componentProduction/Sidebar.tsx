"use client";

import Link from "next/link";
import React from "react";
import { 
  LayoutDashboard, 
  Factory, 
  ClipboardList, 
  Gauge 
} from "lucide-react";
import Image from "next/image";

const SidebarProduction = () => {
  const navItems = [
    { href: "/AgentProduction/Dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { href: "/AgentProduction/PlanificationProduction", icon: Factory, label: "Planification de Production" },
    { href: "/AgentProduction/SuiviProduction", icon: ClipboardList, label: "Suivi de production" },
    
    { href: "/AgentProduction/DemandeProduction", icon: Gauge, label: "Demande Production" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-blue-600 text-white z-50 shadow-lg">
      <div className="p-4">
        {/* Logo circulaire */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md">
            <Image 
              src="/logo6.png" // 🔁 Remplace par le bon chemin de ton logo
              alt="Logo"
              width={76}
              height={76}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* En-tête Sidebar */}
        <div className="flex items-center gap-3 mb-6 px-2 justify-center">
          <Factory className="h-6 w-6 text-white" />
          <h2 className="text-lg font-semibold">Production</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-500"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-white">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarProduction;
