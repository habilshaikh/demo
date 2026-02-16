import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  PlusCircle, 
  Building2, 
  Shield, 
  FileText, 
  Wallet,
  Home,
  Coins,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { vaultApi } from '../../lib/api';
import { toast } from 'sonner';

const categoryIcons = {
  'Bank Account': Building2,
  'Insurance': Shield,
  'Legal': FileText,
  'Assets': Wallet,
  'Property': Home,
  'Digital Assets': Coins,
};

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, records] = await Promise.all([
          vaultApi.getStats(),
          vaultApi.getRecords()
        ]);
        setStats(statsData);
        setRecentRecords(records.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="dashboard-overview">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-2">
          Welcome back, {user?.full_name?.split(' ')[0]}!
        </h1>
        <p className="text-slate-400">
          Here's an overview of your secure vault
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FolderLock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats?.total_records || 0}</p>
              <p className="text-sm text-slate-400">Total Records</p>
            </div>
          </div>
        </motion.div>

        {Object.entries(stats?.categories || {}).slice(0, 3).map(([category, count], index) => {
          const IconComponent = categoryIcons[category] || FileText;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <IconComponent className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-sm text-slate-400">{category}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="font-heading text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/dashboard/add-record">
            <Button
              data-testid="quick-add-record-btn"
              className="bg-accent hover:bg-accent/90 text-white rounded-xl"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Record
            </Button>
          </Link>
          <Link to="/dashboard/vault">
            <Button
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 rounded-xl"
            >
              <FolderLock className="mr-2 h-4 w-4" />
              View All Records
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Recent Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-semibold text-white">Recent Records</h2>
          <Link to="/dashboard/vault" className="text-accent hover:text-accent/80 text-sm flex items-center gap-1">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentRecords.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <FolderLock className="h-8 w-8 text-slate-500" />
            </div>
            <p className="text-slate-400 mb-4">No records yet</p>
            <Link to="/dashboard/add-record">
              <Button className="bg-accent hover:bg-accent/90 text-white rounded-xl">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Record
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentRecords.map((record) => {
              const IconComponent = categoryIcons[record.category] || FileText;
              return (
                <Link
                  key={record.id}
                  to={`/dashboard/edit-record/${record.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{record.title}</p>
                    <p className="text-sm text-slate-400">{record.category}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(record.created_at).toLocaleDateString()}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
