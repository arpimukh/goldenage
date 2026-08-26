import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  Check, 
  Info, 
  Share2, 
  Building2, 
  Star,
  ExternalLink,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  Mail,
  Webhook,
  Link as LinkIcon
} from 'lucide-react';
import CommunityDetailsMultiModal from '@/components/communityDetailsMultiModal';
const CommunityComparison = () => {
  // Initialize with empty array to prevent filtering errors
  const [selectedIds, setSelectedIds] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(1);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const communities = [
    {
      id: 1,
      registrationID: "SB-001",
      name: "Silverbrook Senior Living",
      location: "Plano, Texas",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600",
      pricing: { rent: "$3,200 - $7,999/mo", fee: "$500", model: "—" },
      care: { 
        offered: ["Assisted Living", "Residential Care", "Respite"], 
        memoryLevel: "—",
        medication: "Yes", 
        mobility: "Yes",
        behavioral: "Yes",
        respite: "No" 
      },
      payment: {
        medicaid: "Yes",
        va: "Yes",
        insurance: "Yes",
        private: "No"
      },
      availability: {
        total: "50",
        available: "7",
        status: "long_waitlist",
        moveIn: "2026-02-07"
      },
      info: {
        opened: "2023",
        ownership: "—"
      },
      amenities: { 
        services: ["24/7 staff", "Housekeeping", "Laundry", "Transportation"],
        dining: ["All-day dining", "Cafe/bistro", "Room service", "Special diets"], 
        wellness: ["Fitness center", "Therapy gym", "Walking paths", "Wellness programs"], 
        social: ["Game room", "Garden/courtyard", "Library", "Theater room"] 
      }
    },
    {
      id: 2,
      registrationID: "OH-002",
      name: "Oak Haven Senior Living",
      location: "Dallas, Texas",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
      pricing: { rent: "Contact for pricing", fee: "—", model: "—" },
      care: { 
        offered: ["Independent Living", "Memory Care", "Assisted Living", "Residential Care"], 
        memoryLevel: "all_stages",
        medication: "Yes", 
        mobility: "Yes",
        behavioral: "Yes",
        respite: "No" 
      },
      payment: {
        medicaid: "Yes",
        va: "Yes",
        insurance: "Yes",
        private: "No"
      },
      availability: {
        total: "40",
        available: "5",
        status: "short_waitlist",
        moveIn: "2026-03-20"
      },
      info: {
        opened: "2023",
        ownership: "—"
      },
      amenities: { 
        services: ["24/7 staff", "Concierge", "Housekeeping", "Laundry", "Transportation"],
        dining: ["Private dining room", "Room service", "Special diets"], 
        wellness: ["Fitness center", "Walking paths", "Wellness programs", "Yoga/stretching"], 
        social: ["Art studio", "Game room", "Garden/courtyard", "Library"] 
      }
    },
    {
      id: 3,
      registrationID: "GH-003",
      name: "The Grand Heritage",
      location: "Frisco, Texas",
      image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=600",
      pricing: { rent: "$5,500 - $8,000/mo", fee: "$3,500", model: "Monthly Rental" },
      care: { 
        offered: ["Memory Care", "Skilled Nursing"], 
        memoryLevel: "advanced",
        medication: "Yes", 
        mobility: "Full Support",
        behavioral: "Yes",
        respite: "Yes" 
      },
      payment: {
        medicaid: "No",
        va: "Yes",
        insurance: "Yes",
        private: "Yes"
      },
      availability: {
        total: "65",
        available: "0",
        status: "Waitlist Only",
        moveIn: "TBD"
      },
      info: {
        opened: "2020",
        ownership: "Private"
      },
      amenities: { 
        services: ["24/7 Dining", "Organic"], 
        dining: ["Spa", "Therapy Gym"], 
        wellness: ["Concierge", "Travel Club"],
        social: ["Library", "Art Studio"]
      }
    }
  ];

  // Mask property/community names exactly like the index listing cards:
  // logged-out visitors see asterisks except the last 3 characters
  function getMaskedData(userLoggedIn, sensitiveString) {
    if (userLoggedIn) {
      return sensitiveString; // Show full string if logged in
    }
    // Mask all but the last 3 characters
    const visiblePart = sensitiveString.slice(-3);
    return visiblePart.padStart(sensitiveString.length, '*');
  }

  const currentSelection = communities.filter(c => (selectedIds || []).includes(c.id));
  const shareTitle = "Senior Living Comparison";
  const shareText = `Check out these ${currentSelection.length} senior living communities I'm comparing.`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    // Attempt native Web Share API (WhatsApp, Messages, etc. on Mobile/Safari)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // "AbortError" or "Share canceled" occurs when user cancels the action.
        // We ignore this to prevent cluttering the console, as it's intended user behavior.
        if (err.name !== 'AbortError') {
          console.error("Error sharing:", err);
          // Optional: fallback if specific non-cancel error occurs
          setShowShareMenu(true);
        }
      }
    } else {
      // Fallback: Open custom share menu
      setShowShareMenu(true);
    }
  };

  const copyToClipboard = () => {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = shareUrl;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    
    setShowShareToast(true);
    setShowShareMenu(false);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    Webhook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  };

  const faqs = [
    {
      question: "How do I compare Silverbrook Senior Living and Oak Haven Senior Living in Plano, Texas and Dallas, Texas?",
      answer: "Use the search to add up to 3 communities, then review them feature by feature: monthly pricing, care types offered (Assisted Living, Residential Care, Respite, Independent Living, Memory Care), amenities, payment options, and waitlist status. Your selections are saved in the URL, so you can share the comparison with family or revisit it later—no sign-in required."
    },
    {
      question: "How much does Silverbrook Senior Living and Oak Haven Senior Living cost per month?",
      answer: "The communities you're comparing range between $3,000 and $7,999 per month. Pricing usually includes rent, meals, and basic services, while higher care levels, medication management, and add-on services may incur additional fees. Always confirm current rates and what's included directly with the community before signing."
    },
    {
      question: "What's the difference between assisted living, memory care, and independent living?",
      answer: "Independent living is for active seniors requiring little to no daily assistance. Assisted living provides help with activities of daily living (ADLs) like bathing or dressing. Memory care is a specialized form of assisted living with enhanced security and programs for those with Alzheimer's or dementia."
    },
    {
      question: "What payment options are accepted at senior living communities?",
      answer: "Options vary by location but generally include Private Pay, Long-Term Care Insurance, VA Benefits (Aid & Attendance), and in some cases, Medicaid. Most communities require private funds for the initial entry period."
    },
    {
      question: "What should I look for when touring a senior living community?",
      answer: "Ask about staff-to-resident ratios, staff turnover, average response times, and how care plans are reviewed. Tour at mealtimes to assess food quality and resident engagement, and ask to speak with current residents or family members. Always request the most recent state inspection report and a written breakdown of all costs."
    },
    {
      question: "Can I share this comparison with my family?",
      answer: "Yes! Simply click the Share button to send this comparison via WhatsApp, Facebook, or Email. The unique link saves your specific selection of communities."
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addCommunity = (id) => {
    const ids = selectedIds || [];
    if (ids.length < 3 && !ids.includes(id)) {
      setSelectedIds([...ids, id]);
      setShowAddModal(false);
      setSearchQuery('');
    }
  };

  const removeCommunity = (id) => {
    const ids = selectedIds || [];
    setSelectedIds(ids.filter(item => item !== id));
  };

  const resetSelection = () => setSelectedIds([]);

  const CompareRow = ({ label, values, isCategory = false }) => (
    <div className={`grid grid-cols-12 border-b border-gray-100 items-center ${isCategory ? 'bg-[#f1f8f6] py-3' : 'py-4 hover:bg-emerald-50/30 transition-colors'}`}>
      <div className={`col-span-3 px-6 text-[11px] ${isCategory ? 'font-black uppercase tracking-wider text-[#1a4d44]' : 'font-semibold text-gray-500'}`}>
        {label}
      </div>
      {values.map((val, i) => (
        <div key={i} className="col-span-3 px-6 text-xs font-bold text-gray-700 border-l border-gray-100 h-full flex items-center">
          {Array.isArray(val) ? (
            <div className="flex flex-wrap gap-1.5">
              {val.map(tag => (
                <span key={tag} className="bg-white text-emerald-800 text-[10px] px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm flex items-center gap-1">
                  <Check size={10} className="text-emerald-600" /> {tag}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {val === 'Yes' && <Check size={14} className="text-emerald-600" />}
              {val === 'No' && <X size={14} className="text-gray-300" />}
              <span className={(val === 'No' || val === '—') ? 'text-gray-400 font-normal' : ''}>
                {val}
              </span>
            </div>
          )}
        </div>
      ))}
      {[...Array(Math.max(0, 3 - values.length))].map((_, i) => (
        <div key={`empty-${i}`} className="col-span-3 px-6 text-gray-200 text-xs border-l border-gray-100 flex items-center">—</div>
      ))}
    </div>
  );

  return (
    
    <><div className="min-h-screen bg-white text-slate-900 pb-24 font-sans relative">
      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z- bg-emerald-900 text-white px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check size={14} /> Link Copied to Clipboard
        </div>
      )}

      {/* Share Menu Modal (Fallback for Desktops) */}
      {showShareMenu && (
        <div className="fixed inset-0 z- flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Share Comparison</h3>
              <button onClick={() => setShowShareMenu(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold transition-all">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <MessageSquare size={20} />
                </div>
                WhatsApp
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold transition-all">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Facebook size={20} />
                </div>
                Facebook
              </a>
              <a href={shareLinks.email} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold transition-all">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
                  <Mail size={20} />
                </div>
                Email
              </a>
              <button onClick={copyToClipboard} className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-gray-200 hover:border-emerald-600 text-gray-600 font-bold transition-all">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <LinkIcon size={20} />
                </div>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header / Navbar */}
      <nav className="bg-white px-8 h-20 flex justify-between items-center max-w-[1600px] mx-auto border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#1a4d44] tracking-tight">Golden Age</span>
        </div>
        <div className="flex items-center gap-8 text-[13px] font-bold text-gray-600">
          <a href="#" className="hover:text-[#1a4d44] transition-colors">Explore</a>
          <a href="#" className="hover:text-[#1a4d44] transition-colors">About Us</a>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-8 mt-12">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
            <span className="w-4 h-[1.5px] bg-emerald-600"></span> Side-by-Side Comparison
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">Compare Communities Feature by Feature</h1>
          <p className="text-gray-500 max-w-2xl font-medium text-sm leading-relaxed">
            Add up to 3 senior living communities and compare pricing, care types, amenities, and payment options at a glance. No sign-in required.
          </p>
        </div>

        {/* Selection Header */}
        <div className="flex justify-between items-end mb-8">
          <div className="text-[13px] font-bold text-gray-900">
            <span className="text-emerald-700">{currentSelection.length} of 3 selected</span>
            <p className="text-[11px] text-gray-400 font-normal mt-1">Share this view via social media or email.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#1a4d44] text-white px-6 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-wider flex items-center gap-2 hover:bg-[#143d35] transition-all shadow-sm"
            >
              <Plus size={14} /> Add Community
            </button>
            <button
              onClick={handleShare}
              className="bg-white border border-gray-200 px-6 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50/50 transition-all text-gray-700 shadow-sm active:scale-95"
            >
              <Share2 size={14} /> Share
            </button>
            <button onClick={resetSelection} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-[11px] font-bold uppercase ml-2">
              <X size={16} /> Clear
            </button>
          </div>
        </div>

        {/* The Comparison Grid */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">

          <div className="grid grid-cols-12 border-b border-gray-100 bg-[#f9fafb]">
            <div className="col-span-3 p-6 flex flex-col justify-end border-r border-gray-100">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Feature</span>
            </div>

            {currentSelection.map(c => (
              <div key={c.id} className="col-span-3 p-5 border-r border-gray-100 relative group bg-white">
                <button
                  onClick={() => removeCommunity(c.id)}
                  className="absolute top-4 right-4 z-10 bg-white shadow-md p-1.5 rounded-full text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
                <div className="overflow-hidden rounded-2xl mb-4 h-40">
                  <img src={c.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-black text-[15px] text-gray-900 leading-tight mb-1">{getMaskedData(false, c.name)}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Reg ID: {c.registrationID}</p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 mb-5">
                  <MapPin size={11} className="text-emerald-600/50" /> {c.location}
                </div>
                <button className="w-full bg-[#1a4d44] text-white py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#143d35] transition-all shadow-md active:scale-[0.98]">
                  <Calendar size={13} /> Request a Tour
                </button>
              </div>
            ))}

            {[...Array(Math.max(0, 3 - currentSelection.length))].map((_, i) => (
              <div key={`slot-${i}`} className="col-span-3 border-r border-gray-100 bg-[#f9fafb] flex items-center justify-center min-h-[320px]">
                <button onClick={() => setShowAddModal(true)} className="flex flex-col items-center gap-4 text-gray-300 hover:text-emerald-700 transition-all">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">Add Community</span>
                </button>
              </div>
            ))}
          </div>

          <CompareRow label="Pricing & Fees" values={[]} isCategory />
          <CompareRow label="Monthly Rent" values={currentSelection.map(c => c.pricing.rent)} />
          <CompareRow label="Community Fee" values={currentSelection.map(c => c.pricing.fee)} />
          <CompareRow label="Pricing Model" values={currentSelection.map(c => c.pricing.model)} />

          <CompareRow label="Care Types" values={[]} isCategory />
          <CompareRow label="Offered" values={currentSelection.map(c => c.care.offered)} />
          <CompareRow label="Memory Care Level" values={currentSelection.map(c => c.care.memoryLevel)} />
          <CompareRow label="Medication Management" values={currentSelection.map(c => c.care.medication)} />
          <CompareRow label="Mobility Assistance" values={currentSelection.map(c => c.care.mobility)} />
          <CompareRow label="Behavioral Care" values={currentSelection.map(c => c.care.behavioral)} />
          <CompareRow label="Respite Available" values={currentSelection.map(c => c.care.respite)} />

          <CompareRow label="Payment Options" values={[]} isCategory />
          <CompareRow label="Medicaid Accepted" values={currentSelection.map(c => c.payment.medicaid)} />
          <CompareRow label="VA Benefits" values={currentSelection.map(c => c.payment.va)} />
          <CompareRow label="Insurance Accepted" values={currentSelection.map(c => c.payment.insurance)} />
          <CompareRow label="Private Pay Only" values={currentSelection.map(c => c.payment.private)} />

          <CompareRow label="Availability" values={[]} isCategory />
          <CompareRow label="Total Units" values={currentSelection.map(c => c.availability.total)} />
          <CompareRow label="Units Available" values={currentSelection.map(c => c.availability.available)} />
          <CompareRow label="Waitlist Status" values={currentSelection.map(c => c.availability.status)} />
          <CompareRow label="Earliest Move-In" values={currentSelection.map(c => c.availability.moveIn)} />

          <CompareRow label="Community Info" values={[]} isCategory />
          <CompareRow label="Year Opened" values={currentSelection.map(c => c.info.opened)} />
          <CompareRow label="Ownership" values={currentSelection.map(c => c.info.ownership)} />

          <CompareRow label="Amenities" values={[]} isCategory />
          <CompareRow label="Services" values={currentSelection.map(c => c.amenities.services)} />
          <CompareRow label="Dining" values={currentSelection.map(c => c.amenities.dining)} />
          <CompareRow label="Wellness" values={currentSelection.map(c => c.amenities.wellness)} />
          <CompareRow label="Social" values={currentSelection.map(c => c.amenities.social)} />

          <div className="grid grid-cols-12 bg-white">
            <div className="col-span-3 p-8 flex items-center border-r border-gray-100 bg-[#f9fafb]">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#1a4d44]">Take Action</span>
            </div>
            {currentSelection.map(c => (
              <div key={c.id} className="col-span-3 p-6 border-r border-gray-100 space-y-3">
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#1a4d44] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#143d35] transition-all flex items-center justify-center gap-2 shadow-md">
                  View Details <ArrowRight size={14} />
                </button>
                <button className="w-full bg-white border border-emerald-100 text-[#1a4d44] py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50/50 transition-all flex items-center justify-center gap-2">
                  <Calendar size={14} /> Request a Tour
                </button>
              </div>
            ))}
            {[...Array(Math.max(0, 3 - currentSelection.length))].map((_, i) => (
              <div key={`act-slot-${i}`} className="col-span-3 border-r border-gray-100 bg-[#f9fafb]"></div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-100 text-[9px] font-black uppercase tracking-widest text-emerald-700 mb-6 bg-emerald-50/30 shadow-sm">
              <Info size={11} className="text-[#1a4d44]" /> Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-black mb-3 text-gray-900 tracking-tight">About this comparison</h2>
            <p className="text-gray-500 font-medium">Everything families ask before choosing a community.</p>
          </div>

          <div className="space-y-0 border border-gray-100 rounded-[24px] overflow-hidden bg-white shadow-sm">
            {faqs.map((faq, index) => (
              <div key={index} className={`border-b border-gray-100 last:border-0 ${openFaq === index ? 'bg-white' : 'bg-white hover:bg-gray-50'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full flex items-center justify-between py-7 text-left px-8 transition-all"
                >
                  <span className="text-[15px] font-black text-gray-900 pr-10">{faq.question}</span>
                  <div className={`transition-all ${openFaq === index ? 'rotate-180 text-[#8e721e]' : 'text-gray-400'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {openFaq === index && (
                  <div className="px-8 pb-8 text-[14px] text-gray-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



        {/* Need Help CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-[#f1f8f6] to-[#e8f3ef] rounded-[40px] border border-emerald-100/50 p-12 md:p-20 text-center shadow-sm">
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Need help deciding?</h2>
          <p className="text-gray-500 font-medium text-[15px] mb-10 max-w-xl mx-auto leading-relaxed">
            Our care advisors can walk you through these options and help you pick the right fit—free of charge.
          </p>
          <button className="bg-[#1a4d44] text-white px-10 py-4 rounded-xl font-black text-[13px] uppercase tracking-wider flex items-center gap-3 hover:bg-[#143d35] transition-all shadow-xl hover:shadow-2xl mx-auto active:scale-[0.98]">
            Get Free Guidance <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Modal - Add Community Search */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-[#f9fafb]">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">Add to Comparison</h3>
                <p className="text-xs font-medium text-gray-400">Search from 10,000+ communities</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="bg-white border border-gray-200 p-3 rounded-full hover:bg-emerald-50 transition-all text-gray-400 hover:text-emerald-700 shadow-sm">
                <X size={20} />
              </button>
            </div>
            <div className="p-10">
              <div className="relative mb-8">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-700" size={20} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Find another community by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-transparent rounded-3xl outline-none font-bold text-base focus:border-emerald-600 focus:bg-white transition-all shadow-inner" />
              </div>
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
                {communities
                  .filter(c => !(selectedIds || []).includes(c.id))
                  .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(c => (
                    <div
                      key={c.id}
                      onClick={() => addCommunity(c.id)}
                      className="flex items-center gap-5 p-4 border border-gray-100 bg-white hover:border-emerald-600 hover:shadow-lg rounded-[24px] cursor-pointer transition-all group"
                    >
                      <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0">
                        <img src={c.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm text-gray-900 group-hover:text-emerald-800 transition-colors">{getMaskedData(false, c.name)}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mt-0.5">Reg ID: {c.registrationID}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 flex items-center gap-1">
                          <MapPin size={10} className="text-emerald-600/50" /> {c.location}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-transparent transition-all">
                        <Plus size={18} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <CommunityDetailsMultiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} /></>
  );
};

export default CommunityComparison;