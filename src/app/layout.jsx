import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Metadata } from 'next';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "Martin's Next.js Template",
    template: "%s | Martin's Next.js Template",
  },
  description: 'This is a common next.js template',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className='min-h-dvh flex flex-col bg-base-100 text-base-content'>
        <Providers>
          <Header />
          <main className='snap-mandatory snap-y'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
