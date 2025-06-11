import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CheckCircle, Award, Settings } from 'lucide-react';
import { University, Scholarship } from '../../lib/supabase';

interface ScholarshipManagementProps {
  university: University | null;
  scholarships: Scholarship[];
  handleDeleteScholarship: (scholarshipId: string) => Promise<void>;
  toggleScholarshipStatus: (scholarshipId: string, currentStatus: boolean) => Promise<void>;
}

const ScholarshipManagement: React.FC<ScholarshipManagementProps> = ({
  university,
  scholarships,
  handleDeleteScholarship,
  toggleScholarshipStatus
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Bolsas</h2>
        {university?.profile_completed && (
          <Link
            to="/school/scholarship/new"
            className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Bolsa
          </Link>
        )}
      </div>

      {!university?.profile_completed ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Configuração de perfil necessária</h3>
          <p className="text-gray-500 mb-6">Complete o perfil da universidade para começar a criar bolsas</p>
          <Link
            to="/school/setup-profile"
            className="bg-[#05294E] text-white px-6 py-3 rounded-lg hover:bg-[#05294E]/90 transition-colors"
          >
            Completar Perfil da Universidade
          </Link>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Ainda não há bolsas criadas</h3>
          <p className="text-gray-500 mb-6">Comece a atrair estudantes internacionais criando oportunidades de bolsa</p>
          <Link
            to="/school/scholarship/new"
            className="bg-[#05294E] text-white px-6 py-3 rounded-lg hover:bg-[#05294E]/90 transition-colors"
          >
            Criar Sua Primeira Bolsa
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{scholarship.title}</h3>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleScholarshipStatus(scholarship.id, scholarship.is_active)}
                      className={`p-1 rounded transition-colors ${
                        scholarship.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={scholarship.is_active ? 'Desativar' : 'Ativar'}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteScholarship(scholarship.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Valor</span>
                    <span className="font-semibold text-green-600">${scholarship.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Prazo</span>
                    <span className="text-sm text-gray-900">
                      {new Date(scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Nível</span>
                    <span className="text-sm text-gray-900 capitalize">{scholarship.level}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      scholarship.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {scholarship.is_active ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  
                  {scholarship.is_exclusive && (
                    <div className="flex items-center text-sm text-[#D0151C]">
                      <Award className="h-4 w-4 mr-1" />
                      Bolsa Exclusiva
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScholarshipManagement;