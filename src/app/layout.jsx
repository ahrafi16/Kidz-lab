import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"]
});

export const fontBangla = localFont({
  src: './../fonts/mayaboti-normal.ttf',
})

export const metadata = {
  metadataBase: new URL("https://kidz-lab.vercel.app"),

  title: {
    default: "Kidz Lab",
    template: "%s | Kidz Lab"
  },
  description: "Explore high-quality products for kids learning and development. Fun, educational, and affordable collections available online.",

  keywords: [
    "kids learning",
    "educational toys",
    "kids products",
    "learning board",
    "children education",
  ],

  authors: [{ name: "ANJUM HOSSAIN" }],
  creator: "ANJUM HOSSAIN",
  publisher: "Kidz Lab",

  icons: {
    icon: "https://i.ibb.co.com/ZzW5bTmy/logo.png",
    shortcut: "https://i.ibb.co.com/ZzW5bTmy/logo.png",
    apple: "https://i.ibb.co.com/ZzW5bTmy/logo.png",
  },

  openGraph: {
    title: "Kidz Lab - Smart Learning for Kids",
    description:
      "Discover fun and interactive learning tools for children. Boost your child's creativity and knowledge.",
    url: "https://kidz-lab.vercel.app",
    siteName: "Kidz Lab",
    images: [
      {
        url: "https://i.ibb.co.com/GQ1sZ4d9/home-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Home Page Preview",
      },
      {
        url: "https://i.ibb.co.com/KxdZSNry/products-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Products Page Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kidz Lab - Kids Learning Platform",
    description:
      "Interactive and educational products for kids. Make learning fun and engaging.",
    images: ["https://i.ibb.co.com/GQ1sZ4d9/home-preview.jpg"],
    creator: "@yourtwitterhandle", // optional
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  alternates: {
    canonical: "https://kidz-lab.vercel.app",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header className="py-2 md:w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>

        <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
          {children}
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
}
