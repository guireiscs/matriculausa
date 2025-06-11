import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building, 
  Award, 
  Edit, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Settings, 
  Plus,
  Home,
  Users,
  BarChart3,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  Zap,
  Shield
} from 'lucide-react';
import { University } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/scholarships')) return 'scholarships';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/students')) return 'students';
    return 'overview';
  };

  const activeTab = getActiveTab();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05294E]"></div>
          <p className="text-slate-600 font-medium">Carregando painel...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral', icon: Home, path: '/school/dashboard', badge: null },
    { id: 'scholarships', label: 'Bolsas de Estudo', icon: Award, path: '/school/dashboard/scholarships', badge: university?.profile_completed ? null : 'Configurar' },
    { id: 'students', label: 'Estudantes', icon: Users, path: '/school/dashboard/students', badge: 'Em Breve' },
    { id: 'analytics', label: 'Relatórios', icon: BarChart3, path: '/school/dashboard/analytics', badge: 'Em Breve' },
    { id: 'profile', label: 'Perfil da Universidade', icon: Building, path: '/school/dashboard/profile', badge: null }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#05294E] to-[#0a3d70] rounded-xl flex items-center justify-center shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900">Matrícula USA</h1>
                <p className="text-xs text-slate-500 font-medium">Dashboard Universidade</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* University Status */}
          {university && (
            <div className="px-6 py-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{university.name}</h3>
                  <p className="text-sm text-slate-500 truncate">{university.location}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  university.is_approved 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {university.is_approved ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Aprovado
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      Pendente
                    </>
                  )}
                </span>
                
                {!university.profile_completed && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Perfil Incompleto
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isDisabled = item.badge === 'Em Breve';
              
              return (
                <Link
                  key={item.id}
                  to={isDisabled ? '#' : item.path}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#05294E] text-white shadow-lg'
                      : isDisabled
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : isDisabled ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                      item.badge === 'Em Breve' 
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="px-4 py-4 border-t border-slate-200">
            {university?.profile_completed ? (
              <Link
                to="/school/scholarship/new"
                className="w-full bg-gradient-to-r from-[#D0151C] to-red-600 text-white py-3 px-4 rounded-xl hover:from-[#B01218] hover:to-red-700 transition-all duration-300 font-bold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Bolsa
              </Link>
            ) : (
              <Link
                to="/school/setup-profile"
                className="w-full bg-gradient-to-r from-[#05294E] to-blue-700 text-white py-3 px-4 rounded-xl hover:from-[#05294E]/90 hover:to-blue-600 transition-all duration-300 font-bold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Settings className="h-4 w-4 mr-2" />
                Completar Perfil
              </Link>
            )}
          </div>

          {/* Support */}
          <div className="px-4 py-4 border-t border-slate-200">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Suporte 24/7</h4>
                  <p className="text-xs text-slate-500">Estamos aqui para ajudar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900">
                  {activeTab === 'overview' && 'Visão Geral'}
                  {activeTab === 'scholarships' && 'Gerenciar Bolsas'}
                  {activeTab === 'profile' && 'Perfil da Universidade'}
                  {activeTab === 'students' && 'Estudantes'}
                  {activeTab === 'analytics' && 'Relatórios e Analytics'}
                </h1>
                <p className="text-slate-600">
                  {activeTab === 'overview' && 'Acompanhe o desempenho da sua universidade'}
                  {activeTab === 'scholarships' && 'Crie e gerencie suas oportunidades de bolsa'}
                  {activeTab === 'profile' && 'Mantenha as informações da universidade atualizadas'}
                  {activeTab === 'students' && 'Gerencie candidatos e estudantes'}
                  {activeTab === 'analytics' && 'Análise detalhada de performance e métricas'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-80 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#05294E] to-blue-700 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-slate-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-slate-500">Administrador</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/school/dashboard/profile"
                      className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Edit className="h-4 w-4 mr-3 text-slate-400" />
                      Editar Perfil
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3 text-slate-400" />
                      Configurações
                    </Link>
                    
                    <div className="border-t border-slate-200 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Welcome Message for Incomplete Profiles */}
          {(!university || !university.profile_completed) && (
            <div className="bg-gradient-to-r from-[#05294E] to-blue-700 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {!university ? 'Bem-vindo à Matrícula USA!' : 'Complete Seu Perfil'}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {!university 
                        ? 'Configure sua universidade e comece a atrair estudantes internacionais'
                        : 'Finalize seu perfil para liberar todas as funcionalidades'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <Edit className="h-8 w-8 text-white mb-4" />
                    <h3 className="font-bold text-white mb-2">1. Completar Perfil</h3>
                    <p className="text-blue-100 text-sm">Adicione informações da universidade e documentação</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <Award className="h-8 w-8 text-yellow-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">2. Criar Bolsas</h3>
                    <p className="text-blue-100 text-sm">Ofereça oportunidades exclusivas para estudantes</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <Users className="h-8 w-8 text-green-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">3. Conectar Estudantes</h3>
                    <p className="text-blue-100 text-sm">Receba candidaturas de estudantes qualificados</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/school/setup-profile"
                    className="bg-white text-[#05294E] px-8 py-3 rounded-xl hover:bg-slate-100 transition-all duration-300 font-bold text-center flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    {!university ? 'Configurar Perfil da Universidade' : 'Completar Perfil'}
                  </Link>
                  {!university && (
                    <Link
                      to="/school/terms"
                      className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 font-bold text-center flex items-center justify-center"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Revisar Termos e Condições
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboardLayout;