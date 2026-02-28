import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "/LOGO.png";

// Gold particle effect
const GoldParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success('Login successful!');
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vault-black flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 luxury-bg-subtle" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
         // ── LOGO ──
<Link to="/" className="flex items-center gap-3 group relative mb-8" data-testid="navbar-logo">
  {/* Gold halo behind logo */}
  <div
    className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)',
    }}
  />

  <motion.div
    className="relative"
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {/* Same SignupPage style: White rounded background + shadow */}
    <div
      className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-md"
      style={{
        boxShadow:
          '0 0 20px rgba(212,175,55,0.3), 0 4px 16px rgba(0,0,0,0.3)',
      }}
    />

    <motion.img
      src={LOGO_URL}
      alt="WynOra Vault"
      className="relative z-10 h-14 md:h-16 w-auto object-contain px-3 py-2"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))',
      }}
    />
  </motion.div>
</Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-silver/60 mb-8">
            Sign in to access your secure vault
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  data-testid="login-email-input"
                  className="pl-12 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gold hover:text-gold-light transition-colors"
                  data-testid="forgot-password-link"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  data-testid="login-password-input"
                  className="pl-12 pr-12 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/50 hover:text-gold transition-colors"
                  data-testid="toggle-password-btn"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              data-testid="login-submit-btn"
              variant="luxury"
              className="w-full h-12 rounded-xl"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-vault-black/30 border-t-vault-black rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-silver/50">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-gold hover:text-gold-light font-medium transition-colors"
              data-testid="signup-link"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex lg:flex-1 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 luxury-bg" />
        <div className="absolute inset-0 marble-texture" />
        <GoldParticles />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-lg relative z-10"
        >
          <div className="luxury-card rounded-3xl p-12 gold-border-glow">
            <motion.div 
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-8 border border-gold/30 shadow-gold-glow"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lock className="h-12 w-12 text-gold" />
            </motion.div>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">
              Your Secure Digital Vault
            </h2>
            <p className="text-silver/60 leading-relaxed">
              Access your important documents, financial records, and legal papers 
              securely from anywhere, anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;