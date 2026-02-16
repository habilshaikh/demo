import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

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
    <div className="min-h-screen bg-[#0B1C2D] flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <img src={LOGO_URL} alt="WynOra Vault" className="h-14 w-auto" />
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 mb-8">
            Sign in to access your secure vault
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  data-testid="login-email-input"
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-accent hover:text-accent/80"
                  data-testid="forgot-password-link"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  data-testid="login-password-input"
                  className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-medium btn-glow"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-accent hover:text-accent/80 font-medium"
              data-testid="signup-link"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#1E3A8A] to-[#0B1C2D] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-lg"
        >
          <div className="glass rounded-3xl p-12 card-glow">
            <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Lock className="h-12 w-12 text-accent" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">
              Your Secure Digital Vault
            </h2>
            <p className="text-slate-300 leading-relaxed">
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
