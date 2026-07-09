import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Ali Ghulam Hussain — Full-Stack Developer",
  description:
    "Final-year CS student at the University of Sindh who builds and ships real production software. 8+ systems delivered for real businesses and institutions in Pakistan and internationally.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="bg-canvas text-ink font-body antialiased selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
