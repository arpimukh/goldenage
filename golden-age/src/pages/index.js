"use client";

import React, { useState } from 'react';
import { Search, MapPin, Heart, Layers, ArrowRight, X, Menu, Sparkles, Check, Phone, ShieldCheck, Star } from 'lucide-react';

const LISTINGS = [
  { id: 1, registrationID: "GO-001", name: "Golden Oaks Community", city: "Bangalore", type: "Community Living", price: "45,000", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80", tags: ["Medical Care", "Shared Dining"] },
  { id: 2, registrationID: "AP-002", name: "Azure Palms Independent", city: "Goa", type: "Independent Living", price: "65,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", tags: ["Beach Access", "Private Garden"] },
  { id: 3, registrationID: "SL-003", name: "Silver Linings Hub", city: "Bangalore", type: "Independent Living", price: "38,000", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80", tags: ["Yoga Studio", "24/7 Security"] },
  { id: 4, registrationID: "SS-004", name: "Seaside Serenity Villas", city: "Goa", type: "Community Living", price: "72,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", tags: ["Pet Friendly", "Pool"] }
];

function PropertyCard({ home, isSelected, onSelect, isCompared, onToggleCompare }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={home.image} 
          alt={home.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-stone-700 shadow-sm">
          {home.registrationID}
        </div>
        <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
          {home.type}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-teal-700 font-semibold mb-1">
            <MapPin size={14} />
            <span>{home.city}</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-800 mb-2 group-hover:text-teal-800 transition-colors">
            {home.name}
          </h3>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {home.tags.map((tag, idx) => (
              <span key={idx} className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Starting at</span>
            <span className="text-lg font-bold text-teal-800">₹{home.price}</span>
            <span className="text-xs text-stone-500"> / mo</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(home.id)}
              className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                isCompared 
                  ? 'bg-teal-50 border-teal-500 text-teal-700' 
                  : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              <Layers size={16} className={isCompared ? "text-teal-700" : "text-stone-500"} />
            </button>
            <button
              onClick={() => onSelect(home)}
              className="bg-stone-900 hover:bg-teal-700 text-white text-xs px-4 py-2.5 rounded-xl font-semibold transition"
            >
              Book Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ home, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-stone-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={24} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Visit Scheduled!</h3>
            <p className="text-stone-600 text-sm mb-6">
              Our community manager at <strong>{home.name}</strong> will contact you shortly to confirm details.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold text-sm transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Schedule a Visit</span>
              <h3 className="text-2xl font-serif font-bold text-stone-800">{home.name}</h3>
              <p className="text-xs text-stone-500 mt-1">{home.city} • Registration: {home.registrationID}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Eleanor Vance" 
                  className="w-full p-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 98765 43210" 
                  className="w-full p-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  required 
                  className="w-full p-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition mt-2"
              >
                Confirm Tour Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [city, setCity] = useState('All');
  const [category, setCategory] = useState('All');
  const [selectedHome, setSelectedHome] = useState(null);
  const [comparedIds, setComparedIds] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const toggleCompare = (id) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(item => item !== id));
    } else {
      if (comparedIds.length >= 3) {
        showToast("You can compare a maximum of 3 communities at a time.");
        return;
      }
      setComparedIds([...comparedIds, id]);
    }
  };

  const handleGoToCompare = () => {
    if (comparedIds.length > 0) {
      showToast(`Navigating to compare communities: ${comparedIds.join(', ')}`);
    }
  };

  const filteredHomes = LISTINGS.filter(
    (home) => (city === 'All' || home.city === city) && (category === 'All' || home.type === category)
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased pb-20 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-stone-700 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="text-teal-400 shrink-0" size={18} />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-stone-400 hover:text-white ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {}
      <nav className="bg-white sticky top-0 z-40 border-b border-stone-200/80 px-6 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
          <a href="#" className="text-2xl font-serif font-bold text-teal-800 tracking-tight flex items-center gap-2">
            <span className="bg-teal-800 text-white text-xs px-2 py-1 rounded-lg font-sans uppercase tracking-widest font-bold">Age</span>
            Golden Life
          </a>

          <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-stone-600">
            <a href="/" className="hover:text-teal-800 transition">Explore Properties</a>
            <a href="/communityComparison" className="hover:text-teal-800 transition">Community Compare</a>
            <a href="/services" className="hover:text-teal-800 transition">Personalized Services</a>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="#" 
              className="bg-teal-700 text-white px-5 py-2.5 rounded-full hover:bg-teal-800 transition text-xs sm:text-sm font-medium whitespace-nowrap shadow-sm"
            >
              List Your Property
            </a>
            
            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden text-stone-600 focus:outline-none p-2 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu for Mobile */}
        {isMenuOpen && (
          <div className="sm:hidden flex flex-col space-y-3 pt-4 pb-2 text-stone-600 font-medium border-t border-stone-100 mt-3 animate-in fade-in">
            <a 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-teal-700 transition-colors py-1 text-sm"
            >
              Explore Properties
            </a>
            <a 
              href="/communityComparison" 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-teal-700 transition-colors py-1 text-sm"
            >
              Compare Properties
            </a>
            <a 
              href="/services" 
              onClick={() => setIsMenuOpen(false)}
              className="inline-block text-center bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-sm font-semibold mt-2"
            >
              Personalized Services
            </a>
          </div>
        )} 
      </nav>

      {}
      <section className="relative bg-stone-900 text-white pt-16 pb-28 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background Overlay & Subtle Pattern */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/90 to-stone-950 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-4">
            <Sparkles size={13} />
            India's Premier Senior Living Network
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium mb-4 leading-tight text-white drop-shadow-md">
            Retire where life feels like a vacation.
          </h1>

          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Discover premium community & independent living in India's most sought-after retirement hubs.
          </p>

          {/* Service Banner Link */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm shadow-xl">
            <span className="text-stone-200 text-center sm:text-left">
              Book premium services for autonomous living, healthcare, and lifestyle experiences.
            </span>
            <a 
              href="/services" 
              className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl transition-all font-semibold whitespace-nowrap shrink-0 shadow-md text-xs"
            >
              Explore Premium Services
            </a>
          </div>
        </div>
      </section>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-30 -mt-16 sm:-mt-20">
        {/* Lucrative Search Panel Card */}
        <div className="p-[1px] rounded-3xl bg-gradient-to-r from-teal-500/40 via-stone-200 to-teal-500/40 shadow-2xl">
          <div className="bg-white p-5 sm:p-8 rounded-[23px]">
            
            {/* Search Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/60">
                <Sparkles size={13} className="text-teal-600" />
                Find Your Ideal Retirement Home
              </span>
              <span className="text-xs text-stone-400 hidden sm:inline font-medium">
                {filteredHomes.length} communities available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Location Selector */}
              <div className="lg:col-span-5 flex flex-col">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 gap-2">
                  <MapPin size={15} className="text-teal-600 shrink-0"/> Location
                </label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3.5 sm:p-4 border border-stone-200 rounded-2xl bg-stone-50/80 text-stone-800 font-semibold outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white focus:border-transparent transition cursor-pointer text-sm shadow-inner"
                >
                  <option value="All">All Locations (Bangalore & Goa)</option>
                  <option value="Bangalore">Bangalore (Garden City)</option>
                  <option value="Goa">Goa (Coastal Living)</option>
                </select>
              </div>

              {/* Category Selector */}
              <div className="lg:col-span-5 flex flex-col">
                <label className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 gap-2">
                  <Heart size={15} className="text-teal-600 shrink-0"/> Living Category
                </label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3.5 sm:p-4 border border-stone-200 rounded-2xl bg-stone-50/80 text-stone-800 font-semibold outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white focus:border-transparent transition cursor-pointer text-sm shadow-inner"
                >
                  <option value="All">All Categories</option>
                  <option value="Community Living">Community Living (Social & Care)</option>
                  <option value="Independent Living">Independent Living (Privacy & Freedom)</option>
                </select>
              </div>

              {/* Search Action Button */}
              <div className="lg:col-span-2">
                <button 
                  onClick={() => showToast(`Filtered by ${city} / ${category}`)}
                  className="w-full bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20 active:scale-[0.98]"
                >
                  <Search size={18} /> 
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-10 sm:mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800">Featured Senior Communities</h2>
            <span className="text-xs text-stone-500 font-medium">Showing {filteredHomes.length} results</span>
          </div>

          {filteredHomes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 my-8">
              <p className="text-stone-500 text-base mb-4">No communities found matching the selected filters.</p>
              <button 
                onClick={() => { setCity('All'); setCategory('All'); }}
                className="bg-teal-700 text-white text-xs px-5 py-2.5 rounded-full font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredHomes.map((home) => (
                <PropertyCard 
                  key={home.id} 
                  home={home} 
                  isSelected={selectedHome?.id === home.id} 
                  onSelect={setSelectedHome} 
                  isCompared={comparedIds.includes(home.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {}
      {comparedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl bg-stone-900/95 backdrop-blur-md text-white p-4 sm:px-6 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 border border-stone-700 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5 font-medium text-xs sm:text-sm">
            <Layers className="text-teal-400 shrink-0" size={18} />
            <span>{comparedIds.length} of 3 communities selected</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={handleGoToCompare}
              className="bg-teal-700 hover:bg-teal-600 active:scale-95 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition shadow-sm"
            >
              Compare <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => setComparedIds([])}
              className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
              aria-label="Clear selections"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {selectedHome && (
        <BookingModal home={selectedHome} onClose={() => setSelectedHome(null)} />
      )}
    </div>
  );
}