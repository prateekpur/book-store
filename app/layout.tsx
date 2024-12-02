'use client';

import '../app/ui/dashboard/global.css';
import { inter } from './dashboard/ui/fonts';
import { store } from '@/app/store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </Provider>
  );
}
