import React from 'react';
import { Agent } from '../types';
import { ExternalLink, MessageSquare } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  // Função para obter o nome da integração a partir do ID
  const getIntegrationName = (id: string): string => {
    const integrationMap: Record<string, string> = {
      slack: 'Slack',
      teams: 'Teams',
      gmail: 'Gmail',
      calendar: 'Calendar',
      drive: 'Drive',
      zapier: 'Zapier',
      notion: 'Notion',
      salesforce: 'Salesforce'
    };
    
    return integrationMap[id] || id;
  };
  
  // Função para obter o nome da base de conhecimento a partir do ID
  const getKnowledgeBaseName = (id: string): string => {
    const kbMap: Record<string, string> = {
      company_docs: 'Docs',
      product_info: 'Produtos',
      customer_data: 'Clientes',
      market_research: 'Mercado',
      internal_wiki: 'Wiki',
      training_materials: 'Treinamento'
    };
    
    return kbMap[id] || id;
  };
  
  // Função para obter o nome da personalidade a partir do ID
  const getPersonalityName = (id: string): string => {
    const personalityMap: Record<string, string> = {
      professional: 'Profissional',
      friendly: 'Amigável',
      analytical: 'Analítico',
      creative: 'Criativo',
      assertive: 'Assertivo',
      supportive: 'Prestativo'
    };
    
    return personalityMap[id] || id;
  };

  return (
    <div className="agent-card group">
      <div className="relative">
        <img 
          src={agent.avatarUrl} 
          alt={agent.name} 
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          <p className="text-sm text-mavericks-purple-light">{agent.role}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-gray-400 mb-1">Personalidade</p>
          <div className="badge">{getPersonalityName(agent.personality)}</div>
        </div>
        
        <div>
          <p className="text-xs text-gray-400 mb-1">Integrações</p>
          <div className="flex flex-wrap gap-1">
            {agent.integrations.slice(0, 3).map((integration) => (
              <div key={integration} className="badge">{getIntegrationName(integration)}</div>
            ))}
            {agent.integrations.length > 3 && (
              <div className="badge">+{agent.integrations.length - 3}</div>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-400 mb-1">Base de Conhecimento</p>
          <div className="flex flex-wrap gap-1">
            {agent.knowledgeBase.slice(0, 2).map((kb) => (
              <div key={kb} className="badge">{getKnowledgeBaseName(kb)}</div>
            ))}
            {agent.knowledgeBase.length > 2 && (
              <div className="badge">+{agent.knowledgeBase.length - 2}</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0 flex space-x-2">
        <button className="btn-secondary flex-1 py-2 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 mr-1" />
          <span>Chat</span>
        </button>
        <button className="btn-secondary flex-1 py-2 flex items-center justify-center">
          <ExternalLink className="w-4 h-4 mr-1" />
          <span>Detalhes</span>
        </button>
      </div>
    </div>
  );
};

export default AgentCard;