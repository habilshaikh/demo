import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  KeyRound, 
  Search, 
  Save,
  Users,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { adminApi } from '../../lib/api';
import { toast } from 'sonner';

const AssignTokens = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tokenData, setTokenData] = useState({
    token_number: '',
    token_status: ''
  });
  const [saving, setSaving] = useState(false);

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

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setTokenData({
      token_number: user.token_number || '',
      token_status: user.token_status || ''
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    setSaving(true);
    try {
      await adminApi.updateUser(selectedUser.id, tokenData);
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, ...tokenData }
          : u
      ));
      toast.success('Token updated successfully');
      setEditDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update token');
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="assign-tokens">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Assign Tokens</h1>
          <p className="text-slate-400">Manage user verification tokens</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <KeyRound className="h-5 w-5 text-gold" />
          <span className="text-white font-medium">
            {users.filter(u => u.token_status === 'active').length} Active
          </span>
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
          data-testid="search-tokens-input"
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
            No users found
          </h3>
          <p className="text-slate-400">
            {searchQuery ? 'Try adjusting your search' : 'Users will appear here'}
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
              data-testid={`token-user-${user.id}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <KeyRound className="h-6 w-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{user.full_name}</h3>
                  <p className="text-sm text-slate-400">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {user.token_number ? (
                      <span className="font-mono text-sm text-white bg-white/5 px-2 py-1 rounded">
                        {user.token_number}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500 italic">No token assigned</span>
                    )}
                    {user.token_status && (
                      <span className="flex items-center gap-1 text-sm">
                        {getStatusIcon(user.token_status)}
                        <span className={`capitalize ${
                          user.token_status === 'active' ? 'text-green-500' :
                          user.token_status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {user.token_status}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => openEditDialog(user)}
                  data-testid={`edit-token-${user.id}`}
                  className="bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20"
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  {user.token_number ? 'Edit Token' : 'Assign Token'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Token Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-[#0F253A] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedUser?.token_number ? 'Edit Token' : 'Assign Token'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage token for {selectedUser?.full_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="token_number" className="text-slate-300">Token Number</Label>
              <Input
                id="token_number"
                value={tokenData.token_number}
                onChange={(e) => setTokenData({ ...tokenData, token_number: e.target.value })}
                placeholder="e.g., WYN-2024-001"
                data-testid="token-number-input"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="token_status" className="text-slate-300">Token Status</Label>
              <Select 
                value={tokenData.token_status} 
                onValueChange={(value) => setTokenData({ ...tokenData, token_status: value })}
              >
                <SelectTrigger 
                  className="bg-white/5 border-white/10 text-white"
                  data-testid="token-status-select"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F253A] border-white/10">
                  <SelectItem value="active" className="text-white hover:bg-white/10">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Active
                    </span>
                  </SelectItem>
                  <SelectItem value="pending" className="text-white hover:bg-white/10">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      Pending
                    </span>
                  </SelectItem>
                  <SelectItem value="expired" className="text-white hover:bg-white/10">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Expired
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              data-testid="save-token-btn"
              className="bg-gold hover:bg-gold/90 text-black"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Token
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignTokens;
