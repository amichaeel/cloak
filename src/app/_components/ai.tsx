'use client';

import React, { useState } from 'react';
import { api } from "~/trpc/react";

export default function TextGeneration() {
    const [prompt, setPrompt] = useState("");
    const [generatedText, setGeneratedText] = useState("");

    const generateText = api.openai.generateText.useMutation({
        onSuccess: (data) => {
            console.log('Text generated successfully:', data);
            setGeneratedText(data);
        },
        onError: (error) => {
            console.error('Error generating text:', error);
            setGeneratedText("An error occurred while generating text.");
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Input changed:', e.target.value);
        setPrompt(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with prompt:', prompt);
        generateText.mutate({ prompt });
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={handleChange}
                    placeholder="Enter your prompt"
                    className="w-full p-2 border rounded text-black"
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={generateText.isPending}
                >
                    {generateText.isPending ? "Generating..." : "Generate Text"}
                </button>
            </form>
            {generatedText && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="text-lg font-bold mb-2">Generated Text:</h2>
                    <p>{generatedText}</p>
                </div>
            )}
        </div>
    );
}