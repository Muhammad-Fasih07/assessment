import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'small web',
  description: 'tiny browser for one-page sites',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
