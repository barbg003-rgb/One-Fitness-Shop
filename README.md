# ONE Shop Window

A simple webpage that shows your products (photo, name, price) so you can link it in your bio. There's no checkout — people fill in a quick order form, their order details get copied to their clipboard, and it opens Instagram DMs for them to paste and send to you.

## How to add or edit a product

Open `products.json` and edit it directly (you can do this right in GitHub's website — no coding tools needed). Each product looks like this:

```json
{
  "name": "Blue Ceramic Mug",
  "price": "12.00",
  "image": "images/mug.jpg",
  "description": "Handmade, holds 300ml.",
  "sold": false
}
```

- **name** — the product title.
- **price** — just the number, no currency symbol (the symbol is added automatically).
- **image** — the path to the photo, e.g. `images/mug.jpg`. Put the actual photo file in the `images` folder first.
- **description** — a short line about it.
- **sold** — set to `true` to show a "Sold" badge and grey out the button. Set to `false` (or remove it) while it's available.

To add a new product, copy one of the blocks inside the `"products": [ ... ]` list, paste it as a new entry, and edit it. Don't forget the comma between entries.

## Adding photos

Put image files (`.jpg`, `.png`, etc.) in the `images` folder, then reference them in `products.json` as `images/yourfile.jpg`. Keep photos reasonably sized (under ~1MB each) so the page loads quickly.

## Shop settings

At the top of `products.json`:

- **shopName** — the title shown at the top of the page (used even if you have a logo, e.g. for the browser tab).
- **tagline** — the short line under the title.
- **logo** — path to your logo image, e.g. `images/logo.png`. Leave the file out and remove this line if you don't want a logo.
- **currency** — the symbol shown before each price, e.g. `£`, `$`, `€`.
- **instagramLink** — your Instagram DM link, e.g. `https://ig.me/m/yourusername`. This is where orders get sent. (Instagram doesn't support pre-filling a message the way WhatsApp does, which is why the order details get copied to the clipboard instead — see below.)
- **orderButtonLabel** — the text on each product's order button, e.g. "Order via Instagram".

## How the order button works

Each product has an "Order" button. Clicking it opens a small form (name, quantity, notes). Submitting the form:

1. Builds an order message, e.g.:
   > Hi! I'd like to order:
   > 2 x Blue Ceramic Mug (£12.00 each)
   >
   > Name: Alex Smith
   > Notes: Gift wrap please
2. Copies that message to the customer's clipboard.
3. Opens your Instagram DMs in a new tab, and shows the message on-screen so they can paste it in even if the clipboard copy didn't work (some browsers block clipboard access).

Nothing is charged or stored anywhere — it's just a pre-written message the customer pastes and sends themselves.

## Changing the look

- **Colours** — edit the `:root { ... }` values at the top of `style.css` (e.g. `--bg` is the page background, `--text` is the text colour, `--accent` is the button colour).
- **Font** — the site uses Google's "Oswald" font, loaded in `index.html`. To use a different font, swap the `<link href="https://fonts.googleapis.com/css2?family=...">` line for another Google Font, and update `font-family: "Oswald"` in `style.css` to match.

## Publishing with GitHub Pages

1. Create a new repository on GitHub (e.g. `shop-window`) and push this folder to it.
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. GitHub gives you a public link like `https://yourusername.github.io/shop-window/` — that's what you put in your bio.
5. Any time you edit `products.json` or add a photo and push the change (or edit directly on GitHub's website and commit), the live page updates automatically within a minute or two.

**If you edit `style.css` or `script.js`:** browsers can cache these files and keep showing an old version. In `index.html`, bump the `?v=2` number on the `style.css?v=2` and `script.js?v=2` lines (to `?v=3`, `?v=4`, etc.) whenever you change either file — that forces visitors' browsers to fetch the new version instead of an old cached one. `products.json` doesn't need this, it's already set up to always load fresh. If a visitor (or you) ever sees an old version despite this, a hard refresh (Ctrl+Shift+R on Windows) clears it.

## Trying it locally before publishing

Because the page loads `products.json` with `fetch`, opening `index.html` directly by double-clicking it won't work in most browsers (it blocks local file loading). To preview it on your computer, run a simple local server from this folder, for example:

```bash
npx serve .
```

Then open the link it gives you (usually `http://localhost:3000`).
