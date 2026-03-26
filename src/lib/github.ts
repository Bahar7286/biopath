interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

// GitHub URL veya kullanıcı adından username çıkar
function extractUsername(input: string): string {
  let cleaned = input.trim();
  // URL formatları: https://github.com/username, github.com/username, @username
  cleaned = cleaned.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
  cleaned = cleaned.replace(/^github\.com\//i, '');
  cleaned = cleaned.replace(/^@/, '');
  // Kalan slash ve parametreleri kaldır
  cleaned = cleaned.split('/')[0].split('?')[0];
  return cleaned;
}

export { extractUsername };

export async function fetchUserRepositories(
  usernameOrUrl: string,
  limit: number = 30
): Promise<GitHubRepo[]> {
  const username = extractUsername(usernameOrUrl);
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&order=desc&per_page=${limit}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();

    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    throw error;
  }
}

export async function fetchRepositoryDetails(owner: string, repo: string) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch repository details:', error);
    throw error;
  }
}

export async function getGitHubUserProfile(usernameOrUrl: string) {
  const username = extractUsername(usernameOrUrl);
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const user = await response.json();

    return {
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      company: user.company,
      location: user.location,
      blog: user.blog,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub user profile:', error);
    throw error;
  }
}

export type { GitHubRepo };
