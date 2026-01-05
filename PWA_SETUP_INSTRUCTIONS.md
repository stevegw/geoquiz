# Progressive Web App Setup Instructions

Your Geography Quiz is now a Progressive Web App! Here's what you need to complete the setup:

## What's Been Done

✅ Created `manifest.json` - App metadata for installation
✅ Created `service-worker.js` - Enables offline functionality
✅ Updated `geography_quiz.html` - Added PWA meta tags and service worker registration

## What You Need to Do: Add Icons

The PWA needs two icon files to display properly on the home screen:

### Required Icons:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

### How to Create Icons:

#### Option 1: Use an Online Tool (Easiest)
1. Go to https://www.favicon-generator.org/ or https://realfavicongenerator.net/
2. Upload any image (logo, emoji, photo - at least 512x512 recommended)
3. Download the generated icons
4. Rename them to `icon-192.png` and `icon-512.png`
5. Place them in the same folder as `geography_quiz.html`

#### Option 2: Create Simple Icons with Design Tools
1. Use Canva, Figma, or any image editor
2. Create a 512x512 image with:
   - Purple gradient background (#667eea to #764ba2)
   - White text saying "GEO" or a globe emoji 🌍
3. Export as PNG at 512x512 and 192x192
4. Save as `icon-512.png` and `icon-192.png`

#### Option 3: Use Emoji as Icon (Quick & Fun)
1. Go to https://emojipng.com/
2. Download a globe 🌍 or map 🗺️ emoji as PNG
3. Resize to 512x512 and 192x192 using online tools
4. Save as the required filenames

### Temporary Solution:
If you don't have icons yet, the PWA will still work but won't have a custom icon on the home screen.

## How to Install on iPhone

1. **Host the files online** (all files must be on a web server):
   - Upload to GitHub Pages, Netlify, or Vercel (free)
   - Or use a local server for testing (see below)

2. **Open in Safari** on your iPhone

3. **Add to Home Screen**:
   - Tap the Share button (square with arrow)
   - Scroll down and tap "Add to Home Screen"
   - Choose a name and tap "Add"

4. **Open from Home Screen**:
   - Tap the new icon
   - Runs fullscreen like a native app!

## Testing Locally

To test before hosting online:

### Option 1: Python Server
```bash
# In the folder with your files, run:
python -m http.server 8000
# Then open: http://localhost:8000/geography_quiz.html
```

### Option 2: Node.js Server
```bash
# Install http-server globally
npm install -g http-server

# Run in your folder
http-server -p 8000
```

### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click `geography_quiz.html`
- Select "Open with Live Server"

## Features Your PWA Now Has

✨ **Install on Home Screen** - Works like a native app
✨ **Offline Support** - Service worker caches the quiz
✨ **Fullscreen Mode** - No browser UI when launched from home screen
✨ **App-like Experience** - Standalone display mode
✨ **Custom Theme** - Purple theme color on iOS

## Troubleshooting

**PWA won't install?**
- Must be served over HTTPS (or localhost for testing)
- Icons must exist and be accessible
- Check browser console for errors

**Service worker not working?**
- Check Developer Tools → Application → Service Workers
- Try hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

**Icons not showing?**
- Make sure icon files are in the same folder
- File names must match exactly: `icon-192.png` and `icon-512.png`
- Clear browser cache and reinstall

## Next Steps

1. Create the two icon files (192x192 and 512x512)
2. Upload all files to a web host
3. Test on your iPhone
4. Share the URL with friends!

Enjoy your Progressive Web App! 🎉
