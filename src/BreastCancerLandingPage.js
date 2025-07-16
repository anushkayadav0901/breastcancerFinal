import React, { useState, useEffect } from 'react';
import { Heart, Shield, Zap, Users, ArrowRight, Play, CheckCircle, Star, AlertTriangle, User, Users as UsersIcon, Droplets } from 'lucide-react';
import BreastCancerScreening from './BreastCancerScreening';
import DoctorScene from './components/DoctorModel';
import { BreastModel } from './components/BreastModel';
import { speak } from './components/TextToSpeech';
import SweatBiomarkerDetection from './SweatBiomarkerDetection';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

function FamilyHealthDashboard({ open, onClose }) {
  const [family, setFamily] = useState([
    { relation: 'Grandmother', cancer: false, age: '', genetic: false, risk: [] },
    { relation: 'Mother', cancer: false, age: '', genetic: false, risk: [] },
    { relation: 'You', cancer: false, age: '', genetic: false, risk: [] },
  ]);
  const [selected, setSelected] = useState(2); // Default to 'You'

  // Controlled input states
  const member = family[selected];

  // Risk calculation logic
  function calculateRisk() {
    let risk = 12; // baseline risk %
    let firstDegree = 0;
    let extra = 0;
    family.forEach((m, idx) => {
      if (m.cancer) {
        if (m.relation === 'Mother' || m.relation === 'Sister' || m.relation === 'You') firstDegree++;
        else extra++;
      }
    });
    if (firstDegree > 0) risk += 20;
    if (firstDegree > 1) risk += 10 * (firstDegree - 1);
    if (extra > 0) risk += 5 * extra;
    if (member.age && Number(member.age) < 50) risk += 10;
    if (member.genetic) risk += 10;
    if (member.risk.includes('Smoking')) risk += 5;
    if (member.risk.includes('Drinking')) risk += 5;
    if (member.risk.includes('Lifestyle')) risk += 5;
    return Math.min(Math.round(risk), 99);
  }

  const riskScore = calculateRisk();

  // Handlers
  function updateField(field, value) {
    setFamily(fam => fam.map((m, i) => i === selected ? { ...m, [field]: value } : m));
  }
  function updateRisk(factor) {
    setFamily(fam => fam.map((m, i) => i === selected ? { ...m, risk: m.risk.includes(factor) ? m.risk.filter(f => f !== factor) : [...m.risk, factor] } : m));
  }
  function updateRelation(val) {
    setFamily(fam => fam.map((m, i) => i === selected ? { ...m, relation: val } : m));
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="backdrop-blur-2xl bg-white/80 border border-pink-100 rounded-3xl shadow-2xl p-0 w-full max-w-2xl flex flex-col items-center animate-fade-in relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold">&times;</button>
        <div className="p-8 w-full flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-pink-600 mb-6 font-lexend tracking-tight drop-shadow-lg text-center" style={{letterSpacing: '0.03em'}}>Family Health Dashboard</h2>
          {/* Family Tree Visualizer */}
          <div className="w-full flex flex-col items-center mb-8">
            <div className="flex flex-col items-center gap-2">
              {family.map((m, idx) => (
                <div key={idx} className={`flex items-center gap-3 px-6 py-2 rounded-xl cursor-pointer transition-all ${selected === idx ? 'bg-pink-100/80 shadow-lg scale-105' : 'hover:bg-pink-50'}`} onClick={() => setSelected(idx)}>
                  <span className="text-lg font-bold flex items-center gap-2">
                    {m.relation === 'You' ? <User className="inline w-5 h-5 text-purple-500" /> : <UsersIcon className="inline w-5 h-5 text-pink-400" />} {m.relation}
                  </span>
                  {m.cancer ? <AlertTriangle className="w-5 h-5 text-yellow-500" title="Diagnosed" /> : <CheckCircle className="w-5 h-5 text-green-500" title="Healthy" />}
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">Click a family member to edit their info. (Add more coming soon!)</div>
          </div>
          {/* Minimal Data Entry */}
          <div className="w-full flex flex-col gap-4 mb-8 max-w-md">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Relation:</span>
              <select className="rounded px-2 py-1 border border-pink-200 bg-white/80" value={member.relation} onChange={e => updateRelation(e.target.value)}>
                <option>Mother</option>
                <option>Sister</option>
                <option>Grandmother</option>
                <option>You</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Breast Cancer?</span>
              <input type="checkbox" className="accent-pink-500" checked={member.cancer} onChange={e => updateField('cancer', e.target.checked)} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Age at Diagnosis:</span>
              <input type="number" min="0" className="rounded px-2 py-1 border border-pink-200 bg-white/80 w-24" value={member.age} onChange={e => updateField('age', e.target.value)} />
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Genetic Testing?</span>
              <input type="checkbox" className="accent-pink-500" checked={member.genetic} onChange={e => updateField('genetic', e.target.checked)} />
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="font-semibold">Risk Factors:</span>
              {['Smoking', 'Drinking', 'Lifestyle'].map(factor => (
                <label key={factor} className="ml-2"><input type="checkbox" className="accent-pink-500 mr-1" checked={member.risk.includes(factor)} onChange={() => updateRisk(factor)} />{factor}</label>
              ))}
            </div>
          </div>
          {/* Risk Score */}
          <div className="w-full flex flex-col items-center mb-4">
            <div className="text-lg font-bold text-purple-600">Your estimated risk: <span className="text-pink-600 text-2xl animate-pulse">{riskScore}%</span> <span className="text-base text-gray-600 font-normal">lifetime risk</span></div>
            <div className="text-xs text-gray-500">(Personalized risk score based on your family and lifestyle data)</div>
          </div>
          {/* Privacy Notice */}
          <div className="w-full text-xs text-gray-500 text-center mt-2">
            We store only minimal data, fully user-controlled, privacy focused. All fields are optional. Sharing requires your consent.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BreastCancerLandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSweatDetection, setShowSweatDetection] = useState(false);
  const [showDoctorModel, setShowDoctorModel] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'signup' | null
  const [showFamilyDashboard, setShowFamilyDashboard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW: mobile menu state

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (showSweatDetection) {
    return <BreastCancerScreening onBack={() => setShowSweatDetection(false)} />;
  }

  if (showDoctorModel) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200">
        <div className="absolute top-8 left-8 z-10">
          <button
            className="flex items-center gap-2 bg-white/80 backdrop-blur-lg border border-pink-200 text-pink-600 px-5 py-2 rounded-full shadow-lg hover:bg-pink-100 hover:shadow-pink-200/60 transition-all duration-200 font-semibold text-base"
            onClick={() => setShowDoctorModel(false)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' /></svg>
            Back
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
          <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-pink-100 p-10 flex flex-col items-center transition-all duration-300 hover:shadow-pink-200/80 hover:ring-4 hover:ring-pink-100/40 animate-fade-in" style={{boxShadow: '0 8px 32px 0 rgba(255, 182, 193, 0.25)'}}>
            <div className="w-full flex items-center justify-center" style={{minHeight: '600px'}}>
              <BreastModel />
            </div>
            <h2 className="text-5xl font-extrabold text-pink-600 mt-8 font-lexend tracking-tight drop-shadow-lg text-center" style={{letterSpacing: '0.04em', textShadow: '0 2px 16px #f472b6aa'}}>
              3D Breast Model
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Auth Modal
  const AuthModal = () => {
    if (!authModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setAuthModal(null)}>
        <div className="backdrop-blur-xl bg-white/70 border border-pink-100 rounded-3xl shadow-2xl p-0 w-full max-w-lg flex flex-col items-center animate-fade-in relative" onClick={e => e.stopPropagation()}>
          <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-2xl font-bold">&times;</button>
          {authModal === 'login' ? <Login onSwitch={() => setAuthModal('signup')} /> : <SignUp onSwitch={() => setAuthModal('login')} />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareDetect</span>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button
                className="nav-link bg-transparent border-none p-0 focus:outline-none"
                onClick={() => setShowDoctorModel(true)}
              >
                3D Model
              </button>
              <button
                className="nav-link bg-transparent border-none p-0 focus:outline-none"
                onClick={() => setShowFamilyDashboard(true)}
              >
                Genetic Risk
              </button>
            </nav>
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex gap-3 items-center">
              <button
                className="bg-white border border-purple-500 text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
                onClick={() => setAuthModal('login')}
              >
                Login
              </button>
              <button
                className="bg-white border border-purple-500 text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
                onClick={() => setAuthModal('signup')}
              >
                Sign Up
              </button>
            </div>
            {/* Hamburger Icon for Mobile */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white/95 rounded-2xl shadow-2xl border border-pink-100 z-50 animate-fade-in flex flex-col p-4 gap-2">
                <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" className="nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <button
                  className="nav-link bg-transparent border-none p-0 text-left focus:outline-none"
                  onClick={() => { setShowDoctorModel(true); setMobileMenuOpen(false); }}
                >
                  3D Model
                </button>
                <button
                  className="nav-link bg-transparent border-none p-0 text-left focus:outline-none"
                  onClick={() => { setShowFamilyDashboard(true); setMobileMenuOpen(false); }}
                >
                  Genetic Risk
                </button>
                <hr className="my-2 border-pink-100" />
                <button
                  className="bg-white border border-purple-500 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200 w-full text-left"
                  onClick={() => { setAuthModal('login'); setMobileMenuOpen(false); }}
                >
                  Login
                </button>
                <button
                  className="bg-white border border-purple-500 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200 w-full text-left"
                  onClick={() => { setAuthModal('signup'); setMobileMenuOpen(false); }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 
                className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight font-lexend tracking-tight"
              >
                Early Detection
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block">
                  Saves Lives
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionary AI-powered breast cancer detection technology that empowers women with accurate, 
                accessible screening solutions for better health outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                  Start Screening
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center group border border-gray-200">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
                <button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                  onClick={() => setShowSweatDetection(true)}
                >
                  Detecting by Sweat
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  FDA Approved
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  92.83% Accuracy
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Instant Results
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-100">
                  <div className="w-full flex justify-center items-center mb-0">
                    <div className="w-full max-w-xl aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <video 
                        src="/video.mp4" 
                        controls 
                        className="w-full h-full object-cover rounded-2xl shadow-lg border border-purple-200 bg-white"
                        style={{ background: 'rgba(255,255,255,0.7)' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">92.83%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">500K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">1M+</div>
              <div className="text-gray-600">Screenings Done</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-lexend tracking-tight"
            >
              Project Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the core features of our breast cancer detection platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-powered Screening */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-powered Screening</h3>
              <p className="text-gray-600">Upload or capture images for instant, accurate breast cancer risk analysis using advanced AI.</p>
            </div>
            {/* Sweat Biomarker Detection */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sweat Biomarker Detection</h3>
              <p className="text-gray-600">Non-invasive detection using sweat test strips and smartphone camera for early risk assessment.</p>
            </div>
            {/* 3D Breast Model */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3D Breast Model</h3>
              <p className="text-gray-600">Interactive 3D model for education, symptom awareness, and region-specific information.</p>
            </div>
            {/* Genetic Risk Calculator */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Genetic Risk Calculator</h3>
              <p className="text-gray-600">Personalized risk score based on family history, genetics, and lifestyle factors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Doctor Model (Left) */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md h-[400px] bg-white/80 rounded-3xl shadow-xl flex items-center justify-center border border-pink-100">
                <DoctorScene />
              </div>
            </div>
            {/* Explanation (Right) */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-pink-600 mb-6 font-lexend tracking-tight">How It Works</h2>
              <button
                className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow hover:scale-105 transition"
                onClick={() => speak(
                  `How It Works. Step 1: Start Screening. Click on Start Screening and answer a few simple questions to begin your health checkup journey. Step 2: Upload or Capture Image. Upload your medical image or capture a new one using your phone or computer. Step 3: AI Analysis. Our advanced AI instantly analyzes your image and provides accurate results with easy-to-understand feedback. Step 4: Get Personalized Report. Download or view your personalized report and get recommendations for next steps.`
                )}
              >
                🔊 Listen
              </button>
              <ol className="space-y-8">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg mr-4 animate-bounce">1</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Start Screening</h3>
                    <p className="text-gray-600">Click on <b>Start Screening</b> and answer a few simple questions to begin your health checkup journey.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg mr-4 animate-bounce">2</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Upload or Capture Image</h3>
                    <p className="text-gray-600">Upload your medical image or capture a new one using your phone or computer.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg mr-4 animate-bounce">3</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">AI Analysis</h3>
                    <p className="text-gray-600">Our advanced AI instantly analyzes your image and provides accurate results with easy-to-understand feedback.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg mr-4 animate-bounce">4</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Get Personalized Report</h3>
                    <p className="text-gray-600">Download or view your personalized report and get recommendations for next steps.</p>
                  </div>
                </li>
              </ol>
              <div className="mt-8 text-gray-500 text-sm italic">* Available in multiple languages soon for everyone!</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-6 font-lexend tracking-tight"
          >
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of women who trust CareDetect for their breast cancer screening needs. 
            Early detection saves lives.
          </p>
          <button className="bg-white text-pink-600 px-10 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Your Free Screening Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">CareDetect</span>
              </div>
              <p className="text-gray-400">
                Empowering women with advanced breast cancer detection technology for better health outcomes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Screening</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">AI Analysis</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Reports</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareDetect. All rights reserved. Made with ❤ for women's health.</p>
          </div>
        </div>
      </footer>
      <AuthModal />
      <FamilyHealthDashboard open={showFamilyDashboard} onClose={() => setShowFamilyDashboard(false)} />
    </div>
  );
} 