'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">Group Guidelines</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  Wisdom Through Missteps: Women's Lessons is a thematic group where women share and learn from life's experiences, turning mistakes into valuable insights. This is a supportive group where women share personal stories, transforming missteps into valuable lessons. Join us to celebrate growth, resilience, and the collective wisdom that emerges from life's journey.
                </p>
                <p>
                  Participate respectfully and enjoy discussions in our thematic groups. Uphold truth, accuracy, and avoid spreading false information. Maintain a positive and constructive atmosphere, ensuring conversations are free from hate speech and discrimination.
                </p>
                
                <h3 className="font-semibold text-gray-900 mt-6 mb-2">
                  Rules of Behavior in Thematic Groups at BW2CLUB:
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>Engage and Enjoy: Feel free to interact, share thoughts, and enjoy discussions within the thematic groups.</li>
                  <li>No False Information: Avoid spreading false information; let's foster an environment of truth and accuracy.</li>
                  <li>Zero Tolerance for Hate Speech: Ensure conversations are free from hate speech, discrimination, or any form of harmful language.</li>
                  <li>Keep it Positive and Constructive: Strive to maintain a positive and constructive atmosphere within the community.</li>
                  <li>Admins' Responsibility: Admins are entrusted with the responsibility to monitor, control situations, and maintain decorum.</li>
                  <li>Deletion of Inappropriate Comments: Admins will promptly delete inappropriate comments to uphold a respectful environment.</li>
                  <li>Member Removal: Admins may remove members from thematic groups if they fail to respect the rules of behavior.</li>
                  <li>BW2CLUB's Right to Delete Groups: BW2CLUB reserves the right to delete thematic groups if the rules aren't respected or if the space is misused.</li>
                  <li>Safety is Paramount: BW2CLUB is committed to maintaining a safe space for all members, and admins will take necessary actions to uphold this commitment.</li>
                </ol>
              </div>
              
              <div className="mt-6 flex justify-end">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  I Understand
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;