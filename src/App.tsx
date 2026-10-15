/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Truck, 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Search, 
  Building2, 
  Award, 
  Info,
  Sparkles,
  Activity,
  Layers,
  Zap,
  Eye
} from 'lucide-react';

interface MachineryItem {
  id: string;
  name: string;
  category: 'excavator' | 'loader' | 'bulldozer' | 'grader';
  brand: string;
  model: string;
  image: string;
  operatingWeight: string;
  bucketCapacity: string;
  enginePower: string;
  diggingDepth: string;
  status: 'Available for Rental' | 'Available for Sale' | 'Custom Import';
  description: string;
}

const MACHINERY_DATA: MachineryItem[] = [
  {
    id: 'mach-1',
    name: 'Caterpillar 336 Heavy Excavator',
    category: 'excavator',
    brand: 'Caterpillar',
    model: 'CAT 336',
    image: '/src/assets/images/hero_excavator_mining_1792032662899.jpg',
    operatingWeight: '36,000 kg',
    bucketCapacity: '2.2 m³',
    enginePower: '311 HP',
    diggingDepth: '7,500 mm',
    status: 'Available for Rental',
    description: 'High-performance heavy excavator equipped with reinforced rock bucket, ideal for large-scale open-pit mining, deep trenching, and massive earthmoving projects across Ethiopia.'
  },
  {
    id: 'mach-2',
    name: 'Komatsu PC200-8 Excavator',
    category: 'excavator',
    brand: 'Komatsu',
    model: 'PC200-8',
    image: '/src/assets/images/excavator_fleet_yard_1792032664309.jpg',
    operatingWeight: '20,200 kg',
    bucketCapacity: '1.0 m³',
    enginePower: '148 HP',
    diggingDepth: '6,095 mm',
    status: 'Available for Rental',
    description: 'Ethiopia’s most trusted multi-purpose contractor excavator. Unmatched fuel efficiency and reliability for building construction, road grading, and municipal civil engineering.'
  },
  {
    id: 'mach-3',
    name: 'Volvo EC210B Excavator',
    category: 'excavator',
    brand: 'Volvo',
    model: 'EC210B',
    image: '/src/assets/images/excavator_road_construction_1792032664743.jpg',
    operatingWeight: '21,500 kg',
    bucketCapacity: '1.1 m³',
    enginePower: '159 HP',
    diggingDepth: '6,530 mm',
    status: 'Available for Rental',
    description: 'Rugged crawler excavator engineered for challenging terrain and mountain road construction in rugged Ethiopian topography with superior operator comfort.'
  },
  {
    id: 'mach-4',
    name: 'CAT D8T Bulldozer',
    category: 'bulldozer',
    brand: 'Caterpillar',
    model: 'D8T',
    image: '/src/assets/images/machinery_sales_showroom_1792032679841.jpg',
    operatingWeight: '38,200 kg',
    bucketCapacity: 'U-Blade 8.7 m³',
    enginePower: '354 HP',
    diggingDepth: 'Rip Depth 1,200 mm',
    status: 'Available for Sale',
    description: 'Heavy track-type tractor designed for heavy push-loading, land clearing, and rigorous rock ripping in major mining and infrastructure development.'
  },
  {
    id: 'mach-5',
    name: 'JCB 3CX Backhoe Loader',
    category: 'loader',
    brand: 'JCB',
    model: '3CX',
    image: '/src/assets/images/excavator_fleet_yard_1792032664309.jpg',
    operatingWeight: '8,135 kg',
    bucketCapacity: '1.0 m³ loader / 0.3 m³ backhoe',
    enginePower: '91 HP',
    diggingDepth: '4,240 mm',
    status: 'Available for Rental',
    description: 'Versatile backhoe loader optimized for urban utility trenching, road maintenance, and rapid site preparation for commercial contractors.'
  },
  {
    id: 'mach-6',
    name: 'CAT 140K Motor Grader',
    category: 'grader',
    brand: 'Caterpillar',
    model: '140K',
    image: '/src/assets/images/machinery_sales_showroom_1792032679841.jpg',
    operatingWeight: '15,555 kg',
    bucketCapacity: 'Moldboard 3,658 mm',
    enginePower: '185 HP',
    diggingDepth: 'Max Lift 480 mm',
    status: 'Custom Import',
    description: 'Precision motor grader built for highway construction, gravel road leveling, and precise subgrade preparation for government and contractor projects.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'machinery' | 'rental' | 'sales' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeWelcomeShowcase, setActiveWelcomeShowcase] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // Auto-cycle welcome machinery showcase every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoCycling || activeTab !== 'home') return;
    const interval = setInterval(() => {
      setActiveWelcomeShowcase((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoCycling, activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Modal State for Quote / Inquiry
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedMachineForInquiry, setSelectedMachineForInquiry] = useState<string>('');
  
  // Filter state for Machinery Catalog
  const [machineryCategoryFilter, setMachineryCategoryFilter] = useState<string>('all');
  const [machinerySearch, setMachinerySearch] = useState<string>('');

  // Inquiry Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectLocation: 'Addis Ababa',
    projectType: 'Construction',
    inquiryType: 'Rental with Operator',
    machineInterest: '',
    startDate: '',
    duration: '1-3 Months',
    message: ''
  });

  const handleOpenQuoteModal = (machineName?: string) => {
    if (machineName) {
      setSelectedMachineForInquiry(machineName);
      setFormData(prev => ({ ...prev, machineInterest: machineName }));
    }
    setQuoteModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredMachinery = MACHINERY_DATA.filter(item => {
    const matchesCategory = machineryCategoryFilter === 'all' || item.category === machineryCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(machinerySearch.toLowerCase()) ||
                          item.brand.toLowerCase().includes(machinerySearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(machinerySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    // Uniform, non-alternating tint of white background across the entire site
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* TOP NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 right-0 z-40 bg-[#f8fafc]/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ${!scrolledPastHero && activeTab === 'home' ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
          
          {/* Zone 1: Brand Logo & Wordmark */}
          <a href="#home" onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3.5 group shrink-0">
            <img 
              src="https://user19731.na.imgto.link/public/20261015/5c6c51df3a438b4962b648fb-photo-2026-10-14-18-50-54.avif" 
              alt="Dawit Desalegn Shiferaw Heavy Machinery Logo" 
              className="h-14 md:h-16 w-auto object-contain rounded-md transition-transform group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-tight text-slate-950 block leading-tight">Dawit Desalegn</span>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">Heavy Machinery</span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button 
              onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'home' ? 'text-amber-600 font-semibold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('about')} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'about' ? 'text-amber-600 font-semibold' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('machinery')} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'machinery' ? 'text-amber-600 font-semibold' : ''}`}
            >
              Machinery Fleet
            </button>
            <button 
              onClick={() => setActiveTab('rental')} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'rental' ? 'text-amber-600 font-semibold' : ''}`}
            >
              Rental Services
            </button>
            <button 
              onClick={() => setActiveTab('sales')} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'sales' ? 'text-amber-600 font-semibold' : ''}`}
            >
              Sales & Import
            </button>
            <button 
              onClick={() => setActiveTab('contact')} 
              className={`hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${activeTab === 'contact' ? 'text-amber-600 font-semibold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action & Phone Icon */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone Icon Button */}
            <a 
              href="tel:+251911234567" 
              title="Call Direct Hotline"
              aria-label="Call Direct Hotline"
              className="w-10 h-10 rounded-full bg-white hover:bg-amber-500 text-slate-700 hover:text-slate-950 border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer shadow-xs group"
            >
              <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            <button 
              onClick={() => handleOpenQuoteModal()}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Rental Quote
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200/80 px-6 py-4 space-y-3 shadow-lg">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">Home</button>
            <button onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">About</button>
            <button onClick={() => { setActiveTab('machinery'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">Machinery Fleet</button>
            <button onClick={() => { setActiveTab('rental'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">Rental Services</button>
            <button onClick={() => { setActiveTab('sales'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">Sales & Import</button>
            <button onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-amber-600">Contact</button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className={activeTab !== 'home' ? 'pt-24' : ''}>
        
        {/* ==================== HOME TAB ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* FULL SCREEN WELCOME VIEW WITH LOGO & DETAILED SHOWCASES */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#f8fafc] px-4 sm:px-6 py-8 select-none border-b border-slate-200/80">
              
              {/* Subtle Clean Technical Blueprint Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

              {/* CENTERPIECE: Grand Logo Presentation */}
              <div className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center justify-center py-4">
                <div className="relative group max-w-3xl w-full flex flex-col items-center justify-center p-3 sm:p-5">
                  <div className="relative max-h-[30vh] sm:max-h-[36vh] md:max-h-[40vh] w-auto flex items-center justify-center">
                    <img 
                      src="https://user19731.na.imgto.link/public/20261015/5c6c51df3a438b4962b648fb-photo-2026-10-14-18-50-54.avif" 
                      alt="Dawit Desalegn Shiferaw Heavy Machinery" 
                      className="max-w-full max-h-[30vh] sm:max-h-[36vh] md:max-h-[40vh] w-auto h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Brand Sub-title & Core Identity Pillars */}
                  <div className="text-center mt-3 space-y-1">
                    <h2 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-950 uppercase">
                      Dawit Desalegn Shiferaw <span className="text-amber-600">· Heavy Machinery</span>
                    </h2>
                    <p className="text-xs text-slate-600 font-medium max-w-xl mx-auto">
                      Ethiopia's Premier Excavator Rental with Certified Operators · Heavy Machinery Sales & Turnkey Global Import
                    </p>
                  </div>
                </div>

                {/* DETAILED SHOWCASE SECTION 1: 4 Core Expertise Showcase Cards with Dynamic Colors */}
                <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3">
                  
                  {/* Card 1: Excavator Rental (Amber Glow) */}
                  <div 
                    onClick={() => { setActiveTab('rental'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-3.5 bg-gradient-to-b from-white via-amber-50/25 to-white border border-amber-300/80 hover:border-amber-500 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">Primary</span>
                    </div>
                    <div className="font-black text-slate-950 text-xs sm:text-sm group-hover:text-amber-600 transition-colors">Excavator Rental</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight mt-1">CAT & Komatsu with certified professional operators</div>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Fleet</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card 2: Mining & Bulk Earthmoving (Emerald Glow) */}
                  <div 
                    onClick={() => { setActiveTab('rental'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-3.5 bg-gradient-to-b from-white via-emerald-50/25 to-white border border-emerald-300/80 hover:border-emerald-500 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">Heavy Duty</span>
                    </div>
                    <div className="font-black text-slate-950 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors">Mining & Trenches</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight mt-1">Quarrying, open-pit mining & highway grading</div>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Site Solutions</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card 3: Machinery Sales (Blue/Cyan Glow) */}
                  <div 
                    onClick={() => { setActiveTab('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-3.5 bg-gradient-to-b from-white via-blue-50/25 to-white border border-blue-300/80 hover:border-blue-500 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full pointer-events-none group-hover:bg-blue-500/20 transition-colors" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Verified</span>
                    </div>
                    <div className="font-black text-slate-950 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">Machinery Sales</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight mt-1">Certified excavators, dozers & loaders in Addis yard</div>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-blue-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Browse Units</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card 4: Global Custom Import (Purple Glow) */}
                  <div 
                    onClick={() => { setActiveTab('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-3.5 bg-gradient-to-b from-white via-purple-50/25 to-white border border-purple-300/80 hover:border-purple-500 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Global</span>
                    </div>
                    <div className="font-black text-slate-950 text-xs sm:text-sm group-hover:text-purple-700 transition-colors">Custom Import</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-tight mt-1">Direct OEM sourcing & customs to Ethiopian sites</div>
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-purple-700 group-hover:translate-x-0.5 transition-transform">
                      <span>Import Service</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

                {/* DETAILED SHOWCASE SECTION 2: Dynamic Machinery Spotlight Switcher */}
                <div className="w-full max-w-5xl mt-3 sm:mt-4 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900">Featured Machinery Spotlight</span>
                      <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">(Interactive Fleet Showcase)</span>
                    </div>
                    {/* Machine Model Switcher Chips */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {MACHINERY_DATA.slice(0, 4).map((mach, idx) => (
                        <button
                          key={mach.id}
                          onClick={() => {
                            setActiveWelcomeShowcase(idx);
                            setIsAutoCycling(false);
                          }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                            activeWelcomeShowcase === idx
                              ? 'bg-amber-500 text-slate-950 shadow-xs'
                              : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                          }`}
                        >
                          {mach.model}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Showcase Machine Card Details */}
                  {MACHINERY_DATA[activeWelcomeShowcase] && (
                    <div className="grid sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                      {/* Image Thumbnail */}
                      <div className="sm:col-span-4 h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200/80 relative group">
                        <img 
                          src={MACHINERY_DATA[activeWelcomeShowcase].image} 
                          alt={MACHINERY_DATA[activeWelcomeShowcase].name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded">
                          {MACHINERY_DATA[activeWelcomeShowcase].brand}
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-extrabold rounded shadow-xs">
                          {MACHINERY_DATA[activeWelcomeShowcase].status}
                        </div>
                      </div>

                      {/* Machine Detailed Specs & Pitch */}
                      <div className="sm:col-span-5 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-950 text-sm sm:text-base leading-tight">
                            {MACHINERY_DATA[activeWelcomeShowcase].name}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {MACHINERY_DATA[activeWelcomeShowcase].description}
                        </p>
                        {/* Dynamic Colorful Specification Grid */}
                        <div className="grid grid-cols-4 gap-1.5 pt-1 text-[10px]">
                          <div className="bg-slate-50 p-1 rounded border border-slate-200/70 text-center">
                            <span className="text-slate-400 block">Weight</span>
                            <span className="font-bold text-slate-900">{MACHINERY_DATA[activeWelcomeShowcase].operatingWeight}</span>
                          </div>
                          <div className="bg-slate-50 p-1 rounded border border-slate-200/70 text-center">
                            <span className="text-slate-400 block">Bucket</span>
                            <span className="font-bold text-slate-900 truncate block">{MACHINERY_DATA[activeWelcomeShowcase].bucketCapacity}</span>
                          </div>
                          <div className="bg-slate-50 p-1 rounded border border-slate-200/70 text-center">
                            <span className="text-slate-400 block">Power</span>
                            <span className="font-bold text-slate-900">{MACHINERY_DATA[activeWelcomeShowcase].enginePower}</span>
                          </div>
                          <div className="bg-slate-50 p-1 rounded border border-slate-200/70 text-center">
                            <span className="text-slate-400 block">Depth</span>
                            <span className="font-bold text-slate-900">{MACHINERY_DATA[activeWelcomeShowcase].diggingDepth}</span>
                          </div>
                        </div>
                      </div>

                      {/* Direct Action Buttons */}
                      <div className="sm:col-span-3 flex sm:flex-col gap-2 justify-center">
                        <button 
                          onClick={() => handleOpenQuoteModal(MACHINERY_DATA[activeWelcomeShowcase].name)}
                          className="flex-1 sm:w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setActiveTab('machinery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer"
                          >
                            Full Specs
                          </button>
                          <a 
                            href="tel:+251911234567" 
                            title="Direct Call Hotline"
                            aria-label="Direct Call Hotline"
                            className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ethiopian Coverage Ticker */}
                <div className="w-full max-w-5xl mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] font-semibold text-slate-600">
                  <span className="text-amber-600 uppercase font-black tracking-wider text-[10px]">Active Project Corridors:</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> Addis Ababa Depot</span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-500" /> Afar Mining Sites</span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Oromia Industrial</span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-500" /> Amhara Road Works</span>
                  <span className="text-slate-300">·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-purple-500" /> Dire Dawa Hub</span>
                </div>

              </div>

              {/* DYNAMIC SCROLL DOWN CONTROLLER */}
              <div className="relative z-20 pt-2 pb-1 text-center">
                <button 
                  onClick={() => {
                    document.getElementById('welcome-site-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex flex-col items-center gap-1.5 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer group"
                  aria-label="Scroll down to explore full website and machinery catalog"
                >
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                    <span>Explore Full Website & Complete Catalog</span>
                    <ChevronDown className="w-3.5 h-3.5 text-amber-600 group-hover:translate-y-0.5 transition-transform" />
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-amber-500 flex items-center justify-center animate-bounce shadow-xs bg-white text-slate-600 group-hover:text-amber-600 transition-all">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              </div>

            </section>

            {/* MAIN WEBSITE CONTENT (Revealed on Scroll Down) */}
            <div id="welcome-site-content" className="space-y-16 py-8">
            
            {/* HERO SECTION - Seamless Tint of White Architecture */}
            <section className="max-w-7xl mx-auto px-6 pt-4 pb-8">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Column: Value Proposition & CTAs */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-700 text-xs font-semibold tracking-wider uppercase">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ethiopia's Heavy Equipment Authority</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
                    Powering Ethiopia’s <span className="text-amber-600">Infrastructure</span> & Mining Excellence
                  </h1>

                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Specializing primarily in heavy excavator rentals with certified operators, alongside premium machinery sales and custom global import services for mining corporations, road builders, and major contractors across Ethiopia.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button 
                      onClick={() => handleOpenQuoteModal()}
                      className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-amber-400 transition-all shadow-xs flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Request Rental Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => { setActiveTab('machinery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-7 py-3.5 bg-white border border-slate-200/80 text-slate-800 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Explore Fleet</span>
                    </button>

                    {/* Quick Call Icon in Hero */}
                    <a 
                      href="tel:+251911234567" 
                      title="Call Operator Dispatch Directly"
                      aria-label="Call Operator Dispatch Directly"
                      className="w-12 h-12 rounded-lg bg-white border border-slate-200/80 hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:bg-amber-50"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="pt-4 flex items-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      <span>Certified Operators Included</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      <span>Nationwide Ethiopian Deployment</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Visual Asset */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md group">
                    <img 
                      src="/src/assets/images/hero_excavator_mining_1792032662899.jpg" 
                      alt="Heavy Excavators Working in Ethiopian Mining Site" 
                      className="w-full h-[440px] object-cover group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">Flagship Deployment</div>
                        <div className="text-sm font-bold text-slate-900">Heavy CAT & Komatsu Excavators on Mining Site</div>
                      </div>
                      <a 
                        href="tel:+251911234567" 
                        title="Direct Call for Rental Inquiries"
                        aria-label="Direct Call for Rental Inquiries"
                        className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs hover:bg-amber-400 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* QUICK STATS STRIP - Tinted White & Clean */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-1">
                    <div className="text-3xl lg:text-4xl font-black text-amber-600 tabular-nums">25+</div>
                    <div className="text-sm font-medium text-slate-600">Heavy Excavators Fleet</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl lg:text-4xl font-black text-amber-600 tabular-nums">120+</div>
                    <div className="text-sm font-medium text-slate-600">Projects Completed in Ethiopia</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl lg:text-4xl font-black text-amber-600 tabular-nums">24/7</div>
                    <div className="text-sm font-medium text-slate-600">Operator & Technical Support</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl lg:text-4xl font-black text-amber-600 tabular-nums">100%</div>
                    <div className="text-sm font-medium text-slate-600">Reliability & Safety Standard</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CORE SERVICES SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-6">
              <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Our Core Expertise</span>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">Comprehensive Heavy Machinery Solutions</h2>
                <p className="text-slate-600 text-sm">Designed for mining corporations, highway contractors, agricultural enterprises, and government infrastructure initiatives.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Service 1 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-8 space-y-5 hover:border-amber-500 hover:shadow-md transition-all group">
                  <div className="w-13 h-13 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">Excavator Rental w/ Operator</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our primary service: Top-tier crawler excavators equipped with highly experienced, certified Ethiopian operators for mining, road building, earthmoving, and large-scale construction.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Mining & Open-Pit Extraction</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Highway Grading & Trenching</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> On-site Maintenance & Fuel Options</li>
                  </ul>
                  <button 
                    onClick={() => { setActiveTab('rental'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 cursor-pointer pt-2 group"
                  >
                    <span>Learn about rentals</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Service 2 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-8 space-y-5 hover:border-amber-500 hover:shadow-md transition-all group">
                  <div className="w-13 h-13 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">Heavy Machinery Sales</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Purchase verified, heavy-duty industrial machinery including excavators, bulldozers, motor graders, and wheel loaders inspected for peak performance in Ethiopian conditions.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Certified Pre-Owned Units</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Warranty & Spare Parts Support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Transparent Inspection Reports</li>
                  </ul>
                  <button 
                    onClick={() => { setActiveTab('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 cursor-pointer pt-2 group"
                  >
                    <span>Explore sales inventory</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Service 3 */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-8 space-y-5 hover:border-amber-500 hover:shadow-md transition-all group">
                  <div className="w-13 h-13 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">Global Machinery Import</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Custom procurement and import services directly from global OEM manufacturers (Caterpillar, Komatsu, Volvo, JCB) delivered straight to your project site in Ethiopia.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Direct Global Manufacturer Sourcing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Customs Clearance & Logistics</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> End-to-End Delivery Assurance</li>
                  </ul>
                  <button 
                    onClick={() => { setActiveTab('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 cursor-pointer pt-2 group"
                  >
                    <span>Request custom import</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            </section>

            {/* FEATURED MACHINERY SPOTLIGHT */}
            <section className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-2">
                  <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Fleet Spotlight</span>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-950">High-Performance Excavator Fleet</h2>
                  <p className="text-slate-600 text-sm max-w-xl">Ready for immediate deployment across Addis Ababa, Adama, Hawassa, Dire Dawa, and regional project sites.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('machinery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3 bg-white border border-slate-200/80 hover:border-amber-500 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors self-start md:self-auto cursor-pointer shadow-xs"
                >
                  View All Machinery ({MACHINERY_DATA.length})
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {MACHINERY_DATA.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col group hover:border-amber-500 hover:shadow-md transition-all">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-amber-700 border border-slate-200 shadow-xs">
                        {item.status}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-slate-400 uppercase">{item.brand} · {item.model}</span>
                        <h3 className="text-xl font-bold text-slate-950">{item.name}</h3>
                        <p className="text-slate-600 text-xs line-clamp-2">{item.description}</p>
                      </div>
                      
                      {/* Specs grid */}
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block">Weight</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.operatingWeight}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Bucket</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.bucketCapacity}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleOpenQuoteModal(item.name)}
                        className="w-full py-3 bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Request Quote for Machine</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* WHY CHOOSE US / TRUST SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Trusted Ethiopian Enterprise</span>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
                    Built on Reliability, Operated by Experts, Driven by Results.
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Founded by Dawit Desalegn Shiferaw, our company has stood at the forefront of Ethiopia's construction and mining boom. We understand the rigorous demands of rugged terrain, tight project timelines, and government specifications.
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold">01</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Certified Master Operators</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">Every excavator rental includes a licensed, highly experienced operator trained in safety protocols and complex earthmoving.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold">02</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Guaranteed Fleet Uptime</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">Rigorous preventive maintenance schedules and mobile mechanic support across Addis Ababa and regional branches.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-1 font-bold">03</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Flexible Rental & Procurement Terms</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">Tailored rental agreements for short-term contractor needs or long-term multi-year mining and road projects.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <button 
                      onClick={() => handleOpenQuoteModal()}
                      className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
                    >
                      Partner With Us Today
                    </button>

                    <a 
                      href="tel:+251911234567" 
                      title="Call Us Now"
                      aria-label="Call Us Now"
                      className="w-11 h-11 rounded-lg bg-white border border-slate-200/80 hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:bg-amber-50"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
                    <img 
                      src="/src/assets/images/excavator_road_construction_1792032664743.jpg" 
                      alt="Excavator road construction in Ethiopia" 
                      className="w-full h-[460px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 border border-slate-200/80 p-5 rounded-xl shadow-lg max-w-xs">
                    <div className="text-amber-600 font-black text-2xl mb-0.5 tabular-nums">15+ Years</div>
                    <div className="text-xs text-slate-600 font-medium">Of powering heavy construction & mining projects across Ethiopia.</div>
                  </div>
                </div>
              </div>
            </section>

            </div>
          </div>
        )}

        {/* ==================== ABOUT TAB ==================== */}
        {activeTab === 'about' && (
          <div className="py-12 max-w-7xl mx-auto px-6 space-y-12">
            <div>
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Corporate Background</span>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">About Dawit Desalegn Shiferaw Heavy Machinery</h1>
              <p className="text-slate-600 text-base">
                The definitive standard in heavy equipment rental, sales, and global import services for Ethiopia’s expanding industrial landscape.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-slate-950">Founded on Integrity, Engineering Power & National Progress</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Dawit Desalegn Shiferaw Heavy Machinery was established with a singular mission: to provide Ethiopian contractors, mining enterprises, road builders, and government agencies with access to world-class heavy equipment and dependable operator expertise.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Headquartered in Addis Ababa with regional maintenance yards, we maintain an extensive fleet of modern excavators, bulldozers, loaders, and graders. Our commitment goes beyond equipment delivery—we partner with our clients to ensure maximum project uptime, safety, and productivity on every job site.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="text-3xl font-black text-amber-600 mb-1 tabular-nums">25+</div>
                    <div className="text-xs text-slate-600">Excavators & Heavy Machines in Fleet</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                    <div className="text-3xl font-black text-amber-600 mb-1 tabular-nums">100%</div>
                    <div className="text-xs text-slate-600">Ethiopian Owned & Operated</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/src/assets/images/excavator_fleet_yard_1792032664309.jpg" 
                  alt="Machinery yard in Addis Ababa" 
                  className="rounded-2xl border border-slate-200/80 shadow-md w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Values */}
            <div className="space-y-10 pt-8 border-t border-slate-200/80">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-bold text-slate-950">Our Core Values & Standards</h2>
                <p className="text-slate-600 text-xs">How we deliver excellence across every project in Ethiopia.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950">Uncompromising Safety</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Strict adherence to site safety guidelines, OSHA standards, and rigorous pre-operation inspection on every excavator and machine we deploy.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950">Operational Reliability</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Minimizing downtime with on-site mobile mechanic support, preventative maintenance, and fully serviced fuel-efficient engines.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950">Client-Centric Partnership</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Transparent communication, flexible rental terms without fixed price rigidity, and dedicated support for contractors and government entities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== MACHINERY CATALOG TAB ==================== */}
        {activeTab === 'machinery' && (
          <div className="py-12 max-w-7xl mx-auto px-6 space-y-10">
            <div>
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Fleet & Catalog</span>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">Our Heavy Machinery Inventory</h1>
              <p className="text-slate-600 text-sm">Browse our available excavators, bulldozers, loaders, and graders. Filter by category or search by model.</p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={() => setMachineryCategoryFilter('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${machineryCategoryFilter === 'all' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/80'}`}
                >
                  All ({MACHINERY_DATA.length})
                </button>
                <button 
                  onClick={() => setMachineryCategoryFilter('excavator')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${machineryCategoryFilter === 'excavator' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/80'}`}
                >
                  Excavators
                </button>
                <button 
                  onClick={() => setMachineryCategoryFilter('bulldozer')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${machineryCategoryFilter === 'bulldozer' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/80'}`}
                >
                  Bulldozers
                </button>
                <button 
                  onClick={() => setMachineryCategoryFilter('loader')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${machineryCategoryFilter === 'loader' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/80'}`}
                >
                  Loaders
                </button>
                <button 
                  onClick={() => setMachineryCategoryFilter('grader')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${machineryCategoryFilter === 'grader' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/80'}`}
                >
                  Graders
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search model, brand..." 
                  value={machinerySearch}
                  onChange={(e) => setMachinerySearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Machinery Grid */}
            {filteredMachinery.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 space-y-4">
                <p className="text-slate-600 text-base">No machinery found matching your criteria.</p>
                <button onClick={() => { setMachineryCategoryFilter('all'); setMachinerySearch(''); }} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-lg cursor-pointer">Reset Filters</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMachinery.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col group hover:border-amber-500 hover:shadow-md transition-all">
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-amber-700 border border-slate-200 shadow-xs">
                        {item.status}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-slate-400 uppercase">{item.brand} · {item.model}</span>
                        <h3 className="text-xl font-bold text-slate-950">{item.name}</h3>
                        <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                        <div>
                          <span className="text-slate-400 block">Op. Weight</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.operatingWeight}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Bucket Cap.</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.bucketCapacity}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Engine Power</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.enginePower}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Digging Depth</span>
                          <span className="font-bold text-slate-800 tabular-nums">{item.diggingDepth}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleOpenQuoteModal(item.name)}
                        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <span>Request Inquiry / Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== RENTAL SERVICES TAB ==================== */}
        {activeTab === 'rental' && (
          <div className="py-12 max-w-7xl mx-auto px-6 space-y-12">
            <div>
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Primary Service</span>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">Heavy Excavator Rental With Certified Operator</h1>
              <p className="text-slate-600 text-base">
                The cornerstone of our business. We deploy high-performance crawler excavators complete with skilled, safety-certified Ethiopian operators for your exact project needs.
              </p>
            </div>

            {/* Projects Catered */}
            <div className="space-y-10">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-bold text-slate-950">Projects We Cater Across Ethiopia</h2>
                <p className="text-slate-600 text-xs">Tailored heavy equipment solutions for every sector.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">01</div>
                  <h3 className="text-lg font-bold text-slate-950">Mining & Mineral Extraction</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Heavy-duty CAT and Komatsu excavators equipped for open-pit mining, overburden removal, and mineral loading in rugged Ethiopian mining regions.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">02</div>
                  <h3 className="text-lg font-bold text-slate-950">Road Building & Infrastructure</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Essential earthmoving, mountain grading, slope cutting, and drainage excavation for federal and regional road construction projects.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">03</div>
                  <h3 className="text-lg font-bold text-slate-950">Large Construction & Foundations</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Deep foundation digging, basement excavation, and site clearance for commercial complexes, real estate, and industrial parks.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">04</div>
                  <h3 className="text-lg font-bold text-slate-950">Agricultural Land Development</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Large-scale land clearing, irrigation trenching, dam construction, and agricultural terracing across agrarian regions.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">05</div>
                  <h3 className="text-lg font-bold text-slate-950">Government & Public Works</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Trusted contractor partnering for municipal water projects, power infrastructure, and regional development initiatives.
                  </p>
                </div>
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600 font-bold text-base">06</div>
                  <h3 className="text-lg font-bold text-slate-950">General Contractors</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Short-term and long-term operated excavator rentals for independent contractors requiring reliable, high-output machinery.
                  </p>
                </div>
              </div>
            </div>

            {/* Rental Process Banner - Seamless Tint of White Architecture */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 lg:p-12 space-y-8 shadow-xs">
              <div className="max-w-2xl space-y-2">
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Simple & Transparent</span>
                <h2 className="text-2xl font-bold text-slate-950">How Our Rental Service Works</h2>
                <p className="text-slate-600 text-xs">No fixed price lists—we customize every rental quote based on your project location, duration, and specific excavator requirements.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pt-2">
                <div className="space-y-2">
                  <div className="text-amber-600 font-black text-3xl tabular-nums">01</div>
                  <h4 className="text-base font-bold text-slate-950">Submit Rental Inquiry</h4>
                  <p className="text-slate-600 text-xs">Fill out our quick quote form with project location, intended use, and machine preference.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-amber-600 font-black text-3xl tabular-nums">02</div>
                  <h4 className="text-base font-bold text-slate-950">Site & Scope Review</h4>
                  <p className="text-slate-600 text-xs">Our logistics team consults with you to determine the ideal excavator model and operator assignment.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-amber-600 font-black text-3xl tabular-nums">03</div>
                  <h4 className="text-base font-bold text-slate-950">Deployment to Site</h4>
                  <p className="text-slate-600 text-xs">Machinery is transported directly to your Ethiopian project site with an expert operator ready to work.</p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button 
                  onClick={() => handleOpenQuoteModal()}
                  className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
                >
                  Request Rental Quote Now
                </button>
                <a 
                  href="tel:+251911234567" 
                  title="Call Hotline"
                  aria-label="Call Hotline"
                  className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:bg-amber-50"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SALES & IMPORT TAB ==================== */}
        {activeTab === 'sales' && (
          <div className="py-12 max-w-7xl mx-auto px-6 space-y-12">
            <div>
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Acquisition & Procurement</span>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">Heavy Machinery Sales & Custom Import Services</h1>
              <p className="text-slate-600 text-base">
                Expand your fleet with permanent machinery ownership or leverage our custom global import service for specialized heavy equipment.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <h3 className="text-2xl font-bold text-slate-950">Certified Heavy Machinery Sales in Ethiopia</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  We offer inspected and certified pre-owned excavators, bulldozers, wheel loaders, and graders from world-renowned manufacturers. Every machine available for sale undergoes stringent mechanical testing by our expert engineers in Addis Ababa.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Thorough undercarriage and hydraulic inspection</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Transparent service history and maintenance records</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Local spare parts availability and workshop support</li>
                </ul>
                <div className="pt-2 flex items-center gap-4">
                  <button 
                    onClick={() => handleOpenQuoteModal('Machinery Purchase Inquiry')}
                    className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
                  >
                    Inquire About Machinery Purchase
                  </button>
                  <a 
                    href="tel:+251911234567" 
                    title="Call Sales Team"
                    aria-label="Call Sales Team"
                    className="w-11 h-11 rounded-lg bg-white border border-slate-200/80 hover:border-amber-500 text-amber-600 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:bg-amber-50"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/src/assets/images/machinery_sales_showroom_1792032679841.jpg" 
                  alt="Machinery sales depot" 
                  className="rounded-2xl border border-slate-200/80 shadow-md w-full h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Custom Import Section */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 lg:p-12 space-y-6 shadow-xs">
              <div className="max-w-3xl space-y-3">
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Global Procurement</span>
                <h2 className="text-2xl font-bold text-slate-950">Custom Global Machinery Import Services</h2>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Need a specialized machine or brand-new OEM model not currently in our local Addis Ababa inventory? Dawit Desalegn Shiferaw Heavy Machinery provides end-to-end custom import procurement. We handle international sourcing from premier global manufacturers (Caterpillar, Komatsu, Volvo, JCB), maritime and overland logistics, customs clearance, and delivery directly to your project location in Ethiopia.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Direct OEM Sourcing</h4>
                  <p className="text-xs text-slate-600">Access to global manufacturing networks and authorized dealers worldwide.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Customs & Logistics</h4>
                  <p className="text-xs text-slate-600">Full handling of import documentation, transport, and Ethiopian customs clearance.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Site Handover</h4>
                  <p className="text-xs text-slate-600">Delivery, assembly, and operator commissioning at your project destination.</p>
                </div>
              </div>
              <div className="pt-2">
                <button 
                  onClick={() => handleOpenQuoteModal('Custom Import Service')}
                  className="px-7 py-3.5 bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
                >
                  Request Custom Import Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== CONTACT TAB ==================== */}
        {activeTab === 'contact' && (
          <div className="py-12 max-w-7xl mx-auto px-6 space-y-10">
            <div>
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Get In Touch</span>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">Contact Our Headquarters</h1>
              <p className="text-slate-600 text-sm">Ready to rent an excavator or purchase heavy machinery? Reach out to our team in Addis Ababa.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">Headquarters</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Kality Heavy Machinery District<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">Direct Hotline</h3>
                  <div className="pt-1 flex items-center gap-3">
                    <a 
                      href="tel:+251911234567" 
                      title="Call Mobile Hotline"
                      aria-label="Call Mobile Hotline"
                      className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs hover:bg-amber-400 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <div className="text-xs text-slate-600">
                      <div className="font-semibold text-slate-900">+251 91 123 4567 (Mobile)</div>
                      <div>+251 11 654 3210 (Office)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-3 shadow-xs">
                  <div className="w-11 h-11 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">Email & Inquiries</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    rental@dawitmachinery.et<br />
                    sales@dawitmachinery.et
                  </p>
                </div>
              </div>

              {/* Contact Form / Inquiry Card */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 p-8 lg:p-10 rounded-2xl shadow-xs">
                <h3 className="text-2xl font-bold text-slate-950 mb-6">Send Us a Direct Inquiry</h3>
                
                {formSubmitted ? (
                  <div className="text-center py-14 space-y-5">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-950">Inquiry Submitted Successfully!</h4>
                    <p className="text-slate-600 max-w-md mx-auto text-xs leading-relaxed">
                      Thank you for contacting Dawit Desalegn Shiferaw Heavy Machinery. Our rental and sales management team will review your project requirements and contact you shortly.
                    </p>
                    <button 
                      onClick={() => { setFormSubmitted(false); }}
                      className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer shadow-xs"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Abebe Kebede"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Company / Organization *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ethiopian Construction Corp"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="abebe@construction.et"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+251 91 000 0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Location *</label>
                        <select 
                          value={formData.projectLocation}
                          onChange={(e) => setFormData({...formData, projectLocation: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Addis Ababa">Addis Ababa</option>
                          <option value="Adama">Adama (Nazret)</option>
                          <option value="Hawassa">Hawassa</option>
                          <option value="Bahir Dar">Bahir Dar</option>
                          <option value="Dire Dawa">Dire Dawa</option>
                          <option value="Gondar">Gondar</option>
                          <option value="Mekelle">Mekelle</option>
                          <option value="Jimma">Jimma</option>
                          <option value="Other Regional Site">Other Regional Site</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Type *</label>
                        <select 
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Mining">Mining & Extraction</option>
                          <option value="Construction">Building Construction</option>
                          <option value="Road Building">Road Building & Grading</option>
                          <option value="Agriculture">Agricultural Project</option>
                          <option value="Government Project">Government Project</option>
                          <option value="Contractor">General Contractor</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Service Required *</label>
                        <select 
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Rental with Operator">Excavator Rental (w/ Operator)</option>
                          <option value="Machinery Sales">Machinery Sales Inquiry</option>
                          <option value="Custom Import">Custom Import Service</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Specific Machine Interest</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Caterpillar 336 or Komatsu PC200"
                          value={formData.machineInterest}
                          onChange={(e) => setFormData({...formData, machineInterest: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Expected Start Date / Duration</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Next Month for 3 Months"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Details & Requirements</label>
                      <textarea 
                        rows={4}
                        placeholder="Provide details about your project scale, earthmoving requirements, or specific site conditions..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-xs cursor-pointer"
                    >
                      Submit Rental & Sales Inquiry
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* RENTAL / QUOTE INQUIRY MODAL */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-[#f8fafc]">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Request Rental Quote / Machinery Inquiry</h3>
                <p className="text-xs text-amber-600 font-semibold tracking-wider uppercase">Dawit Desalegn Shiferaw Heavy Machinery</p>
              </div>
              <button 
                onClick={() => setQuoteModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg bg-white border border-slate-200/80 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-5 flex-1">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-950">Inquiry Received!</h4>
                  <p className="text-slate-600 text-xs">Our commercial team will contact you within 2 hours with availability and customized proposal.</p>
                  <button 
                    onClick={() => { setQuoteModalOpen(false); setFormSubmitted(false); }}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-lg cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {selectedMachineForInquiry && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-800 flex items-center gap-2">
                      <Info className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Inquiring specifically for: <strong>{selectedMachineForInquiry}</strong></span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Abebe Kebede"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Company Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Construction Corp"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="abebe@company.et"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+251 91 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Location *</label>
                      <select 
                        value={formData.projectLocation}
                        onChange={(e) => setFormData({...formData, projectLocation: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Adama">Adama</option>
                        <option value="Hawassa">Hawassa</option>
                        <option value="Bahir Dar">Bahir Dar</option>
                        <option value="Dire Dawa">Dire Dawa</option>
                        <option value="Gondar">Gondar</option>
                        <option value="Mekelle">Mekelle</option>
                        <option value="Jimma">Jimma</option>
                        <option value="Other Regional Site">Other Regional Site</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Type *</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Mining">Mining & Extraction</option>
                        <option value="Construction">Building Construction</option>
                        <option value="Road Building">Road Building</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Government Project">Government Project</option>
                        <option value="Contractor">Contractor</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Rental / Sales Requirements & Duration</label>
                    <textarea 
                      rows={3}
                      placeholder="Specify machine preference, operator requirements, duration..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Submit Request (No Fixed Price Displayed)
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER - Cohesive Tint of White Architecture */}
      <footer className="bg-white border-t border-slate-200/80 py-12 text-slate-600">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src="https://user19731.na.imgto.link/public/20261015/5c6c51df3a438b4962b648fb-photo-2026-10-14-18-50-54.avif" 
                alt="Dawit Desalegn Shiferaw Heavy Machinery Logo" 
                className="h-10 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-bold tracking-tight text-slate-950">Dawit Desalegn Shiferaw</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Ethiopia’s trusted heavy machinery provider specializing in excavator rental with expert operators, machinery sales, and global import services.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Quick Links</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-600 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-amber-600 transition-colors cursor-pointer">About Company</button></li>
              <li><button onClick={() => setActiveTab('machinery')} className="hover:text-amber-600 transition-colors cursor-pointer">Machinery Fleet</button></li>
              <li><button onClick={() => setActiveTab('rental')} className="hover:text-amber-600 transition-colors cursor-pointer">Rental Services</button></li>
              <li><button onClick={() => setActiveTab('sales')} className="hover:text-amber-600 transition-colors cursor-pointer">Sales & Import</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-600 transition-colors cursor-pointer">Contact Us</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Services</h4>
            <ul className="space-y-1.5 text-xs">
              <li><span className="text-slate-700">Excavator Rental w/ Operator</span></li>
              <li><span className="text-slate-700">Mining & Earthmoving</span></li>
              <li><span className="text-slate-700">Road Building & Grading</span></li>
              <li><span className="text-slate-700">Heavy Machinery Sales</span></li>
              <li><span className="text-slate-700">Custom Global Import</span></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Headquarters</h4>
            <div className="text-xs leading-relaxed text-slate-500 space-y-2">
              <p>
                Kality Heavy Machinery District<br />
                Addis Ababa, Ethiopia
              </p>
              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="tel:+251911234567" 
                  title="Call Hotline"
                  aria-label="Call Hotline"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-amber-500 hover:text-slate-950 text-slate-700 border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-900 font-semibold text-xs">+251 91 123 4567</span>
              </div>
              <p className="text-xs text-slate-500">
                Email: info@dawitmachinery.et
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-200/80 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Dawit Desalegn Shiferaw Heavy Machinery. All rights reserved. Powering Ethiopia's Infrastructure.
        </div>
      </footer>

    </div>
  );
}
