import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

// New logo URL - PNG with transparent background
const LOGO_URL = "/LOGO.png";

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
        ? 'bg-[#1A2540]/98 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl shadow-[#0D1526]/50' 
        : 'bg-gradient-to-b from-[#1A2540]/80 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 group relative" data-testid="navbar-logo">
            {/* Gold halo behind logo */}
            <div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)' }}
            />

            <motion.div
              className="relative"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* White rounded background — logo ka navy text hamesha visible rahega */}
              <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-md" 
                style={{ boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 4px 16px rgba(0,0,0,0.3)' }}
              />
              <motion.img
                src={LOGO_URL}
                alt="WynOra Vault"
                className="relative z-10 h-20 w-auto object-contain px-3 py-1"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
                }}
              />
            </motion.div>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative text-[15px] font-semibold tracking-wide transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'text-[#E3B82A]'
                    : 'text-white/85 hover:text-[#E3B82A]'
                }`}
                style={{
                  textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                }}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #B8941F, #E3B82A, #B8941F)',
                      boxShadow: '0 0 12px rgba(212,175,55,0.7)',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── DESKTOP AUTH BUTTONS ── */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button
                  data-testid="nav-dashboard-btn"
                  className="rounded-full px-7 py-2.5 font-bold text-[15px]"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                    color: '#1A2540',
                    boxShadow: '0 0 30px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
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
                    className="font-semibold text-[15px] rounded-full px-6 py-2.5 border border-white/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all duration-300"
                    style={{
                      color: '#ffffff',
                      textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    data-testid="nav-getstarted-btn"
                    className="rounded-full px-7 py-2.5 font-bold text-[15px]"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                      color: '#1A2540',
                      boxShadow: '0 0 30px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    Get Started
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            className="lg:hidden p-2.5 rounded-xl border border-white/15 hover:border-[#D4AF37]/40 text-white hover:text-[#E3B82A] transition-all duration-300 hover:bg-[#D4AF37]/8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#D4AF37]/20"
            style={{ background: 'rgba(18, 27, 48, 0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="px-5 py-7 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'text-[#E3B82A] bg-[#D4AF37]/10 border border-[#D4AF37]/25'
                      : 'text-white/80 hover:text-[#E3B82A] hover:bg-[#D4AF37]/6'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
                  )}
                </Link>
              ))}

              <div className="pt-5 border-t border-[#D4AF37]/15 space-y-3">
                {user ? (
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      className="w-full rounded-full font-bold text-base py-3"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                        color: '#1A2540',
                        boxShadow: '0 0 25px rgba(212,175,55,0.35)',
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full rounded-full py-3 font-semibold text-base border-white/25 hover:border-[#D4AF37]/50 hover:text-[#E3B82A] hover:bg-[#D4AF37]/8"
                        style={{ color: '#ffffff' }}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        className="w-full rounded-full mt-2 font-bold text-base py-3"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #E3B82A 30%, #D4AF37 70%, #B8941F 100%)',
                          color: '#1A2540',
                          boxShadow: '0 0 25px rgba(212,175,55,0.35)',
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