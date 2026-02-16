import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Lock, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../lib/api';
import { toast } from 'sonner';

const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await userApi.updateProfile(profileData);
      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      await userApi.changePassword(passwordData.current_password, passwordData.new_password);
      toast.success('Password changed successfully!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to change password';
      toast.error(message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" data-testid="admin-settings">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Settings</h1>
        <p className="text-slate-400">Manage your admin account</p>
      </motion.div>

      {/* Profile Information */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleProfileSubmit}
        className="glass rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
            <User className="h-8 w-8 text-gold" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">Admin Profile</h2>
            <p className="text-slate-400">Update your admin details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-slate-300">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={profileData.full_name}
              onChange={handleProfileChange}
              data-testid="admin-name-input"
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              data-testid="admin-email-input"
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="admin-update-profile-btn"
          className="bg-gold hover:bg-gold/90 text-black rounded-xl h-12"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          )}
        </Button>
      </motion.form>

      {/* Change Password */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handlePasswordSubmit}
        className="glass rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-gold" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">Change Password</h2>
            <p className="text-slate-400">Update your admin password</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password" className="text-slate-300">Current Password</Label>
            <div className="relative">
              <Input
                id="current_password"
                name="current_password"
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                data-testid="admin-current-password"
                className="pr-12 bg-white/5 border-white/10 text-white h-12"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password" className="text-slate-300">New Password</Label>
            <Input
              id="new_password"
              name="new_password"
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.new_password}
              onChange={handlePasswordChange}
              data-testid="admin-new-password"
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password" className="text-slate-300">Confirm New Password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.confirm_password}
              onChange={handlePasswordChange}
              data-testid="admin-confirm-password"
              className="bg-white/5 border-white/10 text-white h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={passwordLoading}
          data-testid="admin-change-password-btn"
          className="bg-gold hover:bg-gold/90 text-black rounded-xl h-12"
        >
          {passwordLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Changing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Change Password
            </span>
          )}
        </Button>
      </motion.form>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <Settings className="h-5 w-5 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-white">System Information</h3>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Environment</span>
            <span className="text-white">Production</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Last Updated</span>
            <span className="text-white">January 2026</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSettings;
