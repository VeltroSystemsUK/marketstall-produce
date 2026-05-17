import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { BasketProvider } from "@/contexts/BasketContext";
import config from "@/site.config";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = `${config.brand.name} — ${config.brand.location}`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${config.brand.name}`,
  },
  description: config.brand.description,
  keywords: [
    "farm shop",
    "seasonal vegetables",
    config.brand.location,
    "organic produce",
    "veg box",
    "farm direct",
  ],
  authors: [{ name: "Veltro Ltd" }],
  creator: "Veltro Ltd",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: config.brand.name,
    title,
    description: config.brand.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.brand.name,
    description: config.brand.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f6d2d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body>
        <AuthProvider>
          <BasketProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#1d5626",
                  color: "#fff",
                  borderRadius: "10px",
                  fontFamily: "var(--font-dm-sans)",
                },
                success: {
                  iconTheme: { primary: "#f47220", secondary: "#fff" },
                },
              }}
            />
          </BasketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
