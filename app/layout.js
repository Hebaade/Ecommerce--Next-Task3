import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: "ShopZone",
  description: "Shop everything you love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: "100vh" }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}