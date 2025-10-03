import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full p-4 z-50 text-zinc-300 bg-[#0E0E11]/70 backdrop-blur-xs transition-all">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/login" className="text-xl font-bold text-white">
          GastosApp
        </a>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login">
            <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Iniciar sesión
            </Button>
          </a>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Dropdown mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#0E0E11]/90 backdrop-blur-sm p-4 space-y-2">
          <a href="/login" className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Iniciar sesión
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};
