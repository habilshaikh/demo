import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050810] border-t border-white/5 overflow-hidden">
      {/* Subtle cosmic glow */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] rounded-full bg-blue-600/5 blur-3xl" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[150px] rounded-full bg-indigo-600/5 blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="WynOra Vault" className="h-12 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your secure digital vault for storing personal financial and legal information with industry-standard protection.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Secure Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Quick Links</h4>
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
                    className="text-slate-500 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {[
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-500 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-slate-500 text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <a href="mailto:support@wynora.com" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                  support@wynora.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-slate-500 text-sm">[Your Address Here]</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {currentYear} WynOra Vault. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm">
            Governed under the laws of the Republic of India
          </p>
        </div>
      </div>
    </footer>
  );
};
