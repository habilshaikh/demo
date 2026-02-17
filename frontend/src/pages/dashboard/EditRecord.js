import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Save, 
  Upload,
  FileText,
  X,
  Building2, 
  Shield, 
  Wallet,
  Home,
  Coins,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { vaultApi } from '../../lib/api';
import { toast } from 'sonner';

const categoryOptions = [
  { value: 'Bank Account', label: 'Bank Account', icon: Building2 },
  { value: 'Insurance', label: 'Insurance', icon: Shield },
  { value: 'Legal', label: 'Legal Documents', icon: FileText },
  { value: 'Assets', label: 'Financial Assets', icon: Wallet },
  { value: 'Property', label: 'Property Records', icon: Home },
  { value: 'Digital Assets', label: 'Digital Assets', icon: Coins },
];

const EditRecord = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: ''
  });
  const [existingFile, setExistingFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // ✅ FIXED: wrapped in useCallback
  const fetchRecord = useCallback(async () => {
    try {
      const record = await vaultApi.getRecord(id);
      setFormData({
        category: record.category,
        title: record.title,
        description: record.description || ''
      });

      if (record.file_name) {
        setExistingFile({
          name: record.file_name,
          size: record.file_size
        });
      }
    } catch (error) {
      toast.error('Failed to fetch record');
      navigate('/dashboard/vault');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  // ✅ FIXED dependency warning
  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateAndSetFile = (selectedFile) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('File type not allowed. Please upload PDF, JPG, or PNG files.');
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    setNewFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setSaving(true);

    try {
      const data = new FormData();
      data.append('category', formData.category);
      data.append('title', formData.title);
      data.append('description', formData.description || '');
      if (newFile) data.append('file', newFile);

      await vaultApi.updateRecord(id, data);
      toast.success('Record updated successfully!');
      navigate('/dashboard/vault');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to update record';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" data-testid="edit-record-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/vault')}
          className="text-slate-400 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vault
        </Button>
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Edit Record</h1>
        <p className="text-slate-400">Update your document details</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-8 space-y-6"
      >
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-slate-300">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData(prev => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0F253A] border-white/10">
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-slate-300">Title *</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., HDFC Savings Account"
            className="bg-white/5 border-white/10 text-white h-12"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-slate-300">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="bg-white/5 border-white/10 text-white resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/vault')}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default EditRecord;