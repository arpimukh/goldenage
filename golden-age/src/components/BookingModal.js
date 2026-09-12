import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';

export default function BookingModal({ home, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={24} />
        </button>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-serif text-teal-900 leading-tight">
              Book a Site Visit to {home.name}
            </h2>
            <p className="text-sm text-gray-500">
              Our {home.city} manager will coordinate a guided tour for you and your family.
            </p>
            
            <div className="space-y-3 pt-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" 
                  placeholder="Enter your name" 
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" 
                  placeholder="+91 00000 00000" 
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400">Preferred Date</label>
                <input 
                  required 
                  type="date" 
                  className="w-full p-3 border border-stone-200 rounded-lg mt-1 focus:ring-2 focus:ring-teal-600 outline-none text-gray-700" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-teal-800 transition-all mt-4 flex items-center justify-center gap-2"
            >
              <Calendar size={18} /> Confirm Visit Request
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Received</h2>
            <p className="text-gray-600 mt-2 px-4">
              We've sent your request to the concierge at {home.name}. Expect a call shortly!
            </p>
            <button 
              onClick={onClose} 
              className="mt-8 bg-stone-100 px-6 py-2 rounded-full font-medium hover:bg-stone-200 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}