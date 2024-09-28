"use client";

import { useState } from "react";

// Placeholder for form fetching logic (can be replaced with actual API later)
const useLatestForm = () => {
    // Simulating a fetched form for now
    return [{ title: "Sample Form" }];
};

// Placeholder for form mutation logic (can be replaced with actual API later)
const useCreateForm = () => {
    const [isPending, setPending] = useState(false);

    const mutate = (data: { title: string }) => {
        setPending(true);
        // Simulate form creation delay
        setTimeout(() => {
            setPending(false);
            console.log("Form Created:", data.title); // Placeholder for actual API
        }, 1000);
    };

    return {
        mutate,
        isPending,
    };
};

// Generic form component
export function LatestForm() {
    const [latestForm] = useLatestForm(); // Fetching the latest form
    const { mutate, isPending } = useCreateForm(); // Form creation handler

    const [title, setTitle] = useState("");

    return (
        <div className="w-full max-w-xs">
            {latestForm ? (
                <p className="truncate">Your most recent form: {latestForm.title}</p>
            ) : (
                <p>You have no forms yet.</p>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutate({ title });
                    setTitle(""); // Reset title input after submission
                }}
                className="flex flex-col gap-2"
            >
                <input
                    type="text"
                    placeholder="Form Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-full px-4 py-2 text-black"
                />
                <button
                    type="submit"
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
