import React, { useState } from 'react';
import { Search, DollarSign, Award, Filter, Clock, GraduationCap, Star, CheckCircle, ArrowRight, Sparkles, Users, Globe } from 'lucide-react';
import { mockScholarships } from '../data/mockData';
import ScholarshipCard from '../components/ScholarshipCard';

const Scholarships: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedField, setSelectedField] = useState('all');

  const filteredScholarships = mockScholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === 'all' || scholarship.level === selectedLevel;
    const matchesField = selectedField === 'all' || scholarship.fieldOfStudy.toLowerCase().includes(selectedField.toLowerCase());

    return matchesSearch && matchesLevel && matchesField;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#05294E] via-slate-800 to-[#05294E] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D0151C]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <Award className="h-4 w-4 mr-2 text-white" />
              <span className="text-sm font-medium text-white">Exclusive Opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-white">Scholarship</span>
              <br />
              <span className="text-[#D0151C]">Opportunities</span>
            </h1>
            
            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Discover exclusive funding opportunities crafted specifically for international students pursuing American education excellence.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-slate-300">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm font-medium">$50M+ Available</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-sm font-medium">150+ Universities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white shadow-xl rounded-3xl border border-slate-200 p-8 mb-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-300 text-sm bg-slate-50 hover:bg-white"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-300 text-sm bg-slate-50 hover:bg-white"
            >
              <option value="all">All Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="doctorate">Doctorate</option>
            </select>

            {/* Field Filter */}
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="px-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#05294E] focus:border-[#05294E] transition-all duration-300 text-sm bg-slate-50 hover:bg-white"
            >
              <option value="all">All Fields</option>
              <option value="stem">STEM</option>
              <option value="business">Business</option>
              <option value="engineering">Engineering</option>
              <option value="any">Any Field</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-gradient-to-r from-[#05294E] to-[#05294E]/80 text-white rounded-2xl px-4 py-4 shadow-lg">
              <span className="text-sm font-medium">
                <span className="font-bold">{filteredScholarships.length}</span> scholarships found
              </span>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Award className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-3xl font-bold text-slate-600 mb-4">No scholarships found</h3>
            <p className="text-slate-500 text-lg mb-8">Try adjusting your search criteria to discover more opportunities</p>
            <button className="bg-[#05294E] text-white px-8 py-3 rounded-2xl hover:bg-[#05294E]/90 transition-all duration-300 font-bold">
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-br from-[#05294E] via-slate-800 to-[#05294E] rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D0151C]/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Ready to Start?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Ready to <span className="text-[#D0151C]">Transform</span> Your Future?
            </h2>
            <p className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of international students who have secured their educational dreams through our exclusive scholarship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#D0151C] text-white px-10 py-5 rounded-2xl hover:bg-[#B01218] transition-all duration-300 font-bold text-lg shadow-2xl transform hover:scale-105 flex items-center justify-center">
                Get Started Today
                <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 font-bold text-lg flex items-center justify-center">
                <Award className="mr-3 h-5 w-5" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;