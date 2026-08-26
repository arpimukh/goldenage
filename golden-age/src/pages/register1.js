import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Building2, 
  ShieldCheck,
  Stethoscope,
  TestTube,
  Banknote,
  PlayCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

const App = () => {
  // Navigation State: 'landing' | 'signin' | 'signup'
  const [view, setView] = useState('landing');
  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    facilityTypes: [],
    propertyCount: '1 property',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const facilityOptions = [
    'Assisted Living', 'Memory Care', 'Independent Living', 
    'Skilled Nursing', 'Residential Care Home', 'CCRC / Life Plan'
  ];

  const propertyOptions = [
    '1 property', '2-5 properties', '6-10 properties', '11+ properties'
  ];

  // --- Logic Helpers ---
  const toggleFacility = (type) => {
    setFormData(prev => ({
      ...prev,
      facilityTypes: prev.facilityTypes.includes(type)
        ? prev.facilityTypes.filter(t => t !== type)
        : [...prev.facilityTypes, type]
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Simplified validation for demo
    setSignupStep(2);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupStep(3);
    }, 1500);
  };

  // --- Shared Components ---
  const InputWrapper = ({ label, icon: Icon, name, placeholder, error, optional, type = "text", showToggle }) => (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-[13px] font-bold text-gray-700 uppercase tracking-tight">
          {label} {optional && <span className="text-gray-400 font-normal lowercase">(optional)</span>}
          {!optional && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {name === 'password' && view === 'signin' && (
          <button className="text-xs text-gray-400 hover:text-emerald-600 transition-colors">Forgot password?</button>
        )}
      </div>
      <div className={`relative flex items-center rounded-xl border transition-all ${
        error ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/10'
      }`}>
        <div className="pl-4 pr-2 text-gray-400">
          <Icon size={18} />
        </div>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={formData[name] ?? ''}
          onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
          placeholder={placeholder}
          className="w-full py-3.5 pr-4 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
        />
        {showToggle && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="pr-4 text-gray-400 hover:text-emerald-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  // --- Views ---

  // 1. Landing View
  if (view === 'landing') {
    const features = [{ label: 'FREE to List' }, { label: 'No Commission' }, { label: 'No Contracts' }];
    const stats = [
      { value: '$0', title: 'Placement Fees', desc: 'Forever free, no hidden costs' },
      { value: '0%', title: 'Commission', desc: 'Keep 100% of your revenue' },
      { value: '10 min', title: 'Setup Time', desc: 'Quick and easy listing creation' },
      { value: '47+', title: 'Avg. Monthly Inquiries', desc: 'Qualified leads reaching out' }
    ];

    return (
      <div className="min-h-screen bg-[#0f172a] text-white selection:bg-emerald-500/30">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-emerald-600 p-1.5 rounded-lg"><Building2 size={24} /></div>
            <span className="text-xl font-bold tracking-tight">LivingTrail</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-emerald-400">Pricing</a>
            <a href="#" className="hover:text-emerald-400">Communities</a>
            <button onClick={() => setView('signin')} className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full border border-white/10 transition-all">
              Sign In
            </button>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              List Your Community <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">For Free.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl">
              Join 10,000+ senior living communities connecting directly with families. No middleman, no commissions.
            </p>
            <div className="flex flex-wrap gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400">
                  <Check size={14} /> <span className="text-sm font-semibold">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => { setView('signup'); setSignupStep(1); }} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-emerald-900/20 group">
                Create Free Listing <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl font-bold transition-all">
                <PlayCircle className="text-emerald-400" /> See How It Works
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] blur opacity-25"></div>
            <div className="relative bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
              <h3 className="text-xl font-bold mb-10">Performance Highlights</h3>
              <div className="space-y-8">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-start gap-6 group/item">
                    <div className="text-3xl md:text-4xl font-black text-emerald-500 w-20">{stat.value}</div>
                    <div className="flex-1 pb-6 border-b border-white/5 last:border-0">
                      <h4 className="font-bold text-lg">{stat.title}</h4>
                      <p className="text-gray-500 text-sm">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 2. Sign In View (Split Screen)
  if (view === 'signin') {
    return (
      <div className="min-h-screen bg-white flex animate-in fade-in duration-500">
        <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=1200" 
            alt="Elderly care" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 p-16 flex flex-col justify-between h-full">
            <div onClick={() => setView('landing')} className="flex items-center gap-2 text-white cursor-pointer">
              <div className="bg-emerald-600 p-1.5 rounded"><Building2 size={20} /></div>
              <span className="text-xl font-bold tracking-tight">LivingTrail</span>
            </div>
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">Welcome back</h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Access your dashboard to manage inquiries and community listings.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="text-emerald-400" />
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Secure Professional Access</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
              <p className="text-gray-500">Enter your community management credentials</p>
            </header>
            <form className="space-y-6">
              <InputWrapper label="Email address" icon={Mail} name="email" placeholder="you@company.com" />
              <InputWrapper label="Password" icon={Lock} name="password" placeholder="••••••••" type="password" showToggle />
              <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-200">
                Sign In
              </button>
              <div className="text-center">
                <button onClick={() => setView('signup')} className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
                  Don't have an account? <span className="text-emerald-600 font-bold underline">Create a listing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 3. Sign Up View (Modal Multi-Step)
  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 animate-in zoom-in-95 duration-300">
        <div className="w-full max-w-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gray-50 border-b px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${signupStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>1</div>
              <div className={`h-1 w-8 rounded-full ${signupStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${signupStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>2</div>
            </div>
            <button onClick={() => setView('landing')} className="text-gray-400 hover:text-gray-600 transition-colors uppercase text-[10px] font-black tracking-widest">Close</button>
          </div>

          <div className="p-10 md:p-14">
            {signupStep === 1 && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Listing</h2>
                <p className="text-gray-500 mb-10">Start connecting with families looking for care.</p>
                <form onSubmit={handleNext} className="space-y-6">
                  <InputWrapper label="Business Name" icon={Building2} name="businessName" placeholder="e.g. Sunny Brook Care" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputWrapper label="First Name" icon={User} name="firstName" placeholder="Jane" />
                    <InputWrapper label="Last Name" icon={User} name="lastName" placeholder="Doe" />
                  </div>
                  <InputWrapper label="Work Email" icon={Mail} name="email" placeholder="jane@sunnybrook.com" />
                  
                  <div className="space-y-4 pt-4">
                    <label className="text-[13px] font-bold text-gray-700 uppercase">Number of Properties</label>
                    <div className="grid grid-cols-4 gap-2">
                      {propertyOptions.map(opt => (
                        <button 
                          type="button" 
                          key={opt}
                          onClick={() => setFormData(prev => ({ ...prev, propertyCount: opt }))}
                          className={`p-3 rounded-xl border-2 transition-all ${formData.propertyCount === opt ? 'border-emerald-600 bg-emerald-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}
                        >
                          <span className={`block text-lg font-black ${formData.propertyCount === opt ? 'text-emerald-700' : 'text-gray-700'}`}>{opt.split(' ')}</span>
                          <span className="block text-[8px] uppercase font-bold text-gray-400">{opt.split(' ')}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8 transition-all">
                    Next Step <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {signupStep === 2 && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                <button onClick={() => setSignupStep(1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-600 mb-6 font-bold">
                  <ChevronLeft size={16} /> Back to details
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Set Password</h2>
                <p className="text-gray-500 mb-10">Choose a strong password for your new manager account.</p>
                <form onSubmit={handleSignupSubmit} className="space-y-6">
                  <InputWrapper label="Password" icon={Lock} name="password" placeholder="At least 8 characters" type="password" showToggle />
                  <InputWrapper label="Confirm" icon={Lock} name="confirmPassword" placeholder="Repeat password" type="password" />
                  <button disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8 disabled:opacity-50">
                    {isSubmitting ? "Creating Account..." : "Finish Registration"}
                  </button>
                </form>
              </div>
            )}

            {signupStep === 3 && (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Complete!</h2>
                <p className="text-gray-500 mb-8">We've sent a confirmation email to your address.</p>
                <button onClick={() => setView('signin')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-xl font-bold transition-all">
                  Sign In to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;