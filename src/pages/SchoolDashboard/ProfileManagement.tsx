import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Edit, Settings } from 'lucide-react';
import { University } from '../../lib/supabase';

interface ProfileManagementProps {
  university: University | null;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ university }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Perfil da Universidade</h2>
        {university ? (
          <Link
            to="/school/edit-profile"
            className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Link>
        ) : (
          <Link
            to="/school/setup-profile"
            className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar Perfil
          </Link>
        )}
      </div>

      {!university ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Perfil da universidade não encontrado</h3>
          <p className="text-gray-500 mb-6">
            Crie o perfil da sua universidade para mostrar sua instituição aos estudantes internacionais
          </p>
          <Link
            to="/school/setup-profile"
            className="bg-[#05294E] text-white px-6 py-3 rounded-lg hover:bg-[#05294E]/90 transition-colors"
          >
            Criar Perfil da Universidade
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome da Universidade</label>
                  <p className="text-gray-900">{university.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-[#05294E] hover:underline block">
                    {university.website}
                  </a>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Localização</label>
                  <p className="text-gray-900">{university.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Telefone</label>
                  <p className="text-gray-900">{university.contact?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{university.contact?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email de Admissões</label>
                  <p className="text-gray-900">{university.contact?.admissionsEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {university.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{university.description}</p>
            </div>
          )}

          {university.programs && university.programs.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Programas Acadêmicos</h3>
              <div className="flex flex-wrap gap-2">
                {university.programs.map((program, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;