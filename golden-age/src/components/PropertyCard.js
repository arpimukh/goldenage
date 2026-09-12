import React from 'react';
import { MapPin, Heart, Layers, Check } from 'lucide-react';

export default function PropertyCard({ home, isSelected, onSelect, isCompared, onToggleCompare }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-md border transition-all ${
      isCompared ? 'border-teal-700 ring-2 ring-teal-700/20' : 'border-stone-100 hover:shadow-xl'
    }`}>
      <div className="relative h-56 overflow-hidden">
        <img src={home.image} alt={home.name} className="w-full h-full object-cover" />
        
        {/* Compare Selection Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(home.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isCompared 
              ? 'bg-teal-700 text-white shadow-lg scale-105' 
              : 'bg-white/80 text-stone-700 hover:bg-white'
          }`}
          title={isCompared ? "Remove from comparison" : "Add to compare"}
        >
          {isCompared ? <Check size={18} /> : <Layers size={18} />}
        </button>

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-800">
          {home.type}
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs font-bold text-teal-800 uppercase tracking-widest mb-1">
          Reg ID: {home.registrationID}
        </p>
        <h3 className="text-xl font-bold text-stone-900 mb-2">{home.name}</h3>
        <p className="flex items-center text-sm font-medium text-stone-500 mb-4 gap-1">
          <MapPin size={16} className="text-teal-600" /> {home.city}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {home.tags?.map((tag) => (
            <span key={tag} className="text-[11px] font-semibold bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 pt-4">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Starting from</span>
            <span className="text-lg font-bold text-stone-900">₹{home.price} <span className="text-xs font-normal text-stone-500">/mo</span></span>
          </div>
          <button 
            onClick={() => onSelect(home)}
            className="bg-stone-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-800 transition"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}