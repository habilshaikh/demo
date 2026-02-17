import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Shield, 
  Ban, 
  Trash2,
  CheckCircle2,
  XCircle,
  KeyRound
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { adminApi } from '../../lib/api';
import { toast } from 'sonner';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminApi.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (user) => {
    try {
      await adminApi.updateUser(user.id, { is_blocked: !user.is_blocked });
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, is_blocked: !u.is_blocked } : u
      ));
      toast.success(user.is_blocked ? 'User unblocked' : 'User blocked');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await adminApi.deleteUser(userToDelete.id);
      setUsers(users.filter(u => u.id !== userToDelete.id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="manage-users">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Users</h1>
          <p className="text-slate-400">View and manage registered users</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <Users className="h-5 w-5 text-slate-400" />
          <span className="text-white font-medium">{users.length} Users</span>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="search-users-input"
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
        />
      </motion.div>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10 text-slate-500" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-white mb-2">
            {searchQuery ? 'No matching users' : 'No users yet'}
          </h3>
          <p className="text-slate-400">
            {searchQuery ? 'Try adjusting your search' : 'Users will appear here when they sign up'}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-2xl p-6"
              data-testid={`user-${user.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-semibold text-lg">
                    {user.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{user.full_name}</h3>
                    {user.is_blocked && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs">
                        Blocked
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                    {user.token_number && (
                      <span className="flex items-center gap-1">
                        <KeyRound className="h-3 w-3" />
                        {user.token_number}
                      </span>
                    )}
                    {user.token_status && (
                      <span className={`flex items-center gap-1 ${
                        user.token_status === 'active' ? 'text-green-500' :
                        user.token_status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {user.token_status === 'active' ? <CheckCircle2 className="h-3 w-3" /> :
                         user.token_status === 'pending' ? <Shield className="h-3 w-3" /> :
                         <XCircle className="h-3 w-3" />}
                        {user.token_status}
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white"
                      data-testid={`user-menu-${user.id}`}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#0F253A] border-white/10">
                    <DropdownMenuItem
                      onClick={() => handleBlock(user)}
                      className="text-white hover:bg-white/10 cursor-pointer"
                      data-testid={`block-user-${user.id}`}
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      {user.is_blocked ? 'Unblock User' : 'Block User'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteDialogOpen(true);
                      }}
                      className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                      data-testid={`delete-user-${user.id}`}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0F253A] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{userToDelete?.full_name}"? This will also delete all their records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              data-testid="confirm-delete-user"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageUsers;