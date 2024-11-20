import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header/Header';
import ApolloWrapper from '@/components/Apolloprovider/ApolloWrapper';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Reise-Planlegger',
  description: 'En app for å planlegge reiser',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <Header
            title="Reise-Planlegger"
            links={[
              { href: '/', label: 'Hjem' },
              { href: '/about', label: 'Om' },
            ]}
          />
          <main>{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
