# Git Conventions

## DRAFT. Might change.

Commit conventions: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
Coding conventions: For now, use https://google.github.io/styleguide/cppguide.html as a guiding light, and use discretion.

## Branching conventions

- main - reflect the major version on mainnet - x.m.n happens here.
- testnet - reflect the version on testnet
- v{x+1} - next major version
- v{x} - version on main, that's no longer updated after x.0.0, unless a large set of changes are needed, in which case, it's reused.
- v{x-1} - 1 previous version kept.

- All v{\d} branches are "merged" into master with history.
- All leaf branches are always squashed into v{\d} or master, as one commit (Don't need to add cognitive overhead on initial attempts or repeated tries with unhelpful commits like "Fix test", "Fixes", "Attempt 2", "Fix lints", etc. Just do it and squash into one helpful unit).
  - Exception: If we have an `epic`. we try our best to avoid epics in the first place. But if something multi quarter long projects really need it. Epics follow same rule as v{\d}, but merge into v{\d}.

# Other branch names

- fix/*
- feature/*
- mod/* - maintenance, refactor, readability (helps us track how much time we spend on this against features or fixes, chores end up here)
- test/* - just for testing something, extra CI checks, random builds etc.
- epic/* - try best to avoid epics. use at your own discretion only if absolutely needed - they are a source of extra work more often than not.
- @<githubid>/* - user (note the `@` prefix). Do whatever here. It's your dedicated space. It's your rules. Reason for prefix: It's easier to target relaxed branch rules with prefix. Suggest this as user back-up, WIP code, random experiments, etc.

Experimented with the one letter prefixes: `f/`, `m/` to see if the shorter chars helped, but I noticed it wasn't natural to many and readability suffered. So moving back to more traditional conventions