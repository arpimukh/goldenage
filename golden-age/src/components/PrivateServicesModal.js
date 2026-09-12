import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Mail, Activity, ChevronRight, ChevronLeft, 
  Hourglass, MessageSquare, Phone 
} from 'lucide-react';

// Standard Start Times & Durations for General Services
const STANDARD_START_TIMES = [
  '08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM', '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM'
];

const STANDARD_BOOKING_HOURS = [
  '1 Hour', '2 Hours', '4 Hours', '8 Hours', '12 Hours (Half Day)', '24 Hours (Full Day)'
];

// Helper to generate 15-minute appointment slots from 10:00 AM to 8:00 PM
const generateDoctorTimeSlots = () => {
  const slots = [];
  let current = new Date();
  current.setHours(10, 0, 0, 0); // Start at 10:00 AM
  
  const end = new Date();
  end.setHours(20, 0, 0, 0); // End at 8:00 PM

  while (current < end) {
    const startStr = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    current.setMinutes(current.getMinutes() + 15);
    const endStr = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    slots.push(`${startStr} - ${endStr}`);
  }
  return slots;
};

const DOCTOR_15MIN_SLOTS = generateDoctorTimeSlots();

export default function PrivateServicesModal({ selectedService, onClose, onSuccess }) {
  const isDoctorOrPhysio = selectedService?.id === 'doctor_consultation' || selectedService?.title?.includes('Doctor');

  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    needDescription: '',
    subtype: selectedService?.subtypes?.[0] || '',
    startDate: new Date().toISOString().split('T')[0],
    startTimeRange: isDoctorOrPhysio ? DOCTOR_15MIN_SLOTS[0] : STANDARD_START_TIMES[0],
    bookingHours: isDoctorOrPhysio ? '15 Minutes' : '4 Hours',
    preferredContactTime: 'Anytime',
    contactMode: 'Phone Call',
    contactNumber: '',
    emailAddress: ''
  });

  const modalSteps = [
    { label: 'Care Profile' },
    { label: 'Timing' },
    { label: 'Contact' },
    { label: 'Confirm' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    if (activeStep < modalSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      submitModalRequest();
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
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

    onSuccess();
    onClose();
  };

  if (!selectedService) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-t-[32px] sm:rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
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
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
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

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-8 sm:py-6">
          {activeStep === 0 && (
            <div className="space-y-4">
              <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/30 flex items-start gap-3">
                <Activity size={16} className="text-[#1c5a4b] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 font-medium">
                  Select the care sub-type and describe any custom assistance requirements.
                </p>
              </div>

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
                  placeholder="Tell us about health status, recovery state, or custom preferences..."
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    {isDoctorOrPhysio ? 'Appointment Slot (15-Min)' : 'Start Time'}
                  </label>
                  <select 
                    name="startTimeRange"
                    value={formData.startTimeRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-bold outline-none"
                  >
                    {isDoctorOrPhysio ? (
                      DOCTOR_15MIN_SLOTS.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))
                    ) : (
                      STANDARD_START_TIMES.map((time, idx) => (
                        <option key={idx} value={time}>{time}</option>
                      ))
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Booking Duration</label>
                  <select 
                    name="bookingHours"
                    value={formData.bookingHours}
                    onChange={handleInputChange}
                    disabled={isDoctorOrPhysio}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-bold outline-none disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {isDoctorOrPhysio ? (
                      <option value="15 Minutes">15 Minutes</option>
                    ) : (
                      STANDARD_BOOKING_HOURS.map((hours, idx) => (
                        <option key={idx} value={hours}>{hours}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Preferred Contact Mode</label>
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
                {errors.emailAddress && <p className="text-xs text-rose-500">{errors.emailAddress}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex gap-3">
          <button 
            type="button"
            onClick={activeStep > 0 ? handlePrevStep : onClose}
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
  );
}