/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Eye, EyeOff, Compass } from 'lucide-react';

/**
 * Eye Component - Handles the pupil tracking logic
 */
const CharacterEye = ({ mousePos, containerRef }: { 
  mousePos: { x: number; y: number }, 
  containerRef: React.RefObject<HTMLDivElement | null> 
}) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  
  // Motion values for smooth pupil movement
  const pupilX = useSpring(0, { stiffness: 150, damping: 20 });
  const pupilY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (!eyeRef.current || !containerRef.current) return;

    const eyeRect = eyeRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate center of the eye relative to the container
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate distance from mouse to eye center
    const dx = mousePos.x - eyeCenterX;
    const dy = mousePos.y - eyeCenterY;

    // Limit the pupil movement range (clamp)
    const maxMove = 4;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 15, maxMove);

    pupilX.set(Math.cos(angle) * distance);
    pupilY.set(Math.sin(angle) * distance);
  }, [mousePos, pupilX, pupilY, containerRef]);

  return (
    <div 
      ref={eyeRef}
      className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        style={{ x: pupilX, y: pupilY }}
        className="w-1.5 h-1.5 bg-black rounded-full"
      />
    </div>
  );
};

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const leftContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves the left area
    setMousePos({ x: -1000, y: -1000 }); // Far away so it defaults to center logic or we can just set 0
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FDFCFB] font-sans selection:bg-purple-100">
      
      {/* Left Side: Visual Area */}
      <div 
        ref={leftContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative hidden lg:flex lg:w-[55%] bg-[#F2F0ED] overflow-hidden flex-col justify-between p-12"
      >
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-2 text-[#1A1A1A] font-semibold tracking-tight">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
            <Compass size={18} />
          </div>
          <span className="text-xl">CareerCompass</span>
        </div>

        {/* Illustration Area */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="relative w-[400px] h-[300px]">
            
            {/* Purple Tall Character */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-10 left-10 w-24 h-48 bg-purple-500 rounded-2xl shadow-lg flex flex-col items-center pt-8 gap-1"
            >
              <div className="flex gap-2">
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
              </div>
            </motion.div>

            {/* Black Narrow Character */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-10 left-36 w-16 h-40 bg-[#1A1A1A] rounded-2xl shadow-lg flex flex-col items-center pt-8 gap-1 z-10"
            >
              <div className="flex gap-1.5">
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
              </div>
            </motion.div>

            {/* Orange Short/Fat Character */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-10 left-[-20px] w-32 h-32 bg-orange-400 rounded-[2.5rem] shadow-lg flex flex-col items-center pt-10 gap-1"
            >
              <div className="flex gap-3">
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
              </div>
            </motion.div>

            {/* Yellow Round Character */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-56 w-20 h-32 bg-yellow-300 rounded-full shadow-lg flex flex-col items-center pt-6 gap-2"
            >
              <div className="flex gap-1">
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
                <CharacterEye mousePos={mousePos} containerRef={leftContainerRef} />
              </div>
              <div className="w-6 h-0.5 bg-black/20 rounded-full mt-2" />
            </motion.div>

          </div>
        </div>

        {/* Left Footer */}
        <div className="relative z-10 flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-800 transition-colors">Contact</a>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-[400px] space-y-10">
          
          {/* Header */}
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 mb-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back!</h1>
            <p className="text-gray-500 font-medium">Please enter your details</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-0.5">Email</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-purple-600 outline-none transition-colors placeholder:text-gray-300 text-gray-900"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-0.5">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-purple-600 outline-none transition-colors placeholder:text-gray-300 text-gray-900 pr-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 border border-gray-300 rounded bg-white group-hover:border-purple-500 transition-colors">
                  <input type="checkbox" className="peer absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="w-2 h-2 bg-purple-600 rounded-sm scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-gray-600 font-medium">Remember for 30 days</span>
              </label>
              <button type="button" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-[#1A1A1A] text-white rounded-xl font-semibold shadow-lg shadow-gray-200 hover:bg-black transition-all"
              >
                Log In
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Log in with Google
              </motion.button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 font-medium">
            Don't have an account? <button className="text-purple-600 font-bold hover:underline">Sign Up</button>
          </p>
        </div>
      </div>

      {/* Mobile Brand Name (Visible only on small screens) */}
      <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-[#1A1A1A] font-semibold tracking-tight">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
          <Compass size={18} />
        </div>
        <span className="text-xl">CareerCompass</span>
      </div>

    </div>
  );
}
