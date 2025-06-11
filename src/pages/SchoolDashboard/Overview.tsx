import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle, DollarSign, Users, Settings, Eye, Edit } from 'lucide-react';
import { University, Scholarship } from '../../lib/supabase';

interface OverviewProps {
  university: University | null;
  scholarships: Scholarship[];
  stats: {
    totalScholarships: number;
    activeScholarships: number;
    totalFunding: number;
    avgAmount: number;
  };
  user: any;
}

const Overview: React.FC<OverviewProps> = ({ university, scholarships, stats, user }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-[#05294E]/10 p-3 rounded-lg">
              <Award className="h-6 w-6 text-[#05294E]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total de Bolsas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalScholarships}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bolsas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeScholarships}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Financiamento Total</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalFunding.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Valor Médio</p>
              <p className="text-2xl font-bold text-gray-900">
                ${Math.round(stats.avgAmount).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scholarships */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bolsas Recentes</h3>
            {university?.profile_completed && (
              <Link
                to="/school/scholarship/new"
                className="text-[#05294E] hover:text-[#05294E]/80 font-medium text-sm"
              >
                Criar Nova
              </Link>
            )}
          </div>
        </div>
        <div className="p-6">
          {!university?.profile_completed ? (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Complete primeiro seu perfil</h3>
              <p className="text-gray-500 mb-4">Configure o perfil da universidade para começar a criar bolsas</p>
              <Link
                to="/school/setup-profile"
                className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors"
              >
                Completar Perfil
              </Link>
            </div>
          ) : scholarships.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ainda não há bolsas</h3>
              <p className="text-gray-500 mb-4">Comece criando sua primeira oportunidade de bolsa</p>
              <Link
                to="/school/scholarship/new"
                className="bg-[#05294E] text-white px-4 py-2 rounded-lg hover:bg-[#05294E]/90 transition-colors"
              >
                Criar Bolsa
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {scholarships.slice(0, 5).map((scholarship) => (
                <div key={scholarship.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{scholarship.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>${scholarship.amount.toLocaleString()}</span>
                      <span>•</span>
                      <span>Prazo: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        scholarship.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {scholarship.is_active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;