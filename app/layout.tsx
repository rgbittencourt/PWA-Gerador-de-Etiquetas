import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gerador-etiquetas-inovalab.rogerio-bittencourt.chatgpt.site"),
  title: "Gerador de Etiquetas INOVALAB",
  description: "Crie e imprima etiquetas com QR Code para equipamentos e materiais do INOVALAB.",
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }, { url: "/etiquetas-icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/apple-touch-icon.png" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Etiquetas INOVALAB" },
  openGraph: {
    title: "Gerador de Etiquetas INOVALAB",
    description: "Crie etiquetas com QR Code para o inventário do INOVALAB.",
    url: "/",
    siteName: "Gerador de Etiquetas INOVALAB",
    images: [{ url: "/etiquetas-compartilhamento.png", width: 512, height: 512, alt: "Gerador de Etiquetas INOVALAB" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary", title: "Gerador de Etiquetas INOVALAB", description: "Crie etiquetas com QR Code para o inventário do INOVALAB.", images: ["/etiquetas-compartilhamento.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
