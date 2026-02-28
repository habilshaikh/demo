import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key, 
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText,
  Home,
  Globe,
  Users,
  CreditCard,
  UserCheck,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URLs - Mascot and Logo
const MASCOT_URL = "https://customer-assets.emergentagent.com/job_793c74d5-ca58-4bf5-89f1-99d71cd1f3d6/artifacts/b2chfwik_Mascot-removebg-preview.png";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/233b0b4x_Wynora-removebg-preview.png";

// Background images - faded
const BG_IMAGES = {
  abstract1: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  security: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  family: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
};
const HERO_IMG_1 = "/YOUR-IMAGE-1.png";
const HERO_IMG_2 = "/YOUR-IMAGE-2.png";

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

// Vault categories data
const vaultCategories = [
  {
    icon: Building2,
    title: "Banking & Lockers",
    desc: "Account numbers, branch details, and safe deposit box locations.",
    color: "#D4AF37",
  },
  {
    icon: FileText,
    title: "Insurance & Estate",
    desc: "Life, health, and auto policies, alongside your will and estate plans.",
    color: "#C8D0DC",
  },
  {
    icon: Home,
    title: "Property & Assets",
    desc: "Real estate deeds, vehicle registrations, and physical asset logs.",
    color: "#D4AF37",
  },
  {
    icon: Globe,
    title: "Digital Assets & Brokerage",
    desc: "Crypto wallets, trading accounts, and critical digital passwords.",
    color: "#C8D0DC",
  },
  {
    icon: Users,
    title: "Professional Contacts",
    desc: "Direct lines to your CA, lawyer, broker, and financial advisors.",
    color: "#D4AF37",
  },
  {
    icon: CreditCard,
    title: "Loans & Government IDs",
    desc: "Secure storage for Aadhar, PAN, SSN, passports, and liability records.",
    color: "#C8D0DC",
  },
];

