import React, { useState } from 'react';
import { Upload, X, Plus, Sparkles } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AgentFormData } from '../types';

const AVAILABLE_INTEGRATIONS = [
  { id: 'slack', name: 'Slack' },
  { id: 'teams', name: 'Microsoft Teams' },
  { id: 'gmail', name: 'Gmail' },
  { id: 'calendar', name: 'Google Calendar' },
  { id: 'drive', name: 'Google Drive' },
  { id: 'zapier', name: 'Zapier' },
  { id: 'notion', name: 'Notion' },
  { id: 'salesforce', name: 'Salesforce' },
];

const KNOWLEDGE_BASES = [
  { id: 'company_docs', name: 'Documentos da Empresa' },
  { id: 'product_info', name: 'Informações de Produtos' },
  { id: 'customer_data', name: 'Dados de Clientes' },
  { id: 'market_research', name: 'Pesquisas de Mercado' },
  { id: 'internal_wiki', name: 'Wiki Interna' },
  { id: 'training_materials', name: 'Materiais de Treinamento' },
];

const AGENT_CLASSES = [
  { id: 'notetaker', name: 'Notetaker' },
  { id: 'chat_with_crm', name: 'Chat with CRM' },
];

interface AgentFormProps {
  onSubmit: (data: AgentFormData) => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    role: '',
    integrations: [],
    knowledgeBase: [],
    personality: '',
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<number>(1);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: 'integrations' | 'knowledgeBase', id: string) => {
    setFormData((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step === i 
                    ? 'bg-gradient-to-r from-mavericks-purple to-mavericks-orange text-white' 
                    : step > i 
                      ? 'bg-mavericks-purple/20 text-mavericks-purple-light' 
                      : 'bg-black/40 text-gray-400'}`}
              >
                {i}
              </div>
              {i < 4 && (
                <div 
                  className={`w-16 h-0.5 ${step > i 
                    ? 'bg-gradient-to-r from-mavericks-purple to-mavericks-orange/90' 
                    : 'bg-black/40'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-mavericks-purple-light to-mavericks-orange-light bg-clip-text text-transparent">
          Criar Agente Digital
        </h1>
        <p className="text-gray-400 mt-2">
          Configure seu funcionário digital para automatizar tarefas e aumentar a produtividade
        </p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-mavericks-purple/20 text-mavericks-purple-light w-8 h-8 rounded-full flex items-center justify-center mr-2">1</span>
              Informações Básicas
            </h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nome do Agente
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Ana Silva, Assistente Financeiro"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                Classe de Atuação
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="" disabled>Selecione uma classe</option>
                {AGENT_CLASSES.map((agentClass) => (
                  <option key={agentClass.id} value={agentClass.name}>
                    {agentClass.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary w-full"
              >
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-mavericks-purple/20 text-mavericks-purple-light w-8 h-8 rounded-full flex items-center justify-center mr-2">2</span>
              Integrações
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Selecione as APIs que o agente poderá acessar
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {AVAILABLE_INTEGRATIONS.map((integration) => (
                  <div
                    key={integration.id}
                    className={`
                      border rounded-lg p-3 cursor-pointer transition-all
                      ${formData.integrations.includes(integration.id)
                        ? 'border-mavericks-purple bg-mavericks-purple/10'
                        : 'border-gray-700 bg-black/20 hover:bg-black/40'}
                    `}
                    onClick={() => handleCheckboxChange('integrations', integration.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`integration-${integration.id}`}
                        checked={formData.integrations.includes(integration.id)}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border mr-2 flex items-center justify-center
                          ${formData.integrations.includes(integration.id)
                            ? 'bg-mavericks-purple border-mavericks-purple'
                            : 'border-gray-500'}
                        `}
                      >
                        {formData.integrations.includes(integration.id) && (
                          <X className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <label
                        htmlFor={`integration-${integration.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {integration.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-mavericks-purple/20 text-mavericks-purple-light w-8 h-8 rounded-full flex items-center justify-center mr-2">3</span>
              Base de Conhecimento
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Selecione as fontes de conhecimento para o agente
              </label>
              <div className="grid grid-cols-2 gap-3">
                {KNOWLEDGE_BASES.map((kb) => (
                  <div
                    key={kb.id}
                    className={`
                      border rounded-lg p-3 cursor-pointer transition-all
                      ${formData.knowledgeBase.includes(kb.id)
                        ? 'border-mavericks-purple bg-mavericks-purple/10'
                        : 'border-gray-700 bg-black/20 hover:bg-black/40'}
                    `}
                    onClick={() => handleCheckboxChange('knowledgeBase', kb.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`kb-${kb.id}`}
                        checked={formData.knowledgeBase.includes(kb.id)}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded border mr-2 flex items-center justify-center
                          ${formData.knowledgeBase.includes(kb.id)
                            ? 'bg-mavericks-purple border-mavericks-purple'
                            : 'border-gray-500'}
                        `}
                      >
                        {formData.knowledgeBase.includes(kb.id) && (
                          <X className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <label
                        htmlFor={`kb-${kb.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {kb.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Arquivos Adicionais (opcional)
              </label>
              <div 
                {...getRootProps()} 
                className="border-2 border-dashed border-mavericks-purple/30 rounded-lg p-6 cursor-pointer hover:bg-black/40 transition-all text-center"
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 text-mavericks-purple-light mx-auto mb-2" />
                {files.length > 0 ? (
                  <div>
                    <p className="text-sm text-gray-300">{files[0].name}</p>
                    <p className="text-xs text-gray-500 mt-1">Clique para trocar o arquivo</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-300">Arraste arquivos ou clique para selecionar</p>
                    <p className="text-xs text-gray-500 mt-1">PDFs, DOCs, TXTs (máx. 10MB)</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Próximo Passo
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-mavericks-purple/20 text-mavericks-purple-light w-8 h-8 rounded-full flex items-center justify-center mr-2">4</span>
              Personalidade
            </h2>
            
            <div>
              <label htmlFor="personality" className="block text-sm font-medium text-gray-300 mb-1">
                Descreva a personalidade do agente
              </label>
              <textarea
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                placeholder="Ex: Profissional e objetivo, com foco em resultados e comunicação clara..."
                className="input-field min-h-[120px]"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Criar Agente Digital
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary w-full mt-3"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AgentForm;