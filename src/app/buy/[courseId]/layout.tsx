import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Udemy',
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 