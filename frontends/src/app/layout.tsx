import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import MainLayout from "@/layout/MainLayout";
import { Toaster } from "sonner";
import Provider from "@/provider/Provider";
// import ReduxProvider from "@/provider/ReduxProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Banking Application",
  description: "A Bank children can learn about banking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ReduxProvider>
      <Provider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className}`} suppressHydrationWarning>
          <Toaster richColors position="top-center" />
          <main>{children}</main>
        </body>
      </html>
    </Provider>
    // </ReduxProvider>
  );
}
