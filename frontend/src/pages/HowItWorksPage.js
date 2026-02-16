import { motion } from 'framer-motion';
import { UserPlus, FolderPlus, Shield, FileSearch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PublicLayout } from '../components/layouts/PublicLayout';

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
      <section className="pt-20 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              How WynOra Vault Works
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Getting started with WynOra Vault is simple. Follow these four easy steps 
              to secure your important documents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 glass rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-accent/30">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="h-8 w-8 text-accent/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Create your secure vault in less than 2 minutes.
            </p>
            <Link to="/signup">
              <Button 
                size="lg"
                data-testid="hiw-getstarted-btn"
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-6 text-lg font-semibold btn-glow"
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

export default HowItWorksPage;
