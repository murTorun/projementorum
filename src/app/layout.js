import { Inter } from "next/font/google";
import "./styles/globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./(sections)/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ana Sayfa | Projementorum",
  description:
    "Projementorum ile Proje Yolculuğunuzda Yalnız Değilsiniz! Projementorum, mentor ve ekip arkadaşı bulma sürecinde size rehberlik edecek yenilikçi bir platformdur.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}> {children}</SessionProvider>
      </body>
    </html>
  );
}
