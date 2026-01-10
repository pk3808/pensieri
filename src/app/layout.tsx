import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google"; // Import clean sans and serif fonts
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { BookmarkProvider } from "@/context/BookmarkContext";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pensieri | Read, Write, Inspire",
  description: "A modern platform for thinkers and readers.",
  icons: {
    icon: '/inkwise.png',
    apple: '/inkwise.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pensieri",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable}`}>
        <ThemeProvider>
          <BookmarkProvider>
            {children}
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

