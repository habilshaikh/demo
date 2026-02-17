import { motion } from 'framer-motion';
import { UserPlus, FolderPlus, Shield, FileSearch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URLs
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up with your email and create a secure password. Your account is protected with industry-standard encryption.'
  },
  {
    number: '02',
    icon: FolderPlus,
    title: 'Add Your Documents',
    description: 'Upload your financial and legal documents. Organize them into categories like Bank Accounts, Insurance, Legal, and more.'
  },
  {
    number: '03',
    icon: Shield,
    title: 'Secure Storage',
    description: 'Your documents are encrypted and stored securely in our cloud infrastructure with multiple layers of protection.'
  },
  {
    number: '04',
    icon: FileSearch,
    title: 'Access Anytime',
    description: 'Access your vault from any device, anytime. Your documents are always just a login away.'
  }
];

const HowItWorksPage = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
        {/* Subtle bank building */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(40%)',
          }}
        />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold lighting */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 75% 75%, rgba(200, 208, 220, 0.05) 0%, transparent 40%)',
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22304F]/80 backdrop-blur-xl border border-[#C79B4C]/20 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-4 w-4 text-[#C79B4C]" />
              <span className="text-sm text-[#C8D0DC] font-medium tracking-wide">Simple Process</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How{' '}
              <span className="gold-text-shine">WynOra Vault</span>
              {' '}Works
            </h1>
            <p className="text-lg md:text-xl text-[#C8D0DC]/60 leading-relaxed">
              Getting started with WynOra Vault is simple. Follow these four easy steps 
              to secure your important documents.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* Steps Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold accent glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full bg-[#C79B4C]/5 blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <motion.div 
                  className="flex-1 group relative"
                  whileHover={{ y: -5 }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  
                  <div className="relative rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 border border-[#C79B4C]/15 group-hover:border-[#C79B4C]/30 transition-all duration-300">
                    {/* Top accent */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-bold text-[#C79B4C]/25">{step.number}</span>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center border border-[#C79B4C]/20 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-shadow">
                        <step.icon className="h-7 w-7 text-[#C79B4C]" />
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-white mb-3 group-hover:text-[#D4AC62] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[#C8D0DC]/60 leading-relaxed group-hover:text-[#C8D0DC]/80 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden md:block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/12 to-gold/5 flex items-center justify-center border border-[#C79B4C]/20">
                      <ArrowRight className="h-5 w-5 text-[#C79B4C]" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-[#C79B4C]/8 blur-[150px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/8 backdrop-blur-sm border border-[#C79B4C]/30 flex items-center justify-center mx-auto mb-8"
              animate={{ 
                y: [0, -10, 0],
                boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 50px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-10 h-10 text-[#C79B4C]" />
            </motion.div>
            
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Get{' '}
              <span className="gold-text-shine">Started?</span>
            </h2>
            <p className="text-[#C8D0DC]/60 text-lg mb-10 max-w-lg mx-auto">
              Create your secure vault in less than 2 minutes.
            </p>
            <Link to="/signup">
              <button
                data-testid="hiw-getstarted-btn"
                className="group relative px-10 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #C79B4C 0%, #D4AC62 30%, #C79B4C 70%, #A67E3D 100%)',
                  color: '#22304F',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.35), 0 4px 20px rgba(7, 24, 48, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Create Your Vault
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HowItWorksPage;