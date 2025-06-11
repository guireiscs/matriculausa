import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Edit, 
  Settings, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  Users,
  Award,
  CheckCircle,
  AlertCircle,
  Camera,
  Save,
  X,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { University } from '../../lib/supabase';

interface ProfileManagementProps {
  university: University | null;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ university }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  const profileCompleteness = university ? (
    (university.name ? 20 : 0) +
    (university.description ? 20 : 0) +
    (university.location ? 15 : 0) +
    (university.website ? 15 : 0) +
    (university.contact?.email ? 10 : 0) +
    (university.contact?.phone ? 10 : 0) +
    (university.programs && university.programs.length > 0 ? 10 : 0)
  ) : 0;

  if (!university) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Building className="h-12 w-12 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Perfil da universidade não encontrado</h3>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Crie o perfil da sua universidade para mostrar sua instituição aos estudantes internacionais
        </p>
        <Link
          to="/school/setup-profile"
          className="bg-gradient-to-r from-[#05294E] to-blue-700 text-white px-8 py-4 rounded-xl hover:from-[#05294E]/90 hover:to-blue-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Criar Perfil da Universidade
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#05294E] to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Building className="h-12 w-12 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-[#05294E] rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{university.name}</h1>
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {university.location}
                  </div>
                  {university.website && (
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-white transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    university.is_approved 
                      ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                      : 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                  }`}>
                    {university.is_approved ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Universidade Aprovada
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Aguardando Aprovação
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 font-medium flex items-center shadow-lg"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </>
                )}
              </button>
              
              {!university.profile_completed && (
                <Link
                  to="/school/setup-profile"
                  className="bg-white text-[#05294E] px-6 py-3 rounded-xl hover:bg-slate-100 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Settings className="h-4 w-4 mr-2 inline" />
                  Completar Perfil
                </Link>
              )}
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Completude do Perfil</span>
              <span className="font-bold">{profileCompleteness}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Informações Básicas</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[#05294E] hover:text-[#05294E]/80 font-medium text-sm flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome da Universidade *</label>
                  <input
                    type="text"
                    defaultValue={university.name}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                  <textarea
                    rows={4}
                    defaultValue={university.description || ''}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-200"
                    placeholder="Descreva sua universidade..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                    <input
                      type="url"
                      defaultValue={university.website || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-200"
                      placeholder="https://universidade.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Localização</label>
                    <input
                      type="text"
                      defaultValue={university.location || ''}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-200"
                      placeholder="Cidade, Estado"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="bg-[#05294E] text-white px-6 py-3 rounded-xl hover:bg-[#05294E]/90 transition-colors font-bold flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-500">Nome da Universidade</label>
                  <p className="text-lg font-semibold text-slate-900">{university.name}</p>
                </div>

                {university.description && (
                  <div>
                    <label className="text-sm font-medium text-slate-500">Descrição</label>
                    <p className="text-slate-700 leading-relaxed mt-1">{university.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-slate-500">Website</label>
                    {university.website ? (
                      <a 
                        href={university.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#05294E] hover:underline flex items-center mt-1"
                      >
                        {university.website}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    ) : (
                      <p className="text-slate-400 mt-1">Não informado</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-500">Localização</label>
                    <p className="text-slate-900 mt-1">{university.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Informações de Contato</h3>
              <button
                onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                className="text-slate-500 hover:text-slate-700 flex items-center text-sm"
              >
                {showSensitiveInfo ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Mostrar
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-500 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Telefone
                  </label>
                  <p className="text-slate-900 mt-1">
                    {showSensitiveInfo 
                      ? university.contact?.phone || 'Não informado'
                      : '•••••••••••'
                    }
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-500 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Geral
                  </label>
                  <p className="text-slate-900 mt-1">
                    {showSensitiveInfo 
                      ? university.contact?.email || 'Não informado'
                      : '•••••••••••@•••••••.com'
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-500 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email de Admissões
                  </label>
                  <p className="text-slate-900 mt-1">
                    {showSensitiveInfo 
                      ? university.contact?.admissionsEmail || 'Não informado'
                      : '•••••••••••@•••••••.com'
                    }
                  </p>
                </div>

                {university.contact?.fax && (
                  <div>
                    <label className="text-sm font-medium text-slate-500">Fax</label>
                    <p className="text-slate-900 mt-1">
                      {showSensitiveInfo 
                        ? university.contact.fax
                        : '•••••••••••'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Programs */}
          {university.programs && university.programs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Programas Acadêmicos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {university.programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 text-center hover:from-[#05294E]/5 hover:to-blue-50 hover:border-[#05294E]/20 transition-all duration-300"
                  >
                    {program}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Estatísticas Rápidas</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-[#05294E] mr-3" />
                  <span className="font-medium text-slate-700">Bolsas Criadas</span>
                </div>
                <span className="text-2xl font-bold text-slate-900">0</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="font-medium text-slate-700">Candidatos</span>
                </div>
                <span className="text-2xl font-bold text-slate-900">0</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-slate-700">Visualizações</span>
                </div>
                <span className="text-2xl font-bold text-slate-900">0</span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Status da Conta</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Perfil Criado</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Informações Completas</span>
                {university.profile_completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Aprovação da Equipe</span>
                {university.is_approved ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>

            {(!university.profile_completed || !university.is_approved) && (
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <p className="text-sm font-medium text-orange-800 mb-2">
                  {!university.profile_completed 
                    ? 'Complete seu perfil para liberar todas as funcionalidades'
                    : 'Seu perfil está sendo analisado pela nossa equipe'
                  }
                </p>
                {!university.profile_completed && (
                  <Link
                    to="/school/setup-profile"
                    className="text-sm font-bold text-orange-700 hover:text-orange-800 transition-colors"
                  >
                    Completar agora →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Help & Support */}
          <div className="bg-gradient-to-br from-[#05294E] to-blue-700 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Precisa de Ajuda?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Nossa equipe está pronta para ajudar você a maximizar o potencial da sua universidade na plataforma.
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-xl hover:bg-white/30 transition-all duration-300 font-medium">
              Falar com Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;