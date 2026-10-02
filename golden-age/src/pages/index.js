"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Heart, Layers, ArrowRight, X, Menu } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import BookingModal from '../components/BookingModal';

const LISTINGS = [
  { id: 1, registrationID: "GO-001", name: "Golden Oaks Community", city: "Bangalore", type: "Community Living", price: "45,000", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80", tags: ["Medical Care", "Shared Dining"] },
  { id: 2, registrationID: "AP-002", name: "Azure Palms Independent", city: "Goa", type: "Independent Living", price: "65,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", tags: ["Beach Access", "Private Garden"] },
  { id: 3, registrationID: "SL-003", name: "Silver Linings Hub", city: "Bangalore", type: "Independent Living", price: "38,000", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80", tags: ["Yoga Studio", "24/7 Security"] },
  { id: 4, registrationID: "SS-004", name: "Seaside Serenity Villas", city: "Goa", type: "Community Living", price: "72,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", tags: ["Pet Friendly", "Pool"] }
];

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState('All');
  const [category, setCategory] = useState('All');
  const [selectedHome, setSelectedHome] = useState(null);
  
  // State for compare selection (Max 3 items)
  const [comparedIds, setComparedIds] = useState([]);

  const toggleCompare = (id) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(item => item !== id));
    } else {
      if (comparedIds.length >= 3) {
        alert("You can compare a maximum of 3 communities at a time.");
        return;
      }
      setComparedIds([...comparedIds, id]);
    }
  };

  const handleGoToCompare = () => {
    if (comparedIds.length > 0) {
      router.push(`/communityComparison?ids=${comparedIds.join(',')}`);
    }
  };

  const filteredHomes = LISTINGS.filter(
    (home) => (city === 'All' || home.city === city) && (category === 'All' || home.type === category)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-stone-50 pb-20 relative">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-40 border-b border-stone-100 px-8 py-6">
  <div className="flex justify-between items-right">
    {/* Brand Logo */}
    <Link href="/" className="text-xl font-serif font-bold text-teal-800 tracking-tight">
      Golden Age
    </Link>
    <div className="flex items-right space-x-4">
      <Link 
        href="/register" 
        className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition text-sm font-medium whitespace-nowrap"
      >
        List Your Property
      </Link>
       
    
    {/* Hamburger Menu Toggle Button (Visible on all screens) */}
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="text-stone-600 focus:outline-none p-2"
      aria-label="Toggle Navigation"
    >
      {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
    </div>
  </div>

  {/* Dropdown Menu (Visible on all screens when open) */}
  {isMenuOpen && (
    <div className="flex flex-col space-y-4 pt-6 pb-2 text-stone-600 font-medium border-t border-stone-100 mt-4">
      <Link 
        href="/" 
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-teal-700 transition-colors"
      >
        Explore Properties
      </Link>
      <Link 
        href="/communityComparison" 
        onClick={() => setIsMenuOpen(false)}
        className="hover:text-teal-700 transition-colors"
      >
        Compare Properties
      </Link>
       <Link 
        href="/services" 
        onClick={() => setIsMenuOpen(false)}
        className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition text-sm font-medium whitespace-nowrap"

      >
        Personalized Services
      </Link>
     
      
    </div>
  )} 
</nav>

{/* Hero Banner */}
<div className="relative min-h-[360px] py-12 flex items-center justify-center text-center text-white overflow-hidden">
  {/* Background Overlay */}
  <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      {/* Hero Banner Section */}
      <section className="relative min-h-[420px] pt-16 pb-24 sm:pb-28 flex items-center justify-center text-center text-white overflow-hidden bg-stone-900">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

        {/* Background Image (Uncomment when needed) */}
        {/* 
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ad6ce6ecdd8?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          alt="Senior Living Background" 
        /> 
        */}

        {/* Content Container */}
        <div className="relative z-20 max-w-4xl px-4 sm:px-6 mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight tracking-tight text-white drop-shadow-sm">
            Retire where life feels like a vacation.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Discover premium community & independent living in India's most sought-after retirement hubs.
          </p>

          {/* Service Banner Link */}
          <div className="mt-6 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-2xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-sm sm:text-base">
            <span className="text-stone-100 text-center sm:text-left">
              Book premium services for autonomous living, healthcare, and lifestyle experiences.
            </span>
            <Link 
              href="/services" 
              onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
              className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-500 active:scale-95 transition-all text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 shadow-sm"
            >
              Premium Services
            </Link>
          </div>
        </div>
      </section>
      </div>
      </div>

      {/* Main Container - Search & Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 relative z-30 -mt-12 sm:-mt-16 mb-20">
        {/* Search Panel Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-xl border border-stone-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
            {/* Location Selector */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 gap-2">
                <MapPin size={16} className="text-teal-600 shrink-0"/> Location
              </label>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3.5 sm:p-4 border border-stone-300 rounded-xl bg-stone-50 text-stone-800 font-medium outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition appearance-none cursor-pointer"
              >
                <option value="All">All Locations (Bangalore & Goa)</option>
                <option value="Bangalore">Bangalore (Garden City)</option>
                <option value="Goa">Goa (Coastal Living)</option>
              </select>
            </div>

            {/* Category Selector */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 gap-2">
                <Heart size={16} className="text-teal-600 shrink-0"/> Living Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3.5 sm:p-4 border border-stone-300 rounded-xl bg-stone-50 text-stone-800 font-medium outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Community Living">Community Living (Social & Care)</option>
                <option value="Independent Living">Independent Living (Privacy & Freedom)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2">
              <button className="w-full bg-teal-800 text-white px-6 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-teal-900 active:scale-[0.98] transition flex items-center justify-center gap-2 h-[52px] sm:h-[58px] shadow-md">
                <Search size={18} /> 
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      </main>

      {/* Floating Comparison Bar */}
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