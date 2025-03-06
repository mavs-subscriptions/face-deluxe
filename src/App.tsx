import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import AgentForm from './components/AgentForm';
import Workspace from './components/Workspace';
import { Agent, AgentFormData } from './types';

// Função para gerar uma URL de avatar baseada nas configurações do agente
const generateAvatarUrl = (agent: AgentFormData): string => {
  // Usando Unsplash para gerar avatares baseados nas configurações
  const roleKeyword = agent.role === 'Notetaker' ? 'notes' : 'customer-service';
  
  // Extrair palavras-chave da personalidade
  const personalityWords = agent.personality.toLowerCase().split(/\s+/);
  const personalityKeywords = ['professional', 'friendly', 'analytical', 'creative', 'assertive', 'supportive'];
  
  // Encontrar a primeira palavra-chave que corresponde à personalidade
  const personalityKeyword = personalityKeywords.find(keyword => 
    personalityWords.some(word => word.includes(keyword))
  ) || 'professional';
  
  // Usando a API do Unsplash para obter imagens aleatórias baseadas nas configurações
  return `https://source.unsplash.com/300x400/?${roleKeyword},${personalityKeyword},portrait`;
};

function App() {
  const [view, setView] = useState<'workspace' | 'create'>('workspace');
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleCreateAgent = (formData: AgentFormData) => {
    const newAgent: Agent = {
      id: uuidv4(),
      name: formData.name,
      role: formData.role,
      integrations: formData.integrations,
      knowledgeBase: formData.knowledgeBase,
      personality: formData.personality,
      avatarUrl: generateAvatarUrl(formData),
      createdAt: new Date(),
    };
    
    setAgents((prev) => [...prev, newAgent]);
    setView('workspace');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        {view === 'workspace' ? (
          <Workspace 
            agents={agents} 
            onCreateAgent={() => setView('create')} 
          />
        ) : (
          <AgentForm onSubmit={handleCreateAgent} />
        )}
      </main>
      
      <footer className="border-t border-mavericks-purple/20 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Mavericks AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;