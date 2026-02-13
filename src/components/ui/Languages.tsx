"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Globe, X } from 'lucide-react'

const languages = ['English', 'Español', 'Français', 'Deutsch', 'हिन्दी', '中文']

export default function LanguageSelector({ icon, showLabel = true }: { icon?: React.ReactNode, showLabel?: boolean }) {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSelect = (lang: string) => {
    setSelectedLanguage(lang)
    console.log(`Selected language: ${lang}`)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-white hover:text-gray-300 px-3 py-2"
      >
        {icon ? icon : <Globe className="w-4 h-4" />}
        {showLabel && selectedLanguage}
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-black">Choose a language</h3>
              <button 
                onClick={() => setOpen(false)}
                className="text-black hover:text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(lang)}
                  className={`px-4 py-3 rounded-md cursor-pointer transition-colors text-black hover:text-purple-700 ${
                    selectedLanguage === lang 
                      ? 'bg-purple-100 text-black hover:text-purple-700' 
                      : 'hover:bg-purple-100'
                  }`}
                >
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}