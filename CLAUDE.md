# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**GeoQuiz** is a Progressive Web App (PWA) quiz application designed for PTC training content. It's a single-page application with no build process—the entire app is contained in `index.html` with inline CSS and JavaScript (~1,722 lines).

**Current Version:** v50.0

## Architecture

### Single-File Application Structure

The application uses a monolithic architecture where all HTML, CSS, and JavaScript are in `index.html`. This design choice eliminates build steps but requires careful organization:

- **Lines 1-638:** HTML structure with modals (Statistics, Settings)
- **Lines 639-1719:** JavaScript (inline `<script>` tag)
- **Styles:** Inline `<style>` in `<head>`

### Key Components

**Quiz Data (`quizzes/*.json`):**
```json
{
  "quizName": "Quiz Title",
  "description": "X multiple-choice questions...",
  "questions": [{
    "text": "Question?",
    "options": ["A", "B", "C", "D"],
    "correct": 2  // 1-based index
  }]
}
```

**Service Worker (`service-worker.js`):**
- Cache version: `v50` (must match app version)
- Strategy: Network-first for HTML/JSON, cache-first for assets
- Cache cleanup on activate
- Update handling with `SKIP_WAITING` message

### State Management (localStorage)

All client-side data persists in localStorage:

- `quizResults` - Array of completed quiz results
- `questionHistory` - Object tracking when questions were shown (by quiz name)
- `selectedQuiz` - Last selected quiz filename
- `questionCount` - Preferred question count (5/10/15/20/all)
- `largeFontMode` - Boolean for accessibility mode
- `anonymousUserId` - UUID for Supabase tracking
- `enableTracking` - Boolean for analytics opt-in

### Question Selection Algorithm

The app uses a freshness-based algorithm to prevent repetition:

1. Calculate "freshness" for each question (days since last shown, or Infinity if never shown)
2. Sort questions by freshness (prioritize unseen/old questions)
3. Create priority pool of top 60% freshest questions
4. Randomly select from priority pool first
5. Fill remainder from remaining pool if needed
6. Final shuffle for randomized order

**Implementation:** `selectRandomQuestions()` function (~80 lines)

## Supabase Integration

**Connection Details:**
- URL: `https://mtdazmjlzdokikopsxmv.supabase.co`
- Client variable: `supabaseClient` (renamed from `supabase` to avoid naming conflicts)
- Anonymous authentication only

**Database Tables:**

```sql
app_sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,  -- Anonymous client-generated UUID
  session_started_at TIMESTAMPTZ,
  app_version TEXT,
  platform TEXT,
  is_pwa BOOLEAN,
  is_ios BOOLEAN,
  user_agent TEXT
)

quiz_completions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id UUID REFERENCES app_sessions(id),
  quiz_name TEXT,
  score INTEGER,
  total_questions INTEGER,
  percentage INTEGER,
  completed_at TIMESTAMPTZ
)
```

**Key Functions:**
- `trackAppSession()` - Called on page load if tracking enabled
- `trackQuizCompletion()` - Called when quiz submitted
- `isTrackingEnabled()` - Checks localStorage preference

## Versioning System

**Version numbers appear in 5 places (must be synchronized):**

1. `service-worker.js` line 2: `const CACHE_VERSION = 'v50'`
2. `index.html` line 639: `<div class="version-info">v50.0</div>`
3. `index.html` line 748: `console.log('Version: v50.0')`
4. `index.html` line 804: `app_version: 'v50.0'` (Supabase tracking)
5. `index.html` line 731: Settings modal display

**When bumping versions:** Update all 5 locations to ensure cache invalidation works correctly.

## Common Development Workflows

### Adding a New Quiz (Auto-Discovery)

**New as of v52.0:** Quizzes are automatically discovered from `quizzes/manifest.json`

1. Create JSON file in `quizzes/` directory
2. Use 1-based indexing for `correct` field
3. Add entry to `quizzes/manifest.json`:
   ```json
   {
     "filename": "your-quiz-questions.json",
     "displayName": "Your Quiz Name",
     "description": "Brief description"
   }
   ```
4. Bump version number in all 5 locations
5. App will automatically populate dropdown and cache the new quiz

**No need to manually update:**
- ❌ Dropdown HTML in `index.html`
- ❌ Service worker `urlsToCache` array

The app fetches `quizzes/manifest.json` on load and:
- Builds the quiz selector dropdown dynamically
- Service worker auto-caches all quiz files listed in manifest

### Cleaning Duplicate Questions

Quiz files historically had duplicates with slight variations. To clean:

```javascript
// Node.js script to keep first N unique questions
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('quiz.json', 'utf8'));
data.questions = data.questions.slice(0, N);
data.description = `${N} multiple-choice questions...`;
fs.writeFileSync('quiz.json', JSON.stringify(data, null, 2));
```

### Testing Locally

