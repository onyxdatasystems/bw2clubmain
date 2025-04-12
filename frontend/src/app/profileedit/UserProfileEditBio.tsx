import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from './types';

interface Props {
  defaultValues?: Partial<UserProfile>;
  onEditComplete?: () => void;
}

class UserProfileEditBio extends React.Component<Props> {
  state: UserProfile = {
    firstName: this.props.defaultValues?.firstName || '',
    lastName: this.props.defaultValues?.lastName || '',
    bio: this.props.defaultValues?.bio || '',
    birthDate: this.props.defaultValues?.birthDate || '',
    language: this.props.defaultValues?.language || 'English',
    city: this.props.defaultValues?.city || '',
    country: this.props.defaultValues?.country || '',
    relationship: this.props.defaultValues?.relationship || 'Single'
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<UserProfile, keyof UserProfile>);
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
        <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>
        
        <div className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          {/* Bio */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <input
              type="text"
              name="bio"
              value={this.state.bio}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Tell us about yourself"
            />
          </motion.div>

          {/* Birth Date */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={this.state.birthDate}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>

          {/* Language */}
          <motion.div whileHover={{ scale: 1.01 }}>
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

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={this.state.country}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          {/* Relationship */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship Status</label>
            <select
              name="relationship"
              value={this.state.relationship}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Single">Single</option>
              <option value="In a Relationship">In a Relationship</option>
              <option value="Married">Married</option>
            </select>
          </motion.div>
        </div>

        {/* Buttons */}
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
            Save Changes
          </motion.button>
        </div>
      </motion.form>
    );
  }
}

export default UserProfileEditBio;