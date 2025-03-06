export interface Agent {
  id: string;
  name: string;
  role: string;
  integrations: string[];
  knowledgeBase: string[];
  personality: string;
  avatarUrl: string;
  createdAt: Date;
}

export interface AgentFormData {
  name: string;
  role: string;
  integrations: string[];
  knowledgeBase: string[];
  personality: string;
}