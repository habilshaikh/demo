import { motion } from 'framer-motion';
import { Shield, Target, Eye, Users, Award, Heart, Lock, Key, Fingerprint } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URLs
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

// Mascot-matched colors: Navy #22304F, Gold #C79B4C

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Your data security is our top priority. We implement robust measures to protect your information.'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We believe in complete transparency about how we handle and protect your data.'
  },
  {
    icon: Heart,
    title: 'User Trust',
    description: 'Building and maintaining trust is at the core of everything we do.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every feature and service we provide.'
  }
];

const securityPillars = [
  {
    icon: Lock,
    title: 'Military-Grade Encryption',
    description: 'Your documents are protected with advanced encryption protocols.',
    theme: 'gold'
  },
  {
    icon: Shield,
    title: 'Multi-Layer Security',
    description: 'Multiple security layers ensure comprehensive protection.',
    theme: 'silver'
  },
  {
    icon: Fingerprint,
    title: 'Private & Isolated Storage',
    description: 'Your data is stored in isolated, private environments.',
    theme: 'gold'
  },
  {
    icon: Key,
    title: 'Access Controlled & Verified',
    description: 'Only you can access your vault with verified authentication.',
    theme: 'silver'
  }
];

const AboutPage = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
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
          background: 'radial-gradient(ellipse at 20% 20%, rgba(199, 155, 76, 0.1) 0%, transparent 50%)',
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22304F]/80 backdrop-blur-xl border border-[#C79B4C]/20 mb-6">
              <Target className="h-4 w-4 text-[#C79B4C]" />
              <span className="text-sm text-[#C8D0DC] font-medium tracking-wide">Our Mission</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              About{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>WynOra Vault</span>
            </h1>
            <p className="text-lg text-[#C8D0DC]/60 leading-relaxed">
              WynOra Vault is a secure digital vault platform designed to help individuals 
              store, organize, and protect their personal financial and legal information.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* Story Section with Premium Visual */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#22304F]" />
        
        {/* Subtle gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
        }} />
        
        {/* Floating watermark icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-[10%]"
            animate={{ y: [0, -15, 0], opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock className="w-24 h-24 text-[#C79B4C]" strokeWidth={0.4} />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-[8%]"
            animate={{ y: [0, 12, 0], opacity: [0.015, 0.03, 0.015] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Shield className="w-20 h-20 text-[#C8D0DC]" strokeWidth={0.4} />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Our{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Story</span>
              </h2>
              <div className="space-y-4 text-[#C8D0DC]/60 leading-relaxed">
                <p>
                  WynOra Vault was born from a simple observation: in today's digital age, 
                  managing personal financial and legal documents has become increasingly complex. 
                  Important documents are scattered across email attachments, physical files, 
                  and various cloud storage services.
                </p>
                <p>
                  We built WynOra Vault to provide a centralized, secure, and organized solution 
                  for storing all your important documents. Our platform is designed with security 
                  at its core, ensuring that your sensitive information remains private and protected.
                </p>
                <p>
                  Today, WynOra Vault serves individuals across India, helping them take control 
                  of their financial and legal documentation with confidence.
                </p>
              </div>
            </motion.div>

            {/* Premium Security Showcase Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/15 via-transparent to-silver/8 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative rounded-3xl bg-[#1A2540]/70 backdrop-blur-2xl border border-[#C79B4C]/20 p-8 overflow-hidden">
                {/* Top gold accent with shimmer */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner gold glow */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2" style={{
                  background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.06) 0%, transparent 70%)',
                }} />
                
                {/* Header */}
                <div className="relative text-center mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 border border-[#C79B4C]/30"
                    animate={{ 
                      boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 50px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Lock className="h-10 w-10 text-[#C79B4C]" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    Built on{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Trust</span>
                  </h3>
                  <p className="text-[#C8D0DC]/60 text-sm leading-relaxed">
                    Every element of WynOraVault is crafted with protection at its core.
                  </p>
                </div>
                
                {/* Security Pillars Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {securityPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className={`relative rounded-xl p-4 bg-[#22304F]/50 backdrop-blur-sm border transition-all duration-300 ${
                        pillar.theme === 'gold' 
                          ? 'border-[#C79B4C]/15 hover:border-[#C79B4C]/35 hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]' 
                          : 'border-silver/15 hover:border-silver/35 hover:shadow-[0_0_20px_rgba(200,208,220,0.12)]'
                      }`}>
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                          pillar.theme === 'gold'
                            ? 'bg-gradient-to-br from-gold/15 to-gold/5 border border-[#C79B4C]/20'
                            : 'bg-gradient-to-br from-silver/12 to-silver/4 border border-silver/20'
                        }`}>
                          <pillar.icon className={`h-5 w-5 ${pillar.theme === 'gold' ? 'text-[#C79B4C]' : 'text-[#C8D0DC]'}`} strokeWidth={1.5} />
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-[#D4AC62] transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-[#C8D0DC]/50 text-xs leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Security Statement Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2540] via-[#22304F] to-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Vault/bank watermark */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundSize: 'cover',
            filter: 'grayscale(50%)',
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(200, 208, 220, 0.06) 0%, transparent 50%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
        }} />
        
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(7, 24, 48, 0.3) 100%)',
        }} />
        
        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-16 left-[15%]"
            animate={{ y: [0, -18, 0], opacity: [0.015, 0.03, 0.015] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <Key className="w-20 h-20 text-[#C79B4C]" strokeWidth={0.4} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-[12%]"
            animate={{ y: [0, 15, 0], opacity: [0.015, 0.03, 0.015] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Fingerprint className="w-16 h-16 text-[#C8D0DC]" strokeWidth={0.4} />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Title */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span style={{
                background: 'linear-gradient(135deg, #C8D0DC 0%, #E8EDF4 30%, #C8D0DC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Built on Trust.</span>
              {' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(212, 175, 55, 0.25)',
              }}>Designed for Security.</span>
            </h2>
            
            {/* Premium copy */}
            <p className="text-lg md:text-xl text-[#C8D0DC]/60 leading-relaxed max-w-3xl mx-auto mb-16">
              Every element of WynOraVault is crafted with protection at its core. From encrypted storage 
              to secure authentication, your information is safeguarded with uncompromising standards.
            </p>
            
            {/* Security Pillars - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 ${
                    pillar.theme === 'gold' ? 'bg-gradient-to-b from-gold/25 to-transparent' : 'bg-gradient-to-b from-silver/20 to-transparent'
                  }`} />
                  
                  <div className={`relative rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-6 border transition-all duration-500 overflow-hidden ${
                    pillar.theme === 'gold'
                      ? 'border-[#C79B4C]/15 group-hover:border-[#C79B4C]/35'
                      : 'border-silver/15 group-hover:border-silver/35'
                  }`}>
                    {/* Top accent with shimmer */}
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background: pillar.theme === 'gold'
                          ? 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.45), transparent)'
                          : 'linear-gradient(90deg, transparent, rgba(200, 208, 220, 0.45), transparent)',
                      }}
                      animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
                    />
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 border transition-all duration-300 ${
                        pillar.theme === 'gold'
                          ? 'bg-gradient-to-br from-gold/18 to-gold/5 border-[#C79B4C]/25 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                          : 'bg-gradient-to-br from-silver/15 to-silver/5 border-silver/25 group-hover:shadow-[0_0_25px_rgba(200,208,220,0.2)]'
                      }`}
                      animate={{ 
                        boxShadow: pillar.theme === 'gold'
                          ? ['0 0 15px rgba(212, 175, 55, 0.1)', '0 0 25px rgba(212, 175, 55, 0.2)', '0 0 15px rgba(212, 175, 55, 0.1)']
                          : ['0 0 15px rgba(200, 208, 220, 0.08)', '0 0 25px rgba(200, 208, 220, 0.15)', '0 0 15px rgba(200, 208, 220, 0.08)']
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    >
                      <pillar.icon className={`h-7 w-7 ${pillar.theme === 'gold' ? 'text-[#C79B4C]' : 'text-[#C8D0DC]'}`} strokeWidth={1.5} />
                    </motion.div>
                    
                    <h3 className={`font-heading text-lg font-semibold mb-2 transition-colors ${
                      pillar.theme === 'gold' ? 'text-white group-hover:text-[#D4AC62]' : 'text-white group-hover:text-[#C8D0DC]-light'
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className="text-[#C8D0DC]/50 text-sm leading-relaxed group-hover:text-[#C8D0DC]/70 transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] rounded-full bg-[#C79B4C]/5 blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22304F]/80 backdrop-blur-xl border border-[#C79B4C]/20 mb-6">
              <Award className="h-4 w-4 text-[#C79B4C]" />
              <span className="text-sm text-[#C8D0DC] font-medium uppercase tracking-wider">Core Values</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              What Drives{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Us</span>
            </h2>
            <p className="text-[#C8D0DC]/60 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-b from-gold/15 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                
                <div className="relative rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 text-center border border-[#C79B4C]/15 group-hover:border-[#C79B4C]/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center mx-auto mb-6 border border-[#C79B4C]/20 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-shadow">
                    <value.icon className="h-7 w-7 text-[#C79B4C]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[#D4AC62] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[#C8D0DC]/50 text-sm leading-relaxed group-hover:text-[#C8D0DC]/70 transition-colors">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#C79B4C]/6 blur-[120px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/18 to-gold/5 flex items-center justify-center mx-auto mb-6 border border-[#C79B4C]/25"
              animate={{ 
                boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 50px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="h-10 w-10 text-[#C79B4C]" />
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Built by{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Experts</span>
            </h2>
            <p className="text-[#C8D0DC]/60 text-lg max-w-2xl mx-auto">
              Our team consists of experienced professionals in cybersecurity, 
              software development, and financial technology, dedicated to 
              building the most secure digital vault for you.
            </p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;