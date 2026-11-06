import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

/**
 * Fonts (Sora headings, Inter body) are loaded via a <link> to Google Fonts
 * rather than `next/font/google`. On this network the build-time font fetch is
 * blocked by the corporate TLS-intercepting proxy; the browser, which already
 * trusts the corporate CA, fetches them fine at runtime. The CSS variables
 * (--font-sora / --font-inter) are declared in globals.css to match Tailwind.
 */

export const metadata: Metadata = {
  title: "Credit Assist | AI-Powered Pre-Screening",
  description:
    "Credit Assist — an AI agent empowering commercial bankers with AI-driven credit pre-screening intelligence. One Opportunity, one request, one banker-reviewed report.",
  authors: [{ name: "Jacques van Heerden" }],
  // Internal, link-only site — keep it out of search engines entirely.
  // Belt-and-suspenders with public/robots.txt: this emits
  // <meta name="robots" content="noindex, nofollow, ..."> for crawlers that
  // ignore robots.txt.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1d1d3f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved/system theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ca-theme')||'light';var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:p-3 focus:text-navy"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
