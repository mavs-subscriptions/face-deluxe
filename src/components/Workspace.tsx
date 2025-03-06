import React from 'react';
import { Agent } from '../types';
import AgentCard from './AgentCard';
import { Plus } from 'lucide-react';

interface WorkspaceProps {
  agents: Agent[];
  onCreateAgent: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ agents, onCreateAgent }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-mavericks-purple-light to-mavericks-orange-light bg-clip-text text-transparent">
            Workspace
          </h1>
          <p className="text-gray-400 mt-1">
            Gerencie seus funcionários digitais e aumente sua produtividade
          </p>
        </div>
        <button 
          onClick={onCreateAgent}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Criar Agente
        </button>
      </div>

      {agents.length === 0 ? (
        <div className="bg-black/30 border border-mavericks-purple/20 rounded-xl p-10 text-center">
          <div className="w-16 h-16 bg-mavericks-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-mavericks-purple-light" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum agente criado</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Crie seu primeiro funcionário digital para automatizar tarefas e aumentar a produtividade da sua equipe
          </p>
          <button 
            onClick={onCreateAgent}
            className="btn-primary"
          >
            Criar Primeiro Agente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
          <div 
            onClick={onCreateAgent}
            className="border-2 border-dashed border-mavericks-purple/30 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:bg-black/30 transition-all min-h-[300px]"
          >
            <div className="w-16 h-16 bg-mavericks-purple/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-mavericks-purple-light" />
            </div>
            <p className="text-lg font-medium text-white mb-1">Adicionar Agente</p>
            <p className="text-sm text-gray-400 text-center">
              Crie um novo funcionário digital para sua equipe
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;