import "~/styles/globals.css";
import Link from "next/link";
import Image from "next/image";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Cloak",
  description: "Privacy-first forms",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <div className="fixed left-0 right-0 top-3 z-50 mx-auto w-3/4 max-w-6xl">
      <nav className="flex justify-between rounded-full bg-gray-500 bg-opacity-30 bg-clip-padding p-4 shadow-[0_35px_60px_-15px_rgba(1,1,1,0.5)] backdrop-blur-2xl backdrop-filter">
        <div className="flex h-8">
          <Link href="/">
            <Image
              fill={true}
              src="/cloak-logo-full-alt.svg"
              alt="logo"
              className="mx-4 max-w-24"
            />
          </Link>
        </div>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </nav>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c] bg-fixed`}
    >
      <body className="h-screen flex-col items-center justify-center bg-transparent">
        <TRPCReactProvider>
          <NavBar />
          <div className="mt-24 h-full">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
