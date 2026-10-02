import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  ChevronRight,
  ChevronLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Award,
  Plus,
  X,
  FileText,
  Check
} from 'lucide-react';

const FACILITY_OPTIONS = [
  { id: 'assisted', label: 'Assisted Living', desc: 'Personal care & daily living assistance' },
  { id: 'memory', label: 'Memory Care', desc: 'Secured environment for dementia & Alzheimer\'s' },
  { id: 'independent', label: 'Independent Living', desc: 'Active adult communities & senior apartments' },
  { id: 'ccrc', label: 'CCRC / Life Plan', desc: 'Continuing care retirement communities' },
  { id: 'skilled', label: 'Skilled Nursing', desc: '24/7 medical and rehabilitative care' },
  { id: 'residential', label: 'Residential Care', desc: 'Group homes and adult foster care' }
];

const PORTFOLIO_SIZES = [
  { label: '1 Property', value: '1' },
  { label: '2-5 Properties', value: '2-5' },
  { label: '6-10 Properties', value: '6-10' },
  { label: '11+ Properties', value: '11+' }
];

const HeroSection = () => {
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin'
  const [signupStep, setSignupStep] = useState(1); // 1, 2, 3, 4 (Success)
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form values state
  const [formData, setFormData] = useState({
    businessName: '',
    facilityTypes: [],
    portfolioSize: '1',
    firstName: '',
    lastName: '',
    workEmail: '',
    phone: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    loginEmail: '',
    loginPassword: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score, label: 'Weak', color: 'bg-gray-200' };
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-400' };
    if (score === 2) return { score, label: 'Fair', color: 'bg-amber-400' };
    if (score === 3) return { score, label: 'Good', color: 'bg-emerald-400' };
    return { score, label: 'Excellent', color: 'bg-emerald-600' };
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    if (stepNumber === 1) {
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Business or organization name is required.';
      }
      if (formData.facilityTypes.length === 0) {
        newErrors.facilityTypes = 'Please select at least one facility type.';
      }
    } else if (stepNumber === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Your professional role/job title is required.';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.workEmail.trim()) {
        newErrors.workEmail = 'Work email address is required.';
      } else if (!emailRegex.test(formData.workEmail)) {
        newErrors.workEmail = 'Please provide a valid corporate email address.';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Business phone number is required.';
      }
    } else if (stepNumber === 3) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service & Privacy Policy.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep(signupStep)) {
      setSignupStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setSignupStep(prev => Math.max(1, prev - 1));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSignupStep(4);
      }, 1500);
    }
  };

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.loginEmail.trim()) newErrors.loginEmail = 'Email is required.';
    if (!formData.loginPassword) newErrors.loginPassword = 'Password is required.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  const toggleFacilityType = (id) => {
    setFormData(prev => {
      const exists = prev.facilityTypes.includes(id);
      const updated = exists 
        ? prev.facilityTypes.filter(t => t !== id)
        : [...prev.facilityTypes, id];
      return { ...prev, facilityTypes: updated };
    });
  };

  const updateField = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-[#fafbfc] flex font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* LEFT COLUMN: Premium B2B Trust Panel & Testimonial */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0e2a22] text-white p-16 flex-col justify-between relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 cursor-pointer" onClick={() => { setAuthMode('signup'); setSignupStep(1); }}>
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-900/30">
            L
          </div>
          <span className="text-2xl font-black tracking-tight text-white">GoldenAge <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest ml-1 bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-800/50">Provider</span></span>
        </div>

        {/* Core Value Proposition Copy */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/40 border border-emerald-700/50 rounded-full text-xs font-bold text-emerald-400 tracking-wider">
            <Sparkles size={14} /> Built Exclusively for Senior Care Providers
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            Connect directly with families looking for premium care.
          </h1>
          <p className="text-emerald-100/75 leading-relaxed text-[17px]">
            Say goodbye to expensive third-party commission brokers. GoldenAge empowers you to list your properties, display real-time pricing, and handle inquiries transparently.
          </p>

          {/* Social Proof Checklist */}
          <div className="space-y-4 pt-4 border-t border-emerald-800/40">
            {[
              { title: 'Zero referral fees & commission commissions', desc: 'Keep 100% of your initial move-in rental revenue.' },
              { title: 'Dynamic transparent pricing integration', desc: 'Allows instant room-tier and community availability configurations.' },
              { title: 'Direct prospective tenant inquiries', desc: 'No intermediate agencies. Reach your target clients immediately.' }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-[15px]">{benefit.title}</h4>
                  <p className="text-xs text-emerald-100/60 mt-0.5">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Endorsement Testimonial */}
        <div className="relative z-10 p-6 bg-[#163a30] rounded-3xl border border-emerald-800/30 shadow-lg flex gap-4 items-start">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
            alt="Operator" 
            className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-600/30"
          />
          <div>
            <div className="flex items-center gap-0.5 text-amber-400 mb-1">
              {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
            </div>
            <p className="text-xs italic text-emerald-100/80 leading-relaxed">
              &quot;Switching our portfolio of 4 communities to GoldenAge saved us over $40,000 in referral commission costs in our very first quarter.&quot;
            </p>
            <p className="text-[10px] font-black uppercase text-emerald-400 tracking-wider mt-3">
              Sarah Jenkins • VP of Operations, Senior Wellness LLC
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sign Up / Sign In Auth Card */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between min-h-screen">
        
        {/* Top bar */}
        <div className="px-8 md:px-16 pt-8 flex justify-between items-center lg:justify-end gap-4">
          <div className="flex items-center gap-2 cursor-pointer lg:hidden" onClick={() => { setAuthMode('signup'); setSignupStep(1); }}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div>
            <span className="text-lg font-black tracking-tight">GoldenAge</span>
          </div>

          <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
            {authMode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => { setAuthMode('signin'); setErrors({}); }} 
                  className="text-emerald-700 hover:text-emerald-800 font-black uppercase tracking-wider hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have a provider profile?{' '}
                <button 
                  onClick={() => { setAuthMode('signup'); setSignupStep(1); setErrors({}); }} 
                  className="text-emerald-700 hover:text-emerald-800 font-black uppercase tracking-wider hover:underline"
                >
                  Join Now
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Body Card container */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-16 py-12">
          <div className="w-full max-w-[540px]">
            
            {/* Render Sign Up Form Steps */}
            {authMode === 'signup' && (
              <div className="space-y-8">
                
                {/* Step header / Indicator */}
                {signupStep < 4 && (
                  <div>
                    <div className="flex gap-1.5 items-center mb-3">
                      {[1, 2, 3].map((s) => (
                        <div 
                          key={s} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            s === signupStep ? 'w-8 bg-emerald-600' : s < signupStep ? 'w-3 bg-emerald-200' : 'w-3 bg-slate-100'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                      Step {signupStep} of 3
                    </span>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {signupStep === 1 && "Let's list your business"}
                      {signupStep === 2 && "Tell us about yourself"}
                      {signupStep === 3 && "Secure your profile credentials"}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {signupStep === 1 && "Select what types of care you offer to configure your listing pipeline."}
                      {signupStep === 2 && "This information will appear to prospective families looking to communicate."}
                      {signupStep === 3 && "Set a protected, corporate-ready password to safeguard your dashboard."}
                    </p>
                  </div>
                )}

                {/* STEP 1: BUSINESS & CAPABILITIES */}
                {signupStep === 1 && (
                  <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        Corporate / Community Legal Name
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="e.g. Oakridge Senior Living Care Group"
                          value={formData.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.businessName 
                              ? 'border-red-400 focus:ring-2 focus:ring-red-100' 
                              : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        {errors.businessName && <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1">{errors.businessName}</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        Select Care Licenses Offered <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FACILITY_OPTIONS.map((opt) => {
                          const isSelected = formData.facilityTypes.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleFacilityType(opt.id)}
                              className={`p-4 rounded-2xl border text-left transition-all ${
                                isSelected 
                                  ? 'bg-emerald-50/50 border-emerald-600 text-emerald-950 shadow-sm' 
                                  : 'bg-white border-slate-100 hover:border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm tracking-tight">{opt.label}</span>
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-emerald-600 border-transparent text-white' : 'border-slate-200'
                                }`}>
                                  {isSelected && <Check size={12} strokeWidth={3} />}
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{opt.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                      {errors.facilityTypes && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.facilityTypes}</p>}
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                        Active Portfolio Size
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PORTFOLIO_SIZES.map((size) => {
                          const isSelected = formData.portfolioSize === size.value;
                          return (
                            <button
                              key={size.value}
                              type="button"
                              onClick={() => updateField('portfolioSize', size.value)}
                              className={`py-3 text-center rounded-xl border text-xs font-bold transition-all ${
                                isSelected 
                                  ? 'bg-emerald-600 border-transparent text-white shadow-md shadow-emerald-700/10' 
                                  : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                              }`}
                            >
                              {size.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-4"
                    >
                      Continue Step 2 <ChevronRight size={16} />
                    </button>
                  </form>
                )}

                {/* STEP 2: PROFESSIONAL CONTACT INFORMATION */}
                {signupStep === 2 && (
                  <form onSubmit={handleNextStep} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                        <input 
                          type="text" 
                          placeholder="Jane"
                          value={formData.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.firstName ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                        <input 
                          type="text" 
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.lastName ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Work Email Address</label>
                      <input 
                        type="email" 
                        placeholder="jane.smith@corporate.com"
                        value={formData.workEmail}
                        onChange={(e) => updateField('workEmail', e.target.value)}
                        className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                          errors.workEmail ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                        }`}
                      />
                      {errors.workEmail && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.workEmail}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Corporate Title / Role</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Executive Director"
                          value={formData.jobTitle}
                          onChange={(e) => updateField('jobTitle', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.jobTitle ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        {errors.jobTitle && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.jobTitle}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Direct Work Phone</label>
                        <input 
                          type="tel" 
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.phone ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="px-6 py-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                      >
                        Continue Step 3 <ChevronRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: SECURITY SETTINGS */}
                {signupStep === 3 && (
                  <form onSubmit={handleSignupSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Account Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Min 8 characters required"
                          value={formData.password}
                          onChange={(e) => updateField('password', e.target.value)}
                          className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                            errors.password ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                          }`}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.password}</p>}
                      
                      {/* Password strength feedback metrics */}
                      {formData.password && (
                        <div className="space-y-2 mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Password Health</span>
                            <span className="text-xs font-bold text-slate-700">{passwordStrength.label}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: `${(passwordStrength.score / 4) * 100}%` }} />
                          </div>
                          <ul className="text-[11px] font-bold text-slate-400 grid grid-cols-2 gap-y-1 gap-x-2">
                            <li className={`flex items-center gap-1.5 ${formData.password.length >= 8 ? 'text-emerald-600' : ''}`}>
                              <Check size={12} strokeWidth={3} /> At least 8 chars
                            </li>
                            <li className={`flex items-center gap-1.5 ${/[A-Z]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                              <Check size={12} strokeWidth={3} /> Upper & Lowercase
                            </li>
                            <li className={`flex items-center gap-1.5 ${/[0-9]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                              <Check size={12} strokeWidth={3} /> Number indicator
                            </li>
                            <li className={`flex items-center gap-1.5 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                              <Check size={12} strokeWidth={3} /> Special Symbol
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Confirm Password</label>
                      <input 
                        type="password" 
                        placeholder="Retype password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                          errors.confirmPassword ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                        }`}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="flex gap-3 items-start cursor-pointer group">
                        <input 
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                          className="mt-1 accent-emerald-700"
                        />
                        <span className="text-xs font-medium text-slate-500 leading-normal">
                          By listing your communities, you verify that you authorizedly represent this organization and agree to the <span className="text-emerald-700 font-bold hover:underline">Terms of Service</span> and <span className="text-emerald-700 font-bold hover:underline">Privacy Policies</span>.
                        </span>
                      </label>
                      {errors.agreeToTerms && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.agreeToTerms}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="px-6 py-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-widest transition-all"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-900/50 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Finish Listing Profile <CheckCircle2 size={16} /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 4: ONBOARDING / SUCCESS VIEW */}
                {signupStep === 4 && (
                  <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-inner border border-emerald-100">
                       <CheckCircle2 size={40} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Provider Profile is Pending Approval!</h2>
                      <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-sm mx-auto">
                        Welcome aboard, <strong className="text-slate-800">{formData.firstName}</strong>. Our credential verification specialists are reviewing your license and NPI configurations.
                      </p>
                    </div>

                    {/* Next step visual cards */}
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-left space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Immediate Next Steps</p>
                       <div className="space-y-3">
                         <div className="flex items-center gap-3 font-bold text-xs text-slate-700">
                            <div className="w-5 h-5 bg-emerald-100 rounded-md flex items-center justify-center text-emerald-700 text-[10px] font-black">1</div>
                            Confirm the activation link dispatched to {formData.workEmail}
                         </div>
                         <div className="flex items-center gap-3 font-bold text-xs text-slate-700">
                            <div className="w-5 h-5 bg-emerald-100 rounded-md flex items-center justify-center text-emerald-700 text-[10px] font-black">2</div>
                            Upload your initial room rate card files (CSV or PDF)
                         </div>
                         <div className="flex items-center gap-3 font-bold text-xs text-slate-700">
                            <div className="w-5 h-5 bg-emerald-100 rounded-md flex items-center justify-center text-emerald-700 text-[10px] font-black">3</div>
                            Book a quick dashboard onboarding walkthrough
                         </div>
                       </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        onClick={() => { setAuthMode('signin'); setSignupStep(1); }}
                        className="w-full bg-slate-950 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                      >
                        Go to Sign In
                      </button>
                      <button 
                        onClick={() => { setSignupStep(1); }}
                        className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600 transition-all"
                      >
                        Reset / Back
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* SIGN IN FORM VIEW */}
            {authMode === 'signin' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">Provider Access</h2>
                  <p className="text-slate-500 text-sm mt-1.5">Configure listings, inspect fresh inquiry messages, or update pricing details.</p>
                </div>

                <form onSubmit={handleSigninSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. director@seniorliving.com"
                      value={formData.loginEmail}
                      onChange={(e) => updateField('loginEmail', e.target.value)}
                      className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                        errors.loginEmail ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                      }`}
                    />
                    {errors.loginEmail && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.loginEmail}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Security Password</label>
                      <button type="button" className="text-xs font-bold text-emerald-700 hover:underline">Forgot?</button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        value={formData.loginPassword}
                        onChange={(e) => updateField('loginPassword', e.target.value)}
                        className={`w-full px-5 py-4 bg-white border rounded-2xl outline-none transition-all font-medium text-sm ${
                          errors.loginPassword ? 'border-red-400' : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50'
                        }`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.loginPassword && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.loginPassword}</p>}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.rememberMe}
                        onChange={(e) => updateField('rememberMe', e.target.checked)}
                        className="accent-emerald-700 rounded" 
                      />
                      <span className="text-xs font-bold text-slate-500">Keep me logged in on this device</span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-900/50 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Enter Dashboard <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-8 md:px-16 pb-8 pt-4 border-t border-slate-50 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] font-bold">
          <p>© 2026 GoldenAge Senior Care. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Privacy Protocol</a>
            <a href="#" className="hover:text-slate-600">Terms of Placement</a>
            <a href="#" className="hover:text-slate-600">Provider Helpdesk</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;