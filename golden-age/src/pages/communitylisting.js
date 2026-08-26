//"use client";
import React from 'react';
import { Check, Play, ArrowRight } from 'lucide-react';
import CommunityDetailsMultiModal from '@/components/communityDetailsMultiModal'; 

const HeroSection = () => {
  const features = [
    { label: 'FREE to List' },
    { label: 'No Commission' },
    { label: 'No Contracts' },
  ];

  const stats = [
    { value: '$0', title: 'Placement Fees', desc: 'Forever free, no hidden costs', color: 'text-yellow-500' },
    { value: '0%', title: 'Commission', desc: 'Keep 100% of your revenue', color: 'text-yellow-500' },
    { value: '10 min', title: 'Setup Time', desc: 'Quick and easy listing creation', color: 'text-yellow-500' },
    { value: '47+', title: 'Avg. Monthly Inquiries', desc: 'Qualified families reaching out', color: 'text-yellow-500' },
  ];

  return (
    <section className="relative min-h-[600px] w-full bg-[#1a1c1e] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-your-bg-image.jpg')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              List Your Community for Free.
              <span className="block text-yellow-600">No Placement Fees. Ever.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-lg">
              Join 10,000+ senior living communities connecting directly 
              with families. No middleman, no commissions, no referral fees.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Check className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
             <a href="/register" className="flex items-center gap-2 bg-[#a17917] hover:bg-[#8a6814] text-white px-8 py-4 rounded-lg font-bold transition-all"> Create Free Listing <ArrowRight className="w-5 h-5" />
            </a>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-bold transition-all">
              <Play className="w-5 h-5 fill-current" /> See How It Works
            </button>
          </div>

          <p className="text-gray-500 text-sm italic">
            Trusted by communities across all 50 states
          </p>
        </div>

        {/* Right Column: Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <h3 className="text-center text-xl font-semibold mb-10">
            Why Communities Choose LivingTrail
          </h3>
          
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className={`text-2xl md:text-3xl font-bold w-20 ${stat.color}`}>
                  {stat.value}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{stat.title}</h4>
                  <p className="text-gray-400 text-sm">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;