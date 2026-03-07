---
name: taro-weapp-constraints
description: Build, style, debug, or review a Taro-based WeChat Mini Program in this repository. Use when editing `src/app.config.ts`, `src/pages/**`, `src/app.css`, tabBar settings, Tailwind/Taro styling, WXSS compatibility, WeChat DevTools white screens, or Taro build output under `dist/`.
---

# Taro Weapp Constraints

## Overview

Use this skill when working on the Taro WeChat Mini Program in this repo. Favor changes that survive Taro compilation and render correctly in WeChat DevTools, even if that means using plainer patterns than on the web.

## Workflow

1. Edit source under `src/`, not `dist/`.
2. Change navigation in `src/app.config.ts`.
3. Change shared base styles in `src/app.css`.
4. Change pages in `src/pages/**`.
5. Run `npm run build:weapp` after meaningful edits.
6. If build passes but DevTools shows a blank page, inspect `dist/app.wxss`, `dist/app.json`, and the newest DevTools log before changing page logic.

## Styling Rules

- Prefer stable Tailwind utility classes only.
- Avoid Tailwind arbitrary values such as `rounded-[20rpx]`, `w-[123rpx]`, `shadow-[...]`, and similar bracket syntax.
- Avoid slash-opacity classes such as `bg-white/10`, `border-white/20`, `text-slate-900/70`.
- Avoid relying on classes that compile to escaped selectors in WXSS. If `dist/app.wxss` contains `\`, treat that as a bug.
- Use inline `style` for:
  - `rpx`-based radii and spacing that need exact values
  - gradients
  - overlay opacity
  - uncommon shadows
  - one-off dimensions
- Keep `className` values simple and predictable. Good examples: `bg-white`, `rounded-xl`, `px-4`, `text-sm`, `grid-cols-2`.
- If a visual effect is optional, prefer the simpler WXSS-safe version.

## Navigation Rules

- Use native `tabBar` in `src/app.config.ts` for bottom navigation.
- Do not build a fake bottom nav inside pages unless the task explicitly requires a custom non-tab page footer.
- For tab switching, use `Navigator` with `openType="switchTab"`.
- Use normal page navigation only for non-tab pages.

## Page Rules

- Build pages with `@tarojs/components`, not DOM tags.
- Prefer explicit layout containers and visible content near the top of the page so white-screen debugging is easy.
- If a page is visually critical, make the first screen work with inline `style` first, then reintroduce safe utility classes gradually.
- When content looks blank, verify whether elements exist in `dist/pages/**/index.js` before assuming the route failed.

## Build And Debug

### Build check

- Run `npm run build:weapp`.
- Confirm `dist/app.json` includes the expected pages and `tabBar`.
- Confirm `dist/assets/**` contains required icons.

### WXSS failure

If DevTools reports `app.wxss ... unexpected '\'`:

1. Search `dist/app.wxss` for `\`.
2. Search `src/` for bracket utilities and slash-opacity utilities.
3. Replace those classes with inline `style` or simpler classes.
4. Rebuild and recheck that `dist/app.wxss` no longer contains `\`.

### White screen

If DevTools shows a blank page:

1. Confirm `npm run build:weapp` succeeds.
2. Check DevTools console for WXSS parse errors before JS errors.
3. Inspect the newest DevTools log in the repo if one was exported there.
4. Confirm the page exists in `dist/app.json`.
5. Confirm the page module in `dist/pages/**/index.js` contains rendered text/content.
6. Clear DevTools cache and recompile only after checking the generated files.

### DevTools environment

- Use the real `appid` in `project.config.json`, not tourist mode, when possible.
- If root import behaves oddly, try reimporting the project after a successful Taro build.
- Keep only one active `npm run dev:weapp` watcher.

## Project-Specific Guardrails

- Treat `dist/` as generated output.
- Treat `src/pages/home/index.tsx` as the first page to stabilize when the app turns blank.
- Keep Chinese copy in UTF-8 and verify with `Get-Content ... -Encoding UTF8` if terminal output looks garbled.
- If Tailwind appears to compile but DevTools renders poorly, prefer correctness over abstraction and move the unstable part to inline `style`.
