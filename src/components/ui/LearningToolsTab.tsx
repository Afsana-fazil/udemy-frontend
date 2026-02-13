import React, { useState } from 'react';
import LearningReminderModal from './LearningReminderModal';
import { FiTrash2 } from 'react-icons/fi';

interface Course {
  title: string;
}

interface Reminder {
  name: string;
  content: string;
  frequency: string;
  day: string;
  time: string;
}

interface LearningToolsTabProps {
  course: Course | null;
}

const LearningToolsTab = ({ course }: LearningToolsTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedReminders, setSavedReminders] = useState<Reminder[]>([]);

  const handleSaveReminder = (reminder: Reminder) => {
    setSavedReminders((prev) => [...prev, reminder]);
  };

  return (
    <div className="py-12 flex max-w-3xl mx-auto flex-col text-[#2a2b3f]">
      <h2 className="text-2xl font-bold mb-4">Learning reminders</h2>
      <p className="mb-4 text-sm">
        Set up push notifications or calendar events to stay on track for your learning goals.
      </p>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-[#6d28d2] w-fit text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-colors"
      >
        + Add a learning reminder
      </button>

      {isModalOpen && (
        <LearningReminderModal 
          courseName={course ? `Course: ${course.title}` : 'Course: Canva Essentials with Ronny and Diana'} 
          onClose={() => setIsModalOpen(false)}
          onSaveReminder={handleSaveReminder}
        />
      )}

      {/* Show saved reminders below the tab */}
      {savedReminders.length > 0 && (
        <div className="mt-8 w-full bg-white border border-solid border-gray-200 rounded-lg shadow-lg p-4">
          <h4 className="font-bold mb-2">Saved Reminders</h4>
          <ul className="space-y-2">
            {savedReminders.map((r, idx) => (
              <li key={idx} className="text-sm text-[#2a2b3f] border-b border-gray-100 pb-2 flex items-center justify-between">
                <span><span className="font-semibold">{r.name}</span> — <span>{r.frequency}</span> at <span>{r.time}</span></span>
                <button onClick={() => setSavedReminders(reminders => reminders.filter((_, i) => i !== idx))} className="ml-4 text-gray-400 hover:text-red-600">
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LearningToolsTab; 