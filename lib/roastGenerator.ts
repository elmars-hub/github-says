// lib/roasts.ts
import { GitHubUser, GitHubRepo } from "./getGithubData";

const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

type LangMap = Record<string, string[]>;

const DATA = {
  intros: [
    "Alright {name}, I peeked at your GitHub. This won’t go well.",
    "Yo {name}, your GitHub slid into my DMs and it’s embarrassed.",
    "Hey {name}, I read your commits so you don't have to. Buckle up.",
    "{name}, your GitHub is that friend with amazing intentions and zero follow-through.",
    "Okay {name}, I stalked your repos. It’s a miracle if anything builds.",
    "Brace yourself {name}. This roast has deploy rights.",
    "Heads up {name}: your GitHub just filed a missing persons report.",
    "I looked at your profile and now I need therapy. Sorry not sorry, {name}.",
    "{name}, your commit history is louder than your career.",
  ],
  repoCount: {
    low: [
      "Only {count} public repos? That’s not a profile, that’s a pause screen.",
      "{count} repos? I thought you were staging your career in private mode.",
      "You’ve got {count} repos three of them are README experiments and the rest are nap projects.",
    ],
    mid: [
      "{count} repos you start things passionately, finish them not at all.",
      "{count} projects. Looks like you collect prototypes like trading cards.",
      "{count} repos is respectable if this were a garage sale of half-finished dreams.",
    ],
    high: [
      "{count} repos?! You’re speed running projects and leaving bodies in your wake.",
      "{count} repos is this a portfolio or an archaeological dig?",
      "Wow {count} repos. At this point your GitHub needs a therapist and a cleaner.",
    ],
  },
  repoExamples: [
    "I peeked at `{repo}` the README is the only thing polished. The code is a tribute to chaos.",
    "`{repo}` looks like you gave up at 2 AM, left TODOs everywhere, and called it 'v2-final'.",
    "Your repo `{repo}` has more commented-out experiments than functioning code. Bravo.",
    "`{repo}`'s tests failing? Surprised? Me neither.",
    "I opened `{repo}` and instantly felt existential dread. Cute project.",
    "`{repo}` a majestic shrine to copy-paste coding and forgotten variables.",
    "Scrolling through `{repo}` was like watching a car crash in slow motion. Riveting.",
    "`{repo}`'s commit history screams 'I promised myself I’d finish this, but life happened.'",
    "Opening `{repo}` is like entering Narnia if Narnia was abandoned and buggy.",
    "`{repo}`: 10 files, 8 broken, 2 'experimental'. GitHub deserves a medal for patience.",
    "`{repo}` every function name is a mystery wrapped in a typo. Adventure awaits.",
    "You called it `{repo}` but it’s more like 'Area 51 of bugs'.",
    "`{repo}` where semicolons go to die and variables lose meaning.",
    "`{repo}` is the digital equivalent of 'we tried our best' written in blood, sweat, and typos.",
    "Ran `{repo}` locally. I’m now questioning my life choices. Thanks, I guess.",
    "`{repo}` a living testament to procrastination and questionable coffee intake.",
  ],
  followerRoasts: {
    low: [
      "{count} followers? Even your alt accounts are shy.",
      "{count} followers you throw virtual parties and no one shows up.",
      "{count}? Your follower list could host a tiny breakfast.",
      "{count} followers… the population of a small village, and half are bots.",
      "{count} followers. I’ve seen more attention given to a lost sock.",
      "{count}? Your repo notifications get more action than your follower list.",
      "{count} followers… they probably just like your profile pic, not your code.",
    ],
    mid: [
      "{count} followers: just enough to pretend you have clout on Tuesday mornings.",
      "{count} followers  one good tweet away from either fame or disaster.",
      "{count} followers. Congratulations, you have a small fan club of worried onlookers.",
      "{count} followers enough to be noticed, not enough to be respected.",
      "{count} followers. Your code is probably more popular in alternate timelines.",
    ],
    high: [
      "{count} followers? Okay, influencer. Now fix your bugs before a bot notices.",
      "{count} followers and you still push tragedies to master. Impressive confidence.",
      "{count} followers… celebrities call. They want their chaos back.",
      "{count} followers fame doesn’t save you from your own buggy code.",
      "{count} followers. All eyes on you… hope you remembered to git commit.",
      "{count} followers? The crowd is watching while your CI is failing spectacularly.",
    ],
  },
  activity: [
    "Last push was {days} days ago  your repos are on permanent sabbatical.",
    "No commits in {months} months? Your local machine misses you.",
    "Last commit {years} year(s) ago. Did your keyboard retire?",
    "You pushed {days} days ago and called it a day. I called it a career nap.",
    "Last activity: {days} days ago. Your contribution graph looks like a desert.",
    "It’s been {months} months since your last commit. Even GitHub forgot you existed.",
    "{years} years since a push? Your repos are more abandoned than my will to work on Mondays.",
    "{days} days without a commit? The code is probably plotting revenge.",
    "Last commit: {days} days ago. Your keyboard filed a missing persons report.",
    "You ghosted your repos for {months} months. Even StackOverflow is worried.",
  ],
  languageRoasts: {
    JavaScript: [
      "JavaScript again? You enjoy living dangerously and blaming closures.",
      "JS: where `undefined` is an adopted family member.",
      "You program in JavaScript like it’s a lifestyle, not a language. My condolences.",
    ],
    TypeScript: [
      "TypeScript you want safety but flirt with 'any' like it's your ex.",
      "TS user? You write types to feel alive and then cast everything to 'any'.",
      "You use TypeScript as armor. The bugs still find the chinks.",
    ],
    Python: [
      "Python? Your whitespace is louder than your logic.",
      "You write Python like you whisper instructions to a very opinionated snake.",
      "Pythonic? More like Pythoneer in need of structure.",
    ],
    Java: [
      "Java: you like verbosity, parentheses, and being morally superior to newer code.",
      "Still in Java? Enterprise called — they want their legacy back.",
      "Your Java project compiles slowly and judges you the whole time.",
    ],
    C: [
      "C? You like living on the edge — memory corruption is your cardio.",
      "In C you are very close to the metal and very far from sanity.",
      "Pointers? You pointer. And then you segfault.",
    ],
    "C++": [
      "C++? You signed up for undefined behavior and regretted it later.",
      "C++ devs are magicians who also set things on fire for fun.",
      "In C++ you write code that haunts you.",
    ],
    "C#": [
      "C# — elegant, structured, and secretly smug.",
      "You code in C# like you’re at a corporate gala.",
      "C# projects remind me of neat middle managers.",
    ],
    Go: [
      "Go: minimalism for people who love fmt.",
      "Go dev? You prefer clarity and silent resentment.",
      "Your Go module compiles and then judges your lack of tests.",
    ],
    PHP: [
      "PHP? I salute your bravery and your tolerance for chaos.",
      "PHP codebases are historic monuments. And slightly cursed.",
      "You maintain PHP like a parent tolerates a teenager's bedroom.",
    ],
    Ruby: [
      "Ruby: elegant and dramatic. Your code sounds like a poetry slam.",
      "Ruby dev? You romanticize DSLs and forgot tests.",
      "Rails? You like convention and subtle explosions.",
    ],
    Rust: [
      "Rust dev? Congratulations, you enjoy borrowing and suffering safely.",
      "You use Rust to prove you're both patient and ruthless.",
      "Rust: where borrow-checker therapy is a lifestyle.",
    ],
    Kotlin: [
      "Kotlin — concise, pretty, and occasionally passive-aggressive.",
      "Android + Kotlin = industrious optimism and memory leaks.",
      "You write Kotlin like it’s poetry with types.",
    ],
    Swift: [
      "Swift dev? You enjoy the Apple ecosystem and mild heartbreak.",
      "Swift feels like future-you wanted to be cool.",
      "Your Swift code runs smoothly and emotionally unavailable.",
    ],
    HTML: [
      "HTML top language? Congrats, you made a lot of boxes.",
      "Your HTML is a nesting doll of bad decisions.",
      "Div soup chef? That’s an honorific here.",
    ],
    CSS: [
      "CSS? You wage war with specificity and win sometimes.",
      "You bend CSS to your will and then lose micro-layout battles.",
      "CSS: where dreams go to be pixel-perfect or die trying.",
    ],
    Dart: [
      "Dart? Flutter is pretty your layout is questionable but visually brave.",
      "Dart dev you chase a single codebase and pray.",
      "Dart: charming and slightly opinionated.",
    ],
    R: [
      "R: made for stats, used for mystical data rituals.",
      "Your R scripts whisper 'regression' in the night.",
      "R dev? You like charts and quiet suffering.",
    ],
    Shell: [
      "Shell scripts: powerful, tiny, and secretly catastrophic.",
      "Your shell one-liners are elegant and terrifying.",
      "Bash: you write what you cannot explain later.",
    ],
    SQL: [
      "SQL: your data cries and your joins judge.",
      "You write queries that would make normal people cry.",
      "SQL master? You aggregate sins with GROUP BY.",
    ],
    Assembly: [
      "Assembly? You enjoy pain and tiny victories.",
      "Assembly dev: hardware hugs and lots of coffee.",
      "Your Assembly is a love letter to exhaustion.",
    ],
  } as LangMap,
  stars: {
    zero: [
      "ZERO stars. Even your dog didn’t star your repo.",
      "0 stars your repo is the sunless corner of GitHub.",
      "No stars. Cold, unforgiving void.",
      "Zero stars. Congratulations, your repo is officially invisible. 💀",
      "0 stars. Even bots passed on this one.",
    ],
    low: [
      "{count} stars? Someone appreciated your README at least.",
      "{count} stars — a small but loyal fanbase of confused viewers.",
      "{count} stars. Your code is niche… extremely niche. 🧐",
      "{count} stars. Not terrible… but not remarkable either.",
      "{count} stars. Somewhere out there, someone cried tears of joy. Or pity.",
    ],
    mid: [
      "{count} stars people like your work quietly.",
      "{count} stars; respectable, if you don't read the comment threads.",
      "{count} stars. Your code is finally creeping out of the shadows.",
      "{count} stars slow clap from the GitHub masses. 👏",
      "{count} stars. You’re trending in some microcosm of the coding world.",
    ],
    high: [
      "{count} stars?! The crowd noticed. Don’t let fame eat your brain.",
      "{count} stars. Celeb status: mild. Maintain humility.",
      "{count} stars! People are noticing… and probably judging your style.",
      "{count} stars the internet sees you now. No pressure. 😏",
      "{count} stars. Fame is here, but so is scrutiny. Balance accordingly.",
    ],
  },
  closings: [
    "Alright, roast over. Now go prove me wrong I dare you.",
    "That’s enough abuse for today. Ship something and then I’ll be quiet.",
    "Roast complete. Remember: pain builds better programmers.",
    "Okay. Cry. Commit. Repeat. You'll be fine.",
    "If this stung, good. Use it. Then open a PR and fix something.",
    "Roast done. Now go refactor and make me regret saying anything.",
    "Alright, I’ll stop roasting… for now. But your code won’t.",
    "Consider this your brutal push notification: code better tomorrow.",
    "End of roast. Remember, every fail is a hidden feature in disguise.",
    "Roast served. Time to ship, debug, and rise from the ashes.",
    "You survived this roast. Can you survive your next commit?",
    "Done roasting. Now go make your future self proud or at least slightly less embarrassed.",
    "Roast finished. Don’t take it personally take it as fuel.",
    "This is your GitHub roast. Consider it a brutal pep talk.",
    "End of line. Code hard, push harder, repeat forever.",
  ],
  motivations: [
    "Every buggy commit is proof you tried that's how you level up.",
    "Consistency beats inspiration. Push a tiny commit today.",
    "The next line you write could be your favorite. Keep going.",
    "You’re building experience, not reputation. Keep showing up.",
    "Even messy code is progress. Clean it later; ship it now.",
    "The best devs were once confused beginners. You're in good company.",
    "Failure is just feedback. Your next commit will be better.",
    "Don't quit because it's hard quit when you're done.",
    "Keep coding. Future you will thank you for one more commit.",
    "You have the curiosity now execute. One line at a time.",
    "Every bug you fix is an investment. Compound interest applies.",
    "Write the ugly version first. Refactor later. Ship today.",
  ],
};

