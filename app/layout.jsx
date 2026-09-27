import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
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
  title: "Ali Ghulam Hussain — Full Stack Developer & AI Engineer",
  description:
    "Final-year CS student at the University of Sindh and founder of eduKtion, a school management SaaS running in live institutions. 2+ years shipping production software for real clients in Pakistan and internationally.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="bg-canvas text-ink font-body antialiased selection:bg-accent/30 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
