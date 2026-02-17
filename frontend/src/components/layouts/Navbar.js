import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

// New logo URL - PNG with transparent background
const LOGO_URL = "https://customer-assets.emergentagent.com/job_152e1fe7-ab24-4409-bf6e-37e5707903c5/artifacts/233b0b4x_Wynora-removebg-preview.png";

// Removed 'Contact' from navigation as per user request
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/security', label: 'Security' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#22304F]/95 backdrop-blur-xl border-b border-[#D4AF37]/12 shadow-lg shadow-[#1A2540]/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Premium Styling */}
          <Link to="/" className="flex items-center gap-3 group relative" data-testid="navbar-logo">
            {/* Subtle gold glow behind logo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
            
            {/* Logo container */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.img 
                src={LOGO_URL} 
                alt="WynOra Vault" 
                className="h-16 w-auto object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.3))',
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'text-[#D4AF37]'
                    : 'text-[#C8D0DC]/70 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8941F] via-[#D4AF37] to-[#E3B82A] rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button
                  data-testid="nav-dashboard-btn"
                  className="rounded-full px-6 font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                    color: '#1A2540',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  Dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    data-testid="nav-signin-btn"
                    className="text-[#C8D0DC] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    data-testid="nav-getstarted-btn"
                    className="rounded-full px-6 font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                      color: '#1A2540',
                      boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#C8D0DC] hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-[#D4AF37]/8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#22304F]/98 backdrop-blur-xl border-t border-[#D4AF37]/12"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-[#D4AF37]'
                      : 'text-[#C8D0DC]/70 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#D4AF37]/12 space-y-3">
                {user ? (
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="w-full rounded-full font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                        color: '#1A2540',
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-[#D4AF37]/25 text-[#C8D0DC] hover:bg-[#D4AF37]/8 hover:text-[#D4AF37]">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        className="w-full rounded-full mt-2 font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                          color: '#1A2540',
                        }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};