function pickTopLanguages(repos: GitHubRepo[], n = 2) {
  const counts: Record<string, number> = {};
  repos.forEach((r) => {
    const l = (r.language || "Unknown").trim();
    if (!l) return;
    counts[l] = (counts[l] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, n).map((s) => ({ lang: s[0], count: s[1] }));
}

export const generateRoast = (
  user: GitHubUser,
  repos: GitHubRepo[]
): string => {
  const parts: string[] = [];
  const name = user.name || user.login || "friend";

  // intro
  let intro = random(DATA.intros).replace("{name}", name);
  parts.push(intro);

  // repo count
  const repoCount = user.public_repos ?? repos.length ?? 0;
  if (repoCount <= 0) {
    parts.push(
      `No public repos at all? Bold move. It's like showing up to a potluck with an empty Tupperware.`
    );
  } else if (repoCount < 6) {
    parts.push(
      random(DATA.repoCount.low).replace("{count}", String(repoCount))
    );
  } else if (repoCount < 31) {
    parts.push(
      random(DATA.repoCount.mid).replace("{count}", String(repoCount))
    );
  } else {
    parts.push(
      random(DATA.repoCount.high).replace("{count}", String(repoCount))
    );
  }

  // show one or two repo examples if available
  if (repos && repos.length > 0) {
    const sample = repos.slice(0, Math.min(3, repos.length));
    // pick 1-2 examples
    const exampleCount = Math.min(
      sample.length,
      Math.max(1, Math.floor(Math.random() * 2) + 1)
    );
    for (let i = 0; i < exampleCount; i++) {
      const r = random(sample);
      const repoName = r.name || "that repo";
      parts.push(random(DATA.repoExamples).replace("{repo}", repoName));
    }
  }

  // followers
  const followers = user.followers ?? 0;
  if (followers <= 0) {
    parts.push(
      random(DATA.followerRoasts.low).replace("{count}", String(followers))
    );
  } else if (followers < 50) {
    parts.push(
      random(DATA.followerRoasts.mid).replace("{count}", String(followers))
    );
  } else {
    parts.push(
      random(DATA.followerRoasts.high).replace("{count}", String(followers))
    );
  }

  // activity
  let lastPush =
    repos && repos.length > 0 ? new Date(repos[0].pushed_at) : null;
  if (lastPush && !isNaN(lastPush.getTime())) {
    const days = Math.floor(
      (Date.now() - lastPush.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days > 365) {
      parts.push(
        DATA.activity[2]
          .replace("{years}", String(Math.floor(days / 365)))
          .replace("{days}", String(days))
      );
    } else if (days > 180) {
      parts.push(
        DATA.activity[1]
          .replace("{months}", String(Math.floor(days / 30)))
          .replace("{days}", String(days))
      );
    } else if (days > 60) {
      parts.push(DATA.activity[3].replace("{days}", String(days)));
    } else {
      // active user, but playful jab
      parts.push(
        `Active recently (${days} days). Good. Don't let that be your one productive week.`
      );
    }
  } else {
    parts.push(
      "No recent push metadata found — spooky. Are your commits invisible or imaginary?"
    );
  }

  // top languages
  const topLangs = pickTopLanguages(repos, 2);
  if (topLangs.length > 0) {
    // primary
    const primary = topLangs[0].lang;
    const langRoasts = (DATA.languageRoasts as LangMap)[primary];
    if (langRoasts && langRoasts.length > 0) {
      parts.push(random(langRoasts));
    } else {
      // fallback for unknown languages
      parts.push(
        `You code in ${primary}. Interesting taste. I won't judge... much.`
      );
    }

    // sometimes roast second language too
    if (topLangs[1]) {
      const second = topLangs[1].lang;
      const secRoasts = (DATA.languageRoasts as LangMap)[second];
      if (secRoasts && secRoasts.length > 0 && Math.random() < 0.6) {
        parts.push(random(secRoasts));
      }
    }
  } else {
    parts.push(
      "I couldn't detect a dominant language — either you polyglot or your repos hide in shame."
    );
  }

  // stars
  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  if (totalStars === 0) {
    parts.push(random(DATA.stars.zero));
  } else if (totalStars < 20) {
    parts.push(random(DATA.stars.low).replace("{count}", String(totalStars)));
  } else if (totalStars < 200) {
    parts.push(random(DATA.stars.mid).replace("{count}", String(totalStars)));
  } else {
    parts.push(random(DATA.stars.high).replace("{count}", String(totalStars)));
  }

  // random extra spicy line (chance)
  if (Math.random() < 0.45) {
    const spicy = [
      "Your repo structure looks like a fire drill map from a haunted house.",
      "At least your mistakes are consistent. That’s admirable in a weird way.",
      "If your code had a dating profile it'd say: 'commits occasionally, commitment phobic'.",
      "You code like you double-press 'commit' hoping one will be good.",
    ];
    parts.push(random(spicy));
  }

  // closing - mix dark with encouragement
  parts.push(random(DATA.closings));

  // join with paragraphs
  return parts.join("\n\n");
};

export const getMotivationMessage = (): string => {
  // Return a slightly more personal motivation with some chance of a "micro advice" extra sentence
  const base = random(DATA.motivations);
  const microTips = [
    "Try a tiny open-source contribution this week — one small PR.",
    "Pick one project and ship an MVP. Refactor later.",
    "Write one test for a broken feature. You'll learn more than you think.",
    "Document a tiny thing in your README. It feels good and helps others.",
    "Refactor one old function today — your future self will thank you.",
    "Add a comment to a confusing piece of code. Clarity is underrated.",
    "Spend 10 minutes reading docs for a library you use. Knowledge stacks.",
    "Push a draft branch — progress doesn't need perfection.",
    "Try solving a coding challenge in a language you don’t know well.",
    "Review one of your past repos. Celebrate improvements, note lessons.",
  ];
  const extra = Math.random() < 0.35 ? ` ${random(microTips)}` : "";
  return base + extra;
};
