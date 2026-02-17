import { motion } from 'framer-motion';
import { KeyRound, Shield, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TokenStatus = () => {
  const { user } = useAuth();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'expired':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" data-testid="token-status-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Token Status</h1>
        <p className="text-slate-400">View your vault verification token</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">Verification Token</h2>
            <p className="text-slate-400">Your unique vault identifier</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Token Number */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Token Number</p>
            {user?.token_number ? (
              <p className="font-mono text-2xl font-bold text-white tracking-wider" data-testid="token-number">
                {user.token_number}
              </p>
            ) : (
              <p className="text-slate-500 italic" data-testid="no-token">
                No token assigned yet
              </p>
            )}
          </div>

          {/* Token Status */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 mb-2">Status</p>
            {user?.token_status ? (
              <div className="flex items-center gap-3" data-testid="token-status">
                {getStatusIcon(user.token_status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.token_status)}`}>
                  {user.token_status.charAt(0).toUpperCase() + user.token_status.slice(1)}
                </span>
              </div>
            ) : (
              <p className="text-slate-500 italic" data-testid="no-status">
                Not available
              </p>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-medium mb-1">What is a Verification Token?</p>
              <p className="text-sm text-slate-400">
                Your verification token is a unique identifier assigned by our administrators. 
                It helps verify your identity and grants access to premium vault features. 
                If you don't have a token yet, please contact support.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="font-heading text-lg font-semibold text-white mb-4">Status Legend</h3>
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium text-white">Active</p>
              <p className="text-sm text-slate-400">Your token is verified and active</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="font-medium text-white">Pending</p>
              <p className="text-sm text-slate-400">Your token is awaiting verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="font-medium text-white">Expired</p>
              <p className="text-sm text-slate-400">Your token has expired and needs renewal</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TokenStatus;