"use client";
import React, { useState } from 'react';
import { 
  Search, MapPin, Calendar, Shield, Heart, Coffee, X, Phone, 
  CheckCircle, Clock, Mail, Activity, ChevronRight, ChevronLeft, 
  Hourglass, MessageSquare 
} from 'lucide-react';

// --- Mock Data ---
const LISTINGS = [
  { id: 1, registrationID: "GO-001", name: "Golden Oaks Community", city: "Bangalore", type: "Community Living", price: "45,000", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80", tags: ["Medical Care", "Shared Dining"] },
  { id: 2, registrationID: "AP-002", name: "Azure Palms Independent", city: "Goa", type: "Independent Living", price: "65,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", tags: ["Beach Access", "Private Garden"] },
  { id: 3, registrationID: "SL-003", name: "Silver Linings Hub", city: "Bangalore", type: "Independent Living", price: "38,000", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80", tags: ["Yoga Studio", "24/7 Security"] },
  { id: 4, registrationID: "SS-004", name: "Seaside Serenity Villas", city: "Goa", type: "Community Living", price: "72,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", tags: ["Pet Friendly", "Pool"] },
];

const PREMIUM_SERVICES = [
  {
    id: 'medical_care',
    title: 'Medical Care & Hospitalization',
    icon: Shield,
    subtypes: [
      'Post-Hospitalization Rehabilitation',
      'Geriatric Acute Medical Care',
      'Chronic Illness Supervision',
      'Hospitalization Companion & Escort'
    ]
  },
  {
    id: 'home_nurses',
    title: 'Home Nurses',
    icon: Phone,
    subtypes: [
      '24/7 Registered Nurse (RN)',
      '12-Hour Day/Night Duty Nurse',
      'Wound Dressing & Injection Care',
      'Palliative & ICU-at-Home Nursing'
    ]
  },
  { 
    id: 'doctor_consultation',
    title: 'Doctor Consultation & Physio',
    icon: Coffee,
    subtypes: [
      'General Physician Home Consultation',
      'Orthopedic Physiotherapy',
      'Neurological Rehab Therapist',
      'Geriatrician Virtual Consultation'
    ]
  },
  {
    id: 'daily_assistance',
    title: 'Daily Assistance',
    icon: Heart,
    subtypes: [
      'Personal Hygiene & Bathing Assist',
      'Healthy Meal Prep & Nutrition Support',
      'Mobility & Safe Transfer Assistance',
      'Light Housekeeping & Laundry'
    ]
  }
];

const START_TIMES = [
  '08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM', '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM'
];

const BOOKING_HOURS_OPTIONS = [
  '1 Hour', '2 Hours', '4 Hours', '8 Hours', '12 Hours (Half Day)', '24 Hours (Full Day)'
];

function getMaskedData(userLoggedIn, sensitiveString) {
  if (userLoggedIn) return sensitiveString;
  const visiblePart = sensitiveString.slice(-3);
  return visiblePart.padStart(sensitiveString.length, '*');
}

// --- Booking Modal Component ---
const BookingModal = ({ home, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition">
          <X size={24} />
        </button>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-serif text-teal-900 leading-tight">Book a Site Visit to {home.name}</h2>
            <p className="text-sm text-gray-500">Our {home.city} manager will coordinate a guided tour for you and your family.</p>
            
            <div className="space-y-3 pt-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                <input required type="text" className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                <input required type="tel" className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Preferred Date</label>
                <input required type="date" className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" />
              </div>
            </div>

            <button type="submit" className="w-full bg-teal-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-teal-800 transition-all mt-4 flex items-center justify-center gap-2">
              <Calendar size={18} /> Confirm Visit Request
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Received</h2>
            <p className="text-gray-600 mt-2 px-4">We've sent your request to the concierge at {home.name}. Expect a call shortly!</p>
            <button onClick={onClose} className="mt-8 bg-stone-100 px-6 py-2 rounded-full font-medium hover:bg-stone-200 transition">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function Home() {
  const [city, setCity] = useState('All');
  const [category, setCategory] = useState('All');
  const [selectedHome, setSelectedHome] = useState(null);
  
  const [selectedService, setSelectedService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    needDescription: '',
    subtype: '',
    startDate: '',
    startTimeRange: '08:00 AM - 09:00 AM',
    bookingHours: '4 Hours',
    preferredContactTime: 'Anytime',
    contactMode: 'Phone Call',
    contactNumber: '',
    emailAddress: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const modalSteps = [
    { label: 'Care Profile', desc: 'Define your care needs & subtype.' },
    { label: 'Timing', desc: 'Pick target start date & time window.' },
    { label: 'Contact', desc: 'Choose timing & outreach channel.' },
    { label: 'Confirm', desc: 'Provide contact information.' }
  ];

  const filteredHomes = LISTINGS.filter(home => {
    return (city === 'All' || home.city === city) && 
           (category === 'All' || home.type === category);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setActiveStep(0);
    setFormData({
      needDescription: '',
      subtype: service.subtypes[0],
      startDate: new Date().toISOString().split('T')[0],
      startTimeRange: '08:00 AM - 09:00 AM',
      bookingHours: '4 Hours',
      preferredContactTime: 'Anytime',
      contactMode: 'Phone Call',
      contactNumber: '',
      emailAddress: ''
    });
    setErrors({});
  };

  const submitModalRequest = () => {
    const newErrors = {};

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[+0-9\s-]{8,15}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid phone number';
    }

    if (formData.emailAddress.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress.trim())) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowSuccessNotification(true);
    setSelectedService(null);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 4000);
  };

  const handleNextStep = () => {
    if (activeStep < modalSteps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      submitModalRequest();
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white sticky top-0 z-40 border-b border-stone-100">
        <div className="text-2xl font-serif font-bold text-teal-800 tracking-tight">Golden Age</div>
        <div className="hidden md:flex items-center space-x-8 text-stone-600 font-medium">
          <a href="#" className="hover:text-teal-700">Explore</a>
          <a href="#" className="hover:text-teal-700">About Us</a>
          <a href="/register" className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">List Your Property</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ad6ce6ecdd8?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Senior Living" 
        />
        <div className="relative z-20 max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Retire where life feels <br/>like a vacation.</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">Discover premium community & independent living in India's most sought-after retirement hubs.</p>
        </div>
      </div>

      {/* Search & Filter Section */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-30 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-stone-100 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="flex items-center text-sm font-bold text-stone-500 mb-2 gap-2">
              <MapPin size={16} className="text-teal-600"/> LOCATION
            </label>
            <select 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 font-medium outline-none focus:ring-2 focus:ring-teal-600 transition"
            >
              <option value="All">All Locations (Bangalore & Goa)</option>
              <option value="Bangalore">Bangalore (Garden City)</option>
              <option value="Goa">Goa (Coastal Living)</option>
            </select>
          </div>

          <div className="flex-1 min-w-[240px]">
            <label className="flex items-center text-sm font-bold text-stone-500 mb-2 gap-2">
              <Heart size={16} className="text-teal-600"/> LIVING CATEGORY
            </label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border border-stone-200 rounded-xl bg-stone-50 text-stone-800 font-medium outline-none focus:ring-2 focus:ring-teal-600 transition"
            >
              <option value="All">All Categories</option>
              <option value="Community Living">Community Living (Social & Care)</option>
              <option value="Independent Living">Independent Living (Privacy & Freedom)</option>
              <option value="Private Living">Private Living (Premium Care & Services)</option>
            </select>
          </div>

          <button className="bg-teal-800 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-900 transition flex items-center gap-2 h-[60px]">
            <Search size={20} /> Search Now
          </button>
        </div>

        {/* Dynamic Private Living Services View */}
        {category === 'Private Living' && (
          <div className="mt-12 bg-slate-50 text-slate-800 rounded-3xl p-6 sm:p-10 border border-stone-200">
            {showSuccessNotification && (
              <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[200] bg-[#1e4d40] text-white py-3 px-5 sm:py-4 sm:px-6 rounded-2xl shadow-xl border border-emerald-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-300">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">Service Request Registered</h4>
                  <p className="text-[10px] sm:text-xs text-emerald-100/80">Our wellness manager is coordinating details now.</p>
                </div>
              </div>
            )}

            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-3xl font-serif text-slate-900 font-normal leading-tight">Premium Services</h2>
              <p className="text-slate-500 text-sm sm:text-base mt-1">Personalized care services tailored to your needs</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PREMIUM_SERVICES.map((service) => {
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#13a89e] flex items-center justify-center mb-4">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-slate-800 font-bold text-sm tracking-tight">{service.title}</h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Service Config Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-xl rounded-t-[32px] sm:rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className="px-6 py-5 sm:px-8 sm:pt-8 sm:pb-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1c5a4b] flex items-center justify-center">
                      {React.createElement(selectedService.icon, { size: 20 })}
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">Configure Request</span>
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">{selectedService.title}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedService(null)} className="p-2 text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex gap-2">
                  {modalSteps.map((step, idx) => (
                    <div key={idx} className="flex-1 space-y-1">
                      <div className={`h-1.5 rounded-full ${idx <= activeStep ? 'bg-[#1c5a4b]' : 'bg-slate-100'}`} />
                      <p className={`text-[9px] font-black uppercase text-center ${idx === activeStep ? 'text-[#1c5a4b]' : 'text-slate-300'}`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
                {activeStep === 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Respective Care Sub-Type</label>
                      <select 
                        name="subtype"
                        value={formData.subtype}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 outline-none"
                      >
                        {selectedService.subtypes.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Mention Your Need</label>
                      <textarea 
                        name="needDescription"
                        rows="3"
                        value={formData.needDescription}
                        onChange={handleInputChange}
                        placeholder="Tell us about the client's current health status or custom instructions..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Expected Start Date</label>
                      <input 
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-bold outline-none"
                      />
                    </div>

                    {(!(PREMIUM_SERVICES.id === 'doctor_consultation')) && (<div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Start Time</label>
                        <select 
                          name="startTimeRange"
                          value={formData.startTimeRange}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-bold outline-none"
                        >
                          {START_TIMES.map((time, idx) => (
                            <option key={idx} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase">Booking Hours</label>
                        <select 
                          name="bookingHours"
                          value={formData.bookingHours}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-bold outline-none"
                        >
                          {BOOKING_HOURS_OPTIONS.map((hours, idx) => (
                            <option key={idx} value={hours}>{hours}</option>
                          ))}
                        </select>
                      </div>
                    </div>)}
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Contact Mode</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Phone Call', 'WhatsApp'].map(mode => (
                          <label 
                            key={mode} 
                            className={`flex flex-col items-center justify-center p-4 border rounded-2xl text-xs font-bold cursor-pointer ${
                              formData.contactMode === mode ? 'border-[#1c5a4b] bg-emerald-50/50 text-[#1c5a4b]' : 'border-slate-100 bg-slate-50 text-slate-500'
                            }`}
                          >
                            <input 
                              type="radio" 
                              name="contactMode" 
                              value={mode}
                              checked={formData.contactMode === mode}
                              onChange={handleInputChange}
                              className="hidden" 
                            />
                            {mode}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Contact Number *</label>
                      <input 
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none"
                      />
                      {errors.contactNumber && <p className="text-xs text-rose-500">{errors.contactNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input 
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
                <button 
                  type="button"
                  onClick={activeStep > 0 ? handlePrevStep : () => setSelectedService(null)}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-xs"
                >
                  {activeStep > 0 ? 'Back' : 'Cancel'}
                </button>

                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 bg-[#1c5a4b] text-white py-3 rounded-xl font-bold text-xs shadow-lg"
                >
                  {activeStep === modalSteps.length - 1 ? 'Confirm Request' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Listings Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomes.length > 0 ? (
            filteredHomes.map(home => (
              <div key={home.id} className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 ${selectedHome?.id === home.id ? 'blur-sm' : ''}`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={home.image} alt={home.registrationID} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                    {home.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">{getMaskedData(false, home.name)}</h3>
                      <p className="text-sm text-slate-400 mt-1">Reg ID: {home.registrationID}</p>
                    </div>
                    <span className="text-teal-700 font-bold">₹{home.price}<span className="text-xs font-normal text-stone-400">/mo</span></span>
                  </div>
                  <p className="text-stone-500 flex items-center text-sm mb-4"><MapPin size={14} className="mr-1"/> {home.city}, India</p>

                  <button 
                    onClick={() => setSelectedHome(home)}
                    className="w-full bg-stone-900 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition-colors"
                  >
                    Schedule a Visit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-stone-400 font-serif italic">No properties found matching your selection.</p>
            </div>
          )}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedHome && (
        <BookingModal 
          home={selectedHome} 
          onClose={() => setSelectedHome(null)} 
        />
      )}
    </div>
  );
}