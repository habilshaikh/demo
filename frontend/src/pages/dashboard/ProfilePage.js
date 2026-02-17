import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../lib/api';
import { toast } from 'sonner';

const ProfilePage = () => {
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
    <div className="max-w-2xl mx-auto space-y-8" data-testid="profile-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-silver/60">Manage your account information</p>
      </motion.div>

      {/* Profile Information */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleProfileSubmit}
        className="luxury-card rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center border border-gold/20 shadow-gold/20">
            <User className="h-8 w-8 text-gold" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">Personal Information</h2>
            <p className="text-silver/50">Update your profile details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
              <Input
                id="full_name"
                name="full_name"
                value={profileData.full_name}
                onChange={handleProfileChange}
                data-testid="profile-name-input"
                className="pl-12 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                data-testid="profile-email-input"
                className="pl-12 h-12"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="update-profile-btn"
          variant="luxury"
          className="rounded-xl h-12"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-vault-black/30 border-t-vault-black rounded-full animate-spin" />
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
        className="luxury-card rounded-2xl p-8 space-y-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-silver/15 to-silver/5 flex items-center justify-center border border-silver/20">
            <Lock className="h-8 w-8 text-silver" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-white">Change Password</h2>
            <p className="text-silver/50">Update your account password</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
              <Input
                id="current_password"
                name="current_password"
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                data-testid="current-password-input"
                className="pl-12 pr-12 h-12"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-silver/50 hover:text-gold transition-colors"
              >
                {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
              <Input
                id="new_password"
                name="new_password"
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                data-testid="new-password-input"
                className="pl-12 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" />
              <Input
                id="confirm_password"
                name="confirm_password"
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                data-testid="confirm-password-input"
                className="pl-12 h-12"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={passwordLoading}
          data-testid="change-password-btn"
          variant="secondary"
          className="rounded-xl h-12"
        >
          {passwordLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-vault-black/30 border-t-vault-black rounded-full animate-spin" />
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

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="luxury-card rounded-2xl p-6"
      >
        <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
          Account Information
        </h3>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-silver/50">Account ID</span>
            <span className="text-silver font-mono">{user?.id?.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between">
            <span className="text-silver/50">Role</span>
            <span className="text-gold capitalize">{user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-silver/50">Member Since</span>
            <span className="text-silver">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;