<<<<<<< HEAD
// components/UserProfileCompanyOverview.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { CompanyOverview } from './types';

interface Props {
  onEditComplete?: () => void;
}

const UserProfileCompanyOverview = ({ onEditComplete }: Props) => {
  const [formData, setFormData] = useState<CompanyOverview>({
    description: '',
    website: '',
    phone: '',
    language: 'English',
    numEmployees: '',
    numBW2Employees: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await api.fetchProfile() as { success: boolean; data: { website?: string; description?: string; phone?: string; language?: string; numEmployees?: string; numBW2Employees?: string } };
        if (response.success) {
          setFormData({
            description: String(response.data?.description ?? ''),
            website: response.data?.website ?? '',
            phone: response.data?.phone ?? '',
            language: response.data?.language ?? 'English',
            numEmployees: response.data?.numEmployees || '',
            numBW2Employees: response.data?.numBW2Employees || ''
          });
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.updateProfile({
      name: formData.description, // Map description to name
      email: formData.website,    // Map website to email
      password: formData.phone    // Map phone to password
    });
    if (response.success) onEditComplete?.();
  };

  if (loading) return <div className="p-6 text-gray-500">Loading company details...</div>;

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="p-4 md:p-6 bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Company Overview</h2>
      
      <div className="space-y-4 md:space-y-5">
        <motion.div whileHover={{ scale: 1.01 }}>
          <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg"
=======
import React from 'react';
import { motion } from 'framer-motion';
import { CompanyOverview } from './types';

interface Props {
  defaultValues?: Partial<CompanyOverview>;
  onEditComplete?: () => void;
}

class UserProfileCompanyOverview extends React.Component<Props, CompanyOverview> {
  state: CompanyOverview = {
    description: this.props.defaultValues?.description || '',
    website: this.props.defaultValues?.website || '',
    phone: this.props.defaultValues?.phone || '',
    language: this.props.defaultValues?.language || 'English',
    numEmployees: this.props.defaultValues?.numEmployees || '',
    numBW2Employees: this.props.defaultValues?.numBW2Employees || ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<CompanyOverview, keyof CompanyOverview>);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onEditComplete?.();
  };

  render() {
    return (
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={this.handleSubmit}
        className="p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Company Overview</h2>
        
        <div className="space-y-5">
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe your company"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={this.state.website}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
<<<<<<< HEAD
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">Employees</label>
            <input
              type="number"
              name="numEmployees"
              value={formData.numEmployees}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg"
=======
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
<<<<<<< HEAD
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">BW2 Employees</label>
            <input
              type="number"
              name="numBW2Employees"
              value={formData.numBW2Employees}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-end gap-3 mt-6 md:mt-8">
        <motion.button
          type="button"
          onClick={onEditComplete}
          whileHover={{ scale: 1.05 }}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full text-gray-700"
        >
          Cancel
        </motion.button>
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded-full"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.form>
  );
};
=======
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              name="language"
              value={this.state.language}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
              <input
                type="number"
                name="numEmployees"
                value={this.state.numEmployees}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="100"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">BW2 Employees</label>
              <input
                type="number"
                name="numBW2Employees"
                value={this.state.numBW2Employees}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="50"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <motion.button
            type="button"
            onClick={this.props.onEditComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl"
          >
            Save Company Info
          </motion.button>
        </div>
      </motion.form>
    );
  }
}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

export default UserProfileCompanyOverview;