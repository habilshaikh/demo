import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const LOGO_URL = "/LOGO.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1A2540] border-t border-[#D4AF37]/12 overflow-hidden">
      {/* Subtle gold glow effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] rounded-full bg-[#D4AF37]/4 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[150px] rounded-full bg-[#D4AF37]/3 blur-3xl pointer-events-none" />
      
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
       <Link to="/" className="flex items-center gap-3 mb-6 group relative">
  {/* Gold hover halo */}
  <div
    className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)',
    }}
  />

  <div className="relative">
    {/* White rounded background same as Navbar */}
    <div
      className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-md"
      style={{
        boxShadow:
          '0 0 20px rgba(212,175,55,0.3), 0 4px 16px rgba(0,0,0,0.3)',
      }}
    />

    <img
      src={LOGO_URL}
      alt="WynOra Vault"
      className="relative z-10 h-14 md:h-16 w-auto object-contain px-3 py-2"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
      }}
    />
  </div>
</Link>
            <p className="text-[#C8D0DC]/50 text-sm leading-relaxed mb-6">
              Your secure digital vault for storing personal financial and legal information with industry-standard protection.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <Shield className="h-3 w-3 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">Secure Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/security', label: 'Security' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#C8D0DC]/50 hover:text-[#D4AF37] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#C8D0DC]/50 hover:text-[#D4AF37] text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/18 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="text-[#C8D0DC]/50 text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/18 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <a href="mailto:support@wynora.com" className="text-[#C8D0DC]/50 hover:text-[#D4AF37] text-sm transition-colors">
                  support@wynora.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/18 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="text-[#C8D0DC]/50 text-sm">[Your Address Here]</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#C8D0DC]/40 text-sm">
            &copy; {currentYear} WynOra Vault. All rights reserved.
          </p>
          <p className="text-[#C8D0DC]/40 text-sm">
            Governed under the laws of the Republic of India
          </p>
        </div>
      </div>
    </footer>
  );
};