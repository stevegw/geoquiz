# GitHub Pages Setup for Your Geo Quiz

## Your Specific Details

- **GitHub Username:** stevegw
- **Repository Name:** geoquiz
- **Your Quiz URL will be:** https://stevegw.github.io/geoquiz/geography_quiz.html

---

## Step-by-Step Instructions for YOUR Repository

### Step 1: Go to Repository Settings

1. Go to: **https://github.com/stevegw/geoquiz**
2. Click the **"Settings"** tab (near the top, has a gear icon ⚙️)
   - If you don't see Settings, make sure you're logged in as stevegw

### Step 2: Find GitHub Pages Settings

1. On the left sidebar, scroll down to the **"Code and automation"** section
2. Click **"Pages"** (it's about halfway down the sidebar)

### Step 3: Configure GitHub Pages

You'll see a page titled "GitHub Pages". Now:

1. Look for the section **"Build and deployment"**

2. Under **"Source":**
   - Click the dropdown (might say "None" or "Deploy from a branch")
   - Select: **"Deploy from a branch"**

3. Under **"Branch"** you'll see two dropdowns side by side:
   - **First dropdown:** Select **"main"** (or "master" if you see that instead)
   - **Second dropdown:** Select **"/ (root)"**

4. Click the **"Save"** button

### Step 4: Wait for Deployment

1. You'll see a message: "GitHub Pages source saved"
2. GitHub starts building your site (takes 30 seconds to 2 minutes)
3. **Refresh the page** after waiting about 1 minute
4. At the top, you'll see a box that says:
   - "Your site is ready to be published at https://stevegw.github.io/geoquiz/"
   - Then it will change to "Your site is live at https://stevegw.github.io/geoquiz/"

### Step 5: Visit Your Quiz!

1. Open a new browser tab and go to:
   ```
   https://stevegw.github.io/geoquiz/geography_quiz.html
   ```

2. Your quiz should load! 🎉

---

## Making It Easier to Share (Optional)

Right now, people need to type `geography_quiz.html` at the end. To make it simpler:

### Option: Rename to index.html

This way your quiz loads at just: **https://stevegw.github.io/geoquiz/**

**How to do it:**

1. In your repository (https://github.com/stevegw/geoquiz)
2. Click on **geography_quiz.html**
3. Click the **pencil icon** (✏️ Edit) in the top right
4. Change the filename from `geography_quiz.html` to `index.html`
5. Scroll down, add a commit message: "Rename to index.html"
6. Click **"Commit changes"**

**Then update these files:**

7. Edit **manifest.json**:
   - Click on `manifest.json`
   - Click the pencil icon to edit
   - Change `"start_url": "./geography_quiz.html"` to `"start_url": "./index.html"`
   - Commit changes

8. Edit **service-worker.js**:
   - Click on `service-worker.js`
   - Click the pencil icon to edit
   - Change `'./geography_quiz.html'` to `'./index.html'`
   - Commit changes

9. Wait 1-2 minutes for GitHub Pages to rebuild

10. Now visit: **https://stevegw.github.io/geoquiz/** (no filename needed!)

---

## Installing on Your iPhone

Once your site is live:

### Step 1: Open in Safari
1. On your iPhone, open **Safari** (must be Safari, not Chrome)
2. Go to: **https://stevegw.github.io/geoquiz/geography_quiz.html**
   (or just `/geoquiz/` if you renamed to index.html)

### Step 2: Add to Home Screen
1. Tap the **Share button** (square with up arrow at the bottom)
2. Scroll down and tap **"Add to Home Screen"**
3. You'll see your globe icon preview!
4. Name it "Geo Quiz" or whatever you like
5. Tap **"Add"** (top right)

### Step 3: Launch Your App
1. Go to your iPhone home screen
2. Find the new **Geo Quiz** icon with your purple globe
3. Tap it - runs fullscreen like a real app!
4. Works offline after the first visit

---

## Troubleshooting

### If You Get a 404 Error

Check that your files are in the **root** of the repository:

1. Go to: https://github.com/stevegw/geoquiz
2. You should see these files at the main level (NOT in a folder):
   - geography_quiz.html ✅
   - manifest.json ✅
   - service-worker.js ✅
   - icon-192.png ✅
   - icon-512.png ✅

If they're inside a folder, you need to move them to the root.

### If Icons Don't Show

1. Make sure you uploaded both `icon-192.png` and `icon-512.png`
2. Check they're in the root folder at: https://github.com/stevegw/geoquiz
3. File names must be exactly `icon-192.png` and `icon-512.png` (lowercase)
4. Try deleting the app from your home screen and reinstalling

### If Changes Don't Appear

1. Wait 1-2 minutes after making changes
2. Hard refresh: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
3. Clear your browser cache
4. Check the Actions tab in GitHub to see if the build succeeded

---

## Quick Reference

**Your URLs:**
- Repository: https://github.com/stevegw/geoquiz
- Settings: https://github.com/stevegw/geoquiz/settings/pages
- Live Quiz: https://stevegw.github.io/geoquiz/geography_quiz.html
- (After renaming): https://stevegw.github.io/geoquiz/

**Share this URL with friends on any device - it works on phones, tablets, and computers!**

---

## What to Do Now

1. ✅ Follow Steps 1-5 above to enable GitHub Pages
2. ✅ Visit https://stevegw.github.io/geoquiz/geography_quiz.html to test
3. ✅ (Optional) Rename to index.html for a cleaner URL
4. ✅ Install on your iPhone using Safari
5. ✅ Share the URL with friends!

Need help with any step? Let me know where you're stuck!
