import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Lock, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

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
    <div className="min-h-screen bg-[#0B1C2D] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="inline-block mb-8">
          <img src={LOGO_URL} alt="WynOra Vault" className="h-14 w-auto" />
        </Link>

        {step === 1 && (
          <>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-slate-400 mb-8">
              Enter your email address and we'll send you a reset code
            </p>

            <form onSubmit={handleRequestCode} className="space-y-6">
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
                    data-testid="forgot-email-input"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="forgot-submit-btn"
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-medium btn-glow"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <p className="text-slate-400 mb-8">
              Enter the reset code and your new password
            </p>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="resetCode" className="text-slate-300">Reset Code</Label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <Input
                    id="resetCode"
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                    required
                    placeholder="XXXXXXXX"
                    data-testid="reset-code-input"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12 uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    data-testid="new-password-input"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    data-testid="confirm-new-password-input"
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-accent h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                data-testid="reset-password-btn"
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl h-12 font-medium btn-glow"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-4">
              Password Reset!
            </h1>
            <p className="text-slate-400 mb-8">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <Link to="/login">
              <Button
                data-testid="go-to-login-btn"
                className="bg-accent hover:bg-accent/90 text-white rounded-xl px-8 py-6 font-medium btn-glow"
              >
                Go to Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {step !== 3 && (
          <p className="mt-8 text-center text-slate-400">
            Remember your password?{' '}
            <Link to="/login" className="text-accent hover:text-accent/80 font-medium">
              Sign in
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
