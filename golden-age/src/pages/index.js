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
      <nav className="flex justify-between items-center px-8 py-6 bg-white sticky top-0 z-40 border-b border-stone-100">
        <Link href="/" className="text-2xl font-serif font-bold text-teal-800 tracking-tight">
          Golden Age
        </Link>
        <div className=" md:flex items-center justify-between items-right sticky space-x-8 text-stone-600 font-medium">{/* Desktop Navigation Links */}
          <div className=" md:flex items-center space-x-8 text-stone-600 font-medium">
            
            <Link href="/communityComparison" className="hover:text-teal-700 transition-colors">
              Compare ({comparedIds.length})
            </Link>
            <Link href="/services" className="hover:text-teal-700 transition-colors">
              Personalized Services
            </Link>
            <Link href="/register" className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">
              List Your Property
            </Link>
          </div>

          {/* Mobile Hamburger Icon Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-stone-600 focus:outline-none p-2"
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Container */}
        {/* {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 pt-6 pb-2 text-stone-600 font-medium border-t border-stone-100 mt-4">
            <Link 
              href="/properties" 
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
              Compare ({comparedIds.length})
            </Link>
            <Link 
              href="/services" 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-teal-700 transition-colors"
            >
              Personalized Services
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition inline-block text-center w-full"
            >
              List Your Property
            </Link>
          </div>
        )} */}
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[450px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ad6ce6ecdd8?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Senior Living" 
        />
        <div className="relative z-20 max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
            Retire where life feels <br/>like a vacation.
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover premium community & independent living in India's most sought-after retirement hubs.
          </p>
        </div>
      </div>

      {/* Search & Listing Section */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
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
            </select>
          </div>

          <button className="bg-teal-800 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-900 transition flex items-center gap-2 h-[60px]">
            <Search size={20} /> Search Now
          </button>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Sticky Comparison Drawer */}
      {comparedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-stone-700 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 font-medium text-sm">
            <Layers className="text-teal-400" size={18} />
            <span>{comparedIds.length} of 3 communities selected</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoToCompare}
              className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              Compare Selected <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => setComparedIds([])}
              className="text-stone-400 hover:text-white p-1"
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