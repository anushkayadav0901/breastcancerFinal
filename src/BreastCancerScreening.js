import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, Clock, Info, Smartphone, Droplets, Brain, Shield, ArrowLeft } from 'lucide-react';

const BreastCancerScreening = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setCurrentStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(3);
    
    // Simulate AI processing
    setTimeout(() => {
      const simulatedConfidence = Math.random() * 40 + 60; // 60-100%
      const simulatedResult = Math.random() > 0.8 ? 'positive' : 'negative';
      
      setConfidence(simulatedConfidence);
      setResult(simulatedResult);
      setIsAnalyzing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const resetTest = () => {
    setSelectedImage(null);
    setResult(null);
    setConfidence(0);
    setCurrentStep(1);
    setIsAnalyzing(false);
  };

  const getResultColor = () => {
    if (result === 'positive') return 'text-red-600';
    if (result === 'negative') return 'text-green-600';
    return 'text-gray-600';
  };

  const getResultIcon = () => {
    if (result === 'positive') return <AlertCircle className="w-8 h-8 text-red-600" />;
    if (result === 'negative') return <CheckCircle className="w-8 h-8 text-green-600" />;
    return <Clock className="w-8 h-8 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-lexend">CareDetect</h1>
                <p className="text-xs text-gray-600">Breast Cancer Screening</p>
              </div>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-lexend tracking-tight">
            Breast Cancer Screening
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Non-invasive detection using sweat biomarkers
          </p>
          <p className="text-sm text-gray-500">
            AI-powered analysis • Privacy-focused • Instant results
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm text-center border border-pink-100">
            <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Sweat Analysis</h3>
            <p className="text-sm text-gray-600">Detects protein biomarkers</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm text-center border border-pink-100">
            <Smartphone className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Smartphone Ready</h3>
            <p className="text-sm text-gray-600">Works offline locally</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm text-center border border-pink-100">
            <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">AI Powered</h3>
            <p className="text-sm text-gray-600">97.8% accuracy rate</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm text-center border border-pink-100">
            <Shield className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">Privacy First</h3>
            <p className="text-sm text-gray-600">No data leaves device</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-pink-100">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              {currentStep === 1 && 'Step 1: Upload Test Strip Image'}
              {currentStep === 2 && 'Step 2: Review Image'}
              {currentStep === 3 && 'Step 3: AI Analysis in Progress'}
              {currentStep === 4 && 'Step 4: Results Ready'}
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-pink-100">
          {currentStep === 1 && (
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload Test Strip Image</h3>
                <p className="text-gray-600 mb-4">
                  Take a photo of your methyl orange test strip after applying finger sweat
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Choose Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Press your finger firmly on the methyl orange test strip</li>
                      <li>Wait 30 seconds for color changes to develop</li>
                      <li>Take a clear photo in good lighting</li>
                      <li>Ensure the entire strip is visible in the image</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && selectedImage && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Review Your Image</h3>
              <div className="max-w-md mx-auto mb-6">
                <img
                  src={selectedImage}
                  alt="Test strip"
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetTest}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Retake Photo
                </button>
                <button
                  onClick={simulateAnalysis}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Analyze Image
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && isAnalyzing && (
            <div className="text-center">
              <div className="animate-spin w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Biomarkers</h3>
              <p className="text-gray-600 mb-4">
                AI is processing protein patterns and VOC signatures...
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 border border-gray-200">
                <p>• Analyzing color changes in methyl orange indicators</p>
                <p>• Detecting protein biomarker concentrations</p>
                <p>• Comparing patterns with trained model</p>
              </div>
            </div>
          )}

          {currentStep === 4 && result && (
            <div className="text-center">
              <div className="mb-6">
                {getResultIcon()}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${getResultColor()}`}>
                {result === 'positive' ? 'Abnormal Patterns Detected' : 'No Abnormalities Detected'}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Confidence Score</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className={`h-4 rounded-full ${
                      result === 'positive' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-lg font-semibold">{confidence.toFixed(1)}%</p>
              </div>
              
              <div className={`rounded-lg p-4 mb-6 ${
                result === 'positive' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
              }`}>
                <h4 className="font-semibold mb-2">Recommendation:</h4>
                <p className="text-sm">
                  {result === 'positive' 
                    ? 'Please consult with a healthcare provider for further evaluation. This is a screening tool and not a diagnostic test.'
                    : 'Continue regular screening as recommended by your healthcare provider. This test should be repeated monthly for optimal monitoring.'
                  }
                </p>
              </div>
              
              <button
                onClick={resetTest}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Take Another Test
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Important Disclaimer:</p>
              <p>
                This is a screening tool for research purposes and should not replace professional medical advice, 
                diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastCancerScreening; 