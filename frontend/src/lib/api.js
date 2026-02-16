import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('wynora_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Vault API
export const vaultApi = {
  getRecords: async () => {
    const response = await axios.get(`${API_URL}/api/vault/records`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  getRecord: async (id) => {
    const response = await axios.get(`${API_URL}/api/vault/records/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  createRecord: async (formData) => {
    const response = await axios.post(`${API_URL}/api/vault/records`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  updateRecord: async (id, formData) => {
    const response = await axios.put(`${API_URL}/api/vault/records/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  deleteRecord: async (id) => {
    const response = await axios.delete(`${API_URL}/api/vault/records/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  downloadFile: async (record) => {
    // For Cloudinary files, open in new tab
    if (record.file_url) {
      window.open(record.file_url, '_blank');
      return;
    }
    throw new Error('No file available');
  },

  getStats: async () => {
    const response = await axios.get(`${API_URL}/api/vault/stats`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

// User API
export const userApi = {
  getProfile: async () => {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axios.put(`${API_URL}/api/users/me`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  changePassword: async (current_password, new_password) => {
    const response = await axios.put(`${API_URL}/api/users/me/password`, {
      current_password,
      new_password
    }, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

// Admin API
export const adminApi = {
  getStats: async () => {
    const response = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  getUsers: async () => {
    const response = await axios.get(`${API_URL}/api/admin/users`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  getUser: async (id) => {
    const response = await axios.get(`${API_URL}/api/admin/users/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await axios.put(`${API_URL}/api/admin/users/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/api/admin/users/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  getRecords: async () => {
    const response = await axios.get(`${API_URL}/api/admin/records`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteRecord: async (id) => {
    const response = await axios.delete(`${API_URL}/api/admin/records/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};
