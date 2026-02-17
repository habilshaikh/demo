import { motion } from 'framer-motion';
import { Shield, Lock, Key, Server, Eye, FileCheck, CheckCircle2 } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URLs
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

const securityFeatures = [
  {
    icon: Lock,
    title: 'Secure Cloud-Based Encryption',
    description: 'Your data is encrypted using industry-standard protocols before being stored in our secure cloud infrastructure.'
  },
  {
    icon: Shield,
    title: 'HTTPS Protection',
    description: 'All data transfers are protected with HTTPS/TLS encryption, ensuring secure communication between your device and our servers.'
  },
  {
    icon: Key,
    title: 'Multi-Layer Authentication',
    description: 'We implement multiple layers of authentication to verify your identity and protect unauthorized access to your vault.'
  },
  {
    icon: Eye,
    title: 'Private User Access Control',
    description: 'Only you can access your data. Our strict access control policies ensure that your information remains private.'
  },
  {
    icon: Server,
    title: 'Secure Data Centers',
    description: 'Your data is stored in secure, geographically distributed data centers with redundancy and disaster recovery measures.'
  },
  {
    icon: FileCheck,
    title: 'Regular Security Audits',
    description: 'We conduct regular security audits and penetration testing to identify and address potential vulnerabilities.'
  }
];

const complianceItems = [
  'Indian Information Technology Act, 2000 compliant',
  'Data Protection and Privacy guidelines adherent',
  'Regular security assessments and updates',
  'Transparent data handling practices',
  'User consent-based data processing',
  'Right to data access and deletion'
];

const SecurityPage = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background */}
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
        
        {/* Floating security icons watermark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Shield, Lock, Key, Eye].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.015, 0.03, 0.015],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <Icon className="w-32 h-32 text-[#C79B4C]" strokeWidth={0.4} />
            </motion.div>
          ))}
        </div>
        
        {/* Gold lighting */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
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
              <span className="text-sm text-[#C8D0DC] font-medium tracking-wide">Bank-Grade Security</span>
            </motion.div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Security is Our{' '}
              <span className="gold-text-shine">Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C8D0DC]/60 leading-relaxed max-w-2xl mx-auto">
              WynOra Vault is built with industry-standard security measures to ensure 
              your sensitive data remains protected at all times.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#22304F] to-transparent" />
      </section>

      {/* Security Features */}
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
              <Lock className="h-4 w-4 text-[#C79B4C]" />
              <span className="text-sm text-[#C8D0DC] font-medium uppercase tracking-wider">Protection Layers</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Multi-Layer{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Security</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* Card glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/0 via-gold/0 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-gold/10 group-hover:via-gold/5 group-hover:to-gold/10 blur-xl transition-all duration-500" />
                
                <div className="relative rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 border border-[#C79B4C]/15 group-hover:border-[#C79B4C]/30 transition-all duration-300">
                  {/* Top accent */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center mb-6 border border-[#C79B4C]/20 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-shadow">
                    <feature.icon className="h-7 w-7 text-[#C79B4C]" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[#D4AC62] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#C8D0DC]/50 leading-relaxed group-hover:text-[#C8D0DC]/70 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#22304F] via-[#1A2540] to-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C79B4C]/6 blur-[150px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C79B4C]/10 border border-[#C79B4C]/20 mb-6">
                <FileCheck className="h-3 w-3 text-[#C79B4C]" />
                <span className="text-xs font-semibold tracking-wider text-[#C79B4C] uppercase">Compliance</span>
              </div>
              
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Legal{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Compliance</span>
              </h2>
              <p className="text-[#C8D0DC]/60 text-lg mb-10 leading-relaxed">
                WynOra Vault operates in full compliance with Indian laws and regulations 
                regarding data protection and information security.
              </p>
              <ul className="space-y-4">
                {complianceItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center group-hover:bg-emerald-500/18 transition-colors">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <span className="text-[#C8D0DC]/70 group-hover:text-[#C8D0DC] transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/15 via-transparent to-emerald-500/10 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative rounded-3xl bg-[#1A2540]/70 backdrop-blur-xl p-10 border border-[#C79B4C]/20">
                {/* Top accent */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
                
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mx-auto mb-8 border border-emerald-500/25"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="h-12 w-12 text-emerald-400" />
                  </motion.div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">
                    Data Protection Promise
                  </h3>
                  <p className="text-[#C8D0DC]/60 leading-relaxed">
                    We are committed to protecting your data and maintaining the highest 
                    standards of security and privacy. Your trust is our most valuable asset.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#22304F]" />
        
        {/* Gold texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url(${GOLD_TEXTURE_URL})`,
            backgroundSize: 'cover',
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 border-l-4 border-[#C79B4C] border border-[#C79B4C]/15"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center border border-[#C79B4C]/20 flex-shrink-0">
                <Shield className="h-6 w-6 text-[#C79B4C]" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  Important Security Notice
                </h3>
                <p className="text-[#C8D0DC]/60 leading-relaxed">
                  While we implement robust security measures, we encourage all users to practice 
                  good security hygiene. Use strong, unique passwords, enable all available 
                  security features, and never share your login credentials with anyone. 
                  WynOra Vault will never ask for your password via email or phone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SecurityPage;