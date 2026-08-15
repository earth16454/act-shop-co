import "./globals.css";
import { Providers } from "./providers";
import TopBanner from "../components/layout/Banner/TopBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopBanner />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
