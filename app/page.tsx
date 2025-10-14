"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  GitHubUser,
} from "@/lib/getGithubData";
import { generateRoast, getMotivationMessage } from "@/lib/roastGenerator";

import HeroSection from "@/components/heroSection";
import ResultModal from "@/components/resultModal";
import LoadingOverlay from "@/components/loadingoverlay";
import HowItWorks from "@/components/howItWorks";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [roast, setRoast] = useState("");
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivation, setMotivation] = useState("");

  const handleRoast = async () => {
    if (!username.trim()) {
      toast("Hold up! Enter a GitHub username first");
      return;
    }

    setLoading(true);
    setUserData(null);
    setShowMotivation(false);

    try {
      const user = await fetchGitHubUser(username.trim());
      const repos = await fetchGitHubRepos(username.trim());
      const generatedRoast = generateRoast(user, repos);
      const generatedMotivation = getMotivationMessage();

      setTimeout(() => {
        setUserData(user);
        setRoast(generatedRoast);
        setMotivation(generatedMotivation);
        setLoading(false);
      }, 3000);
    } catch {
      setLoading(false);
      toast("Oops! 😅 User not found or API limit reached.");
    }
  };

  const handleCloseModal = () => {
    setUserData(null);
    setShowMotivation(false);
    setUsername("");
  };

  const handleShowMercy = () => setShowMotivation(true);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <HeroSection
        username={username}
        setUsername={setUsername}
        loading={loading}
        handleRoast={handleRoast}
      />

      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <AnimatePresence>
        {userData && !loading && (
          <ResultModal
            userData={userData}
            roast={roast}
            motivation={motivation}
            showMotivation={showMotivation}
            onClose={handleCloseModal}
            onShowMercy={handleShowMercy}
          />
        )}
      </AnimatePresence>

      {!userData && !loading && <HowItWorks />}
    </div>
  );
}
