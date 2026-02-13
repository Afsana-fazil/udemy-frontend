"use client";

import AlternativeNavbar from './Navbar';
import AlternativeFooter from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AlternativeLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AlternativeNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <AlternativeFooter />
    </div>
  );
} 