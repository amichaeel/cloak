import "~/styles/globals.css";
import Link from "next/link";

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
    <div className="fixed left-0 right-0 top-4 z-50 mx-auto w-3/4 max-w-6xl">
      <nav className="flex items-center justify-between rounded-full bg-gray-500 bg-opacity-30 bg-clip-padding p-4 shadow-[0_35px_60px_-15px_rgba(1,1,1,0.5)] backdrop-blur-2xl backdrop-filter">
        <div className="flex h-8 items-center">
          <img
            src="/cloak-logo-full-alt.svg"
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="flex items-center space-x-4">
          {session && (
            <p className="text-center text-xl font-semibold text-white">
              Logged in as {session.user?.name}
            </p>
          )}
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
    <html lang="en" className={`${GeistSans.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c]`}>
      <body className="min-h-screen flex-col items-center justify-center">
        <TRPCReactProvider>
          <NavBar />
          <div className="mt-24">
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
