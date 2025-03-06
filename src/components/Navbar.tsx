import React from 'react';
import { Brain, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-mavericks-purple/20 bg-black/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-mavericks-purple" />
            <span className="ml-2 text-xl font-semibold text-white">mavericks<sup className="text-xs text-mavericks-orange ml-0.5">AI</sup></span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-mavericks-purple-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">Workspace</a>
              <a href="#" className="text-white bg-mavericks-purple/20 px-3 py-2 rounded-md text-sm font-medium">Criar Agente</a>
              <a href="#" className="text-mavericks-purple-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">Integrações</a>
              <a href="#" className="text-mavericks-purple-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">Relatórios</a>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-gray-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;