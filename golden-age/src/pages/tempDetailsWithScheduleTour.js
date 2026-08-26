import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Home, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  MapPin,
  HeartPulse,
  User,
  Phone,
  Video,
  Users,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';

/**
 * SiteVisitModal Component
 * Replicated from image_5c7869.png with custom radio buttons for tour type.
 */
const SiteVisitModal = ({ isOpen, onClose }) => {
  const [tourType, setTourType] = useState('in-person');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-10">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors p-1">
            <X size={28} />
          </button>
        </div>
        
        <h2 className="text-[34px] font-serif text-black leading-[1.1] mb-4">
          Book a Site Visit to Golden Oaks Community
        </h2>
        <p className="text-black mb-8 leading-relaxed text-sm">
          Our Bangalore manager will coordinate a personalized guided tour for you and your family.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Input Fields */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-black ml-1">Full Name</label>
            <input type="text" placeholder="Enter your name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2d7a6a] focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-medium" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-black ml-1">Phone Number</label>
            <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2d7a6a] focus:bg-white outline-none transition-all placeholder:text-slate-300 text-sm font-medium" />
          </div>

          {/* Tour Type Selection */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-widest text-black ml-1">Tour Preference</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setTourType('in-person')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-bold text-xs ${
                  tourType === 'in-person' 
                  ? 'border-[#2d7a6a] bg-[#2d7a6a]/5 text-[#2d7a6a]' 
                  : 'border-slate-100 text-black hover:border-slate-200'
                }`}
              >
                <Users size={16} /> In-person
              </button>
              <button 
                type="button"
                onClick={() => setTourType('virtual')}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-bold text-xs ${
                  tourType === 'virtual' 
                  ? 'border-[#2d7a6a] bg-[#2d7a6a]/5 text-[#2d7a6a]' 
                  : 'border-slate-100 text-black hover:border-slate-200'
                }`}
              >
                <Video size={16} /> Virtual Tour
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-black ml-1">Preferred Date</label>
            <div className="relative">
              <input type="text" defaultValue="05/07/2026" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2d7a6a] outline-none transition-all text-sm font-medium" />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          <button className="w-full bg-[#2d7a6a] hover:bg-[#246356] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/10 transition-all transform active:scale-[0.98] mt-4">
            Confirm Visit Request <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * MultimodalDetailModal Component
 * Progress-based review before scheduling.
 */
const MultimodalDetailModal = ({ isOpen, onClose, onFinish }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: 'overview', label: 'Overview', icon: FileText, color: 'bg-indigo-500', desc: 'Core contract structures and legal framework.' },
    { id: 'community', label: 'Community', icon: Home, color: 'bg-emerald-500', desc: 'Amenities, resident lifestyle, and community guidelines.' },
    { id: 'pricing', label: 'Pricing', icon: CreditCard, color: 'bg-amber-500', desc: 'Monthly fees, deposits, and service tier costs.' },
    { id: 'care', label: 'Care Profile', icon: ShieldCheck, color: 'bg-rose-500', desc: 'Medical support, emergency protocols, and staff ratios.' },
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xl transition-all animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[56px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        
        {/* Step Header */}
        <div className="px-12 pt-10 pb-8 bg-white border-b border-slate-50">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 ${steps[activeStep].color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-${steps[activeStep].color.split('-')}-200`}>
                {React.createElement(steps[activeStep].icon, { size: 28 })}
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contract Analysis</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Section {activeStep + 1} of {steps.length}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-4 rounded-full bg-slate-50 text-slate-300 hover:text-slate-900 transition-all"><X size={24} /></button>
          </div>
          
          <div className="flex gap-4 px-1">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-1 space-y-3">
                <div className={`h-2 rounded-full transition-all duration-700 ${idx <= activeStep ? step.color : 'bg-slate-100'}`} />
                <span className={`text-[9px] font-black uppercase tracking-widest block text-center ${idx === activeStep ? 'text-slate-900' : 'text-slate-300'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-12 py-12 bg-gradient-to-b from-white to-slate-50/50">
          <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">{steps[activeStep].label} Review</h1>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed">{steps[activeStep].desc}</p>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-md transition-shadow group">
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${steps[activeStep].color} text-white group-hover:scale-110 transition-transform`}><CheckCircle2 size={24}/></div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Verified Insight</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">System has flagged 3 specific clauses in the document relating to {steps[activeStep].label.toLowerCase()} that require your attention.</p>
               </div>
               <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm hover:shadow-md transition-shadow group">
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${steps[activeStep].color} text-white group-hover:scale-110 transition-transform`}><Info size={24}/></div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Source Context</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Referenced from Section 4.2 of the primary community agreement signed in 2024.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-12 py-10 border-t border-slate-100 flex justify-between items-center bg-white">
          <button 
            onClick={() => setActiveStep(Math.max(0, activeStep-1))} 
            disabled={activeStep===0} 
            className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${activeStep===0 ? 'opacity-0' : 'text-slate-400 hover:text-slate-900'}`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          <button onClick={handleNext} className={`${steps[activeStep].color} text-white px-12 py-6 rounded-[32px] font-black text-[10px] uppercase tracking-widest flex items-center gap-4 shadow-2xl hover:brightness-110 active:scale-95 transition-all`}>
            {activeStep === steps.length - 1 ? 'Complete Review' : 'Next Category'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'review_complete'
  const [modals, setModals] = useState({ insight: false, tour: false });

  const toggleModal = (key, val) => setModals(prev => ({ ...prev, [key]: val }));

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans selection:bg-emerald-100">
      
      {/* Landing State */}
      {view === 'landing' && (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-tr from-slate-50 via-white to-indigo-50/30">
          <div className="text-center max-w-xl animate-in fade-in zoom-in duration-1000">
            <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl border border-slate-50 flex items-center justify-center text-indigo-600 mx-auto mb-12 ring-8 ring-indigo-50/50">
              <FileText size={40} />
            </div>
            <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">Silverbrook <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">Contract Portal</span></h1>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed">Your personalized community analysis is ready. Complete the deep-dive review to unlock site visit scheduling.</p>
            
            <button 
              onClick={() => toggleModal('insight', true)}
              className="bg-slate-900 text-white px-14 py-7 rounded-[36px] font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
            >
              Begin Multi-Step Review <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Review Completed State (Next Page) */}
      {view === 'review_complete' && (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="max-w-3xl w-full text-center">
            <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-100">
              <CheckCircle2 size={14} /> Analysis Successfully Finished
            </div>
            
            <h1 className="text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Ready to see it in person?</h1>
            <p className="text-slate-400 text-xl mb-16 max-w-xl mx-auto leading-relaxed font-medium">You've explored all contract details. The next step is a guided walk-through of the Golden Oaks facility.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button 
                onClick={() => toggleModal('tour', true)}
                className="bg-[#2d7a6a] text-white p-8 rounded-[40px] shadow-2xl shadow-emerald-900/10 hover:scale-[1.02] active:scale-95 transition-all text-left flex flex-col justify-between h-64 group"
              >
                <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar size={28} />
                </div>
                <div>
                  <h3 className="font-black text-2xl mb-2">Schedule Tour</h3>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest">In-person or Virtual</p>
                </div>
              </button>

              <button 
                className="bg-slate-50 border border-slate-100 p-8 rounded-[40px] hover:bg-slate-100 transition-all text-left flex flex-col justify-between h-64 group"
              >
                <div className="bg-slate-200 w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                  <ExternalLink size={28} />
                </div>
                <div>
                  <h3 className="font-black text-2xl text-slate-900 mb-2">Share Report</h3>
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Download PDF Summary</p>
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => setView('landing')}
              className="mt-16 text-slate-300 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-colors"
            >
              Return to Start
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <MultimodalDetailModal 
        isOpen={modals.insight} 
        onClose={() => toggleModal('insight', false)} 
        onFinish={() => {
          toggleModal('insight', false);
          setView('review_complete');
        }}
      />

      <SiteVisitModal 
        isOpen={modals.tour} 
        onClose={() => toggleModal('tour', false)} 
      />
    </div>
  );
};

export default App;