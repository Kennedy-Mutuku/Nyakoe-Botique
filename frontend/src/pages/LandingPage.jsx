import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Scissors, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import VideoBackground from '../components/VideoBackground';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />

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
