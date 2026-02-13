import React, { useState, useRef, useEffect } from 'react';
import { FiBold, FiItalic, FiList, FiCode, FiChevronDown, FiTrash2 } from 'react-icons/fi';
import { FaListOl } from 'react-icons/fa';

interface NoteEditorProps {
  onSave: (content: string, styles: React.CSSProperties) => void;
  onCancel: () => void;
}

const NoteEditor = ({ onSave, onCancel }: NoteEditorProps) => {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Normal text');
  const [stylesOpen, setStylesOpen] = useState(false);
  const stylesRef = useRef<HTMLDivElement>(null);
  const maxLength = 1000;

  const styleOptions: { [key: string]: React.CSSProperties } = {
    'Normal text': { fontSize: '1rem', fontWeight: 'normal', fontStyle: 'normal' },
    'Quote': { fontSize: '1rem', fontStyle: 'italic', borderLeft: '4px solid #d1d5db', paddingLeft: '1rem', color: '#6b7280' },
    'Heading 4': { fontSize: '1.5rem', fontWeight: 'bold' },
  };

  const currentTextStyle: React.CSSProperties = {
    ...styleOptions[selectedStyle],
    fontWeight: isBold ? 'bold' : styleOptions[selectedStyle]?.fontWeight || 'normal',
    fontStyle: isItalic ? 'italic' : styleOptions[selectedStyle]?.fontStyle || 'normal',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stylesRef.current && !stylesRef.current.contains(event.target as Node)) {
        setStylesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    onSave(content, currentTextStyle);
  };

  return (
    <div className="mb-4">
       <div className="flex space-x-2">
         <span className="text-xs font-bold bg-black text-white py-1 px-2 rounded-xl h-fit">0:00</span>
         <div className="border border-solid border-[#9194ac] rounded py-2 w-full mb-4 focus-within:border-2 focus-within:border-purple-600">
           <div className="flex justify-between items-center mb-2 px-2">
             <div className="flex items-center space-x-4">
                <div className="relative" ref={stylesRef}>
                  <button onClick={() => setStylesOpen(!stylesOpen)} className="flex items-center space-x-1 p-1 rounded hover:bg-gray-100">
                    <span className="text-sm">Styles</span>
                    <FiChevronDown className="w-3.5" />
                  </button>
                  {stylesOpen && (
                    <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <a href="#" onClick={(e) => { e.preventDefault(); setSelectedStyle('Normal text'); setStylesOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Normal text</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setSelectedStyle('Quote'); setStylesOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Quote</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setSelectedStyle('Heading 4'); setStylesOpen(false); }} className="block px-4 py-3 text-xl font-bold text-gray-700 hover:bg-gray-100">Heading 4</a>
                    </div>
                  )}
                </div>
               <div className="flex items-center space-x-1 text-[#2a2b3f] text-sm font-bold">
                 <button onClick={() => setIsBold(!isBold)} className={`p-1 rounded ${isBold ? 'bg-gray-200' : ''}`}><FiBold /></button>
                 <button onClick={() => setIsItalic(!isItalic)} className={`p-1 rounded ${isItalic ? 'bg-gray-200' : ''}`}><FiItalic /></button>
                 <button className='p-1 rounded'><FaListOl /></button>
                 <button className='p-1 rounded'><FiList /></button>
                 <button className='p-1 rounded'><FiCode /></button>
               </div>
             </div>
             <span className="text-sm text-[#2a2b3f]">{maxLength - content.length}</span>
           </div>
           <textarea
             value={content}
             onChange={(e) => setContent(e.target.value)}
             maxLength={maxLength}
             style={currentTextStyle}
             className="w-full h-16 p-2 border-t border-solid border-[#9194ac] focus:outline-none resize-none"
           ></textarea>
         </div>
       </div>
       <div className="flex justify-end items-center space-x-3 mt-2">
         <button onClick={onCancel} className="font-bold text-sm hover:bg-gray-100 rounded p-2">Cancel</button>
         <button 
           onClick={handleSave}
           className="bg-[#6d28d2] text-white text-sm font-bold py-2 px-3 rounded"
         >
           Save note
         </button>
       </div>
    </div>
  );
};

interface Note {
  time: string;
  content: string;
  styles: React.CSSProperties;
}

const NotesTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [lecturesOpen, setLecturesOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState('All lectures');
  const [selectedSort, setSelectedSort] = useState('Sort by most recent');
  
  const lecturesRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lecturesRef.current && !lecturesRef.current.contains(event.target as Node)) {
        setLecturesOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveNote = (content: string, styles: React.CSSProperties) => {
    if (content.trim()) {
      setNotes([...notes, { time: '0:00', content, styles }]);
      setIsEditing(false);
    }
  };

  const handleDeleteNote = (indexToDelete: number) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-3xl mx-auto">
      {!isEditing && (
        <div 
          onClick={() => setIsEditing(true)} 
          className="w-full flex items-center justify-between py-2 px-4 border border-solid border-[#9194ac] rounded cursor-pointer mb-2"
        >
          <span className="text-sm text-[#595c73]">Create a new note at 0:00</span>
          <span className="text-white bg-[#2a2b3f] rounded-full w-3 h-3 flex items-center justify-center p-1.5">+</span>
        </div>
      )}

      {isEditing && <NoteEditor onSave={handleSaveNote} onCancel={() => setIsEditing(false)} />}
      
      <div className="flex items-center space-x-2 mb-8">
        {/* All Lectures Dropdown */}
        <div className="relative" ref={lecturesRef}>
          <button 
            onClick={() => setLecturesOpen(!lecturesOpen)}
            className="flex items-center px-4 py-2 border border-solid border-[#6d28d2] rounded hover:bg-purple-100"
          >
            <span className="text-[#6d28d2] text-sm font-bold mr-1">{selectedLecture}</span>
            <FiChevronDown className="text-[#6d28d2] w-3.5" />
          </button>
          {lecturesOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a href="#" onClick={(e) => { e.preventDefault(); setSelectedLecture('All lectures'); setLecturesOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All lectures</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setSelectedLecture('Current lecture'); setLecturesOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Current lecture</a>
            </div>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="relative" ref={sortRef}>
          <button 
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center px-4 py-2 border border-solid border-[#6d28d2] rounded hover:bg-purple-100"
          >
            <span className="text-[#6d28d2] text-sm font-bold mr-1">{selectedSort}</span>
            <FiChevronDown className="text-[#6d28d2] w-3.5" />
          </button>
          {sortOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a href="#" onClick={(e) => { e.preventDefault(); setSelectedSort('Sort by most recent'); setSortOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sort by most recent</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setSelectedSort('Sort by oldest'); setSortOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sort by oldest</a>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {notes.map((note, index) => (
          <div key={index} className="p-4 rounded-lg shadow-lg border border-solid border-gray-200 flex justify-between items-start">
            <div>
              <p className="font-bold text-sm mb-2">Note at {note.time}</p>
              <p style={note.styles}>{note.content}</p>
            </div>
            <button onClick={() => handleDeleteNote(index)} className="text-gray-500 hover:text-red-600 ml-4">
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      {notes.length === 0 && !isEditing && (
        <div className="text-center text-[#2a2b3f] pt-16 text-sm">
           <p>Click the "Create a new note" box, the "+" button, or press "B" to make your first note.</p>
         </div>
      )}
    </div>
  );
};

export default NotesTab;
