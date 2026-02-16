import { motion } from 'framer-motion';
import { Shield, Lock, Key, Server, Eye, FileCheck, CheckCircle2 } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

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
      <section className="pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="verified-badge inline-flex mb-6">
              <Shield className="h-3 w-3" />
              <span>Security First</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Your Security is Our Priority
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              WynOra Vault is built with industry-standard security measures to ensure 
              your sensitive data remains protected at all times.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 glass-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Legal Compliance
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
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
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 card-glow"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  Data Protection Promise
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  We are committed to protecting your data and maintaining the highest 
                  standards of security and privacy. Your trust is our most valuable asset.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border-l-4 border-accent"
          >
            <h3 className="font-heading text-xl font-semibold text-white mb-4">
              Important Security Notice
            </h3>
            <p className="text-slate-400 leading-relaxed">
              While we implement robust security measures, we encourage all users to practice 
              good security hygiene. Use strong, unique passwords, enable all available 
              security features, and never share your login credentials with anyone. 
              WynOra Vault will never ask for your password via email or phone.
            </p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SecurityPage;