No build step required:
1. Open `index.html` directly in browser, OR
2. Run simple HTTP server: `python -m http.server 8000`
3. Service worker requires HTTPS or localhost

### Deploying to GitHub Pages

1. Push to `main` branch
2. GitHub Pages auto-deploys from root directory
3. Service worker will handle cache invalidation via version number
4. Users may need hard refresh (Ctrl+Shift+R) or use Settings > Force Refresh

## Key JavaScript Patterns

### Duplicate Prevention

The app has three layers of duplicate detection:

1. **JSON Load Time:** Removes duplicates by question text
2. **Selection Time:** Uses Set to track selected questions
3. **Verification:** Final check before rendering

**Implementation:** See `loadQuestions()` lines 1019-1036 and `generateQuiz()` lines 1143-1158

### Quiz Submission Flow

1. Validate all questions answered
2. Calculate score
3. **For non-perfect scores:** Offer "Submit" or "Review Answers"
   - If Cancel: Highlight wrong answers in yellow, scroll to first
   - If OK: Show red for wrong answers
4. **For perfect scores:** Offer "New Quiz" or stay to review
5. Save to localStorage and Supabase
6. Keep quiz editable (no disable of inputs)

### Modal Pattern

Both Statistics and Settings modals use the same pattern:
- `modal.classList.add('active')` to show
- `modal.classList.remove('active')` to hide
- Click outside modal closes it
- Close button in header

### Force Refresh (iOS Cache Workaround)

iOS Safari aggressively caches PWAs. The force refresh function:

1. Backs up localStorage data (if requested)
2. Clears all caches via `caches.delete()`
3. Unregisters service workers
4. Restores data
5. Reloads with `window.location.reload(true)`

**Implementation:** `forceRefresh()` function lines 1522-1585

## Styling System

**Design Tokens:**
- Primary: `#667eea` (purple)
- Accent: `#764ba2` (darker purple)
- Success: `#28a745` (green)
- Error: `#dc3545` (red)
- Warning: `#ffc107` (yellow)

**State Colors:**
- `.selected` - Light purple background
- `.correct` - Green background
- `.incorrect` - Red background
- `.wrong-hint` - Yellow background with shake animation

**Large Font Mode:**
- Controlled by `body.large-font` class
- Increases all font sizes by 30-50%
- Larger buttons and padding
- Persistent via localStorage

## Service Worker Update Flow

1. Service worker checks for updates every 10 seconds
2. On `updatefound` event, shows update banner
3. User clicks "Update Now"
4. Sends `SKIP_WAITING` message to new worker
5. New worker calls `skipWaiting()` and `clients.claim()`
6. `controllerchange` event triggers page reload
7. New cache version active

**Critical:** Service worker must call `skipWaiting()` twice—once in install event and once on message—to handle all update scenarios.

## Testing Considerations

### Service Worker Testing

- Chrome DevTools > Application > Service Workers
- Check "Update on reload" for development
- Use "Unregister" to test clean install
- "Skip waiting" button simulates force update

### Cache Testing

- Application > Cache Storage to inspect cached files
- "Clear storage" to simulate first install
- Network throttling to test offline mode

### Supabase Testing

- Check browser console for "Session tracked: [UUID]"
- Check "Quiz completion tracked: [name] [score]"
- Verify in Supabase Table Editor

## Important Notes

### Don't Break These Patterns

1. **Never rename `supabaseClient` to `supabase`** - causes naming conflict with window.supabase library
2. **Always use 1-based indexing** for `correct` field in quiz JSON (not 0-based)
3. **Keep service worker cache version in sync** with app version
4. **Don't disable radio inputs after submission** - allows users to change answers
5. **Track question history before rendering** - prevents algorithm from breaking

### iOS-Specific Considerations

- PWAs on iOS cache very aggressively
- Service worker updates may not apply until app fully closed
- Force refresh feature specifically addresses iOS caching
- Test on actual iOS device, simulator caching differs

### Privacy & Tracking

- Tracking is **opt-in by default** (enabled)
- Anonymous UUIDs only, no personal data
- Settings modal allows disabling tracking
- All data stays in localStorage unless tracking enabled
- Question history cleanup (30+ days) prevents storage bloat

## File Organization

```
index.html              - Main application (all HTML/CSS/JS)
service-worker.js       - PWA caching logic
manifest.json           - PWA metadata
quizzes/manifest.json   - Quiz auto-discovery manifest (v52.0+)
quizzes/*.json          - Quiz question data
icon-*.png              - App icons for PWA installation
```

**Quiz Manifest Structure** (`quizzes/manifest.json`):
```json
{
  "quizzes": [
    {
      "filename": "quiz-file.json",
      "displayName": "Display Name in Dropdown",
      "description": "Optional tooltip description"
    }
  ]
}
```

This manifest enables auto-discovery: the app and service worker dynamically load quiz files without hardcoding.
