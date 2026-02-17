import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URL
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

const TermsPage = () => {
  const lastUpdated = "January 2026";

  return (
    <PublicLayout>
      <section className="pt-32 pb-20 relative">
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
          background: 'radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/8 flex items-center justify-center mx-auto mb-8 border border-[#C79B4C]/30"
              animate={{ 
                y: [0, -5, 0],
                boxShadow: ['0 0 30px rgba(212, 175, 55, 0.2)', '0 0 50px rgba(212, 175, 55, 0.35)', '0 0 30px rgba(212, 175, 55, 0.2)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="h-10 w-10 text-[#C79B4C]" />
            </motion.div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Terms &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Conditions</span>
            </h1>
            <p className="text-[#C8D0DC]/50">Last updated: {lastUpdated}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 md:p-12 space-y-8 text-[#C8D0DC]/70 leading-relaxed border border-[#C79B4C]/15"
          >
            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using WynOra Vault ("the Platform"), you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions. If you do not agree to 
                these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                2. Services Description
              </h2>
              <p className="mb-4">
                WynOra Vault provides a secure digital vault platform for storing personal financial and 
                legal information. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Secure document storage and organization</li>
                <li>Categorized storage for various document types</li>
                <li>User authentication and access control</li>
                <li>Cloud-based backup and accessibility</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                3. User Responsibilities
              </h2>
              <p className="mb-4">As a user of WynOra Vault, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Not upload malicious files or content that violates any laws</li>
                <li>Not attempt to gain unauthorized access to other users' data</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                4. Information Technology Act, 2000 Compliance
              </h2>
              <p>
                WynOra Vault operates in compliance with the Information Technology Act, 2000 of India, 
                including amendments and rules thereunder. We implement reasonable security practices 
                and procedures as required under Section 43A of the IT Act to protect sensitive personal 
                data or information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                5. Data Protection
              </h2>
              <p>
                We are committed to protecting your data in accordance with applicable data protection 
                principles. Your use of our services is also governed by our Privacy Policy, which 
                describes how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                6. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>WynOra Vault shall not be liable for any indirect, incidental, special, consequential, 
                    or punitive damages arising from your use of the platform</li>
                <li>Our total liability shall not exceed the amount paid by you for the services in the 
                    twelve (12) months preceding the claim</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We are not responsible for any loss of data due to circumstances beyond our reasonable control</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                7. No Financial Advisory
              </h2>
              <p>
                WynOra Vault is a document storage platform only. We do not provide financial, legal, 
                tax, or investment advice. The storage of documents on our platform does not constitute 
                any form of professional advice. Users should consult appropriate professionals for 
                advice related to their specific situations.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                8. Intellectual Property
              </h2>
              <p>
                All content, features, and functionality of the platform, including but not limited to 
                text, graphics, logos, and software, are the exclusive property of WynOra Vault and are 
                protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                9. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violation of 
                these terms or for any other reason at our sole discretion. Upon termination, your right 
                to use the platform will immediately cease. You may also terminate your account at any 
                time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                10. Modifications
              </h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be 
                effective immediately upon posting. Your continued use of the platform after any changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                11. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws 
                of the Republic of India. Any disputes arising out of or relating to these terms shall be 
                subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                12. Contact Information
              </h2>
              <p>
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gold/10 to-transparent border border-[#C79B4C]/18">
                <p>Email: support@wynora.com</p>
                <p>Phone: +91 XXXXX XXXXX</p>
              </div>
            </section>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TermsPage;