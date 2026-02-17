import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  PlusCircle, 
  Search,
  Building2, 
  Shield, 
  FileText, 
  Wallet,
  Home,
  Coins,
  Download,
  Pencil,
  Trash2,
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

const categories = ['All', 'Bank Account', 'Insurance', 'Legal', 'Assets', 'Property', 'Digital Assets'];

const MyVault = () => {
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
      const data = await vaultApi.getRecords();
      setRecords(data);
    } catch (error) {
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (record) => {
    try {
      if (record.file_url) {
        window.open(record.file_url, '_blank');
        toast.success('Opening file in new tab');
      } else {
        toast.error('No file attached to this record');
      }
    } catch (error) {
      toast.error('Failed to open file');
    }
  };

  const handleDelete = async () => {
    if (!recordToDelete) return;
    
    try {
      await vaultApi.deleteRecord(recordToDelete.id);
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
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.description?.toLowerCase().includes(searchQuery.toLowerCase());
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <p className="text-silver/60 text-sm">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="my-vault">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">My Vault</h1>
          <p className="text-silver/60">Manage your secure documents</p>
        </div>
        <Link to="/dashboard/add-record">
          <Button
            data-testid="add-record-btn"
            variant="luxury"
            className="rounded-xl"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/50" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input"
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger 
            className="w-full sm:w-48"
            data-testid="category-filter"
          >
            <Filter className="mr-2 h-4 w-4 text-gold/60" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
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
          className="luxury-card rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center mx-auto mb-6 border border-gold/20">
            <FolderLock className="h-10 w-10 text-gold/50" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-white mb-2">
            {searchQuery || categoryFilter !== 'All' ? 'No matching records' : 'Your vault is empty'}
          </h3>
          <p className="text-silver/50 mb-6">
            {searchQuery || categoryFilter !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first record'}
          </p>
          {!searchQuery && categoryFilter === 'All' && (
            <Link to="/dashboard/add-record">
              <Button variant="luxury" className="rounded-xl">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Record
              </Button>
            </Link>
          )}
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
                className="luxury-card rounded-2xl p-6"
                data-testid={`record-${record.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center flex-shrink-0 border border-gold/20">
                    <IconComponent className="h-6 w-6 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{record.title}</h3>
                        <span className="inline-block px-2 py-1 rounded-full bg-gold/10 border border-gold/20 text-xs text-gold mt-1">
                          {record.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {record.file_name && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(record)}
                            data-testid={`download-${record.id}`}
                            className="text-silver/60 hover:text-gold hover:bg-gold/10"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Link to={`/dashboard/edit-record/${record.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-testid={`edit-${record.id}`}
                            className="text-silver/60 hover:text-gold hover:bg-gold/10"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setRecordToDelete(record);
                            setDeleteDialogOpen(true);
                          }}
                          data-testid={`delete-${record.id}`}
                          className="text-silver/60 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {record.description && (
                      <p className="text-silver/50 mt-2 line-clamp-2">{record.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-silver/40">
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{recordToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              data-testid="confirm-delete-btn"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyVault;