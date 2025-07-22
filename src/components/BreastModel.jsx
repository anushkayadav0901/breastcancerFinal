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

const NIPPLE_INFO = {
  title: 'Nipple Bleeding and Discharge: Breast Cancer se Jude Facts',
  content: (
    <div className="space-y-3 text-gray-700 text-base">
      <b>1. Kya Hoti Hai Nipple Discharge?</b>
      <ul className="list-disc ml-6">
        <li>Nipple se koi bhi liquid ya fluid nikalna, jaise blood, pani jaisa, safed, peela, hara ya bhura, ise nipple discharge bolte hain.</li>
        <li>Ye discharge ek ya dono nipples se aa sakti hai, kabhi apne aap ya dabane par bhi nikal sakti hai.</li>
      </ul>
      <b>2. Bleeding from Nipple (Khoon Ana)</b>
      <ul className="list-disc ml-6">
        <li>Agar nipple se khoon (bloody discharge) niklta hai, to yeh ek important symptom hai jo benign (non-cancerous) aur kabhi kabhi breast cancer dono ki taraf ishara kar sakta hai.</li>
        <li><b>Common benign causes:</b> intraductal papilloma (milk duct mein chota safed mass), duct ectasia (duct ka fail jana).</li>
        <li><b>Cancer risk:</b> Bloody discharge se breast cancer hone ka risk dusre colors ki discharge ki tulna mein zyada hai.</li>
        <li>Usually, agar discharge ek breast se, bina dabaye nikal raha ho, to doctor ko turant dikhaye.</li>
      </ul>
      <b>3. Types of Nipple Discharge aur Matalab</b>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-pink-200 mb-2">
          <thead>
            <tr className="bg-pink-50">
              <th className="border px-2 py-1">Discharge Ka Rang</th>
              <th className="border px-2 py-1">Common Wajah</th>
              <th className="border px-2 py-1">Cancer Risk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Bloody (laal/pink)</td>
              <td className="border px-2 py-1">Intraductal papilloma, cancer</td>
              <td className="border px-2 py-1">Kabhi-kabhi cancer</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Clear (saaf/pani jaisa)</td>
              <td className="border px-2 py-1">Blocked duct, kabhi cancer</td>
              <td className="border px-2 py-1">Cancer ho sakta hai</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Yellow/green</td>
              <td className="border px-2 py-1">Infection, duct ectasia</td>
              <td className="border px-2 py-1">Zyada tar benign</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Brown/bhura</td>
              <td className="border px-2 py-1">Fibrocystic changes</td>
              <td className="border px-2 py-1">Rarely cancer</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Milky</td>
              <td className="border px-2 py-1">Hormonal, breastfeeding</td>
              <td className="border px-2 py-1">Na ke barabar cancer risk</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span className="text-xs text-gray-500">*Note: Sirf bleeding ya discharge nahi, saath mein lump, dard, ya skin changes ho to risk aur badh jata hai.*</span>
      <b>4. Related Symptoms</b>
      <ul className="list-disc ml-6">
        <li>Breast pain/swelling</li>
        <li>Lump ya mass feel hona</li>
        <li>Nipple mein kuch shape ka badlav (andar jana, hard hona)</li>
        <li>Skin pe rash, redness ya ulcer</li>
      </ul>
      <b>5. Kab Doctor ko Dikhana Chahiye?</b>
      <ul className="list-disc ml-6">
        <li>Agar nipple se repeatedly ya bina dabaye khoon nikal raha ho</li>
        <li>Discharge sirf ek breast se ho</li>
        <li>Saath mein breast mein lump, dard ya skin changes ho</li>
        <li>Post-menopausal ya >40 saal ki umar mein koi bhi aisa symptom dikhe</li>
      </ul>
      <b>6. Breast Cancer se Kaise Link Hota Hai?</b>
      <ul className="list-disc ml-6">
        <li>Nipple bleeding/discharge kabhi breast cancer ka pehla lakshan bhi ho sakta hai, khas kar agar koi lump nahi mil raha.</li>
        <li>Paget’s disease of the breast naam ka cancer nipple aur areola mein changes kaaran hota hai, ismein discharge, bleeding, dryness ya itching ho sakti hai.</li>
      </ul>
      <b>7. Important Points</b>
      <ul className="list-disc ml-6">
        <li>Har nipple discharge cancer nahi hota, lekin kuch rang (bloody ya clear) zyada risky hain.</li>
        <li>Early check-up se sahi diagnosis aur treatment ho sakta hai.</li>
        <li>Agar koi doubt ho, breast specialist ya surgeon ko consult karein.</li>
      </ul>
      <div className="mt-2 text-pink-600 font-semibold italic">Aapki safety ke liye, breast changes ko ignore na karein. Jaldi pehchaan se treatment asaan rehta hai!</div>
    </div>
  )
};

