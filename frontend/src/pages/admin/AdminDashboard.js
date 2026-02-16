import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderLock, KeyRound, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { adminApi } from '../../lib/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminApi.getStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Total Records',
      value: stats?.total_records || 0,
      icon: FolderLock,
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      title: 'Active Tokens',
      value: stats?.active_tokens || 0,
      icon: CheckCircle2,
      color: 'text-green-500 bg-green-500/10'
    },
    {
      title: 'Pending Tokens',
      value: stats?.pending_tokens || 0,
      icon: Clock,
      color: 'text-yellow-500 bg-yellow-500/10'
    }
  ];

  return (
    <div className="space-y-8" data-testid="admin-dashboard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Overview of your vault system</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="font-heading text-xl font-semibold text-white mb-6">System Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <KeyRound className="h-5 w-5 text-gold" />
              <span className="text-slate-400">Token Distribution</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active</span>
                <span className="text-green-500">{stats?.active_tokens || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Pending</span>
                <span className="text-yellow-500">{stats?.pending_tokens || 0}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-slate-400">User Activity</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.total_users || 0}</p>
            <p className="text-sm text-slate-400">Registered users</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3 mb-3">
              <FolderLock className="h-5 w-5 text-purple-500" />
              <span className="text-slate-400">Storage Usage</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.total_records || 0}</p>
            <p className="text-sm text-slate-400">Total documents</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
