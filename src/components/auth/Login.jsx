import React, { useState } from 'react';

export default function Login({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200">
      <div className="backdrop-blur-xl bg-white/60 border border-pink-100 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-8 font-lexend tracking-tight drop-shadow-lg text-center">Sign In to CareDetect</h2>
        <form className="w-full flex flex-col gap-6">
          <div className="relative">
            <input type="email" required placeholder=" " className="peer w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <label className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 bg-white/80 px-1">Email</label>
          </div>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} required placeholder=" " className="peer w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <label className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 bg-white/80 px-1">Password</label>
            <button type="button" className="absolute right-4 top-3 text-pink-400 hover:text-pink-600" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.121-2.121A9.969 9.969 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12c0-2.21.896-4.21 2.343-5.657" /></svg>
              )}
            </button>
          </div>
          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-all">Sign In</button>
        </form>
        <div className="mt-6 text-gray-500 text-sm">Don&apos;t have an account? <button className="text-pink-600 font-semibold hover:underline" onClick={onSwitch}>Sign Up</button></div>
      </div>
    </div>
  );
} 