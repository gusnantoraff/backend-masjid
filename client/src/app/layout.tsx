"use client";

import { ReactNode } from "react";
import "@/css/globals.css";
import 'aos/dist/aos.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
