"use client";

import '../styles/globals.css'
import Header from "./Header";
import QueryWrapper from './QueryWrapper';


import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {

  return (
    <html>
      <body className='mx-4 md:mx-48 xl:mx-96 bg-gray-200'>
        <QueryWrapper>
          <SessionProvider children={''}>
            <Header />
            {children}
          </SessionProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
