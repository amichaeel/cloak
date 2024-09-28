import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const session = await getServerAuthSession();

  // Fetch forms related to the current user (replace `api.form.getLatest` with your actual tRPC query)

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Manage Your <span className="text-[hsl(280,100%,70%)]">Forms</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/form/create"
            >
              <h3 className="text-2xl font-bold">Create New Form →</h3>
              <div className="text-lg">Start building your form.</div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/about"
            >
              <h3 className="text-2xl font-bold">About the App →</h3>
              <div className="text-lg">
                Learn more about the app and how to create powerful forms.
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {/* {session ? `Logged in as ${session.user?.name}` : "Not logged in"} */}
            </p>

          </div>


        </div>
      </main>
    </HydrateClient>
  );
}
