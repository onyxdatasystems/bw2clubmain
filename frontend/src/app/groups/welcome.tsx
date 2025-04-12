import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[600px] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
        <p className="text-sm mb-4">
          Wisdom Through Missteps: Women's Lessons is a thematic group where women share and learn from life's experiences, turning mistakes into valuable insights. This is a supportive group where women share personal stories, transforming missteps into valuable lessons. Join us to celebrate growth, resilience, and the collective wisdom that emerges from life's journey.
        </p>
        <p className="text-sm mb-4">
          Participate respectfully and enjoy discussions in our thematic groups. Uphold truth, accuracy, and avoid spreading false information. Maintain a positive and constructive atmosphere, ensuring conversations are free from hate speech and discrimination.
        </p>
        <p className="text-sm mb-4">
          Rules of Behavior in Thematic Groups at BW2CLUB:
        </p>
        <ol className="list-decimal list-inside text-sm mb-4">
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
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
