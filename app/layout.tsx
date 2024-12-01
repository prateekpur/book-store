'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { store } from '@/app/store';
import { Provider, useSelector } from 'react-redux';

export default function RootLayout({
  children,
}: {
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
