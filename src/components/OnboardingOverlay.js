import React, { useEffect, useRef, useState } from "react";
import DoctorModel3D from "./DoctorModel3D";

const steps = [
  {
    selector: "#start-screening-btn",
    message: "Yahan se aap screening shuru kar sakte hain!",
  },
  {
    selector: "#watch-demo-btn",
    message: "Yahan se aap demo dekh sakte hain!",
  },
  {
    selector: "#sweat-detect-btn",
    message: "Yeh button sweat biomarker detection ke liye hai!",
  },
  {
    selector: "#3d-model-btn",
    message: "Yeh 3D model aapko breast health samjhata hai.",
  },
  {
    selector: "#genetic-risk-btn",
    message: "Yahan se aap apna genetic risk dekh sakte hain.",
  },
  {
    selector: "#login-btn",
    message: "Yahan se aap login kar sakte hain.",
  },
  {
    selector: "#signup-btn",
    message: "Yahan se aap naya account bana sakte hain.",
  },
];

export default function OnboardingOverlay({ stepIndex, onNext, onClose }) {
  const step = steps[stepIndex];
  const highlightRef = useRef();
  const [arrowPos, setArrowPos] = useState(null);
  const speechBubbleRef = useRef();

  useEffect(() => {
    let timeout;
    try {
      const el = document.querySelector(step.selector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("onboarding-highlight");
        highlightRef.current = el;
        // Calculate arrow position
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          const bubbleRect = speechBubbleRef.current?.getBoundingClientRect();
          if (bubbleRect) {
            setArrowPos({
              startX: bubbleRect.right - 32, // bottom-right corner of bubble
              startY: bubbleRect.bottom - 24, // bottom-right corner of bubble
              endX: rect.left + rect.width / 2,
              endY: rect.top,
            });
          }
        }, 200);
      } else {
        timeout = setTimeout(() => {
          onNext();
        }, 500);
      }
    } catch (e) {
      timeout = setTimeout(() => {
        onNext();
      }, 500);
    }
    return () => {
      if (highlightRef.current) {
        highlightRef.current.classList.remove("onboarding-highlight");
      }
      if (timeout) clearTimeout(timeout);
      setArrowPos(null);
    };
  }, [step.selector, onNext]);

  // Arrow SVG
  const Arrow = () => {
    if (!arrowPos) return null;
    const { startX, startY, endX, endY } = arrowPos;
    const width = Math.abs(endX - startX) || 1;
    const height = Math.abs(endY - startY) || 1;
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);

    // Game-style smooth curve
    const controlX = startX - left + (endX - startX) * 0.4;
    const controlY = startY - top - 80; // Higher arc
    const path = `M${startX - left},${startY - top} Q${controlX},${controlY} ${endX - left},${endY - top}`;
    return (
      <svg
        style={{
          position: "fixed",
          left,
          top,
          pointerEvents: "none",
          zIndex: 10001,
        }}
        width={width}
        height={height}
      >
        <path
          d={path}
          stroke="url(#arrow-gradient)"
          strokeWidth="6"
          fill="none"
          markerEnd="url(#arrowhead)"
          style={{ filter: "drop-shadow(0 2px 8px #ec489988)" }}
        />
        <defs>
          <linearGradient id="arrow-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="16" markerHeight="16" refX="8" refY="8" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0,0 16,8 0,16 4,8" fill="#ec4899" />
          </marker>
        </defs>
      </svg>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
      style={{ pointerEvents: "auto" }}
    >
      <Arrow />
      {/* Avatar bottom-left, speech bubble to the right */}
      <div
        style={{
          position: "fixed",
          left: 40,
          bottom: 40,
          zIndex: 10002,
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // center vertically
        }}
      >
        <DoctorModel3D />
        <div
          ref={speechBubbleRef}
          style={{
            marginLeft: 24,
            marginBottom: 0, // no extra bottom margin
            // transform: "translateY(60px)", // removed
            background: "white",
            color: "#ec4899",
            fontWeight: 700,
            fontSize: 22,
            padding: "18px 32px",
            borderRadius: 24,
            boxShadow: "0 4px 24px 0 rgba(236,72,153,0.10)",
            textAlign: "center",
            maxWidth: 340,
            minWidth: 220,
            border: "2px solid #f3e8ff",
            zIndex: 10003,
          }}
        >
          {step.message}
        </div>
      </div>
      {/* Buttons below avatar */}
      <div
        style={{
          position: "fixed",
          left: 40,
          bottom: 20,
          zIndex: 10003,
          width: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          className="mt-6 px-7 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition text-lg"
          onClick={onNext}
        >
          {stepIndex === steps.length - 1 ? "Finish" : "Next"}
        </button>
        <button
          className="mt-2 text-xs text-gray-400 underline"
          onClick={onClose}
        >
          Skip Tour
        </button>
      </div>
    </div>
  );
} 