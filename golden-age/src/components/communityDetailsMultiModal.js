import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Home, 
  CheckCircle2, 
  ExternalLink,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  HeartPulse
} from 'lucide-react';

/**
 * MultimodalDetailModal Component
 * A high-fidelity popup with a segmented progress bar and multi-step document details.
 */
const CommunityDetailsMultiModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'overview', label: 'Overview', icon: FileText, color: 'bg-blue-500' },
    { id: 'community', label: 'Community', icon: Home, color: 'bg-emerald-500' },
    { id: 'pricing', label: 'Pricing', icon: CreditCard, color: 'bg-amber-500' },
    { id: 'care', label: 'Care Profile', icon: ShieldCheck, color: 'bg-rose-500' },
  ];

  if (!isOpen) return null;

  const nextStep = () => activeStep < steps.length - 1 && setActiveStep(activeStep + 1);
  const prevStep = () => activeStep > 0 && setActiveStep(activeStep - 1);

  return (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="px-10 pt-8 pb-6 bg-white border-b border-slate-50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${steps[activeStep].color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500`}>
                {React.createElement(steps[activeStep].icon, { size: 24 })}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Document Insights</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Step {activeStep + 1} of {steps.length} • Silverbrook_Contract_v2.pdf</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-3 px-1">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`h-2 flex-1 rounded-full transition-all duration-700 ease-out ${
                  idx <= activeStep ? step.color : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto px-10 py-10 bg-gradient-to-b from-white to-slate-50/30">
          
          {/* Step 0: Overview */}
          {activeStep === 0 && (
            <div className="animate-in slide-in-from-right-12 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-widest mb-6 inline-block">Initial Discovery</span>
                  <h1 className="text-5xl font-black text-slate-900 mb-6 leading-[1.1]">Document Summary & Authentication</h1>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    We've analyzed the attached residential agreement. This document outlines the primary legal relationship between the resident and the Silverbrook community, covering a 12-month term with optional renewal.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><CheckCircle2 size={20} /></div>
                      <div>
                        <p className="font-bold text-slate-800">Verified Issuer</p>
                        <p className="text-sm text-slate-500">Silverbrook Senior Living Group LLC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Calendar size={20} /></div>
                      <div>
                        <p className="font-bold text-slate-800">Effective Date</p>
                        <p className="text-sm text-slate-500">October 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-100/50 rounded-[60px] blur-2xl group-hover:bg-blue-200/50 transition-colors" />
                  <div className="relative bg-white p-6 rounded-[50px] shadow-2xl border border-slate-100 transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    <img 
                      src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=600" 
                      alt="Document Preview" 
                      className="rounded-[30px] w-full h-80 object-cover shadow-inner" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Community Profile */}
          {activeStep === 1 && (
            <div className="animate-in slide-in-from-right-12 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <h2 className="text-4xl font-black text-slate-900">Community Specifics</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 rounded-[40px] bg-emerald-50/40 border border-emerald-100/50">
                      <MapPin className="text-emerald-600 mb-4" size={28} />
                      <p className="text-xs font-black uppercase text-emerald-700/50 tracking-tighter mb-2">Location Type</p>
                      <p className="text-xl font-black text-slate-800">Urban Residential</p>
                    </div>
                    <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100">
                      <Home className="text-slate-400 mb-4" size={28} />
                      <p className="text-xs font-black uppercase text-slate-400 tracking-tighter mb-2">Unit Details</p>
                      <p className="text-xl font-black text-slate-800">Studio Deluxe (450 sqft)</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white border border-slate-100 rounded-[40px]">
                    <h4 className="font-black text-slate-900 mb-4">Community Rules Highlights</h4>
                    <ul className="space-y-4">
                      {['Pet Friendly Policy (up to 25lbs)', 'Smoke-free Environment', '24/7 Visitor Access Hours'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 font-bold">
                          <CheckCircle2 className="text-emerald-500" size={18} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-[50px] p-8 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl">
                   <div className="relative z-10">
                     <p className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-4">Amenity Tier</p>
                     <h3 className="text-3xl font-black mb-6">Platinum Lifestyle</h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-8">This document confirms access to the executive fitness lounge and the rooftop garden terrace.</p>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
                   <button className="w-full bg-emerald-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors">View Map</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {activeStep === 2 && (
            <div className="animate-in slide-in-from-right-12 duration-500 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-black text-slate-900 mb-12">Financial Breakdown</h2>
              <div className="grid gap-8">
                <div className="p-12 rounded-[50px] bg-amber-50 border border-amber-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-amber-200"><CreditCard size={100} /></div>
                  <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-4">Total Monthly Obligation</p>
                  <p className="text-7xl font-black text-slate-900">$4,850.00</p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <span className="px-4 py-1 bg-white rounded-full text-xs font-bold text-amber-700 shadow-sm">All-inclusive Model</span>
                    <span className="px-4 py-1 bg-white rounded-full text-xs font-bold text-amber-700 shadow-sm">Auto-Pay Enabled</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">One-time Fee</p>
                    <p className="text-xl font-black text-slate-800">$1,500.00</p>
                  </div>
                  <div className="p-6 bg-white border border-slate-100 rounded-3xl text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Security Deposit</p>
                    <p className="text-xl font-black text-slate-800">$500.00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Care Profile */}
          {activeStep === 3 && (
            <div className="animate-in slide-in-from-right-12 duration-500">
               <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-8">
                    <h2 className="text-4xl font-black text-slate-900 leading-tight">Care & Wellness Infrastructure</h2>
                    <div className="grid gap-4">
                      {[
                        { title: 'Nursing Support', desc: 'RN on-site 12 hours daily, 24/7 on call.', icon: HeartPulse },
                        { title: 'Medication Mgmt', desc: 'Level 2 administration assistance included.', icon: ShieldCheck },
                        { title: 'Therapy Access', desc: 'Direct referral to on-site rehab clinic.', icon: Info }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-5 p-6 bg-rose-50/50 border border-rose-100 rounded-3xl group hover:bg-rose-50 transition-colors">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-rose-100 flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{item.title}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-80 h-96 bg-slate-900 rounded-[50px] shadow-2xl relative overflow-hidden p-10 flex flex-col justify-end">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-30 grayscale" />
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black text-white mb-2">Health Dashboard</h4>
                      <p className="text-slate-400 text-sm mb-6">Real-time vitals monitoring is outlined in Section 4.b of the care contract.</p>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-rose-500" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-10 border-t border-slate-50 bg-white flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={activeStep === 0}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              activeStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <div className="flex gap-4">
             <button 
                onClick={onClose}
                className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
             >
               Dismiss
             </button>
             <button 
              onClick={activeStep === steps.length - 1 ? onClose : nextStep}
              className={`${steps[activeStep].color} text-white px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all shadow-${steps[activeStep].color.split('-')}-500/20`}
            >
              {activeStep === steps.length - 1 ? 'Finish Review' : 'Next Category'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityDetailsMultiModal;