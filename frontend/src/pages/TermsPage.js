import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

const TermsPage = () => {
  const lastUpdated = "January 2026";

  return (
    <PublicLayout>
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-slate-400">Last updated: {lastUpdated}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12 space-y-8 text-slate-300 leading-relaxed"
          >
            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using WynOra Vault ("the Platform"), you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions. If you do not agree to 
                these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">2. Services Description</h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">4. Information Technology Act, 2000 Compliance</h2>
              <p>
                WynOra Vault operates in compliance with the Information Technology Act, 2000 of India, 
                including amendments and rules thereunder. We implement reasonable security practices 
                and procedures as required under Section 43A of the IT Act to protect sensitive personal 
                data or information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">5. Data Protection</h2>
              <p>
                We are committed to protecting your data in accordance with applicable data protection 
                principles. Your use of our services is also governed by our Privacy Policy, which 
                describes how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">7. No Financial Advisory</h2>
              <p>
                WynOra Vault is a document storage platform only. We do not provide financial, legal, 
                tax, or investment advice. The storage of documents on our platform does not constitute 
                any form of professional advice. Users should consult appropriate professionals for 
                advice related to their specific situations.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the platform, including but not limited to 
                text, graphics, logos, and software, are the exclusive property of WynOra Vault and are 
                protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violation of 
                these terms or for any other reason at our sole discretion. Upon termination, your right 
                to use the platform will immediately cease. You may also terminate your account at any 
                time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">10. Modifications</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be 
                effective immediately upon posting. Your continued use of the platform after any changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">11. Governing Law and Jurisdiction</h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws 
                of the Republic of India. Any disputes arising out of or relating to these terms shall be 
                subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">12. Contact Information</h2>
              <p>
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl">
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
