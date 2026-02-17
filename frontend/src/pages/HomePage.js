import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key, 
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URLs - Mascot and Logo
const MASCOT_URL = "https://customer-assets.emergentagent.com/job_793c74d5-ca58-4bf5-89f1-99d71cd1f3d6/artifacts/b2chfwik_Mascot-removebg-preview.png";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/233b0b4x_Wynora-removebg-preview.png";

// Background images - faded
const BG_IMAGES = {
  abstract1: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  security: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
};

// "W" Shield Watermark Component
const WShieldWatermark = ({ className = "", style = {} }) => (
  <svg 
    viewBox="0 0 100 120" 
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M50 5 L95 20 L95 65 Q95 95 50 115 Q5 95 5 65 L5 20 Z" 
      stroke="currentColor" 
      strokeWidth="2"
      fill="none"
    />
    <path 
      d="M50 12 L88 25 L88 62 Q88 88 50 106 Q12 88 12 62 L12 25 Z" 
      stroke="currentColor" 
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    <text 
      x="50" 
      y="72" 
      textAnchor="middle" 
      fontSize="45" 
      fontWeight="bold" 
      fontFamily="Outfit, sans-serif"
      fill="currentColor"
    >
      W
    </text>
  </svg>
);

// Background W Shield Watermarks
const ShieldWatermarks = () => {
  const shields = [
    { x: '5%', y: '10%', size: 200, opacity: 0.025, rotation: -10 },
    { x: '85%', y: '5%', size: 180, opacity: 0.02, rotation: 12 },
    { x: '90%', y: '60%', size: 160, opacity: 0.02, rotation: -5 },
    { x: '8%', y: '70%', size: 140, opacity: 0.018, rotation: 8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shields.map((shield, i) => (
        <motion.div
          key={i}
          className="absolute text-[#D4AF37]"
          style={{ 
            left: shield.x, 
            top: shield.y, 
            opacity: shield.opacity,
            transform: `rotate(${shield.rotation}deg)`,
            width: shield.size,
            height: shield.size * 1.2,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [shield.opacity, shield.opacity * 1.3, shield.opacity],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};

// Trust badges/points
const trustPoints = [
  "Bank-grade encryption",
  "Private & secure access",
  "24/7 availability",
  "Easy organization"
];

const HomePage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <PublicLayout>
      {/* ========================================
          HERO SECTION - Navy Blue + Gold (Mascot Matched)
          With Animated Mascot
          ======================================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Deep Navy Blue Base - Matching Mascot Color #22304F */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
        {/* Faded Background Image - Blue tinted */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%) brightness(0.6) hue-rotate(200deg)'
          }}
        />
        
        {/* Gold Lighting from top-left */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 15% 15%, rgba(212, 175, 55, 0.12) 0%, transparent 45%)'
        }} />
        
        {/* Gold light from bottom-right */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 85% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 40%)'
        }} />
        
        {/* Soft vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(26, 37, 64, 0.4) 100%)'
        }} />
        
        {/* W Shield Watermarks */}
        <ShieldWatermarks />
        
        {/* Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              {/* Main Heading */}
              <motion.h1 
                className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block" style={{
                  background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 30%, #B8941F 60%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(212, 175, 55, 0.4)',
                }}>
                  WynOra Vault
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-lg md:text-xl text-[#C8D0DC] font-medium tracking-[0.3em] uppercase">
                  Personalized • Safe • Trusted
                </span>
              </motion.div>

              {/* Subheadline */}
              <motion.div 
                className="text-lg md:text-xl text-[#C8D0DC]/70 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p>Your secure digital vault for managing all your important information in one place.</p>
                <p>Bank accounts, insurance, assets, and more — all encrypted and protected.</p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Primary Gold Button */}
                <Link to="/signup">
                  <button
                    data-testid="hero-getstarted-btn"
                    className="group relative px-10 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                      color: '#1A2540',
                      boxShadow: '0 0 40px rgba(212, 175, 55, 0.35), 0 4px 20px rgba(26, 37, 64, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                    }}
                  >
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      Get Started
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                
                {/* Secondary Frosted Button */}
                <Link to="/login">
                  <button
                    data-testid="hero-signin-btn"
                    className="group px-10 py-4 rounded-full font-semibold text-lg bg-white/5 backdrop-blur-xl border border-[#C8D0DC]/25 text-[#C8D0DC] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-[#E3B82A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                  >
                    Sign In
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Animated Mascot */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              {/* Mascot Glow Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-[#22304F]/30 blur-3xl" />
              </div>
              
              {/* Animated Mascot Image */}
              <motion.img
                src={MASCOT_URL}
                alt="WynOra Vault Mascot"
                className="relative z-10 w-[320px] md:w-[400px] lg:w-[450px] h-auto drop-shadow-[0_0_60px_rgba(212,175,55,0.3)]"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Floating shield accent behind mascot */}
              <motion.div
                className="absolute -z-0 text-[#D4AF37] opacity-[0.06]"
                style={{ width: 500, height: 600 }}
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <WShieldWatermark className="w-full h-full" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-7 h-12 rounded-full border-2 border-[#D4AF37]/35 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-[#D4AF37] rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* ========================================
          VALUE PROPOSITION SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Navy Background */}
        <div className="absolute inset-0 bg-[#22304F]" />
        
        {/* Faded background image */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url(${BG_IMAGES.security})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.5) hue-rotate(200deg)'
          }}
        />
        
        {/* Gold accent glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        
        {/* W Shield watermark */}
        <motion.div
          className="absolute right-[5%] top-[10%] text-[#D4AF37] opacity-[0.015]"
          style={{ width: 300, height: 360 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Visual with faded image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main visual container */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 bg-[#1A2540]/50">
                  <img 
                    src={BG_IMAGES.security}
                    alt="Secure Digital Vault"
                    className="w-full h-80 md:h-96 object-cover opacity-70"
                    style={{ filter: 'brightness(0.7) hue-rotate(10deg)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#22304F] via-[#22304F]/50 to-transparent" />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 60px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center border border-[#D4AF37]/30"
                    >
                      <Shield className="h-12 w-12 text-[#D4AF37]" strokeWidth={1} />
                    </motion.div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-[#1A2540]/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-5"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lock className="h-8 w-8 text-[#D4AF37] mb-2" />
                  <p className="text-white font-semibold text-sm">Bank-Grade</p>
                  <p className="text-[#C8D0DC]/60 text-xs">Encryption</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8">
                <Shield className="h-3 w-3 text-[#D4AF37]" />
                <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Why WynOra Vault</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Peace of Mind,{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 50%, #B8941F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Elegantly Delivered
                </span>
              </h2>
              <p className="text-[#C8D0DC]/60 text-lg mb-10 leading-relaxed">
                In a world of digital chaos, WynOra Vault brings order to your most important documents. 
                From financial records to legal papers, everything finds its secure home.
              </p>
              
              {/* Feature points */}
              <div className="space-y-5">
                {[
                  { title: "Absolute Privacy", desc: "Your data belongs to you. We never share or access your documents." },
                  { title: "Organized Simplicity", desc: "Intuitive categorization makes finding documents effortless." },
                  { title: "Always Accessible", desc: "Access your vault securely from any device, anywhere, anytime." }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-[#C8D0DC]/50 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          PREMIUM VISUAL SHOWCASE
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        {/* Faded image overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.4) hue-rotate(200deg)'
          }}
        />
        
        {/* Gold lighting effects */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(200, 208, 220, 0.04) 0%, transparent 50%)',
        }} />
        
        {/* W Shield Watermarks */}
        <motion.div
          className="absolute top-[10%] left-[10%] text-[#D4AF37] opacity-[0.02]"
          style={{ width: 200, height: 240 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{
                background: 'linear-gradient(135deg, #C8D0DC 0%, #F2F2F2 30%, #C8D0DC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Precision.</span>
              {' '}
              <span style={{
                background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 30%, #B8941F 60%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 60px rgba(212, 175, 55, 0.25)',
              }}>Protection.</span>
              {' '}
              <span style={{
                background: 'linear-gradient(135deg, #C8D0DC 0%, #F2F2F2 30%, #C8D0DC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Prestige.</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#C8D0DC]/60 italic font-light tracking-wide">
              "Where security meets sophistication."
            </p>
          </motion.div>
          
          {/* Glassmorphism Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Panel 1 - Gold themed */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border border-[#D4AF37]/15 group-hover:border-[#D4AF37]/35 p-10 overflow-hidden transition-all duration-500">
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)' }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center mb-6 border border-[#D4AF37]/25 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-shadow duration-500"
                    animate={{ boxShadow: ['0 0 20px rgba(212, 175, 55, 0.1)', '0 0 30px rgba(212, 175, 55, 0.2)', '0 0 20px rgba(212, 175, 55, 0.1)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">Uncompromising Security</h3>
                  <p className="text-[#C8D0DC]/50 leading-relaxed text-sm">
                    Bank-grade encryption protecting your most valuable documents with military precision.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Panel 2 - Silver themed */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-b from-[#C8D0DC]/15 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border border-[#C8D0DC]/15 group-hover:border-[#C8D0DC]/35 p-10 overflow-hidden transition-all duration-500">
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(200, 208, 220, 0.5), transparent)' }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
                
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8D0DC]/15 to-[#C8D0DC]/5 flex items-center justify-center mb-6 border border-[#C8D0DC]/25 group-hover:shadow-[0_0_30px_rgba(200,208,220,0.2)] transition-shadow duration-500"
                    animate={{ boxShadow: ['0 0 20px rgba(200, 208, 220, 0.1)', '0 0 30px rgba(200, 208, 220, 0.15)', '0 0 20px rgba(200, 208, 220, 0.1)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <Lock className="h-8 w-8 text-[#C8D0DC]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">Private & Exclusive</h3>
                  <p className="text-[#C8D0DC]/50 leading-relaxed text-sm">
                    Your data remains yours alone. No third-party access, no compromises.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Panel 3 - Gold themed */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border border-[#D4AF37]/15 group-hover:border-[#D4AF37]/35 p-10 overflow-hidden transition-all duration-500">
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)' }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center mb-6 border border-[#D4AF37]/25 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-shadow duration-500"
                    animate={{ boxShadow: ['0 0 20px rgba(212, 175, 55, 0.1)', '0 0 30px rgba(212, 175, 55, 0.2)', '0 0 20px rgba(212, 175, 55, 0.1)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <Key className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3">Effortless Access</h3>
                  <p className="text-[#C8D0DC]/50 leading-relaxed text-sm">
                    Retrieve your documents instantly, anywhere in the world, anytime you need.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          CTA SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        {/* Faded background image */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.4)'
          }}
        />
        
        {/* Gold light accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[150px]" />
        
        {/* W Shield watermarks */}
        <motion.div
          className="absolute top-[15%] left-[12%] text-[#D4AF37] opacity-[0.02]"
          style={{ width: 160, height: 192 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-[18%] right-[14%] text-[#D4AF37] opacity-[0.018]"
          style={{ width: 140, height: 168 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/8 backdrop-blur-xl border border-[#D4AF37]/35 flex items-center justify-center mx-auto mb-10"
              animate={{ 
                y: [0, -10, 0],
                boxShadow: ['0 0 40px rgba(212, 175, 55, 0.25)', '0 0 60px rgba(212, 175, 55, 0.4)', '0 0 40px rgba(212, 175, 55, 0.25)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-12 h-12 text-[#D4AF37]" strokeWidth={1.5} />
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Secure Your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #B8941F 0%, #D4AF37 25%, #E3B82A 50%, #D4AF37 75%, #B8941F 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shine 3s linear infinite',
              }}>
                Future?
              </span>
            </h2>
            <p className="text-[#C8D0DC]/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
              Join thousands who trust WynOra Vault with their most important documents.
            </p>
            
            <Link to="/signup">
              <button
                data-testid="cta-getstarted-btn"
                className="group relative px-12 py-5 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                  color: '#1A2540',
                  boxShadow: '0 0 50px rgba(212, 175, 55, 0.4), 0 4px 30px rgba(26, 37, 64, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-3">
                  Create Your Vault
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shine {
          from { background-position: -200% center; }
          to { background-position: 200% center; }
        }
      `}</style>
    </PublicLayout>
  );
};

export default HomePage;