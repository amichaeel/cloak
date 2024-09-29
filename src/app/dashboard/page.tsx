"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "~/components/ui/card"; // ShadCN Card component
import { Button } from "~/components/ui/button"; // ShadCN Button component
import { PlusIcon, EyeIcon } from "@heroicons/react/24/solid"; // Heroicons
import { Badge } from "~/components/ui/badge"; // ShadCN Badge component
import {
  FaceSmileIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/solid"; // Feedback Icons
import { ImNeutral2 } from "react-icons/im";



interface Form {
  id: number;
  name: string;
  submissionCount: number;
  createdAt: string;
  feedbackConsensus: "happy" | "neutral" | "sad"; // New property
}

const Dashboard = () => {
  const [forms, setForms] = useState<Form[]>([
    {
      id: 1,
      name: "Survey Form",
      submissionCount: 12,
      createdAt: "2024-09-25",
      feedbackConsensus: "happy",
    },
    {
      id: 2,
      name: "Feedback Form",
      submissionCount: 5,
      createdAt: "2024-09-20",
      feedbackConsensus: "neutral",
    },
    {
      id: 3,
      name: "Contact Form",
      submissionCount: 8,
      createdAt: "2024-09-15",
      feedbackConsensus: "sad",
    },
    // Add more forms as needed
  ]);

  const renderFeedbackIcon = (consensus: "happy" | "neutral" | "sad") => {
    switch (consensus) {
      case "happy":
        return (
          <FaceSmileIcon
            className="h-6 w-6 text-green-500"
            aria-label="Happy"
          />
        );
      case "neutral":
        return <ImNeutral2
          className="h-5 w-5 text-yellow-500"
          aria-label="Neutral" />;
      case "sad":
        return (
          <FaceFrownIcon
            className="h-6 w-6 text-blue-500"
            aria-label="Sad"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 sm:p-10 lg:p-16 text-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 sm:mb-0">Dashboard</h1>
        <Link href="/create">
          <Button variant="default" size="lg" className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Form
          </Button>
        </Link>
      </header>

      {/* Created Forms Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Forms</h2>
          {/* Optional: Add search or filter functionality here */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map((form) => (
            <Card
              key={form.id}
              className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-white">{form.name}</h3>
                  <span className="ml-3">
                    {renderFeedbackIcon(form.feedbackConsensus)}
                  </span>
                </div>
                <Badge variant="secondary">{form.submissionCount} Submissions</Badge>
              </div>
              <p className="mt-2 text-gray-300">
                Created on: <span className="font-medium">{form.createdAt}</span>
              </p>
              <Link href={`/forms/${form.id}`}>
                <Button
                  variant="outline"
                  size="default"
                  className="mt-4 w-full flex items-center justify-center"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  View Submissions
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
