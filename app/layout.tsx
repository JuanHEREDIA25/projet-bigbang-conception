import "@/app/css/style.css"
import { Inter } from "next/font/google";
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Big Bang Conception",
    template: "%s | Big Bang Conception",

  }, 

  description: "Big Bang Conception accompagne particuliers et professionnels pour leurs projets de rénovation, plomberie, électricité, peinture et aménagement en Île-de-France.",
  icons: {
    icon: "/icon.png",
  },
    openGraph: {
    title: "Big Bang Conception",
    description:
      "Entreprise de rénovation, plomberie, électricité et peinture en Île-de-France.",
    type: "website",
    locale: "fr_FR",
    siteName: "Big Bang Conception",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
