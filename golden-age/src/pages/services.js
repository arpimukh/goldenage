"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Phone, Coffee, Heart, CheckCircle } from 'lucide-react';
import PrivateServicesModal from '../components/PrivateServicesModal';

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

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleSuccess = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex justify-between items-center px-8 py-6 bg-white border-b border-stone-100">
        <Link href="/" className="text-2xl font-serif font-bold text-teal-800">Golden Age</Link>
        <div className="flex gap-6 text-stone-600 font-medium">
          <Link href="/">Explore Properties</Link>
          <Link href="/register" className="bg-teal-700 text-white px-6 py-2 rounded-full hover:bg-teal-800 transition">
            List Your Property
          </Link>
        </div>
      </nav>

      {showNotification && (
        <div className="fixed top-6 right-6 z-[200] bg-[#1e4d40] text-white py-4 px-6 rounded-2xl shadow-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald-400" />
          <div>
            <h4 className="font-bold text-sm">Service Request Registered</h4>
            <p className="text-xs text-emerald-100/80">Our manager will reach out shortly.</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl font-serif text-slate-900 font-normal">Premium Care Services</h1>
          <p className="text-slate-500 mt-2">Personalized medical and daily living services tailored for seniors</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PREMIUM_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-emerald-500/20 transition text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#13a89e] flex items-center justify-center mb-4">
                  <Icon size={28} />
                </div>
                <h3 className="text-slate-800 font-bold text-base">{service.title}</h3>
              </button>
            );
          })}
        </div>
      </main>

      <PrivateServicesModal 
        selectedService={selectedService} 
        onClose={() => setSelectedService(null)} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
}