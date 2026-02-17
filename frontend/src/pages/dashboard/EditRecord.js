import { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchRecord();
  }, [id]);

  const fetchRecord = async () => {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
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
      if (newFile) {
        data.append('file', newFile);
      }

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
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
          <Label htmlFor="category" className="text-slate-300">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger 
              className="bg-white/5 border-white/10 text-white h-12"
              data-testid="category-select"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0F253A] border-white/10">
              {categoryOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
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
          <Label htmlFor="title" className="text-slate-300">Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., HDFC Savings Account"
            data-testid="title-input"
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 h-12"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-300">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add any additional details or notes..."
            data-testid="description-input"
            rows={4}
            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
          />
        </div>

        {/* Current File */}
        {existingFile && !newFile && (
          <div className="space-y-2">
            <Label className="text-slate-300">Current Attachment</Label>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{existingFile.name}</p>
                <p className="text-sm text-slate-400">
                  {(existingFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-slate-300">
            {existingFile ? 'Replace Attachment' : 'Attachment (Optional)'}
          </Label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive 
                ? 'border-accent bg-accent/5' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="file-input"
            />
            
            {newFile ? (
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">{newFile.name}</p>
                  <p className="text-sm text-slate-400">
                    {(newFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewFile(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-white font-medium mb-1">
                  {existingFile ? 'Drop a new file to replace' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-slate-400">
                  PDF, JPG, PNG (max 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/vault')}
            className="flex-1 border-white/10 text-white hover:bg-white/5 h-12"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            data-testid="save-record-btn"
            className="flex-1 bg-accent hover:bg-accent/90 text-white h-12 btn-glow"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </span>
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default EditRecord;