// Trustee features
const trusteeFeatures = [
  {
    icon: Eye,
    title: "Total Control",
    desc: "You decide who sees what, and when. Granular permission levels for every category.",
  },
  {
    icon: UserCheck,
    title: "Verification",
    desc: "Rigorous identity checks ensure your data only falls into the right hands.",
  },
  {
    icon: Clock,
    title: "Peace of Mind",
    desc: "Ensure a seamless transition of information during medical emergencies or unforeseen events.",
  },
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
          HERO SECTION
          ======================================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%) brightness(0.6) hue-rotate(200deg)'
          }}
        />
        
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 15% 15%, rgba(212, 175, 55, 0.12) 0%, transparent 45%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 85% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 40%)'
        }} />
        
        <ShieldWatermarks />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">

              {/* Trust Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mt-10 mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Shield className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">End-to-End Encrypted</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-white mb-2">Secure Your</span>
                <span className="block text-white mb-2">Life's Work.</span>
                <span className="inline-block" style={{
                  background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 30%, #B8941F 60%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Protect Your
                </span>
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 30%, #B8941F 60%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Family's Future.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg md:text-xl text-[#C8D0DC]/70 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                The ultimate end-to-end encrypted vault for your vital financial, legal, and digital assets. Keep everything organized today, and ensure your trusted loved ones have access when they need it most.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
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
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      Start Your Free Vault
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
                
                <Link to="/how-it-works">
                  <button
                    data-testid="hero-howitworks-btn"
                    className="group px-10 py-4 rounded-full font-semibold text-lg bg-white/5 backdrop-blur-xl border border-[#C8D0DC]/25 text-[#C8D0DC] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-[#E3B82A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                  >
                    See How It Works
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Two Animated Images */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[#D4AF37]/15 to-[#22304F]/30 blur-3xl" />
              </div>

              <div className="relative z-10 w-full max-w-[520px] h-[420px] flex items-center justify-center">
                <motion.img
                  src={HERO_IMG_1}
                  alt="Hero Left"
                  className="absolute left-0 w-[260px] md:w-[300px] lg:w-[340px] h-auto drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                  initial={{ opacity: 0, x: -150 }}
                  animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.4 },
                    x: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
                <motion.img
                  src={HERO_IMG_2}
                  alt="Hero Right"
                  className="absolute right-0 w-[260px] md:w-[300px] lg:w-[340px] h-auto drop-shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0, y: [0, -18, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.5 },
                    x: { duration: 0.8, delay: 0.5, ease: "easeOut" },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              </div>

              <motion.div
                className="absolute text-[#D4AF37] opacity-[0.06]"
                style={{ width: 500, height: 600 }}
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
        
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* ========================================
          PROBLEM / EMPATHY SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1D2A45] to-[#22304F]" />
        
        {/* Faded family image */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url(${BG_IMAGES.family})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(60%) brightness(0.5) hue-rotate(200deg)'
          }}
        />

        {/* Dramatic red-tinted glow on left — representing danger/urgency */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(180, 60, 60, 0.06) 0%, transparent 55%)'
        }} />
        {/* Gold glow on right — representing solution */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 100% 50%, rgba(212, 175, 55, 0.07) 0%, transparent 55%)'
        }} />

        <motion.div
          className="absolute left-[8%] top-[15%] text-[#D4AF37] opacity-[0.02]"
          style={{ width: 180, height: 216 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-400/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-red-300/80 uppercase">The Reality</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Life is Unpredictable.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 50%, #B8941F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Your Financial Safety Shouldn't Be.
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-[#C8D0DC]/60 leading-relaxed mb-16 max-w-3xl mx-auto">
              If something unexpected happened tomorrow, would your family know where to find your insurance policies? 
              Your property deeds? Your crypto passwords?
            </p>

            {/* Stat-like callout cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { stat: "73%", label: "of families struggle to locate critical documents after an emergency" },
                { stat: "₹4.2L Cr", label: "in unclaimed insurance sits idle — because families didn't know it existed" },
                { stat: "48hrs", label: "is the average time lost tracking down documents during a crisis" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl border border-[#C8D0DC]/10 p-8"
                >
                  <p className="font-heading text-4xl font-bold mb-3" style={{
                    background: 'linear-gradient(135deg, #E3B82A, #D4AF37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{item.stat}</p>
                  <p className="text-[#C8D0DC]/50 text-sm leading-relaxed">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-lg text-[#C8D0DC]/50 italic">
              "Don't leave your loved ones locked out of the legacy you've worked so hard to build."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          VALUE PROPOSITION SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#22304F]" />
        
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url(${BG_IMAGES.security})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.5) hue-rotate(200deg)'
          }}
        />
        
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        
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
            {/* Left - Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
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
          FEATURES MATRIX — Everything Under One Roof
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.4) hue-rotate(200deg)'
          }}
        />
        
        {/* Gold lighting */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top right, rgba(212, 175, 55, 0.07) 0%, transparent 50%)',
        }} />

        <motion.div
          className="absolute top-[10%] left-[10%] text-[#D4AF37] opacity-[0.02]"
          style={{ width: 200, height: 240 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8">
              <Key className="h-3 w-3 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Complete Coverage</span>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span style={{
                background: 'linear-gradient(135deg, #C8D0DC 0%, #F2F2F2 30%, #C8D0DC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Everything That Matters,</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 30%, #B8941F 60%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Under One Unbreakable Roof.</span>
            </h2>
            <p className="text-xl text-[#C8D0DC]/50 max-w-2xl mx-auto">
              WynOra Vault replaces messy filing cabinets and scattered spreadsheets with a sleek, categorized digital ecosystem.
            </p>
          </motion.div>
          
          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaultCategories.map((cat, index) => {
              const Icon = cat.icon;
              const isGold = cat.color === "#D4AF37";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 ${isGold ? 'bg-gradient-to-b from-[#D4AF37]/20 to-transparent' : 'bg-gradient-to-b from-[#C8D0DC]/15 to-transparent'}`} />
                  
                  <div className={`relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border p-8 overflow-hidden transition-all duration-500 ${isGold ? 'border-[#D4AF37]/15 group-hover:border-[#D4AF37]/35' : 'border-[#C8D0DC]/15 group-hover:border-[#C8D0DC]/35'}`}>
                    {/* Shimmer top line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${isGold ? 'rgba(212, 175, 55, 0.4)' : 'rgba(200, 208, 220, 0.4)'}, transparent)` }}
                    />
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-500 ${isGold ? 'bg-[#D4AF37]/10 border-[#D4AF37]/25 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]' : 'bg-[#C8D0DC]/10 border-[#C8D0DC]/25 group-hover:shadow-[0_0_25px_rgba(200,208,220,0.15)]'}`}>
                      <Icon className="h-7 w-7" style={{ color: cat.color }} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-white mb-2">{cat.title}</h3>
                    <p className="text-[#C8D0DC]/50 text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          TRUSTEE SYSTEM SECTION — Core Differentiator
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1D2A45] to-[#22304F]" />
        
        {/* Special gold spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[150px]" />
        
        <motion.div
          className="absolute right-[6%] bottom-[10%] text-[#D4AF37] opacity-[0.015]"
          style={{ width: 240, height: 288 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <WShieldWatermark className="w-full h-full" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8">
                <UserCheck className="h-3 w-3 text-[#D4AF37]" />
                <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Unique Feature</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Pass the Torch with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #E3B82A 0%, #D4AF37 50%, #B8941F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Absolute Confidence.
                </span>
              </h2>
              
              <p className="text-[#C8D0DC]/60 text-lg mb-10 leading-relaxed">
                WynOra Vault isn't just about storage — it's about succession. Our unique <strong className="text-[#D4AF37]/80">Verified Trustee System</strong> allows you to assign specific access rights to family members, close friends, or legal counsel.
              </p>

              <div className="space-y-6">
                {trusteeFeatures.map((feat, index) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 }}
                      className="flex gap-5 p-5 rounded-2xl bg-[#1A2540]/50 border border-[#D4AF37]/10 hover:border-[#D4AF37]/25 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1.5">{feat.title}</h4>
                        <p className="text-[#C8D0DC]/50 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right - Visual trustee diagram */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Central vault node */}
              <div className="relative flex items-center justify-center h-[480px]">
                {/* Orbiting connection lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="120" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 8" fill="none" />
                  <circle cx="200" cy="200" r="170" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 12" fill="none" />
                  <line x1="200" y1="80" x2="200" y2="200" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="304" y1="260" x2="200" y2="200" stroke="#D4AF37" strokeWidth="1" />
                  <line x1="96" y1="260" x2="200" y2="200" stroke="#D4AF37" strokeWidth="1" />
                </svg>

                {/* Center: Your Vault */}
                <motion.div
                  className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center"
                  animate={{
                    boxShadow: ['0 0 40px rgba(212, 175, 55, 0.2)', '0 0 70px rgba(212, 175, 55, 0.4)', '0 0 40px rgba(212, 175, 55, 0.2)']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shield className="h-10 w-10 text-[#D4AF37] mb-1" strokeWidth={1} />
                  <span className="text-[#D4AF37] text-xs font-semibold">Your Vault</span>
                </motion.div>

                {/* Trustee nodes */}
                {[
                  { label: "Spouse", angle: -90, delay: 0 },
                  { label: "Legal Counsel", angle: 30, delay: 0.3 },
                  { label: "Trusted Child", angle: 150, delay: 0.6 },
                ].map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const r = 130;
                  const x = 50 + (r / 400) * 100 * Math.cos(rad);
                  const y = 50 + (r / 400) * 100 * Math.sin(rad);
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20 rounded-2xl bg-[#1A2540]/80 backdrop-blur-xl border border-[#C8D0DC]/20 flex flex-col items-center justify-center text-center"
                      style={{ left: `calc(${x}% - 40px)`, top: `calc(${y}% - 40px)` }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
                    >
                      <UserCheck className="h-6 w-6 text-[#C8D0DC]/60 mb-1" strokeWidth={1.5} />
                      <span className="text-[#C8D0DC]/50 text-[10px] font-medium leading-tight">{node.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECURITY PILLAR SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.4) hue-rotate(200deg)'
          }}
        />
        
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(200, 208, 220, 0.04) 0%, transparent 50%)',
        }} />
        
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
          
          {/* Security callout — Full width hero panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative mb-12"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border border-[#D4AF37]/20 p-12 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{
                background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)'
              }} />
              
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-6">
                    <Lock className="h-3 w-3 text-[#D4AF37]" />
                    <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Zero-Knowledge Architecture</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                    Military-Grade Security for Your Most Private Data.
                  </h3>
                  <p className="text-[#C8D0DC]/60 leading-relaxed">
                    WynOra Vault utilizes zero-knowledge, end-to-end encryption. This means your data is encrypted on your device <em>before</em> it ever reaches our servers. Even we can't see what's inside your vault. Only you and your verified trustees hold the keys.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: EyeOff, label: "Zero-Knowledge", desc: "We never see your data" },
                    { icon: Lock, label: "AES-256", desc: "Military-grade encryption" },
                    { icon: Shield, label: "On-Device Encryption", desc: "Encrypted before upload" },
                    { icon: Key, label: "You Hold The Keys", desc: "No backdoors, ever" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="p-4 rounded-2xl bg-[#22304F]/60 border border-[#D4AF37]/10">
                        <Icon className="h-5 w-5 text-[#D4AF37] mb-2" strokeWidth={1.5} />
                        <p className="text-white text-sm font-semibold mb-0.5">{item.label}</p>
                        <p className="text-[#C8D0DC]/40 text-xs">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Glassmorphism Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Uncompromising Security",
                desc: "Bank-grade encryption protecting your most valuable documents with military precision.",
                color: "#D4AF37",
              },
              {
                icon: Lock,
                title: "Private & Exclusive",
                desc: "Your data remains yours alone. No third-party access, no compromises.",
                color: "#C8D0DC",
              },
              {
                icon: Key,
                title: "Effortless Access",
                desc: "Retrieve your documents instantly, anywhere in the world, anytime you need.",
                color: "#D4AF37",
              },
            ].map((panel, index) => {
              const Icon = panel.icon;
              const isGold = panel.color === "#D4AF37";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 ${isGold ? 'bg-gradient-to-b from-[#D4AF37]/20 to-transparent' : 'bg-gradient-to-b from-[#C8D0DC]/15 to-transparent'}`} />
                  <div className={`relative rounded-3xl bg-[#1A2540]/60 backdrop-blur-2xl border p-10 overflow-hidden transition-all duration-500 ${isGold ? 'border-[#D4AF37]/15 group-hover:border-[#D4AF37]/35' : 'border-[#C8D0DC]/15 group-hover:border-[#C8D0DC]/35'}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
                      background: `linear-gradient(90deg, transparent, ${isGold ? 'rgba(212, 175, 55, 0.5)' : 'rgba(200, 208, 220, 0.5)'}, transparent)`
                    }} />
                    <div className="relative">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-shadow duration-500 ${isGold ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/25' : 'bg-gradient-to-br from-[#C8D0DC]/15 to-[#C8D0DC]/5 border-[#C8D0DC]/25'}`}
                        animate={{ boxShadow: isGold
                          ? ['0 0 20px rgba(212, 175, 55, 0.1)', '0 0 30px rgba(212, 175, 55, 0.2)', '0 0 20px rgba(212, 175, 55, 0.1)']
                          : ['0 0 20px rgba(200, 208, 220, 0.1)', '0 0 30px rgba(200, 208, 220, 0.15)', '0 0 20px rgba(200, 208, 220, 0.1)']
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      >
                        <Icon className="h-8 w-8" style={{ color: panel.color }} strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="font-heading text-xl font-semibold text-white mb-3">{panel.title}</h3>
                      <p className="text-[#C8D0DC]/50 leading-relaxed text-sm">{panel.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${BG_IMAGES.abstract1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(50%) brightness(0.4)'
          }}
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#D4AF37]/8 blur-[150px]" />
        
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

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">Takes less than 10 minutes to set up</span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Give Yourself (and Your Family)
            </h2>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <span style={{
                background: 'linear-gradient(90deg, #B8941F 0%, #D4AF37 25%, #E3B82A 50%, #D4AF37 75%, #B8941F 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shine 3s linear infinite',
              }}>
                the Gift of Certainty.
              </span>
            </h2>

            <p className="text-[#C8D0DC]/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              It takes less than 10 minutes to set up your WynOra Vault and start securing your legacy. 
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
                  Create My Secure Vault Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            {/* Trust micro-copy */}
            <p className="text-[#C8D0DC]/30 text-sm mt-6 tracking-wide">
              No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; 100% encrypted
            </p>
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