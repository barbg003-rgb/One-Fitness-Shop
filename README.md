# ONE Shop Window

A simple webpage that shows your products (photo, name, price) so you can link it in your bio. There's no checkout — people fill in a quick order form and it opens WhatsApp with their order already typed out for them to send you.

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
- **whatsappNumber** — your WhatsApp number, digits only, with country code, no `+`, spaces or dashes. Example: a UK number `07911 123456` becomes `447911123456`. This is where orders get sent.
- **orderButtonLabel** — the text on each product's order button, e.g. "Order via WhatsApp".

## How the order button works

Each product has an "Order" button. Clicking it opens a small form (name, quantity, notes). Submitting the form opens WhatsApp with a message already typed out, e.g.:

> Hi! I'd like to order:
> 2 x Blue Ceramic Mug (£12.00 each)
>
> Name: Alex Smith
> Notes: Gift wrap please

The customer just has to hit send in WhatsApp — nothing is charged or stored anywhere, it's just a pre-filled message.

## Changing the look

- **Colours** — edit the `:root { ... }` values at the top of `style.css` (e.g. `--bg` is the page background, `--text` is the text colour, `--accent` is the button colour).
- **Font** — the site uses Google's "Oswald" font, loaded in `index.html`. To use a different font, swap the `<link href="https://fonts.googleapis.com/css2?family=...">` line for another Google Font, and update `font-family: "Oswald"` in `style.css` to match.

## Publishing with GitHub Pages

1. Create a new repository on GitHub (e.g. `shop-window`) and push this folder to it.
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. GitHub gives you a public link like `https://yourusername.github.io/shop-window/` — that's what you put in your bio.
5. Any time you edit `products.json` or add a photo and push the change (or edit directly on GitHub's website and commit), the live page updates automatically within a minute or two.

## Trying it locally before publishing

Because the page loads `products.json` with `fetch`, opening `index.html` directly by double-clicking it won't work in most browsers (it blocks local file loading). To preview it on your computer, run a simple local server from this folder, for example:

```bash
npx serve .
```

Then open the link it gives you (usually `http://localhost:3000`).
