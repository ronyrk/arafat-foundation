import type { Metadata, Viewport } from "next";
import { Anek_Bangla as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/components/ContextProvider";
import TanStackProvider from "@/components/TanStackProvider";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "@/components/scroll-to-top";

// Optimize font loading
const fontSans = FontSans({
  subsets: ["latin", "bengali"],
  variable: "--font-sans",
  display: "swap", // Improves font loading performance
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"]
});

// Enhanced metadata with better SEO
export const metadata: Metadata = {
  title: {
    default: "আরাফাত ফাউন্ডেশন",
    template: "%s | আরাফাত ফাউন্ডেশন"
  },
  description: "আরাফাত ফাউন্ডেশন - একটি সেবামূলক প্রতিষ্ঠান যা সমাজের কল্যাণে কাজ করে। শিক্ষা, স্বাস্থ্য ও সামাজিক উন্নয়নে আমাদের অবদান।",
  keywords: ["আরাফাত ফাউন্ডেশন", "ফাউন্ডেশন", "সেবা", "দাতব্য", "বাংলাদেশ", "সামাজিক সেবা"],
  authors: [{ name: "Rakibul Hasan" }],
  creator: "Rakibul Hasan",
  publisher: "আরাফাত ফাউন্ডেশন",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arafatfoundation.org'),
  alternates: {
    canonical: "/",
    languages: {
      'bn-BD': '/bn',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    title: "আরাফাত ফাউন্ডেশন",
    description: "আরাফাত ফাউন্ডেশন - একটি সেবামূলক প্রতিষ্ঠান যা সমাজের কল্যাণে কাজ করে।",
    siteName: "আরাফাত ফাউন্ডেশন",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "আরাফাত ফাউন্ডেশন"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "আরাফাত ফাউন্ডেশন",
    description: "আরাফাত ফাউন্ডেশন - একটি সেবামূলক প্রতিষ্ঠান যা সমাজের কল্যাণে কাজ করে।",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
};

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={fontSans.variable}
    >
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vercel.live" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          "selection:bg-primary/20 selection:text-primary-foreground"
        )}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                     bg-primary text-primary-foreground px-4 py-2 rounded-md z-50
                     transition-all duration-200"
        >
          Skip to main content
        </a>

        <TanStackProvider>
          <ContextProvider>
            {/* Header */}
            <header role="banner">
              <Navbar />
            </header>

            {/* Main content */}
            <main id="main-content" role="main">
              {children}
            </main>

            {/* Analytics - Load after main content */}
            <Analytics />
            <SpeedInsights />

            {/* Toast notifications */}
            <Toaster
              position="top-right"
              gutter={8}
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />

            {/* Footer */}
            <footer role="contentinfo">
              <Footer />
            </footer>

            {/* Scroll to top button - Extract to separate component for better performance */}
            <ScrollToTop />
          </ContextProvider>
        </TanStackProvider>

        {/* Schema markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "আরাফাত ফাউন্ডেশন",
              "description": "আরাফাত ফাউন্ডেশন - একটি সেবামূলক প্রতিষ্ঠান যা সমাজের কল্যাণে কাজ করে।",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"}/logo.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+880-XXX-XXXXXX",
                "contactType": "customer support",
                "availableLanguage": ["Bengali", "English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rangpur",
                "addressRegion": "Rangpur Division",
                "addressCountry": "BD"
              },
              "sameAs": [
                "https://facebook.com/yourpage",
                "https://twitter.com/yourhandle",
                // Add your social media URLs
              ]
            })
          }}
        />
      </body>
    </html>
  );
}