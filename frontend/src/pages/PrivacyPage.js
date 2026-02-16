import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

const PrivacyPage = () => {
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
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                WynOra Vault ("we", "us", or "our") is committed to protecting your privacy. This Privacy 
                Policy explains how we collect, use, disclose, and safeguard your information when you use 
                our digital vault platform. Please read this policy carefully to understand our practices 
                regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect the following types of information:</p>
              
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">2.1 Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name and email address</li>
                <li>Account credentials (password stored in encrypted form)</li>
                <li>Contact information you provide</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-4 mb-2">2.2 Documents and Files</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Documents you upload to your vault</li>
                <li>Document metadata (file names, sizes, types, upload dates)</li>
                <li>Organizational categories you create</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-4 mb-2">2.3 Usage Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our services</li>
                <li>Authenticate and secure your account</li>
                <li>Process and store your documents</li>
                <li>Improve and personalize user experience</li>
                <li>Communicate with you about service updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Ensure compliance with legal obligations</li>
                <li>Detect and prevent fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
              <p className="mb-4">
                Your data is stored securely using industry-standard practices:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All data is encrypted during transmission using HTTPS/TLS</li>
                <li>Data at rest is stored in secure cloud infrastructure</li>
                <li>Access controls restrict data access to authorized personnel only</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure data centers with physical security measures</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
              <p className="mb-4">
                We use the following third-party services to operate our platform:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cloud Infrastructure:</strong> For secure data storage and processing</li>
                <li><strong>Analytics Services:</strong> To improve our services (aggregated, non-personal data)</li>
              </ul>
              <p className="mt-4">
                These third-party providers are bound by their own privacy policies and are contractually 
                obligated to protect your data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Session management and authentication</li>
                <li>Remembering user preferences</li>
                <li>Security purposes</li>
                <li>Analytics (anonymized)</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences. Note that disabling 
                certain cookies may affect the functionality of our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p className="mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at support@wynora.com.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
              <p>
                We retain your personal data for as long as your account is active or as needed to provide 
                services. Upon account deletion request, we will delete your data within 30 days, except 
                where we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If we become aware that we have collected 
                data from a child without parental consent, we will delete such information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "Last updated" date. 
                We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">11. Grievance Officer</h2>
              <p>
                In accordance with the Information Technology Act, 2000 and rules made thereunder, 
                the name and contact details of the Grievance Officer are:
              </p>
              <div className="mt-4 p-4 bg-white/5 rounded-xl">
                <p><strong>Grievance Officer:</strong> WynOra Vault Support</p>
                <p><strong>Email:</strong> support@wynora.com</p>
                <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
                <p><strong>Address:</strong> [Your Address Here]</p>
              </div>
              <p className="mt-4">
                The Grievance Officer will address any grievances within 30 days of receipt.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPage;
