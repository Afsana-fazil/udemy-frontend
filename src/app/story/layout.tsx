import AlternativeNavbar from '@/components/layouts/Navbar';
import AlternativeFooter from '@/components/layouts/Footer';

export const metadata = {
  title: 'Stories | Udemy',
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col text-black">
      <AlternativeNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <AlternativeFooter />
    </div>
  );
} 