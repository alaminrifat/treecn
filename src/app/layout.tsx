import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://treecn.vercel.app"),
  title: "TreeCN - Tree View Components for shadcn/ui",
  description:
    "Beautiful, accessible tree view and file explorer components built with shadcn/ui. Composable, keyboard-navigable, and fully customizable.",
  openGraph: {
    title: "TreeCN - Tree View Components for shadcn/ui",
    description:
      "Beautiful, accessible tree view and file explorer components built with shadcn/ui.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCN - Tree View Components for shadcn/ui",
    description:
      "Beautiful, accessible tree view and file explorer components built with shadcn/ui.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
