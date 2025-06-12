import React from 'react';
import { 
  Award, 
  Building, 
  Calendar, 
  DollarSign, 
  Clock, 
  Target, 
  CheckCircle,
  ArrowRight,
  Zap,
  Heart
} from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: {
    id: string;
    title: string;
    description: string;
    schoolName: string;
    amount: number;
    deadline: string;
    requirements: string[];
    isExclusive: boolean;
    fieldOfStudy: string;
    level: 'undergraduate' | 'graduate' | 'doctorate';
    benefits: string[];
  };
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineStatus = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return { status: 'expired', color: 'text-red-600', bg: 'bg-red-50' };
    if (days <= 7) return { status: 'urgent', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (days <= 30) return { status: 'soon', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'normal', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getFieldBadgeColor = (field: string) => {
    switch (field.toLowerCase()) {
      case 'stem':
      case 'engineering':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'business':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'any':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-[#05294E] to-slate-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'undergraduate':
        return <Award className="h-4 w-4" />;
      case 'graduate':
        return <Award className="h-4 w-4" />;
      case 'doctorate':
        return <Award className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const deadlineInfo = getDeadlineStatus(scholarship.deadline);
  const daysLeft = getDaysUntilDeadline(scholarship.deadline);

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:-translate-y-2">
      {/* Exclusive Badge */}
      {scholarship.isExclusive && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-[#D0151C] to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center shadow-lg">
            <Zap className="h-3 w-3 mr-1" />
            Exclusive
          </div>
        </div>
      )}

      {/* Header Image/Background */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05294E]/10 to-[#D0151C]/10"></div>
        
        {/* University Logo/Icon */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <Building className="h-6 w-6 text-[#05294E]" />
          </div>
        </div>

        {/* Amount Display */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
            <div className="text-xs font-medium text-slate-600 mb-1">Scholarship Value</div>
            <div className="text-2xl font-black text-[#05294E]">
              {formatAmount(scholarship.amount)}
            </div>
          </div>
        </div>

        {/* Deadline Status */}
        <div className="absolute bottom-4 right-4">
          <div className={`${deadlineInfo.bg} ${deadlineInfo.color} px-3 py-2 rounded-2xl shadow-lg backdrop-blur-sm`}>
            <div className="flex items-center text-xs font-bold">
              <Clock className="h-3 w-3 mr-1" />
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Field Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-xl text-white text-xs font-bold uppercase tracking-wide ${getFieldBadgeColor(scholarship.fieldOfStudy)} shadow-lg`}>
            <Target className="h-3 w-3 mr-1" />
            {scholarship.fieldOfStudy}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-[#05294E] transition-colors">
          {scholarship.title}
        </h3>

        {/* University */}
        <div className="flex items-center text-slate-600 mb-4">
          <Building className="h-4 w-4 mr-2 text-[#05294E]" />
          <span className="text-sm font-medium">{scholarship.schoolName}</span>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {scholarship.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-2xl text-center group-hover:bg-slate-100 transition-colors">
            <div className="flex items-center justify-center mb-2">
              {getLevelIcon(scholarship.level)}
            </div>
            <div className="text-xs font-medium text-slate-600 mb-1">Level</div>
            <div className="text-sm font-bold text-slate-900 capitalize">
              {scholarship.level}
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-2xl text-center group-hover:bg-slate-100 transition-colors">
            <Calendar className="h-4 w-4 mx-auto mb-2 text-[#05294E]" />
            <div className="text-xs font-medium text-slate-600 mb-1">Deadline</div>
            <div className="text-sm font-bold text-slate-900">
              {new Date(scholarship.deadline).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Requirements Preview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">Requirements</span>
            <span className="text-xs text-slate-500">{scholarship.requirements.length} criteria</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scholarship.requirements.slice(0, 2).map((req, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                {req}
              </span>
            ))}
            {scholarship.requirements.length > 2 && (
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
                +{scholarship.requirements.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Benefits Preview */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm font-medium text-slate-700">Benefits</span>
          </div>
          <div className="space-y-2">
            {scholarship.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="flex items-center text-xs text-slate-600">
                <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <button className="w-full bg-gradient-to-r from-[#05294E] to-slate-700 text-white py-4 px-6 rounded-2xl hover:from-[#05294E]/90 hover:to-slate-600 transition-all duration-300 font-bold text-sm uppercase tracking-wide flex items-center justify-center group-hover:shadow-xl transform group-hover:scale-105">
          <Award className="h-4 w-4 mr-2" />
          Apply Now
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05294E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ScholarshipCard;