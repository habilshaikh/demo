import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, fullName);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.detail || 'Signup failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1C2D] flex">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#1E3A8A] to-[#0B1C2D] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="glass rounded-3xl p-12 card-glow">
            <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Shield className="h-12 w-12 text-accent" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-4">
              Start Securing Your Future
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Create your personal vault and start organizing your important 
              documents with enterprise-grade security.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
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
            Create Account
          </h1>
          <p className="text-slate-400 mb-8">
            Start your secure vault journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="John Doe"
                  data-testid="signup-name-input"
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
              </div>
            </div>

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
                  data-testid="signup-email-input"
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  data-testid="signup-password-input"
                  className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  data-testid="signup-confirm-password-input"
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={setAgreeTerms}
                data-testid="signup-terms-checkbox"
                className="mt-1 border-white/20 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-accent hover:text-accent/80">Terms & Conditions</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-accent hover:text-accent/80">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              data-testid="signup-submit-btn"
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-medium btn-glow"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-accent hover:text-accent/80 font-medium"
              data-testid="login-link"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
