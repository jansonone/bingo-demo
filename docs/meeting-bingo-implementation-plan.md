# Meeting Bingo — Implementation Plan

## Context

The project at `/workspaces/bingo-demo` has documentation (PRD, UX research, architecture) but zero application code. The architecture doc provides verbatim, copy-paste-ready code for ~10 files. The remaining ~14 files are described but need to be authored. This plan builds the full MVP: a browser-based bingo game with live speech recognition that auto-detects buzzwords during meetings.

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS + Web Speech API + canvas-confetti
**Source of truth**: `/workspaces/bingo-demo/docs/meeting-bingo-architecture.md`

---

## Phase 0: Project Scaffolding

**Goal**: `npm run dev` serves a blank page with Tailwind working.

| File | Source |
|------|--------|
| `package.json` | Verbatim from arch doc |
| `vite.config.ts` | Verbatim from arch doc |
| `tailwind.config.js` | Verbatim from arch doc |
| `postcss.config.js` | Implement (standard tailwind + autoprefixer) |
| `tsconfig.json` | Implement (strict, ES2020, react-jsx, bundler resolution) |
| `index.html` | Implement (root div + module script) |
| `src/index.css` | Implement (3 Tailwind directives) |
| `src/main.tsx` | Implement (createRoot entry) |
| `public/favicon.svg` | Implement (simple bingo icon) |

Then run: `npm install && npm run dev`

---

## Phase 1: Types + Data

| File | Source |
|------|--------|
| `src/types/index.ts` | Verbatim — CategoryId, Category, BingoSquare, BingoCard, GameState, WinningLine, SpeechRecognitionState, Toast |
| `src/data/categories.ts` | Verbatim — 3 categories (agile, corporate, tech), 45 words each |

---

## Phase 2: Core Logic Libraries

| File | Source | Notes |
|------|--------|-------|
| `src/lib/cardGenerator.ts` | Verbatim | Fisher-Yates shuffle, 5x5 grid with center free space |
| `src/lib/bingoChecker.ts` | Verbatim | Checks 12 win conditions (5 rows, 5 cols, 2 diags), countFilled, getClosestToWin |
| `src/lib/wordDetector.ts` | Verbatim | Word-boundary matching, phrase substring matching, alias support |
| `src/lib/utils.ts` | Implement | `cn()` utility — simple filter-join (no extra deps needed) |
| `src/lib/shareUtils.ts` | Implement | `generateShareText()`, `copyToClipboard()`, `canNativeShare()`, `nativeShare()` |

---

## Phase 3: React Hooks

| File | Source | Notes |
|------|--------|-------|
| `src/hooks/useSpeechRecognition.ts` | Verbatim | Web Speech API wrapper with auto-restart, webkit fallback |
| `src/hooks/useLocalStorage.ts` | Implement | Generic `[value, setValue]` persistence hook |
| `src/hooks/useGame.ts` | **Implement (complex)** | Central hook: `fillSquare()`, `autoFillWord()`, `generateNewCard()`, `getFilledWords()`, tracks `detectedWords[]` |
| `src/hooks/useBingoDetection.ts` | Implement | Watches card state, calls `checkForBingo()` on change, fires `onWin` callback once |

---

## Phase 4: UI Components

### 4A: Primitives

| File | Notes |
|------|-------|
| `src/components/ui/Button.tsx` | Variants: primary/secondary/ghost, sizes: sm/md/lg |
| `src/components/ui/Card.tsx` | Container with optional hover effect |
| `src/components/ui/Toast.tsx` | Auto-dismiss notification, success/info/warning variants |

### 4B: Screen Components

| File | Source | Notes |
|------|--------|-------|
| `src/components/BingoSquare.tsx` | Verbatim | Conditional styles: default/filled/auto-filled/free/winning |
| `src/components/TranscriptPanel.tsx` | Verbatim | Listening indicator, last 100 chars, detected word pills |
| `src/components/BingoCard.tsx` | Implement | 5x5 CSS grid rendering BingoSquares, highlights winning line |
| `src/components/GameControls.tsx` | Implement | Listen toggle, new card button, filled count display |
| `src/components/LandingPage.tsx` | Implement | Title, tagline, "New Game" button, privacy notice |
| `src/components/CategorySelect.tsx` | Implement | 3 category cards with icon, description, word preview |
| `src/components/GameBoard.tsx` | **Implement (complex)** | Wires speech → word detection → auto-fill → bingo check |
| `src/components/WinScreen.tsx` | Implement | Confetti on mount, stats, share button, play again |

**Skip for MVP**: `src/context/GameContext.tsx` — the verbatim App.tsx uses prop drilling which is sufficient for this shallow component tree.

---

## Phase 5: Root App + Wiring

| File | Source |
|------|--------|
| `src/App.tsx` | Verbatim — screen router (landing → category → game → win), manages GameState |

---

## Phase 6: Verification

1. `npx tsc --noEmit` — all types compile
2. `npm run dev` — manual test of full flow:
   - Landing → Category Select → Game Board → Win Screen
   - Manual tap fills/unfills squares
   - Speech recognition requests mic, auto-fills on buzzwords
   - Row/column/diagonal win triggers confetti + stats
   - Share copies to clipboard
   - Play Again / Home navigation works
3. Test at 375px viewport for mobile responsiveness

---

## Key Implementation Notes

- **`cn()` utility**: The verbatim BingoSquare imports `cn` from `../lib/utils` but this file isn't provided. Implement as a simple filter-join — no need for `clsx`/`tailwind-merge` deps.
- **`useGame` hook**: Most complex piece. Must coordinate speech callbacks with card state. Use refs to avoid stale closures in the `startListening` callback.
- **Manual vs auto-fill**: Manual taps toggle. Auto-filled squares should not be unfillable by tap.
- **`canvas-confetti` 1.9.2** includes its own TS types — no `@types` package needed.

---

## File Count Summary

- **Verbatim from arch doc**: 10 files (copy directly)
- **Implement**: 14 files (new code)
- **Skipped**: 1 file (GameContext — unnecessary for MVP)
- **Total**: ~24 source files + configs
