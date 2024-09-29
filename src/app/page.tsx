
import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import TextGeneration from "./_components/ai";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="mt-16 text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome to Cloak
          </h1>
          <p className="max-w-4xl text-center text-xl">
            For <b>truly accurate</b> forms, you must promise respondent{" "}
            <span className="blur-sm transition-all hover:blur-none">
              anonymity.
            </span>
          </p>
          <div className="flex max-w-3xl flex-col items-center justify-between rounded-md bg-gray-700 bg-opacity-30 bg-clip-padding p-8 backdrop-blur-2xl backdrop-filter">
            <h2 className="mb-6 text-2xl font-bold">Why choose Cloak?</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <svg
                  className="mr-2 h-6 w-6 flex-shrink-0 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>AI-powered rewriting that eliminates language bias</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-2 h-6 w-6 flex-shrink-0 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Preserve original intent, without all the fluff</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="mr-2 h-6 w-6 flex-shrink-0 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Easy to use form building tools</span>
              </li>
            </ul>
          </div>

          <TextGeneration />
        </div>
      </main>
    </HydrateClient>
  );
}
