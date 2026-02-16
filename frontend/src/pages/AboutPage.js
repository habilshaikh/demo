import { motion } from 'framer-motion';
import { Shield, Target, Eye, Users, Award, Heart } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

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

const AboutPage = () => {
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
              <Target className="h-3 w-3" />
              <span>Our Mission</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              About WynOra Vault
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              WynOra Vault is a secure digital vault platform designed to help individuals 
              store, organize, and protect their personal financial and legal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6">
                  <p className="text-4xl font-bold text-accent mb-2">10K+</p>
                  <p className="text-sm text-slate-400">Active Users</p>
                </div>
                <div className="text-center p-6">
                  <p className="text-4xl font-bold text-gold mb-2">50K+</p>
                  <p className="text-sm text-slate-400">Documents Secured</p>
                </div>
                <div className="text-center p-6">
                  <p className="text-4xl font-bold text-green-500 mb-2">99.9%</p>
                  <p className="text-sm text-slate-400">Uptime</p>
                </div>
                <div className="text-center p-6">
                  <p className="text-4xl font-bold text-purple-500 mb-2">24/7</p>
                  <p className="text-sm text-slate-400">Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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
                className="glass rounded-2xl p-8 text-center glass-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Built by Experts
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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
