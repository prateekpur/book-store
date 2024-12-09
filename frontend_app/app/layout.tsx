'use client';

import { Provider } from 'react-redux';
import { ReactNode } from 'react';

import { inter } from './ui/fonts';
import { store } from './state/store';

import './global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </Provider>
  );
}
