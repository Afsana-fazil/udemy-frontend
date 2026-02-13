import React, { useState } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

interface LearningReminderModalProps {
  courseName: string;
  onClose: () => void;
  onSaveReminder: (reminder: any) => void;
}

const LearningReminderModal = ({ courseName, onClose, onSaveReminder }: LearningReminderModalProps) => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [reminder, setReminder] = useState({
    name: 'Learning reminder',
    content: 'none',
    frequency: '',
    day: 'monday',
    time: '12:00',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!reminder.frequency) {
      setError('Frequency is required.');
      return;
    }
    setError('');
    onSaveReminder(reminder);
    onClose();
  };

  const isCourseMatch = courseName.toLowerCase().includes(searchQuery.toLowerCase());

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSelectCourse = () => {
    setReminder(prev => ({ ...prev, content: courseName }));
    setSearchQuery('');
  };
  
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-lg bg-opacity-40 text-[#2a2b3f] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Learning reminders</h2>
          <button onClick={onClose}>
            <FiX className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <p className="text-[#595c73] text-start text-sm mb-4">Step 1 of 2</p>
            <div>
              <div className='mb-10'>
                <label className="block mb-2 flex justify-between items-center">
                  <h6 className="text-sm font-bold">Name</h6>
                  <span className="text-[#595c73] text-xs">optional</span>
                </label>
                <input 
                  type="text"
                  name="name"
                  placeholder="Learning reminder"
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm hover:bg-gray-50 border border-solid border-[#9194ac] placeholder:text-[#2a2b3f] rounded focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold mb-2 text-start">Attach content (optional)</h3>
                <p className="text-xs mb-3 text-start">Most recent courses or labs:</p>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input id="course" name="content" type="radio" value={courseName} onChange={handleChange} checked={reminder.content === courseName} className="accent-purple-600 h-4 w-4 mt-1" />
                    <label htmlFor="course" className="block text-sm text-gray-700 text-start">{courseName}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="none" name="content" type="radio" value="none" checked={reminder.content === 'none'} onChange={handleChange} className="accent-purple-600 h-4 w-4" />
                    <label htmlFor="none" className="block text-sm text-gray-700">None</label>
                  </div>
                </div>
                <div className="relative mt-4">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-10 py-2 text-sm border border-solid border-[#9194ac] placeholder:text-[#2a2b3f] rounded focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                   {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                        <FiX className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-1 border border-gray-200 rounded-md shadow-lg absolute bg-white z-10">
                    <ul>
                      {isCourseMatch ? (
                        <li 
                          onClick={handleSelectCourse} 
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {courseName}
                        </li>
                      ) : (
                        <li className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-500">No results found</p>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="bg-[#6d28d2] text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className='text-start'>
            <p className="text-sm text-[#595c73] mb-6">Step 2 of 3</p>
            <div className="mb-8">
              <label className="block text-sm font-bold mb-2">Frequency</label>
              <div className="flex gap-4 mb-6">
                {['Daily', 'Weekly', 'Once'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setReminder({ ...reminder, frequency: freq.toLowerCase() })}
                    className={`px-6 py-2 rounded-full border border-solid border-gray-400 text-sm font-semibold transition-colors ${reminder.frequency === freq.toLowerCase() ? 'bg-[#f3f0ff] border-none text-[#6d28d2]' : 'bg-white text-[#2a2b3f]'}`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              {error && <p className="text-xs text-red-600 mt-1 font-bold">{error}</p>}
              <label className="block text-sm font-bold mb-2">Time</label>
              <div className="relative w-48">
                <input
                  type="time"
                  name="time"
                  value={reminder.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-solid border-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="#2a2b3f" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end mt-8">
              <button onClick={() => setStep(1)} className="font-bold py-2 px-2 text-sm text-[#6d28d2] rounded hover:bg-purple-100 transition-colors">
                Previous
              </button>
              <button onClick={handleSave} className="bg-[#6d28d2] text-sm text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                Save note
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{`
        input[type='time']::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
        input[type='time']::-moz-focus-inner {
          border: 0;
        }
        input[type='time']::-ms-clear {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LearningReminderModal; 