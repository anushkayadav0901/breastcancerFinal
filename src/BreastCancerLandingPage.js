import React, { useState, useEffect } from 'react';
import { Heart, Shield, Zap, Users, ArrowRight, Play, CheckCircle, Star } from 'lucide-react';
import DoctorScene from './components/DoctorModel';
import { speak } from './components/TextToSpeech';
import SweatBiomarkerDetection from './SweatBiomarkerDetection';

export default function BreastCancerLandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSweatDetection, setShowSweatDetection] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (showSweatDetection) {
    return <SweatBiomarkerDetection theme="pink" onBack={() => setShowSweatDetection(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareDetect</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-pink-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-pink-600 transition-colors">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
            </nav>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
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
                  99.2% Accuracy
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
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                    <div className="text-6xl">🩺</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced AI Analysis</h3>
                  <p className="text-gray-600 mb-6">
                    Our cutting-edge machine learning algorithms analyze medical imagery with unprecedented accuracy, 
                    providing healthcare professionals with powerful diagnostic insights.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">4.9/5 Rating</span>
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
              <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">99.2%</div>
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
              Why Choose CareDetect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets compassionate care to deliver the most accurate and accessible breast cancer screening solution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast Results",
                description: "Get accurate screening results in under 60 seconds with our advanced AI algorithms."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "FDA Approved Technology",
                description: "Our platform meets the highest medical standards for safety and accuracy."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Support Team",
                description: "24/7 access to certified healthcare professionals for guidance and support."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Personalized Care",
                description: "Tailored screening recommendations based on your individual risk factors."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy Protected",
                description: "Your health data is encrypted and protected with military-grade security."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Continuous Innovation",
                description: "Our AI models are constantly updated with the latest medical research."
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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
    </div>
  );
} 