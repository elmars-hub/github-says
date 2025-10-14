"use client";

import { useState, useEffect } from "react";
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
import MotivationModal from "@/components/motivationModal";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [roast, setRoast] = useState("");
  const [motivation, setMotivation] = useState("");
  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramUser = searchParams.get("user");

    const savedUser = localStorage.getItem("github_user");
    const savedRoast = localStorage.getItem("github_roast");
    const savedMotivation = localStorage.getItem("github_motivation");

    if (paramUser) {
      setUsername(paramUser);

      if (savedUser && savedRoast && savedMotivation) {
        setUserData(JSON.parse(savedUser));
        setRoast(savedRoast);
        setMotivation(savedMotivation);
      } else {
        handleRoast(paramUser);
      }
    }
  }, []);

  useEffect(() => {
    if (userData && roast) {
      localStorage.setItem("github_user", JSON.stringify(userData));
      localStorage.setItem("github_roast", roast);
      localStorage.setItem("github_motivation", motivation);
    }
  }, [userData, roast, motivation]);

  const handleRoast = async (customUser?: string) => {
    const userToFetch = customUser || username.trim();
    if (!userToFetch) {
      toast("Hold up! Enter a GitHub username first 😅");
      return;
    }

    setLoading(true);
    setShowMotivation(false);

    localStorage.removeItem("github_user");
    localStorage.removeItem("github_roast");
    localStorage.removeItem("github_motivation");

    router.replace(`?user=${userToFetch}`);

    try {
      const user = await fetchGitHubUser(userToFetch);
      const repos = await fetchGitHubRepos(userToFetch);

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

  const handleClose = () => {
    setUserData(null);
    setShowMotivation(false);
    setUsername("");
    localStorage.removeItem("github_user");
    localStorage.removeItem("github_roast");
    localStorage.removeItem("github_motivation");
    router.replace("/");
  };

  const handleShowMercy = () => {
    setShowMotivation(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <AnimatePresence>
        {!userData && !loading && (
          <HeroSection
            username={username}
            setUsername={setUsername}
            loading={loading}
            handleRoast={() => handleRoast()}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <AnimatePresence>
        {userData && !loading && (
          <ResultModal
            userData={userData}
            roast={roast}
            motivation={motivation}
            showMotivation={showMotivation}
            onClose={handleClose}
            onShowMercy={handleShowMercy}
          />
        )}
      </AnimatePresence>

      <MotivationModal
        show={showMotivation}
        onClose={() => setShowMotivation(false)}
        message={motivation}
        username={userData?.name}
      />
    </div>
  );
}
