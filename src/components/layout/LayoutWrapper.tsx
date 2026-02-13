'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import { SearchProvider } from '../../contexts/SearchContext'
import { AuthProvider } from '../../contexts/AuthContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const hideHeaderFooter = 
    pathname?.startsWith('/organization') || 
    pathname?.startsWith('/business') ||
    pathname?.startsWith('/story') ||
    pathname?.startsWith('/demo') ||
    pathname?.startsWith('/tour') ||
    pathname?.startsWith('/instructor')

  return (
    <AuthProvider>
      <SearchProvider>
        {!hideHeaderFooter && <Navbar />}
        <main className=''>{children}</main>
        {!hideHeaderFooter && <Footer />}
      </SearchProvider>
    </AuthProvider>
  )
} 