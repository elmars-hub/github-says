import { GitHubUser, GitHubRepo } from "./getGithubData";

export const generateRoast = (
  user: GitHubUser,
  repos: GitHubRepo[]
): string => {
  const roastParagraphs: string[] = [];

  // Brutal intro based on profile
  const intro = `Alright ${user.login}, let's talk about your GitHub profile. Buckle up... 🔥`;
  roastParagraphs.push(intro);

  // Repository Analysis - More detailed
  if (user.public_repos < 5) {
    roastParagraphs.push(
      `You've got ${user.public_repos} public repos. FIVE. I've seen people with more projects in their "test" folder. Are you gate keeping your genius or just procrastinating with tutorial hell? Either way, GitHub is judging you. Hard. 💀`
    );
  } else if (user.public_repos > 100) {
    roastParagraphs.push(
      `${user.public_repos} repositories?! My guy, this isn't Pokémon - you don't gotta catch 'em all. Half of these are probably abandoned "learning projects" you'll never touch again. Quality over quantity, but you chose chaos instead. 😭`
    );
  } else if (user.public_repos > 50) {
    roastParagraphs.push(
      `${user.public_repos} repos and counting... Someone needs to tell you that finishing projects is also important. Your profile looks like a graveyard of good intentions. May they rest in peace. ⚰️`
    );
  }

  // Followers roast - Extended
  if (user.followers < 5) {
    roastParagraphs.push(
      `${user.followers} followers? Bro, even your alt accounts unfollowed you. Your code is so underground it needs a rescue team. Maybe if you actually finished a project, people would notice? Just saying. 🥲`
    );
  } else if (user.followers < 20) {
    roastParagraphs.push(
      `${user.followers} followers... That's cute. You're basically coding in witness protection. Your repos are getting less attention than a backend developer at a design conference. 😂`
    );
  } else if (user.followers > 1000) {
    roastParagraphs.push(
      `${user.followers.toLocaleString()} followers and you still write bugs? Having fans doesn't make your code less broken, it just means more people witness your L's in real-time. The pressure must be immense. 💀`
    );
  }

  // Activity Analysis - Savage
  const lastPush = repos.length > 0 ? new Date(repos[0].pushed_at) : null;
  if (lastPush) {
    const daysSinceLastPush = Math.floor(
      (Date.now() - lastPush.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastPush > 365) {
      roastParagraphs.push(
        `Your last commit was ${Math.floor(
          daysSinceLastPush / 365
        )} YEAR(S) ago?! My brother in code, your repos are collecting more dust than my gym membership. Your keyboard is filing for abandonment. GitHub thought you were a myth. Come back to us. 😭💔`
      );
    } else if (daysSinceLastPush > 180) {
      roastParagraphs.push(
        `Last commit was ${Math.floor(
          daysSinceLastPush / 30
        )} months ago? Did you forget your password or did coding forget you? Your contribution graph looking like my will to live - completely flat. 📉`
      );
    } else if (daysSinceLastPush > 60) {
      roastParagraphs.push(
        `${daysSinceLastPush} days since your last push?! Taking "work-life balance" a bit too seriously, huh? Your repos are sending missing person reports. The grass you're touching must be REALLY nice. 🌱`
      );
    }
  }

  // Language roasting - No mercy
  const languages = repos.map((r) => r.language).filter(Boolean);
  const languageCount: Record<string, number> = {};
  languages.forEach((lang) => {
    if (lang) languageCount[lang] = (languageCount[lang] || 0) + 1;
  });
  const topLanguage = Object.entries(languageCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (topLanguage) {
    const [lang, count] = topLanguage;
    if (lang === "JavaScript") {
      roastParagraphs.push(
        `${count} JavaScript projects? You really enjoy living dangerously. "undefined is not a function" is probably your favorite error message at this point. TypeScript is RIGHT THERE, but you choose violence every single day. Respect... I guess? 🤡`
      );
    } else if (lang === "Python") {
      roastParagraphs.push(
        `Python enthusiast, huh? Let me guess - you import everything from StackOverflow and call it "leveraging community resources". Your code has more 'import' statements than actual logic. pip install talent when? 🐍💀`
      );
    } else if (lang === "Java") {
      roastParagraphs.push(
        `${count} Java repos?! Still writing 'public static void main' in 2025? My guy, even Java developers are learning other languages. Your AbstractSingletonProxyFactoryBean is not impressing anyone. It's giving 'I peaked in 2010' energy. ☕😭`
      );
    } else if (lang === "TypeScript") {
      roastParagraphs.push(
        `TypeScript user - you THINK you're writing safe code with all those types, but I bet you're using 'any' more than you'd admit. "Compiles successfully" doesn't mean it works, bestie. 📘🤓`
      );
    } else if (lang === "HTML") {
      roastParagraphs.push(
        `HTML as your top language? Okay, I see you. Div soup chef. Your semantic tags are probably as organized as your life. But hey, at least you're not using tables for layout... right? RIGHT?! 😰`
      );
    }
  }

  // Stars analysis - Brutal
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  if (totalStars === 0) {
    roastParagraphs.push(
      `ZERO stars. Not a single one. Even your README couldn't convince ONE person to click that button. Your mom has GitHub and she STILL didn't star your repos. That's actually impressive in the saddest way possible. 💔⭐`
    );
  } else if (totalStars < 10) {
    roastParagraphs.push(
      `${totalStars} total stars across ALL your repos? I've seen comments on Reddit with more upvotes. Your projects are like that kid picked last in gym class - technically there, but nobody's excited about it. 😬`
    );
  } else if (totalStars > 500) {
    roastParagraphs.push(
      `${totalStars.toLocaleString()} stars and you're still here getting roasted? Success hasn't humbled you one bit. Those stars are probably from bots anyway. Or pity stars. Definitely pity stars. 🌟😏`
    );
  }

  // Closing statement
  const closings = [
    "But hey, at least you're trying... I think. 🤷",
    "Anyway, keep coding or whatever it is you do. 💀",
    "GitHub still believes in you though... barely. 😅",
    "On the bright side, nowhere to go but up! 📈...right?",
    "Remember: every expert was once a beginner. You're just taking your time... lots of time. ⏰",
  ];

  roastParagraphs.push(closings[Math.floor(Math.random() * closings.length)]);

  return roastParagraphs.join("\n\n");
};

export const getMotivationMessage = (): string => {
  const messages = [
    "Every great dev started with bad commits. Keep going 💪",
    "Consistency beats perfection. You're improving with each push 🌟",
    "GitHub says... the best code is the next one you'll write ✨",
    "Your journey is unique. Don't compare your chapter 1 to someone's chapter 20 📚",
    "The fact that you're here means you care. That's what matters 💙",
    "Rome wasn't built in a day, and neither is a great GitHub profile 🏛️",
    "Your code might be messy now, but every line is a step forward 🚀",
    "Remember: even the best devs Google 'how to center a div' 🎯",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};
