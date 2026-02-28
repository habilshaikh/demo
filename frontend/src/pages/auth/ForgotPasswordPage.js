import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Lock, KeyRound, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "/LOGO.png";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Reset Code, 3: New Password
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword, resetPassword } = useAuth();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await forgotPassword(email);
      toast.success('Reset code sent to your email');
      // For MVP, show the reset code (in production, this would be sent via email)
      if (result.reset_code) {
        toast.info(`Your reset code: ${result.reset_code}`, { duration: 10000 });
      }
      setStep(2);
    } catch (error) {
      toast.error('Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, resetCode, newPassword);
      toast.success('Password reset successfully!');
      setStep(3);
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to reset password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vault-black flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 luxury-bg" />
      <div className="absolute inset-0 marble-texture" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
     \
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

        {step === 1 && (
          <>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-silver/60 mb-8">
              Enter your email address and we'll send you a reset code
            </p>

            <form onSubmit={handleRequestCode} className="space-y-6">
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
                    data-testid="forgot-email-input"
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="forgot-submit-btn"
                variant="luxury"
                className="w-full h-12 rounded-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-vault-black/30 border-t-vault-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Reset Code
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-silver/60 mb-8">
              Enter the reset code and your new password
            </p>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="resetCode">Reset Code</Label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                  <Input
                    id="resetCode"
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                    required
                    placeholder="XXXXXXXX"
                    data-testid="reset-code-input"
                    className="pl-12 h-12 uppercase tracking-widest"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    data-testid="new-password-input"
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    data-testid="confirm-new-password-input"
                    className="pl-12 h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="reset-password-btn"
                variant="luxury"
                className="w-full h-12 rounded-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-vault-black/30 border-t-vault-black rounded-full animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Reset Password
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-2 text-silver/60 hover:text-gold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <motion.div 
              className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </motion.div>
            <h1 className="font-heading text-3xl font-bold text-white mb-4">
              Password Reset!
            </h1>
            <p className="text-silver/60 mb-8">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <Link to="/login">
              <Button
                data-testid="go-to-login-btn"
                variant="luxury"
                size="lg"
                className="rounded-xl"
              >
                Go to Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {step !== 3 && (
          <p className="mt-8 text-center text-silver/50">
            Remember your password?{' '}
            <Link to="/login" className="text-gold hover:text-gold-light font-medium transition-colors">
              Sign in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;