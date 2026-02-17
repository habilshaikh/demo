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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <p className="text-silver/60 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      gradient: 'from-gold/20 to-gold/5',
      iconColor: 'text-gold',
      borderColor: 'border-gold/20'
    },
    {
      title: 'Total Records',
      value: stats?.total_records || 0,
      icon: FolderLock,
      gradient: 'from-silver/15 to-silver/5',
      iconColor: 'text-silver',
      borderColor: 'border-silver/20'
    },
    {
      title: 'Active Tokens',
      value: stats?.active_tokens || 0,
      icon: CheckCircle2,
      gradient: 'from-emerald-500/15 to-emerald-500/5',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Pending Tokens',
      value: stats?.pending_tokens || 0,
      icon: Clock,
      gradient: 'from-amber-500/15 to-amber-500/5',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/20'
    }
  ];

  return (
    <div className="space-y-8" data-testid="admin-dashboard">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">
          Admin <span className="gold-text">Dashboard</span>
        </h1>
        <p className="text-silver/60">Overview of your vault system</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center border ${stat.borderColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-silver/50">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="luxury-card rounded-2xl p-8"
      >
        <h2 className="font-heading text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
          System Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-gradient-to-br from-gold/5 to-transparent border border-gold/10">
            <div className="flex items-center gap-3 mb-3">
              <KeyRound className="h-5 w-5 text-gold" />
              <span className="text-silver/70">Token Distribution</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-silver/50">Active</span>
                <span className="text-emerald-400 font-medium">{stats?.active_tokens || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-silver/50">Pending</span>
                <span className="text-amber-400 font-medium">{stats?.pending_tokens || 0}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-gold/5 to-transparent border border-gold/10">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-5 w-5 text-gold" />
              <span className="text-silver/70">User Activity</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.total_users || 0}</p>
            <p className="text-sm text-silver/50">Registered users</p>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-gold/5 to-transparent border border-gold/10">
            <div className="flex items-center gap-3 mb-3">
              <FolderLock className="h-5 w-5 text-gold" />
              <span className="text-silver/70">Storage Usage</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.total_records || 0}</p>
            <p className="text-sm text-silver/50">Total documents</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;