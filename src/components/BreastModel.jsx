import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Symptom data per region
const REGION_SYMPTOMS = {
  'Upper Outer Quadrant': [
    {
      key: 'lump',
      label: 'Lump/Thickening',
      info: 'A lump in the upper outer quadrant is the most common site for breast cancer. It may feel hard, irregular, and fixed, but can also be tender or painless. Many lumps are benign. Please consult a doctor for evaluation.'
    },
    {
      key: 'redness',
      label: 'Redness/Rash',
      info: 'Red or purple patches, sometimes looking like a rash or infection, can appear in this area. More difficult to see on darker skin tones. Persistent redness should be checked by a doctor.'
    },
    {
      key: 'dimpling',
      label: 'Dimpling/Puckering',
      info: 'Dimpling or puckering (skin looks like orange peel) may indicate lymphatic blockage. This is a sign to consult a healthcare professional.'
    },
    {
      key: 'swelling',
      label: 'Swelling',
      info: 'Swelling of all or part of the breast, even if no lump is felt, can occur. Persistent swelling should be evaluated.'
    }
  ],
  'Lower Outer Quadrant': [
    {
      key: 'lump',
      label: 'Lump/Thickening',
      info: 'A lump or thickening in the lower outer quadrant is less common for cancer but should still be evaluated. It may feel hard, irregular, or fixed.'
    },
    {
      key: 'swelling',
      label: 'Swelling',
      info: 'Swelling in this area can be due to benign or malignant causes. Persistent swelling should be checked.'
    },
    {
      key: 'dimpling',
      label: 'Dimpling/Puckering',
      info: 'Dimpling or puckering (skin looks like orange peel) may indicate lymphatic blockage. This is a sign to consult a healthcare professional.'
    }
  ],
  'Upper Inner Quadrant': [
    {
      key: 'lump',
      label: 'Lump/Thickening',
      info: 'A lump in the upper inner quadrant may be benign or malignant. Watch for changes in skin, pain, or nipple discharge. Consult a doctor for assessment.'
    },
    {
      key: 'redness',
      label: 'Redness/Rash',
      info: 'Red or purple patches, sometimes looking like a rash or infection, can appear in this area. Persistent redness should be checked by a doctor.'
    }
  ],
  'Lower Inner Quadrant': [
    {
      key: 'lump',
      label: 'Lump/Thickening',
      info: 'A lump in the lower inner quadrant is often benign but can be associated with cysts or fibroadenomas. Any persistent lump should be checked by a healthcare provider.'
    },
    {
      key: 'swelling',
      label: 'Swelling',
      info: 'Swelling in this area can be due to benign or malignant causes. Persistent swelling should be checked.'
    }
  ],
  'Nipple/Areola': [
    {
      key: 'discharge',
      label: 'Nipple Discharge',
      info: 'Any fluid leaking from the nipple, especially if bloody (not breast milk), should be evaluated by a doctor.'
    },
    {
      key: 'retraction',
      label: 'Nipple Retraction/Inversion',
      info: 'Nipple turning inward (inverted nipple) or changing direction can be a sign of underlying changes. Consult a doctor if this is new.'
    },
    {
      key: 'texture',
      label: 'Skin Scaling/Crusting',
      info: 'Peeling, scaling, crusting, or flaking of the skin on the nipple or surrounding area can be a sign of Paget’s disease or other conditions.'
    },
    {
      key: 'pain',
      label: 'Nipple Pain/Soreness',
      info: 'Soreness, burning, or itching at the nipple can have many causes. Persistent symptoms should be checked.'
    }
  ],
  'Axilla (Armpit)': [
    {
      key: 'lump',
      label: 'Lump/Swollen Lymph Node',
      info: 'A lump or swelling in the armpit may indicate lymph node involvement. This can be due to infection or, less commonly, cancer spread.'
    }
  ],
  'General Breast Area': [
    {
      key: 'lump',
      label: 'Lump/Thickening',
      info: 'Any new lump, thickening, or change in the breast should be evaluated by a healthcare professional. Early detection saves lives!'
    },
    {
      key: 'size',
      label: 'Change in Size/Shape',
      info: 'One breast may look different from the other in size or contour. Any new differences should be checked.'
    },
    {
      key: 'pain',
      label: 'Breast or Underarm Pain',
      info: 'Pain that does not go away with periods, or is sharp/dull, localized or spread out, should be evaluated.'
    },
    {
      key: 'sore',
      label: 'Non-healing Sore',
      info: 'An open wound or sore on the breast that doesn’t heal should be checked by a doctor.'
    }
  ]
};

