import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import TextGeneration from "./_components/ai";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="text-center text-6xl font-extrabold tracking-tight antialiased sm:text-[5rem]">
            <h1>
              Welcome to <span className="text-gradient">Cloak</span>
            </h1>
          </div>
          <p className="max-w-4xl cursor-default text-center text-xl">
            For <b>truly accurate</b> forms, you must promise respondent{" "}
            <span className="blur-sm transition-all hover:blur-none">
              anonymity.
            </span>
          </p>
          <div className="flex max-w-3xl flex-col items-center justify-between rounded-2xl bg-gray-500 bg-opacity-30 bg-clip-padding p-8 backdrop-blur-2xl backdrop-filter">
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
