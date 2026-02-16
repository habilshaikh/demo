import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FolderLock, 
  KeyRound, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg";

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Manage Users', icon: Users },
  { href: '/admin/records', label: 'Manage Records', icon: FolderLock },
  { href: '/admin/tokens', label: 'Assign Tokens', icon: KeyRound },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0B1C2D] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-[#0A1628] border-r border-white/5">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="WynOra Vault" className="h-10 w-auto" />
          </Link>
          <span className="verified-badge text-[10px]">
            <Shield className="h-3 w-3" />
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = link.href === '/admin' 
              ? location.pathname === '/admin'
              : location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                data-testid={`admin-sidebar-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gold/10 text-gold border border-gold/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="glass rounded-xl p-4 mb-4">
            <p className="text-sm text-slate-400">Admin Panel</p>
            <p className="font-medium text-white truncate">{user?.full_name}</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A1628] border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="WynOra Vault" className="h-8 w-auto" />
            <span className="verified-badge text-[10px]">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white"
            data-testid="admin-mobile-toggle"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0A1628] border-r border-white/5"
            >
              <div className="flex items-center gap-3 px-6 h-16 border-b border-white/5">
                <img src={LOGO_URL} alt="WynOra Vault" className="h-8 w-auto" />
                <span className="verified-badge text-[10px]">Admin</span>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {sidebarLinks.map((link) => {
                  const isActive = link.href === '/admin' 
                    ? location.pathname === '/admin'
                    : location.pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gold/10 text-gold border border-gold/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/5">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        <div className="min-h-screen pt-16 lg:pt-0">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