function InfoModal({ open, onClose, title, message, symptomOptions, onSymptomSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold text-pink-600 mb-4">{title}</h3>
        {symptomOptions && symptomOptions.length > 0 ? (
          <>
            <div className="mb-4 text-gray-700">Which symptom do you notice here?</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {symptomOptions.map(opt => (
                <button
                  key={opt.key}
                  className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition"
                  onClick={() => onSymptomSelect(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500">If you have more than one symptom, select the most prominent one.</div>
          </>
        ) : (
          <>
            <div className="text-gray-700 text-base mb-4">{message}</div>
            <div className="text-xs text-gray-500">Many of these symptoms can occur in non-cancerous conditions (infections, cysts, hormonal changes). If you notice any persistent or unusual changes, consult a doctor—early detection is key to effective treatment.</div>
          </>
        )}
      </div>
    </div>
  );
}

function BreastModelInner({ onRegionClick }) {
  const { scene } = useGLTF('/models/breast.glb');
  const meshRef = useRef();

  // Click handler to detect region
  const handlePointerDown = (e) => {
    const point = e.point;
    // Region mapping (x: left/right, y: up/down, z: depth)
    if (point.y > 0.3 && point.x < 0) {
      onRegionClick('Upper Outer Quadrant');
    } else if (point.y > 0.3 && point.x >= 0) {
      onRegionClick('Upper Inner Quadrant');
    } else if (point.y <= 0.3 && point.x < 0) {
      onRegionClick('Lower Outer Quadrant');
    } else if (point.y <= 0.3 && point.x >= 0) {
      onRegionClick('Lower Inner Quadrant');
    } else if (Math.abs(point.x) < 0.15 && Math.abs(point.y) < 0.15) {
      onRegionClick('Nipple/Areola');
    } else if (point.x < -0.5 && point.y > 0.5) {
      onRegionClick('Axilla (Armpit)');
    } else {
      onRegionClick('General Breast Area');
    }
  };

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={2.5}
      onPointerDown={handlePointerDown}
      style={{ cursor: 'pointer' }}
    />
  );
}

export function BreastModel() {
  const [modal, setModal] = useState({ open: false, title: '', message: '', symptomOptions: null });

  // Step 1: User clicks a region
  const handleRegionClick = (region) => {
    const symptoms = REGION_SYMPTOMS[region] || [];
    if (symptoms.length === 1) {
      // Only one symptom possible, show info directly
      setModal({
        open: true,
        title: region,
        message: symptoms[0].info,
        symptomOptions: null
      });
    } else if (symptoms.length > 1) {
      // Multiple symptoms possible, ask user
      setModal({
        open: true,
        title: region,
        message: '',
        symptomOptions: symptoms
      });
    } else {
      // Fallback
      setModal({
        open: true,
        title: region,
        message: 'Any new lump, thickening, or change in the breast should be evaluated by a healthcare professional. Early detection saves lives!',
        symptomOptions: null
      });
    }
  };

  // Step 2: User selects a symptom
  const handleSymptomSelect = (opt) => {
    setModal(modal => ({
      ...modal,
      message: opt.info,
      symptomOptions: null
    }));
  };

  return (
    <>
    <Canvas style={{ height: '600px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
        <BreastModelInner onRegionClick={handleRegionClick} />
        <OrbitControls enableZoom={true} />
      </Canvas>
      <InfoModal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        message={modal.message}
        symptomOptions={modal.symptomOptions}
        onSymptomSelect={handleSymptomSelect}
      />
    </>
  );
}
