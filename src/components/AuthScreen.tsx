import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, Lock, Smartphone, ArrowRight, UserPlus, LogIn, Sparkles, CheckCircle2, ChevronRight, Fingerprint } from 'lucide-react';

interface AuthScreenProps {
  defaultUser: UserProfile;
  registeredUsers: UserProfile[];
  onRegisterUser: (user: UserProfile) => void;
  onLoginSuccess: (user: UserProfile) => void;
}

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Instant Zero-Fee Money Transfers',
    subtitle: 'Send money to any bank in Nigeria 24/7 with 100% NIP speed and ₦0 transfer fees.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    tag: '⚡ Instant NIP Speed',
  },
  {
    id: 2,
    title: 'Instant Cashback & Daily Rewards 🎁',
    subtitle: 'Earn 2% cashback on every data & airtime top-up, plus daily Friday Freebie vouchers.',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    tag: '🎁 2% Instant Cashback',
  },
  {
    id: 3,
    title: '16.5% APY High-Yield SafeVaults 🚀',
    subtitle: 'Grow your wealth with daily compounding interest payouts credited directly to your wallet.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    tag: '📈 16.5% APY Daily Growth',
  },
];

export const AuthScreen: React.FC<AuthScreenProps> = ({
  defaultUser,
  registeredUsers,
  onRegisterUser,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form states
  const [phone, setPhone] = useState('08123456789');
  const [pin, setPin] = useState(['1', '2', '3', '4']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 4-second automatic carousel slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(defaultUser);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('Please enter full legal name and phone number');
    const newUser: UserProfile = {
      ...defaultUser,
      id: `usr_${Date.now()}`,
      name: name,
      phone: phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@paydra.com`,
      veloTag: `@${name.toLowerCase().replace(/\s+/g, '')}`,
    };
    onRegisterUser(newUser);
    onLoginSuccess(newUser);
  };

  const activeSlideData = CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Container Box */}
      <div className="w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT COLUMN: 3 CHANGING IMAGES HERO CAROUSEL (OPAY ONBOARDING DESIGN) */}
        <div className="relative min-h-[320px] md:min-h-[580px] bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Background Image with Smooth Crossfade */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay transition-opacity duration-1000">
            <img
              src={activeSlideData.image}
              alt={activeSlideData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Glass Gradient Accents */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

          {/* Top Branding Pill */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                P
              </div>
              <div>
                <span className="text-sm font-black tracking-wider uppercase block text-white">PAYDRA BANK</span>
                <span className="text-[9px] font-bold text-indigo-300 block">Licensed by CBN • Member NDIC</span>
              </div>
            </div>

            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-amber-300 border border-white/20">
              {activeSlideData.tag}
            </span>
          </div>

          {/* Middle Carousel Content */}
          <div className="relative z-10 space-y-3 my-auto py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-snug">
              {activeSlideData.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed max-w-md">
              {activeSlideData.subtitle}
            </p>
          </div>

          {/* Bottom Dot Indicators */}
          <div className="relative z-10 flex items-center gap-2 pt-2">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: OPAY AUTHENTICATION FORM (PURPLE & WHITE) */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-5">
            {/* Mode Switcher Pill */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setMode('LOGIN')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'LOGIN' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>

              <button
                onClick={() => setMode('REGISTER')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'REGISTER' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>

            {mode === 'LOGIN' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Welcome Back! 👋</h3>
                  <p className="text-xs text-slate-500">Log in with your registered phone number & PIN</p>
                </div>

                {/* Phone Number Input with Nigeria Country Code */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-black text-slate-700 font-mono flex items-center gap-1">
                      <span>🇳🇬</span>
                      <span>+234</span>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="8123456789"
                      className="w-full pl-20 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4-Digit Security PIN */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">4-Digit Security PIN</label>
                    <button
                      type="button"
                      onClick={() => alert('PIN Reset link sent to your registered phone!')}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      Forgot PIN?
                    </button>
                  </div>

                  <div className="flex justify-center gap-3 py-1">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        type="password"
                        maxLength={1}
                        value={pin[idx]}
                        onChange={(e) => {
                          const newPin = [...pin];
                          newPin[idx] = e.target.value;
                          setPin(newPin);
                          if (e.target.value && idx < 3) {
                            const nextInput = document.getElementById(`login_pin_${idx + 1}`);
                            nextInput?.focus();
                          }
                        }}
                        id={`login_pin_${idx}`}
                        className="w-12 h-12 text-center bg-slate-50 border border-slate-300 rounded-2xl text-lg font-black text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Biometric Quick Login */}
                <button
                  type="button"
                  onClick={() => onLoginSuccess(defaultUser)}
                  className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-2xl border border-indigo-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Fingerprint className="w-4 h-4 text-indigo-600" />
                  <span>Quick Login with Biometrics / Face ID</span>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <span>Log In to Paydra</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">Open Paydra Account 🚀</h3>
                  <p className="text-xs text-slate-500">Get your zero-fee account in under 60 seconds</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tunde Adebayo"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812 345 6789"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tunde@example.com"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <span>Create Paydra Account</span>
                  <UserPlus className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>CBN Licensed & NDIC Insured</span>
            </span>
            <span>v2.0 Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
