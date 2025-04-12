"use client "
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from './types';

interface Props {
  defaultSkills?: Skill[];
  onEditComplete?: () => void;
}

class UserProfileEditSkills extends React.Component<Props, { skills: Skill[]; newSkill: string }> {
  state = {
    skills: this.props.defaultSkills || [
      { id: '1', name: 'Leadership' },
      { id: '2', name: 'Communication' },
      { id: '3', name: 'Public Speaking' }
    ],
    newSkill: ''
  };

  handleAddSkill = () => {
    if (this.state.newSkill.trim()) {
      this.setState(prev => ({
        skills: [...prev.skills, { id: Date.now().toString(), name: prev.newSkill.trim() }],
        newSkill: ''
      }));
    }
  };

  handleRemoveSkill = (id: string) => {
    this.setState(prev => ({
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
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
        <h2 className="text-xl font-bold text-gray-800 mb-6">Skills</h2>
        
        <div className="space-y-5">
          <motion.div whileHover={{ scale: 1.01 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add New Skill</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={this.state.newSkill}
                onChange={(e) => this.setState({ newSkill: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter a skill"
              />
              <motion.button
                type="button"
                onClick={this.handleAddSkill}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
              >
                Add
              </motion.button>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {this.state.skills.map(skill => (
              <motion.div
                key={skill.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full"
              >
                <span className="text-sm text-purple-700">{skill.name}</span>
                <motion.button
                  type="button"
                  onClick={() => this.handleRemoveSkill(skill.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-purple-500 hover:text-purple-700"
                >
                  ×
                </motion.button>
              </motion.div>
            ))}
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
            Save Skills
          </motion.button>
        </div>
      </motion.form>
    );
  }
}

export default UserProfileEditSkills;