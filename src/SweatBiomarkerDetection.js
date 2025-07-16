import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Info, Droplets, Activity, Shield, Clock, Users, ArrowLeft } from 'lucide-react';

export default function SweatBiomarkerDetection({ theme = 'blue', onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [testResult, setTestResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stripImage, setStripImage] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Theme color classes
  const color = theme === 'pink' ? {
    from: 'from-pink-50',
    via: 'via-pink-50',
    to: 'to-purple-50',
    border: 'border-pink-100',
    gradFrom: 'from-pink-500',
    gradTo: 'to-purple-600',
    gradFrom2: 'from-pink-400',
    gradTo2: 'to-purple-500',
    gradFrom3: 'from-pink-100',
    gradTo3: 'to-purple-100',
    text: 'text-pink-600',
    text2: 'text-purple-600',
    bg50: 'bg-pink-50',
    bg100: 'bg-pink-100',
    bg200: 'bg-pink-200',
    border200: 'border-pink-200',
    border100: 'border-pink-100',
    focus: 'focus:ring-pink-500',
    button: 'bg-gradient-to-r from-pink-500 to-purple-600',
    buttonHover: 'hover:from-pink-600 hover:to-purple-700',
  } : {
    from: 'from-blue-50',
    via: 'via-indigo-50',
    to: 'to-purple-50',
    border: 'border-blue-100',
    gradFrom: 'from-blue-500',
    gradTo: 'to-purple-600',
    gradFrom2: 'from-blue-400',
    gradTo2: 'to-purple-500',
    gradFrom3: 'from-blue-100',
    gradTo3: 'to-purple-100',
    text: 'text-blue-600',
    text2: 'text-purple-600',
    bg50: 'bg-blue-50',
    bg100: 'bg-blue-100',
    bg200: 'bg-blue-200',
    border200: 'border-blue-200',
    border100: 'border-blue-100',
    focus: 'focus:ring-blue-500',
    button: 'bg-gradient-to-r from-blue-500 to-purple-600',
    buttonHover: 'hover:from-blue-600 hover:to-purple-700',
  };

  // Synthetic biomarker data generation
  const generateSyntheticData = () => {
    const scenarios = [
      { type: 'low_risk', dermcidin: 0.2 + Math.random() * 0.3, psoriasin: 0.1 + Math.random() * 0.2, other_peptides: 0.15 + Math.random() * 0.25 },
      { type: 'moderate_risk', dermcidin: 0.6 + Math.random() * 0.3, psoriasin: 0.4 + Math.random() * 0.3, other_peptides: 0.5 + Math.random() * 0.3 },
      { type: 'high_risk', dermcidin: 0.9 + Math.random() * 0.1, psoriasin: 0.8 + Math.random() * 0.2, other_peptides: 0.85 + Math.random() * 0.15 }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // Rule-based classification (non-ML)
  const classifyBiomarkers = (data) => {
    const { dermcidin, psoriasin, other_peptides } = data;
    
    // Thresholds based on research (synthetic for demo)
    if (dermcidin > 0.8 && psoriasin > 0.7) {
      return {
        risk: 'HIGH',
        confidence: 94 + Math.floor(Math.random() * 4),
        recommendation: 'Immediate consultation with oncologist recommended',
        color: 'red',
        priority: 'URGENT'
      };
    } else if (dermcidin > 0.5 || psoriasin > 0.4) {
      return {
        risk: 'MODERATE',
        confidence: 87 + Math.floor(Math.random() * 8),
        recommendation: 'Schedule screening with healthcare provider within 2 weeks',
        color: 'yellow',
        priority: 'ELEVATED'
      };
    } else {
      return {
        risk: 'LOW',
        confidence: 91 + Math.floor(Math.random() * 6),
        recommendation: 'Continue routine screening schedule',
        color: 'green',
        priority: 'NORMAL'
      };
    }
  };

  // Simulate test strip analysis
  const analyzeTestStrip = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const syntheticData = generateSyntheticData();
    const analysis = classifyBiomarkers(syntheticData);
    
    setTestResult({
      ...analysis,
      biomarkers: {
        dermcidin: syntheticData.dermcidin,
        psoriasin: syntheticData.psoriasin,
        other_peptides: syntheticData.other_peptides
      },
      timestamp: new Date().toISOString()
    });
    
    setIsAnalyzing(false);
    setCurrentStep(4);
  };

  // Camera functionality
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setStripImage(imageData);
      setCameraActive(false);
      
      // Stop camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      
      setCurrentStep(3);
    }
  };

  const TestStripEducation = () => (
    <div className={`${color.bg50} border ${color.border100} rounded-lg p-6 mb-6`}>
      <h3 className={`text-lg font-semibold text-blue-900 mb-4 flex items-center`}>
        <Info className="w-5 h-5 mr-2" />
        Understanding Test Strips & Biomarkers
      </h3>
      <div className="space-y-4 text-sm text-blue-800">
        <div>
          <h4 className="font-semibold">What are Custom Test Strips?</h4>
          <p>Specialized paper strips coated with antibodies that bind to specific proteins (biomarkers) in sweat. When sweat is applied, biomarkers bind to antibodies causing color changes that indicate concentration levels.</p>
        </div>
        <div>
          <h4 className="font-semibold">Key Biomarkers Detected:</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Dermcidin (DCD):</strong> Antimicrobial peptide elevated in breast cancer patients</li>
            <li><strong>Psoriasin:</strong> Protein marker associated with tumor development</li>
            <li><strong>Other Peptides:</strong> Additional protein fragments indicating cellular stress</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">How Detection Works:</h4>
          <p>Colorimetric reactions produce specific color intensities proportional to biomarker concentrations. Our app analyzes these colors using smartphone cameras to determine risk levels.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color.from} ${color.via} ${color.to}`}>
      {/* Header */}
      <header className={`bg-white/80 backdrop-blur-md border-b ${color.border} sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${color.gradFrom} ${color.gradTo} rounded-xl flex items-center justify-center`}>
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SweatDetect</h1>
                <p className="text-xs text-gray-600">Biomarker Analysis System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className={`flex items-center px-3 py-2 rounded-lg ${color.button} text-white font-semibold mr-2`}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
              )}
              <button 
                onClick={() => setShowEducation(!showEducation)}
                className={`${color.bg100} ${color.text} px-4 py-2 rounded-lg hover:${color.bg200} transition-colors`}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {showEducation && <TestStripEducation />}
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step ? `${color.gradFrom} ${color.text2} text-white` : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 mx-2 ${
                    currentStep > step ? `${color.gradFrom}` : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Prepare</span>
            <span>Apply Sweat</span>
            <span>Scan Strip</span>
            <span>Results</span>
          </div>
        </div>

        {/* Step 1: Preparation */}
        {currentStep === 1 && (
          <div className={`${color.bg50} rounded-2xl shadow-lg p-8 ${color.border}`}>
            <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${color.text}`}>
              <Shield className="w-6 h-6 mr-3" />
              Preparation & Safety
            </h2>
            
            <div className="space-y-6">
              <div className={`${color.bg100} border ${color.border200} rounded-lg p-4`}>
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                  <div className="text-red-800">
                    <p className="font-semibold">Medical Disclaimer</p>
                    <p className="text-sm">This is a research prototype. Results are not diagnostic. Always consult healthcare professionals for medical decisions.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Required Materials:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Custom biomarker test strip
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Clean fingertip
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Smartphone with camera
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Good lighting conditions
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
                  <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                    <li>Wash hands thoroughly with soap</li>
                    <li>Dry hands completely</li>
                    <li>Remove test strip from package</li>
                    <li>Find well-lit area for scanning</li>
                  </ol>
                </div>
              </div>

              <button 
                onClick={() => setCurrentStep(2)}
                className={`w-full ${color.button} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
              >
                I'm Ready - Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Apply Sweat */}
        {currentStep === 2 && (
          <div className={`${color.bg50} rounded-2xl shadow-lg p-8 ${color.border}`}>
            <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${color.text}`}>
              <Droplets className="w-6 h-6 mr-3" />
              Apply Fingertip Sweat
            </h2>
            
            <div className="space-y-6">
              <div className={`${color.bg100} border ${color.border200} rounded-lg p-4`}>
                <p className="text-blue-800">
                  <strong>Instructions:</strong> Press your fingertip firmly on the test strip's detection area for 10-15 seconds. 
                  The biomarker antibodies will bind to proteins in your sweat, causing color changes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Activity className="w-16 h-16 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-6">Press fingertip on test strip detection area</p>
                
                <div className={`${color.bg100} border ${color.border200} rounded-lg p-4 mb-6`}>
                  <p className="text-yellow-800">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Wait 2-3 minutes for color development after application
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setCurrentStep(3)}
                className={`w-full ${color.button} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
              >
                Sweat Applied - Ready to Scan
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Scan Strip */}
        {currentStep === 3 && (
          <div className={`${color.bg50} rounded-2xl shadow-lg p-8 ${color.border}`}>
            <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${color.text}`}>
              <Camera className="w-6 h-6 mr-3" />
              Scan Test Strip
            </h2>
            
            <div className="space-y-6">
              {!cameraActive && !stripImage && (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Camera className="w-16 h-16 text-blue-600" />
                  </div>
                  <p className="text-gray-600 mb-6">Position test strip in camera viewfinder</p>
                  <button 
                    onClick={startCamera}
                    className={`${color.button} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-colors`}
                  >
                    Start Camera
                  </button>
                </div>
              )}

              {cameraActive && (
                <div className="text-center">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full max-w-md mx-auto rounded-lg border-2 border-blue-200"
                  />
                  <div className="mt-4 space-x-4">
                    <button 
                      onClick={captureImage}
                      className={`${color.button} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-colors`}
                    >
                      Capture Image
                    </button>
                    <button 
                      onClick={() => setCameraActive(false)}
                      className={`${color.bg100} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-colors`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {stripImage && (
                <div className="text-center">
                  <img 
                    src={stripImage} 
                    alt="Test Strip" 
                    className="w-full max-w-md mx-auto rounded-lg border-2 border-blue-200"
                  />
                  <div className="mt-4 space-x-4">
                    <button 
                      onClick={analyzeTestStrip}
                      className={`${color.button} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      Analyze Biomarkers
                    </button>
                    <button 
                      onClick={() => {
                        setStripImage(null);
                        startCamera();
                      }}
                      className={`${color.bg100} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-colors`}
                    >
                      Retake
                    </button>
                  </div>
                </div>
              )}
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <div className="space-y-6">
            {isAnalyzing && (
              <div className={`${color.bg50} rounded-2xl shadow-lg p-8 ${color.border}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-4 animate-spin">
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Biomarkers...</h3>
                <p className="text-gray-600">Processing dermcidin, psoriasin, and peptide levels</p>
              </div>
            )}

            {testResult && (
              <div className={`${color.bg50} rounded-2xl shadow-lg p-8 ${color.border}`}>
                <h2 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center ${color.text}`}>
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Analysis Results
                </h2>
                
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <div className={`p-6 rounded-xl border-2 ${
                    testResult.risk === 'HIGH' ? `${color.bg100} border-red-200` :
                    testResult.risk === 'MODERATE' ? `${color.bg100} border-yellow-200` :
                    `${color.bg100} border-green-200'`
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Risk Assessment</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        testResult.risk === 'HIGH' ? 'bg-red-100 text-red-800' :
                        testResult.risk === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {testResult.risk} RISK
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{testResult.recommendation}</p>
                    <p className="text-sm text-gray-600">Confidence: {testResult.confidence}%</p>
                  </div>

                  {/* Biomarker Levels */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className={`${color.bg100} p-4 rounded-lg`}>
                      <h4 className="font-semibold text-blue-900 mb-2">Dermcidin (DCD)</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        {(testResult.biomarkers.dermcidin * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-blue-700">Antimicrobial peptide</p>
                    </div>
                    <div className={`${color.bg100} p-4 rounded-lg`}>
                      <h4 className="font-semibold text-purple-900 mb-2">Psoriasin</h4>
                      <div className="text-2xl font-bold text-purple-600">
                        {(testResult.biomarkers.psoriasin * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-purple-700">Tumor marker protein</p>
                    </div>
                    <div className={`${color.bg100} p-4 rounded-lg`}>
                      <h4 className="font-semibold text-indigo-900 mb-2">Other Peptides</h4>
                      <div className="text-2xl font-bold text-indigo-600">
                        {(testResult.biomarkers.other_peptides * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-indigo-700">Cellular stress markers</p>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className={`${color.bg100} p-6 rounded-lg`}>
                    <h4 className="font-semibold text-gray-900 mb-3">Next Steps</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Share results with your healthcare provider
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {testResult.risk === 'HIGH' ? 'Schedule immediate consultation' : 'Continue regular screening'}
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Retest in 3-6 months for monitoring
                      </li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        setCurrentStep(1);
                        setTestResult(null);
                        setStripImage(null);
                      }}
                      className={`flex-1 ${color.button} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      New Test
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className={`flex-1 ${color.bg100} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-colors`}
                    >
                      Print Results
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 