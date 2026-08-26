"use client";
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Shield, Heart, Coffee, X, Phone, CheckCircle, Check, 
  Clock, 
  Mail, 
  Activity,
   ChevronRight,
  ChevronLeft,
  Hourglass, 
  MessageSquare } from 'lucide-react';


// --- Mock Data ---
const LISTINGS = [
  { id: 1, registrationID: "GO-001", name: "Golden Oaks Community", city: "Bangalore", type: "Community Living", price: "45,000", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80", tags: ["Medical Care", "Shared Dining"] },
  { id: 2, registrationID: "AP-002", name: "Azure Palms Independent", city: "Goa", type: "Independent Living", price: "65,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", tags: ["Beach Access", "Private Garden"] },
  { id: 3, registrationID: "SL-003", name: "Silver Linings Hub", city: "Bangalore", type: "Independent Living", price: "38,000", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80", tags: ["Yoga Studio", "24/7 Security"] },
  { id: 4, registrationID: "SS-004", name: "Seaside Serenity Villas", city: "Goa", type: "Community Living", price: "72,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", tags: ["Pet Friendly", "Pool"] },
  // { id: 5, registrationID: "MC-005", name: "Medical Care", city: "Bangalore", type: "Private Living", price: "55,000", image: Shield, tags: ["In-Home Care", "Private Chef"] },
  // { id: 6, registrationID: "SA-006", name: "Social Activities", city: "Goa", type: "Private Living", price:
  // { id: 7, name: "24/7 Support", city: "Bangalore", type: "Community Living", price: "42,000", image: Phone, tags: ["Art Studio", "Community Garden"] },
];

const Services = [
  { id: 1, name: "Medical Care", icon: Shield },
  { id: 2, name: "Social Activities", icon: Coffee },
  { id: 3, name: "24/7 Support", icon: Phone },
];
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

// --- Main Page ---
export default function Home() {
  const [city, setCity] = useState('All');
  const [category, setCategory] = useState('All');
  const [selectedHome, setSelectedHome] = useState(null);

  const filteredHomes = LISTINGS.filter(home => {
    return (city === 'All' || home.city === city) && 
           (category === 'All' || home.type === category);
  });
  // Service list exactly matching the structure, labels, and icons of image_f7e8e7.png
  const PREMIUM_SERVICES = [
  {
    id: 'medical_care',
    title: 'Medical Care & Hospitalization',
    icon: Shield,
    color: 'emerald',
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
    color: 'emerald',
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
    icon: Coffee, // Matches the coffee/mug icon layout on doctor cards in image_f7e8e7.png
    color: 'emerald',
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
    color: 'emerald',
    subtypes: [
      'Personal Hygiene & Bathing Assist',
      'Healthy Meal Prep & Nutrition Support',
      'Mobility & Safe Transfer Assistance',
      'Light Housekeeping & Laundry'
    ]
  },
  {
    id: 'caregiver_attendants',
    title: 'Caregiver & Attendants',
    icon: Shield,
    color: 'emerald',
    subtypes: [
      'Certified Dementia Attendant',
      'Full-time Bedridden Patient Attendant',
      'Day-time Companion Caregiver',
      'Night Supervision Attendant'
    ]
  },
  {
    id: 'companionship_engagement',
    title: 'Companionship & Engagement',
    icon: Coffee,
    color: 'emerald',
    subtypes: [
      'Cognitive Games & Mental Exercise',
      'Outdoor Walking & Social Escort',
      'Reading, Arts & Hobby Mentorship',
      'Reminiscence & Conversation Companion'
    ]
  },
  {
    id: 'helping_hands_errands',
    title: 'Helping Hands & Errands',
    icon: Phone,
    color: 'emerald',
    subtypes: [
      'Pharmacy & Medication Pick-up',
      'Grocery Shopping & Bank Errands',
      'Utility Bills & Tech Assistance',
      'Light Gardening & Home Coordination'
    ]
  }
  ];
  
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
    // Snapshot of the confirmed booking (incl. autogenerated service ID)
    // rendered on the final "Booking Details" tab after Confirm Request
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    // Autogenerated service ID: first 2 letters of the service type/title
    // followed by 6 random digits (e.g. "ME483920")
    const generateServiceId = (serviceType) => {
      const prefix = (serviceType || '').replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
      return `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
    };
  
    const modalSteps = [
      { label: 'Care Profile', desc: 'Define your care needs & subtype.' },
      { label: 'Timing', desc: 'Pick target start date & time window.' },
      { label: 'Contact', desc: 'Choose timing & outreach channel.' },
      { label: 'Confirm', desc: 'Provide contact information.' },
      { label: 'Confirmed', desc: 'Booking summary & service ID.' }
    ];
  
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
      setConfirmedBooking(null);
    };
  
    const handleNextStep = () => {
      if (activeStep < modalSteps.length - 2) {
        setActiveStep(prev => prev + 1);
      } else {
        // "Confirm Request" on the final input step -> validate & show details
        submitModalRequest();
      }
    };
  
    const handlePrevStep = () => {
      if (activeStep > 0) {
        setActiveStep(prev => prev - 1);
      }
    };
    function getMaskedData(userLoggedIn, sensitiveString) {
      if (userLoggedIn) {
        return sensitiveString; // Show full string if logged in
      }
      // Mask all but the last 3 characters
      const visiblePart = sensitiveString.slice(-3);
      return visiblePart.padStart(sensitiveString.length, '*');
    }
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
  
      // Advance to the final "Booking Details" tab instead of closing the
      // modal: snapshot the complete booking incl. autogenerated service ID
      setConfirmedBooking({
        serviceId: generateServiceId(selectedService.title),
        serviceTitle: selectedService.title,
        subtype: formData.subtype,
        startDate: formData.startDate,
        startTimeRange: formData.startTimeRange,
        bookingHours: formData.bookingHours,
        contactMode: formData.contactMode,
        contactNumber: formData.contactNumber,
        emailAddress: formData.emailAddress
      });
      setActiveStep(modalSteps.length - 1);
    };
  
    const START_TIMES = [
      '08:00 AM - 09:00 AM',
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '12:00 PM - 01:00 PM',
      '01:00 PM - 02:00 PM',
      '02:00 PM - 03:00 PM',
      '03:00 PM - 04:00 PM',
      '04:00 PM - 05:00 PM',
      '05:00 PM - 06:00 PM',
      '06:00 PM - 07:00 PM',
      '07:00 PM - 08:00 PM'
    ];
  
    const BOOKING_HOURS_OPTIONS = [
      '1 Hour',
      '2 Hours',
      '4 Hours',
      '8 Hours',
      '12 Hours (Half Day)',
      '24 Hours (Full Day)'
    ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white sticky top-0 z-40 border-b border-stone-100">
        <div className="text-2xl font-serif font-bold text-teal-800 tracking-tight">Golden Age</div>
        <div className="hidden md:flex items-center space-x-8 text-stone-600 font-medium">
          <a href="#" className="hover:text-teal-700">Explore</a>
          <a href="#" className="hover:text-teal-700">About Us</a>
          <a href="http://localhost:3000/register" className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">List Your Property</a>
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
              <option value="Private Living">Private Living (Premium Care & Services from any where)</option>
            </select>

          </div>

          <button className="bg-teal-800 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-900 transition flex items-center gap-2 h-[60px]">
            <Search size={20} /> Search Now
          </button>
        </div>

        {/* Dynamic Results Grid :: TBD: add another grid for services if Living Category "Private Living" is selected */}
        {category === 'Private Living' && (
          <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-100">
      
      {/* Main Container */}
      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="mb-8 sm:mb-12 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-serif text-slate-900 font-normal leading-tight tracking-tight mb-2 sm:mb-3">
            Premium Services
          </h1>
          <p className="text-slate-500 text-sm sm:text-lg md:text-xl font-light">
            Personalized care services tailored to your needs
          </p>
        </div>

        {/* Responsive layout: 2 cols on small mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {PREMIUM_SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="group flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-white border border-slate-100 rounded-2xl sm:rounded-[28px] shadow-sm hover:shadow-md hover:border-emerald-500/20 active:scale-95 transition-all duration-200 min-h-[140px] sm:min-h-[190px] lg:min-h-[220px] text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/30 touch-manipulation"
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-emerald-50/60 text-[#13a89e] flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-105 group-active:scale-95 transition-transform duration-200">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-slate-800 font-bold text-xs sm:text-sm lg:text-base tracking-tight leading-tight sm:leading-snug px-1 sm:px-3 group-hover:text-[#1c5a4b] transition-colors">
                  {service.title}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white w-full max-w-xl rounded-t-[32px] sm:rounded-[40px] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 sm:px-8 sm:pt-8 sm:pb-6 border-b border-slate-100 bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 text-[#1c5a4b] flex items-center justify-center shadow-inner">
                    {React.createElement(selectedService.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">Configure Request</span>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight line-clamp-1">{selectedService.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Segmented Progress Bar */}
              <div className="flex gap-1.5 sm:gap-2">
                {modalSteps.map((step, idx) => (
                  <div key={idx} className="flex-1 space-y-1 sm:space-y-2">
                    <div 
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                        idx <= activeStep ? 'bg-[#1c5a4b]' : 'bg-slate-100'
                      }`} 
                    />
                    <p className={`text-[8px] sm:text-[9px] font-black uppercase text-center tracking-wider ${
                      idx === activeStep ? 'text-[#1c5a4b]' : 'text-slate-300'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
              
              {/* STEP 1: Care Need & Subtype Details */}
              {activeStep === 0 && (
                <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="bg-emerald-50/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100/30 flex items-start gap-3">
                    <Activity size={16} className="text-[#1c5a4b] shrink-0 mt-0.5" />
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                      Select the matching service sub-type and describe any customized preferences or physical/cognitive assistance needed.
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Respective Care Sub-Type</label>
                    <div className="relative">
                      <select 
                        name="subtype"
                        value={formData.subtype}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm font-bold text-slate-700 transition-all appearance-none cursor-pointer"
                      >
                        {selectedService.subtypes.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Mention Your Need</label>
                    <textarea 
                      name="needDescription"
                      rows="4"
                      value={formData.needDescription}
                      onChange={handleInputChange}
                      placeholder="Tell us about the client's current health status, recovery state, daily patterns, or specific custom instructions..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Timing, Start Time & Booking Hours Selection */}
              {activeStep === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" /> Expected Start Date
                    </label>
                    <input 
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm text-slate-800 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Start Time 1-hour ranges */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" /> Start Time (1hr Range)
                      </label>
                      <div className="relative">
                        <select 
                          name="startTimeRange"
                          value={formData.startTimeRange}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm text-slate-800 font-bold appearance-none cursor-pointer"
                        >
                          {START_TIMES.map((time, idx) => (
                            <option key={idx} value={time}>{time}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <ChevronRight size={16} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    {/* Booking Hours */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Hourglass size={14} className="text-slate-400" /> Booking Hours
                      </label>
                      <div className="relative">
                        <select 
                          name="bookingHours"
                          value={formData.bookingHours}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm text-slate-800 font-bold appearance-none cursor-pointer"
                        >
                          {BOOKING_HOURS_OPTIONS.map((hours, idx) => (
                            <option key={idx} value={hours}>{hours}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          <ChevronRight size={16} className="rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact preferences */}
              {activeStep === 2 && (
                <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2.5 sm:space-y-3">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Mode</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Phone Call', 'WhatsApp'].map(mode => (
                        <label 
                          key={mode} 
                          className={`flex flex-col items-center justify-center p-4 sm:p-6 border rounded-2xl sm:rounded-[28px] text-[11px] sm:text-xs font-bold cursor-pointer transition-all ${
                            formData.contactMode === mode 
                            ? 'border-[#1c5a4b] bg-emerald-50/50 text-[#1c5a4b]' 
                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
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
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center mb-2 sm:mb-3 text-slate-400 shadow-sm border border-slate-50">
                            {mode === 'WhatsApp' ? <MessageSquare size={15} /> : <Phone size={15} />}
                          </div>
                          <span>{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Contact Time</label>
                    <select 
                      name="preferredContactTime"
                      value={formData.preferredContactTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm text-slate-800 font-bold cursor-pointer"
                    >
                      <option>Anytime</option>
                      <option>Morning (09:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 04:00 PM)</option>
                      <option>Evening (04:00 PM - 07:00 PM)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 4: Mandatory Information Verification & Summary */}
              {activeStep === 3 && (
                <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 space-y-3">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration Summary</p>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-[11px] sm:text-xs font-bold">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Subtype:</span>
                        <span className="text-slate-700 line-clamp-1">{formData.subtype}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Start Date:</span>
                        <span className="text-slate-700">{formData.startDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Start Time:</span>
                        <span className="text-slate-700">{formData.startTimeRange}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Booking Duration:</span>
                        <span className="text-slate-700">{formData.bookingHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[9px] sm:text-[10px] text-rose-500 font-bold uppercase tracking-wider">Mandatory</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm font-bold transition-all ${
                          errors.contactNumber ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-100'
                        }`}
                      />
                      <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone size={15} />
                      </div>
                    </div>
                    {errors.contactNumber && (
                      <p className="text-xs font-semibold text-rose-500 mt-1 pl-1">{errors.contactNumber}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="yourname@domain.com"
                        className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none text-xs sm:text-sm font-bold transition-all ${
                          errors.emailAddress ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-100'
                        }`}
                      />
                      <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={15} />
                      </div>
                    </div>
                    {errors.emailAddress && (
                      <p className="text-xs font-semibold text-rose-500 mt-1 pl-1">{errors.emailAddress}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: Booking Confirmation — autogenerated service ID + details */}
              {activeStep === modalSteps.length - 1 && confirmedBooking && (
                <div className="space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
                  {/* Success header */}
                  <div className="flex flex-col items-center text-center pt-1 pb-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                      <CheckCircle size={26} strokeWidth={2.25} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Request Confirmed!</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Your Premium Services booking has been registered successfully.</p>
                  </div>

                  {/* Autogenerated Service ID */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-700">Service ID</span>
                    <span className="font-mono font-bold text-sm sm:text-base tracking-[0.15em] text-[#1c5a4b]">{confirmedBooking.serviceId}</span>
                  </div>

                  {/* Booking details summary */}
                  <div className="border border-slate-100 rounded-xl sm:rounded-2xl overflow-hidden">
                    <p className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Booking Details</p>
                    <dl className="divide-y divide-slate-50">
                      {[
                        ['Service', confirmedBooking.serviceTitle],
                        ['Sub-Type', confirmedBooking.subtype],
                        ['Start Date', confirmedBooking.startDate],
                        ['Time Window', confirmedBooking.startTimeRange],
                        ['Duration', confirmedBooking.bookingHours],
                        ['Contact Mode', confirmedBooking.contactMode],
                        ['Phone Number', confirmedBooking.contactNumber],
                        ['Email Address', confirmedBooking.emailAddress || '\u2014']
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-4 px-4 py-2">
                          <dt className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">{label}</dt>
                          <dd className="text-[11px] sm:text-xs font-semibold text-slate-800 text-right break-words">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Close button — dismisses the popup */}
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="w-full bg-[#1c5a4b] hover:bg-[#16473b] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-[#1c5a4b]/20 transition-all flex items-center justify-center gap-2"
                  >
                    Close <X size={16} />
                  </button>
                </div>
              )}

            </div>

            {/* Sticky Action Footer controls — hidden on the final "Confirmed"
                tab, which already provides its own Close button at the end */}
            {activeStep !== modalSteps.length - 1 && (
            <div className="p-4 sm:p-8 border-t border-slate-100 bg-white flex gap-3 sm:gap-4">
              {activeStep > 0 ? (
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-slate-100"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all"
                >
                  Cancel
                </button>
              )}
              
              <button 
                type="button"
                onClick={handleNextStep}
                className="flex-1 bg-[#1c5a4b] hover:bg-[#16473b] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-[#1c5a4b]/20 transition-all flex items-center justify-center gap-2"
              >
                {activeStep === modalSteps.length - 2 ? (
                  <>Confirm Request <Check size={16} /></>
                ) : (
                  <>Continue <ChevronRight size={16} /></>
                )}
              </button>
            </div>
            )}

          </div>
        </div>
      )}
    </div>
        )}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHomes.length > 0 ? (
            filteredHomes.map(home => (
              <div key={home.id} className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 ${selectedHome?.id === home.id ? 'blur-sm' : ''}`}>
                <div className="relative h-64 overflow-hidden">
                  <img src={home.image} alt={home.registrationID} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                    {home.type}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white font-bold text-lg drop-shadow-sm max-w-[90%] text-center">
                      {home.name}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold  backdrop-blur-sm text-stone-800">{getMaskedData(false, home.name)}</h3>
                      <p className="text-sm text-slate-400 mt-1">Reg ID: {home.registrationID}</p>
                    </div>
                    <span className="text-teal-700 font-bold">₹{home.price}<span className="text-xs font-normal text-stone-400">/mo</span></span>
                  </div>
                  <p className="text-stone-500 flex items-center text-sm mb-4"><MapPin size={14} className="mr-1"/> {home.city}, India</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {home.tags.map(tag => (
                      <span key={tag} className="bg-stone-100 text-stone-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

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

      {/* Trust Bar */}
      <section className="bg-white py-16 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <Shield className="text-teal-600 mb-4" size={40} />
            <h4 className="font-bold text-lg mb-1">Safety First</h4>
            <p className="text-stone-500 text-sm">Every Bangalore & Goa community is verified for emergency response protocols.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Coffee className="text-teal-600 mb-4" size={40} />
            <h4 className="font-bold text-lg mb-1">Social Wellness</h4>
            <p className="text-stone-500 text-sm">Designed to fight isolation with curated hobby clubs and daily social mixers.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="text-teal-600 mb-4" size={40} />
            <h4 className="font-bold text-lg mb-1">24/7 Support</h4>
            <p className="text-stone-500 text-sm">Dedicated local care managers for your peace of mind.</p>
          </div>
        </div>
      </section>

      {/* Booking Modal Overlay */}
      {selectedHome && (
        <BookingModal 
          home={selectedHome} 
          onClose={() => setSelectedHome(null)} 
        />
      )}
    </div>
  );
}
