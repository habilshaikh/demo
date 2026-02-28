import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Smartphone, Users } from 'lucide-react';
import { PublicLayout } from '../components/layouts/PublicLayout';

// Asset URL
const GOLD_TEXTURE_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/pks0eavi_Gold.jpeg";

const PrivacyPage = () => {
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
              <Shield className="h-10 w-10 text-[#C79B4C]" />
            </motion.div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Security &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #D4AC62 0%, #C79B4C 50%, #A67E3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Privacy Policy</span>
            </h1>
            <p className="text-[#C8D0DC]/50">Last updated: {lastUpdated}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-[#1A2540]/60 backdrop-blur-xl p-8 md:p-12 space-y-8 text-[#C8D0DC]/70 leading-relaxed border border-[#C79B4C]/15"
          >

            {/* ── SECURITY SECTION ── */}
            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                Uncompromising Security. Zero Knowledge. Total Control.
              </h2>
              <p className="mb-6">
                We don't just protect your data; we protect your privacy. WynOraVault uses military-grade 
                architecture to ensure you—and only you—hold the keys to your legacy. When it comes to your 
                financial accounts, property deeds, and family's future, "good enough" security isn't enough. 
                We treat your information as yours alone.{' '}
                <strong className="text-white">We cannot see it, we cannot share it, and hackers cannot steal it.</strong>
              </p>

              <h3 className="text-lg font-semibold text-[#D4AC62] mt-6 mb-4">Our Core Security Pillars</h3>

              <div className="space-y-5">
                {/* Pillar 1 */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#C79B4C]/8 to-transparent border border-[#C79B4C]/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C79B4C]/15 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-5 h-5 text-[#C79B4C]" />
                    </div>
                    <h4 className="text-white font-semibold">🛡️ Zero-Knowledge Architecture</h4>
                  </div>
                  <p className="mb-2">
                    <span className="text-[#D4AC62] font-semibold">What it means: </span>
                    We operate on a strict "zero-knowledge" basis. Your master password is never stored on our servers.
                  </p>
                  <p>
                    <span className="text-[#D4AC62] font-semibold">Why it matters: </span>
                    Because we don't have your key, we literally cannot decrypt or read your data. If we can't see it, 
                    we can't be forced to hand it over, and bad actors can't access it even if they breach our outer walls.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#C79B4C]/8 to-transparent border border-[#C79B4C]/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C79B4C]/15 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-5 h-5 text-[#C79B4C]" />
                    </div>
                    <h4 className="text-white font-semibold">🔒 End-to-End Encryption (E2EE)</h4>
                  </div>
                  <p className="mb-2">
                    <span className="text-[#D4AC62] font-semibold">What it means: </span>
                    Your data is encrypted locally on your device before it is ever sent to our servers. It remains 
                    an unreadable string of code while in transit and while resting in your vault.
                  </p>
                  <p>
                    <span className="text-[#D4AC62] font-semibold">Why it matters: </span>
                    It guarantees that your information is completely shielded from interception at every step of the journey.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#C79B4C]/8 to-transparent border border-[#C79B4C]/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C79B4C]/15 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-[#C79B4C]" />
                    </div>
                    <h4 className="text-white font-semibold">📱 Multi-Factor Authentication (MFA) & Biometrics</h4>
                  </div>
                  <p className="mb-2">
                    <span className="text-[#D4AC62] font-semibold">What it means: </span>
                    Accessing your vault requires more than just a password. We utilize advanced MFA, including 
                    FaceID, fingerprint scanning, and one-time authenticator codes.
                  </p>
                  <p>
                    <span className="text-[#D4AC62] font-semibold">Why it matters: </span>
                    Even if someone somehow learned your password, they still could not enter your vault without 
                    your physical device or biometric signature.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#C79B4C]/8 to-transparent border border-[#C79B4C]/15">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C79B4C]/15 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[#C79B4C]" />
                    </div>
                    <h4 className="text-white font-semibold">👥 Rigid Trustee Verification</h4>
                  </div>
                  <p className="mb-2">
                    <span className="text-[#D4AC62] font-semibold">What it means: </span>
                    Your nominated Trustees don't just get a simple email link. We employ multi-step identity 
                    verification protocols before granting them the access you've authorized.
                  </p>
                  <p>
                    <span className="text-[#D4AC62] font-semibold">Why it matters: </span>
                    It prevents impersonation and ensures your most sensitive information is only handed off 
                    to the exact individuals you designated.
                  </p>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#C79B4C]/15" />

            {/* ── PRIVACY POLICY SECTIONS (unchanged) ── */}
            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                1. Introduction
              </h2>
              <p>
                WynOra Vault ("we", "us", or "our") is committed to protecting your privacy. This Privacy 
                Policy explains how we collect, use, disclose, and safeguard your information when you use 
                our digital vault platform. Please read this policy carefully to understand our practices 
                regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                2. Information We Collect
              </h2>
              <p className="mb-4">We collect the following types of information:</p>
              
              <h3 className="text-lg font-semibold text-[#D4AC62] mt-4 mb-2">2.1 Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name and email address</li>
                <li>Account credentials (password stored in encrypted form)</li>
                <li>Contact information you provide</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#D4AC62] mt-4 mb-2">2.2 Documents and Files</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Documents you upload to your vault</li>
                <li>Document metadata (file names, sizes, types, upload dates)</li>
                <li>Organizational categories you create</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#D4AC62] mt-4 mb-2">2.3 Usage Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                3. How We Use Your Information
              </h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                4. Data Storage and Security
              </h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                5. Third-Party Services
              </h2>
              <p className="mb-4">
                We use the following third-party services to operate our platform:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Cloud Infrastructure:</strong> For secure data storage and processing</li>
                <li><strong className="text-white">Analytics Services:</strong> To improve our services (aggregated, non-personal data)</li>
              </ul>
              <p className="mt-4">
                These third-party providers are bound by their own privacy policies and are contractually 
                obligated to protect your data.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                6. Cookies and Tracking
              </h2>
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
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                7. Your Rights
              </h2>
              <p className="mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
                <li><strong className="text-white">Portability:</strong> Request your data in a portable format</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at support@wynora.com.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                8. Data Retention
              </h2>
              <p>
                We retain your personal data for as long as your account is active or as needed to provide 
                services. Upon account deletion request, we will delete your data within 30 days, except 
                where we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                9. Children's Privacy
              </h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly 
                collect personal information from children. If we become aware that we have collected 
                data from a child without parental consent, we will delete such information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "Last updated" date. 
                We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                11. Grievance Officer
              </h2>
              <p>
                In accordance with the Information Technology Act, 2000 and rules made thereunder, 
                the name and contact details of the Grievance Officer are:
              </p>
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-gold/10 to-transparent border border-[#C79B4C]/18">
                <p><strong className="text-white">Grievance Officer:</strong> WynOra Vault Support</p>
                <p><strong className="text-white">Email:</strong> support@wynora.com</p>
                <p><strong className="text-white">Phone:</strong> +91 XXXXX XXXXX</p>
                <p><strong className="text-white">Address:</strong> [Your Address Here]</p>
              </div>
              <p className="mt-4">
                The Grievance Officer will address any grievances within 30 days of receipt.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gradient-to-r from-gold to-transparent" />
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPage;