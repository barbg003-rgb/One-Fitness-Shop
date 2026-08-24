async function loadShop() {
  const grid = document.getElementById("product-grid");

  let data;
  try {
    const res = await fetch("products.json", { cache: "no-store" });
    data = await res.json();
  } catch (err) {
    grid.innerHTML = "<p>Could not load products. Check that products.json is valid.</p>";
    return;
  }

  document.getElementById("shop-name").textContent = data.shopName || "My Shop";
  document.getElementById("tagline").textContent = data.tagline || "";
  document.title = data.shopName || "Shop Window";

  const currency = data.currency || "";
  const contactLink = data.contactLink || "";
  const contactLabel = data.contactLabel || "Message me";

  const products = Array.isArray(data.products) ? data.products : [];

  if (products.length === 0) {
    grid.innerHTML = "<p>No products yet. Add some to products.json.</p>";
    return;
  }

  grid.innerHTML = "";

  for (const product of products) {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const img = document.createElement("img");
    img.src = product.image || "images/placeholder.svg";
    img.alt = product.name || "Product photo";
    img.loading = "lazy";
    imageWrap.appendChild(img);

    if (product.sold) {
      const badge = document.createElement("div");
      badge.className = "sold-badge";
      badge.textContent = "Sold";
      imageWrap.appendChild(badge);
    }

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h2");
    name.className = "product-name";
    name.textContent = product.name || "Untitled";

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price ? `${currency}${product.price}` : "";

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description || "";

    info.appendChild(name);
    info.appendChild(price);
    info.appendChild(description);

    if (contactLink) {
      const button = document.createElement("a");
      button.className = "contact-button" + (product.sold ? " disabled" : "");
      button.href = contactLink;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.textContent = product.sold ? "Sold" : contactLabel;
      info.appendChild(button);
    }

    card.appendChild(imageWrap);
    card.appendChild(info);
    grid.appendChild(card);
  }
}

loadShop();
