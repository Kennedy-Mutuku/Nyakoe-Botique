import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Scissors, BarChart3, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import logo from '../assets/logo bq.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* Navigation - Demure & Transparent */}
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-black/5">
        {/* Top Contact Strip - Vibrant Bright Blue */}
        <div className="bg-blue-600 text-white py-2 px-6 md:px-12 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium border-b border-white/5">
          <div className="flex items-center gap-6">
            <span className="opacity-80 uppercase">PH: +254 762 053 876</span>
            <span className="hidden sm:inline opacity-80 border-l border-white/20 pl-6 uppercase">info.nyakoeboutique@gmail.com</span>
          </div>
          <div className="hidden md:block opacity-60 italic serif-font lowercase tracking-normal text-xs">
            Elegance in every stitch
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between py-4">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="relative">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-12 md:h-16 w-auto mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl md:text-4xl font-black tracking-[-0.05em] uppercase text-black">
                  NYAKOE
                </span>
                <span className="serif-font italic text-lg md:text-xl font-light text-amber-800">
                  Boutique
                </span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {['Management', 'Tailoring', 'Inventory', 'Insights'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:opacity-60 transition-all"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/login?role=admin')}
              className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:opacity-60 transition-all"
            >
              Admin Portal
            </button>
            <button 
              onClick={() => navigate('/login?role=attendant')}
              className="hidden sm:block px-8 py-2.5 text-[10px] uppercase tracking-[0.3em] font-bold border bg-black text-white border-black hover:bg-transparent hover:text-black transition-all"
            >
              Staff Login
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden transition-all relative z-[60] text-black"
            >
              {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>


        {/* Mobile Corner Menu - Sharp & Professional (Under Header) */}
        <div className={`absolute top-full right-0 w-auto min-w-[240px] bg-white z-[60] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right border-t border-black/5 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="p-10 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {['Management', 'Tailoring', 'Inventory', 'Insights'].map((item, i) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`block text-2xl serif-font italic transition-all duration-500 hover:translate-x-2 ${
                    isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className={`pt-10 border-t border-black/10 flex flex-col gap-6 transition-all duration-700 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button 
                onClick={() => { navigate('/login?role=attendant'); setIsMenuOpen(false); }}
                className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-black hover:opacity-50 transition-opacity text-left"
              >
                Staff Login
              </button>
              <button 
                onClick={() => { navigate('/login?role=admin'); setIsMenuOpen(false); }}
                className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors text-left"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Cinematic Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground />
      </section>

      {/* Core Pillars Section - Minimal & Demure */}
      <section className="py-32 px-6 md:px-12 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-end mb-32">
            <div>
              <p className="text-black/40 text-[10px] uppercase tracking-[0.4em] font-black mb-6">Our Services</p>
              <h2 className="text-5xl md:text-7xl serif-font leading-tight tracking-tight">
                Mindful Design. <br />
                <span className="italic">Mindful Management.</span>
              </h2>
            </div>
            <p className="text-black/60 text-lg font-light leading-relaxed mb-4">
              We believe that professional management should feel as refined as the garments you create. Our system integrates seamlessly into your boutique's workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-black/10">
            {[
              { 
                icon: <ShoppingBag size={24} strokeWidth={1} />, 
                title: 'Intelligent POS', 
                desc: 'Record sales with a minimalist interface that tracks stock and profit automatically.' 
              },
              { 
                icon: <Scissors size={24} strokeWidth={1} />, 
                title: 'Bespoke Tailoring', 
                desc: 'Manage custom orders, measurements, and design notes with absolute clarity.' 
              },
              { 
                icon: <BarChart3 size={24} strokeWidth={1} />, 
                title: 'Refined Analytics', 
                desc: 'Visual business insights that tell your story through elegant data visualization.' 
              }
            ].map((feature, i) => (
              <div key={i} className={`p-12 border-black/10 ${i !== 2 ? 'md:border-r' : ''} group hover:bg-white transition-colors duration-500`}>
                <div className="mb-10 text-black/40 group-hover:text-black transition-colors duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl serif-font mb-6">{feature.title}</h3>
                <p className="text-black/50 font-light leading-relaxed text-sm mb-8">{feature.desc}</p>
                <a href="#" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black group-hover:gap-5 transition-all">
                  Explore <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Large & Immersive */}
      <section className="py-40 px-6 md:px-12 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none grayscale">
           {/* This would be a place for a subtle high-fashion image if needed */}
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-6xl md:text-8xl serif-font italic leading-none mb-12">
              Ready to <span className="not-italic font-black uppercase">Modernize?</span>
            </h2>
            <p className="text-white/60 text-xl font-light mb-12 leading-relaxed">
              Join the elite boutiques using Nyakoe to manage their legacy with precision and style.
            </p>
            <div className="flex flex-wrap gap-8">
              <button 
                onClick={() => navigate('/login?role=admin')}
                className="btn-minimal btn-minimal-white"
              >
                Admin Portal
              </button>
              <button 
                onClick={() => navigate('/login?role=attendant')}
                className="btn-minimal border-white text-white hover:bg-white hover:text-black"
              >
                Staff Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - The Final Demure Touch */}
      <footer className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <span className="text-3xl font-black tracking-tighter mb-8 block">
                NYAKOE <span className="font-light italic serif-font">Boutique</span>
              </span>
              <p className="text-black/40 text-sm max-w-sm leading-relaxed">
                Elevating boutique operations through mindful technology and professional design.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['About Us', 'Services', 'Pricing', 'Contact'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-black/60 hover:text-black transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black mb-8">Portal Access</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Admin Login</a></li>
                <li><a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Staff Terminal</a></li>
                <li><a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Security Overview</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">
              © 2026 NYAKOE BOUTIQUE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              {['Privacy', 'Terms', 'Instagram', 'Twitter'].map(link => (
                <a key={link} href="#" className="text-[10px] uppercase tracking-[0.2em] font-black hover:text-black/40 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles for the scroll line animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
};

export default LandingPage;
