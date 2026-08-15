import "./globals.css";
import { Providers } from "./providers";
import TopBanner from "../components/layout/Banner/TopBanner";
import Navbar from "../components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopBanner />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
