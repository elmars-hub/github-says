export interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string;
  pushed_at: string;
}

export const fetchGitHubUser = async (
  username: string
): Promise<GitHubUser> => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("User not found");
  }
  return response.json();
};

export const fetchGitHubRepos = async (
  username: string
): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repos");
  }
  return response.json();
};
