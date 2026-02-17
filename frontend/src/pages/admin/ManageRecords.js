import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  Search, 
  Trash2,
  Building2, 
  Shield, 
  FileText, 
  Wallet,
  Home,
  Coins,
  Filter
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
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

const categoryIcons = {
  'Bank Account': Building2,
  'Insurance': Shield,
  'Legal': FileText,
  'Assets': Wallet,
  'Property': Home,
  'Digital Assets': Coins,
};

const categories = ['All', 'Bank Account', 'Insurance', 'Legal', 'Assets', 'Property', 'Digital Assets'];

const ManageRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await adminApi.getRecords();
      setRecords(data);
    } catch (error) {
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;
    
    try {
      await adminApi.deleteRecord(recordToDelete.id);
      setRecords(records.filter(r => r.id !== recordToDelete.id));
      toast.success('Record deleted successfully');
    } catch (error) {
      toast.error('Failed to delete record');
    } finally {
      setDeleteDialogOpen(false);
      setRecordToDelete(null);
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || record.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="manage-records">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">Manage Records</h1>
          <p className="text-slate-400">View and manage all vault records</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <FolderLock className="h-5 w-5 text-slate-400" />
          <span className="text-white font-medium">{records.length} Records</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-records-input"
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-[#0F253A] border-white/10">
            {categories.map((cat) => (
              <SelectItem 
                key={cat} 
                value={cat}
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Records List */}
      {filteredRecords.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <FolderLock className="h-10 w-10 text-slate-500" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-white mb-2">
            {searchQuery || categoryFilter !== 'All' ? 'No matching records' : 'No records yet'}
          </h3>
          <p className="text-slate-400">
            {searchQuery || categoryFilter !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Records will appear here when users add them'}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredRecords.map((record, index) => {
            const IconComponent = categoryIcons[record.category] || FileText;
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-6"
                data-testid={`admin-record-${record.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{record.title}</h3>
                        <span className="inline-block px-2 py-1 rounded-full bg-white/5 text-xs text-slate-400 mt-1">
                          {record.category}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setRecordToDelete(record);
                          setDeleteDialogOpen(true);
                        }}
                        data-testid={`admin-delete-${record.id}`}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {record.description && (
                      <p className="text-slate-400 mt-2 line-clamp-2">{record.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                      <span>User: {record.user_id.slice(0, 8)}...</span>
                      <span>Added {new Date(record.created_at).toLocaleDateString()}</span>
                      {record.file_name && (
                        <span>{formatFileSize(record.file_size)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#0F253A] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Record</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{recordToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-white hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              data-testid="confirm-delete-record"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageRecords;