import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Travel App',
  description: 'To manage and stamp your dream destinations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <Header /> */}
          {children}
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
