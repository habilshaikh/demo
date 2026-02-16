import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/security', label: 'Security' },
  { href: '/contact', label: 'Contact' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#070B14]/90 backdrop-blur-xl border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" data-testid="navbar-logo">
            <motion.img 
              src={LOGO_URL} 
              alt="WynOra Vault" 
              className="h-12 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
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
                  className="cosmic-btn-primary rounded-full px-6 py-2 font-medium"
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
                    className="text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    data-testid="nav-getstarted-btn"
                    className="cosmic-btn-primary rounded-full px-6 py-2 font-medium"
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
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
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
            className="lg:hidden bg-[#070B14]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-base font-medium ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {user ? (
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full cosmic-btn-primary rounded-full">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full cosmic-btn-primary rounded-full mt-2">
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