function InfoModal({ open, onClose, title, message, symptomOptions, onSymptomSelect, nippleStep = 0, setModal, nippleData = {} }) {
  if (!open) return null;
  // Step 1: Ask about bleeding
  if (title === 'Nipple/Areola' && nippleStep === 1) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-xl font-bold">&times;</button>
          <h3 className="text-2xl font-bold text-pink-600 mb-4">Nipple Discharge</h3>
          <div className="mb-4 text-gray-700">Kya bleeding thi (Khoon aata tha)?</div>
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition" onClick={() => setModal(m => ({ ...m, nippleStep: 2, nippleData: { ...m.nippleData, bleeding: 'Yes' } }))}>Yes</button>
            <button className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition" onClick={() => setModal(m => ({ ...m, nippleStep: 2, nippleData: { ...m.nippleData, bleeding: 'No' } }))}>No</button>
          </div>
        </div>
      </div>
    );
  }
  // Step 2: Ask about discharge type
  if (title === 'Nipple/Areola' && nippleStep === 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-xl font-bold">&times;</button>
          <h3 className="text-2xl font-bold text-pink-600 mb-4">Discharge ka Color/Type?</h3>
          <div className="mb-4 text-gray-700">Discharge ka rang/type select karein:</div>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Bloody', 'Clear', 'Yellow/Green', 'Brown', 'Milky', 'Other'].map(type => (
              <button key={type} className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition" onClick={() => setModal(m => ({ ...m, nippleStep: 3, nippleData: { ...m.nippleData, type } }))}>{type}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  // Step 3: Show info
  if (title === 'Nipple/Areola' && nippleStep === 3) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-xl font-bold">&times;</button>
          <h3 className="text-2xl font-bold text-pink-600 mb-4">Nipple Bleeding/Discharge Details</h3>
          <div className="mb-2 text-gray-700">Aapne select kiya: <b>{nippleData.bleeding}</b> bleeding, <b>{nippleData.type}</b> discharge.</div>
          {NIPPLE_INFO.content}
        </div>
      </div>
    );
  }
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
    } else if (Math.abs(point.x) < 0.25 && Math.abs(point.y) < 0.25) {
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
  const [modal, setModal] = useState({ open: false, title: '', message: '', symptomOptions: null, nippleStep: 0, nippleData: {} });

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
    // Nipple/Areola special logic
    if (modal.title === 'Nipple/Areola' && opt.key === 'discharge') {
      setModal(modal => ({ ...modal, nippleStep: 1, symptomOptions: null, message: '' }));
      return;
    }
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
        onClose={() => setModal({ ...modal, open: false, nippleStep: 0, nippleData: {} })}
        title={modal.title}
        message={modal.message}
        symptomOptions={modal.symptomOptions}
        onSymptomSelect={handleSymptomSelect}
        nippleStep={modal.nippleStep}
        setModal={setModal}
        nippleData={modal.nippleData}
      />
    </>
  );
}
