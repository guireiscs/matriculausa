import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Building, Award, Edit, CheckCircle, Clock, AlertCircle, Settings, Plus } from 'lucide-react';
import { University } from '../../lib/supabase';

interface SchoolDashboardLayoutProps {
  university: University | null;
  user: any;
  loading: boolean;
}

const SchoolDashboardLayout: React.FC<SchoolDashboardLayoutProps> = ({
  university,
  user,
  loading
}) => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/scholarships')) return 'scholarships';
    if (path.includes('/profile')) return 'profile';
    return 'overview';
  };

  const activeTab = getActiveTab();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#05294E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {university?.name || user?.name || 'Painel da Universidade'}
              </h1>
              {university?.location && (
                <p className="text-gray-600">{university.location}</p>
              )}
              
              <div className="flex items-center mt-2 space-x-4">
                {university ? (
                  <>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      university.is_approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {university.is_approved ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aprovado
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Aguardando Aprovação
                        </>
                      )}
                    </span>
                    {!university.profile_completed && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Perfil Incompleto
                      </span>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Settings className="h-3 w-3 mr-1" />
                    Configuração de Perfil Necessária
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              {!university?.profile_completed ? (
                <Link
                  to="/school/setup-profile"
                  className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Completar Perfil
                </Link>
              ) : (
                <Link
                  to="/school/scholarship/new"
                  className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Bolsa
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show welcome message if no university profile or profile not completed */}
        {(!university || !university.profile_completed) && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="text-center">
              <div className="bg-[#05294E] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {!university ? 'Bem-vindo à Matrícula USA!' : 'Complete Seu Perfil'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {!university 
                  ? 'Complete o perfil da sua universidade para começar a atrair estudantes internacionais e gerenciar oportunidades de bolsa em nossa plataforma.'
                  : 'Finalize a configuração do perfil da sua universidade para começar a criar oportunidades de bolsa para estudantes internacionais.'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Edit className="h-8 w-8 text-[#05294E] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Completar Perfil</h3>
                  <p className="text-sm text-gray-600">Adicione as informações da sua universidade e seja aprovado</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Award className="h-8 w-8 text-[#D0151C] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Criar Bolsas</h3>
                  <p className="text-sm text-gray-600">Ofereça bolsas exclusivas para estudantes internacionais</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Building className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Conectar com Estudantes</h3>
                  <p className="text-sm text-gray-600">Alcance candidatos internacionais qualificados</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/school/setup-profile"
                  className="bg-[#05294E] text-white px-6 py-3 rounded-lg hover:bg-[#05294E]/90 transition-colors font-medium flex items-center justify-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {!university ? 'Configurar Perfil da Universidade' : 'Completar Perfil'}
                </Link>
                {!university && (
                  <Link
                    to="/school/terms"
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Revisar Termos e Condições
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral', icon: Building, path: '/school/dashboard' },
              { id: 'scholarships', label: 'Bolsas', icon: Award, path: '/school/dashboard/scholarships' },
              { id: 'profile', label: 'Perfil', icon: Edit, path: '/school/dashboard/profile' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#05294E] text-[#05294E]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default SchoolDashboardLayout;