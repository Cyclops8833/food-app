# Nourish

A mobile-first Progressive Web App (PWA) nutrition reference tool for kids.
Browse and search 25 foods across fruits, vegetables, meat & fish, dairy,
and grains. Tap any food to see its nutrients, benefits, and a fun fact.

Works offline, installs to your home screen like an app, and stores
favourites and daily logs locally — no accounts or internet required.

---

## Running Locally

You'll need [Node.js](https://nodejs.org/) (version 18 or higher) installed.

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

To build for production:
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Editing Food Data

All food content lives in one file: **`src/data/foods.json`**

Each food is an object in the array. Here's what each field means:

| Field | Description |
|-------|-------------|
| `id` | Unique identifier (lowercase, hyphens for spaces). Used in the URL. |
| `name` | Display name of the food. |
| `category` | One of: `Fruit`, `Vegetable`, `Meat & Fish`, `Dairy`, `Grains & Legumes`, `Other` |
| `image` | A static Unsplash image URL (see note below). |
| `imageCredit` | Photographer's name for attribution (required by Unsplash). |
| `servingSize` | Plain-English serving description, e.g. `"one medium apple"`. |
| `nutrients` | Array of nutrients. Each has a `name` and a `strength`. |
| `benefits` | 2–3 sentences about health benefits, written for a child. |
| `pairsWith` | One sentence on a complementary food and why they work together. |
| `funFact` | One fun, child-friendly fact about the food. |

**Nutrient strength** must be exactly one of three values:
- `"good"` — shown as ●○○
- `"very good"` — shown as ●●○
- `"excellent"` — shown as ●●●

### Adding a New Food

1. Open `src/data/foods.json`
2. Copy an existing entry and paste it at the end of the array (before the final `]`)
3. Make sure there's a comma after the entry that came before it
4. Fill in all fields — leaving any field empty will cause an error
5. For the image URL, find a photo on [unsplash.com](https://unsplash.com),
   open it, right-click the image and copy the image address, or use the
   Unsplash API to get a direct URL
6. Save the file — the app will update automatically if `npm run dev` is running

### Editing Existing Food Content

Find the food entry by its `id`, edit any fields, save the file.
The app hot-reloads, so changes appear immediately in the browser.

---

## Installing on iPhone

Nourish can be installed to your iPhone home screen and used like a native app — no App Store required.

1. Open the app URL in **Safari** (must be Safari, not Chrome or Firefox)
2. Tap the **Share** button at the bottom of the screen (box with an arrow pointing up)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** in the top-right corner

The app will appear on your home screen and open full-screen with no browser chrome.
It works offline after the first visit — all food data and images are cached automatically.

---

## Deploying to Vercel

The easiest way to deploy Nourish publicly:

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New → Project** and import your repository
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**

Your app will be live at a `vercel.app` URL within a minute or two.
Every push to the `main` branch triggers a new deployment automatically.

For a custom domain, go to **Project Settings → Domains** in the Vercel dashboard.
