import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Key, 
  FileCheck, 
  Building2, 
  Wallet,
  FileText,
  Home as HomeIcon,
  Coins,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Star Field Component
const StarField = ({ count = 100 }) => {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// Cosmic Orb Component for Hero
const CosmicOrb = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Orbiting ring 1 */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full border border-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500/60 shadow-lg shadow-blue-500/50" />
      </motion.div>
      
      {/* Orbiting ring 2 */}
      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full border border-indigo-500/20"
        style={{ transform: 'rotateX(60deg)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400/60 shadow-lg shadow-indigo-400/50" />
      </motion.div>
      
      {/* Central shield */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Shield glow */}
        <div className="absolute inset-0 blur-3xl bg-blue-500/30 scale-150" />
        
        {/* Shield container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border border-white/10" />
          
          {/* Shield icon */}
          <Shield className="w-16 h-16 text-blue-400 relative z-10" strokeWidth={1.5} />
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
            animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
      </motion.div>
      
      {/* Floating icons */}
      <motion.div
        className="absolute top-8 right-8"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-blue-300" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-12 right-16"
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Key className="w-4 h-4 text-indigo-300" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-20 left-4"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <FileCheck className="w-5 h-5 text-cyan-300" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-12"
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <Wallet className="w-4 h-4 text-violet-300" />
        </div>
      </motion.div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative"
      data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Card glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-indigo-600/0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-blue-600/20 group-hover:via-blue-500/20 group-hover:to-indigo-600/20 blur-xl transition-all duration-500" />
      
      {/* Card content */}
      <div className="relative cosmic-card rounded-2xl p-8 h-full border border-white/[0.08] group-hover:border-blue-500/30 transition-colors duration-300">
        {/* Icon container */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 transition-colors duration-300">
            <feature.icon className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </div>
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-blue-50 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

// Security Orb Component
const SecurityOrb = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
      {/* Outer pulse rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/20"
          style={{
            width: `${70 + i * 15}%`,
            height: `${70 + i * 15}%`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Central orb */}
      <motion.div
        className="relative w-1/2 aspect-square"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/30 to-indigo-600/30 backdrop-blur-sm border border-white/20" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-900/50 to-indigo-900/50 flex items-center justify-center">
          <Shield className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
        </div>
        
        {/* Orbiting security icons */}
        {[
          { icon: Lock, angle: 0, color: 'text-cyan-400' },
          { icon: Key, angle: 90, color: 'text-blue-400' },
          { icon: FileCheck, angle: 180, color: 'text-indigo-400' },
          { icon: Globe, angle: 270, color: 'text-violet-400' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${item.angle}deg) translateY(-140%) rotate(-${item.angle}deg)`,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: Building2,
    title: 'Bank Accounts',
    description: 'Securely store all your bank account details, statements, and financial records in one place.'
  },
  {
    icon: Shield,
    title: 'Insurance',
    description: 'Keep track of your health, life, vehicle, and property insurance policies with ease.'
  },
  {
    icon: FileText,
    title: 'Legal Documents',
    description: 'Store wills, contracts, agreements, and other important legal documents securely.'
  },
  {
    icon: Wallet,
    title: 'Financial Assets',
    description: 'Track your investments, stocks, mutual funds, and other financial instruments.'
  },
  {
    icon: HomeIcon,
    title: 'Property Records',
    description: 'Maintain property deeds, rental agreements, and real estate documentation.'
  },
  {
    icon: Coins,
    title: 'Digital Assets',
    description: 'Store digital asset information, crypto wallet details, and online account credentials.'
  }
];

const securityFeatures = [
  'Secure cloud-based encryption',
  'HTTPS protection for all data transfers',
  'Multi-layer authentication system',
  'Private user access control',
  'Regular security audits',
  'Compliant with Indian data protection laws'
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
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic Background Layers */}
        <div className="absolute inset-0 cosmic-bg" />
        <div className="absolute inset-0 cosmic-nebula" />
        <div className="absolute inset-0 cosmic-grain" />
        
        {/* Star Field */}
        <StarField count={150} />
        
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Radial glow behind content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-blue-600/10 via-transparent to-transparent blur-3xl" />
        
        {/* Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card border border-white/10 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300 font-medium tracking-wide">Secure • Trusted • Verified</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Digital Universe of{' '}
                <span className="cosmic-text-gradient">Secure Information</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Store, organize, and protect your personal financial and legal documents in a secure digital vault, accessible only to you.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/signup">
                  <Button 
                    size="lg"
                    data-testid="hero-getstarted-btn"
                    className="cosmic-btn-primary rounded-full px-8 py-6 text-lg font-semibold w-full sm:w-auto"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg"
                    variant="outline"
                    data-testid="hero-signin-btn"
                    className="cosmic-btn-secondary rounded-full px-8 py-6 text-lg font-medium w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Cosmic Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block h-[500px]"
            >
              <CosmicOrb />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-blue-400 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <svg viewBox="0 0 1440 120" className="absolute bottom-0 w-full h-auto" preserveAspectRatio="none">
            <path 
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" 
              fill="url(#wave-gradient)" 
              fillOpacity="0.1"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 cosmic-bg-subtle" />
        <div className="absolute inset-0 cosmic-grain opacity-50" />
        <StarField count={50} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full cosmic-card border border-white/10 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-300 font-medium">Comprehensive Storage</span>
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need in{' '}
              <span className="cosmic-text-gradient">One Vault</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Securely store all your important documents and financial information in categorized sections, accessible anytime, anywhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with different gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B14] via-[#0B1628] to-[#070B14]" />
        <div className="absolute inset-0 cosmic-grain opacity-50" />
        
        {/* Subtle nebula effect */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Lock className="h-3 w-3 text-blue-400" />
                <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Protected Platform</span>
              </div>
              
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                Your Security is Our{' '}
                <span className="cosmic-text-gradient">Priority</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                WynOra Vault is built with industry-standard security measures to ensure 
                your data remains private and protected at all times.
              </p>
              
              <ul className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <SecurityOrb />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 cosmic-bg-subtle" />
        <div className="absolute inset-0 cosmic-grain opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cosmic-card rounded-3xl p-8 md:p-12 border border-white/[0.08]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '50K+', label: 'Documents Secured' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold cosmic-text-gradient mb-2">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 cosmic-bg" />
        <div className="absolute inset-0 cosmic-grain" />
        <StarField count={80} />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-600/20 via-transparent to-transparent blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/30 backdrop-blur-sm border border-white/10 flex items-center justify-center mx-auto mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-10 h-10 text-blue-400" />
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Secure Your{' '}
              <span className="cosmic-text-gradient">Future?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of users who trust WynOra Vault to protect their most important documents.
            </p>
            
            <Link to="/signup">
              <Button 
                size="lg"
                data-testid="cta-getstarted-btn"
                className="cosmic-btn-primary rounded-full px-10 py-6 text-lg font-semibold"
              >
                Create Your Vault
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
