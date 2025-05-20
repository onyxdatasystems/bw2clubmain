<<<<<<< HEAD
"use client";
=======
"use client "
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import React from 'react';
import { motion } from 'framer-motion';
import { WorkExperience } from './types';

interface Props {
  defaultValues?: Partial<WorkExperience>;
  onEditComplete?: () => void;
}

class UserProfileEditWork extends React.Component<Props, WorkExperience> {
  state: WorkExperience = {
    title: this.props.defaultValues?.title || '',
    organization: this.props.defaultValues?.organization || '',
    startDate: this.props.defaultValues?.startDate || '',
    endDate: this.props.defaultValues?.endDate || ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<WorkExperience, keyof WorkExperience>);
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
        <h2 className="text-xl font-bold text-gray-800 mb-6">Work Experience</h2>
        
        <div className="space-y-5">
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Software Engineer"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input
              type="text"
              name="organization"
              value={this.state.organization}
              onChange={this.handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Google"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={this.state.endDate}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            Save Experience
          </motion.button>
        </div>
      </motion.form>
    );
  }
}

export default UserProfileEditWork;