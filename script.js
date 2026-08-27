let shopConfig = {};
let activeProduct = null;

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

  shopConfig = data;

  document.title = data.shopName || "Shop Window";

  const logo = document.getElementById("shop-logo");
  if (data.logo) {
    logo.src = data.logo;
    logo.alt = data.shopName || "Logo";
    logo.hidden = false;
  }

  const currency = data.currency || "";
  const orderButtonLabel = data.orderButtonLabel || "Order via Instagram";
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

    const button = document.createElement("button");
    button.type = "button";
    button.className = "contact-button" + (product.sold ? " disabled" : "");
    button.textContent = product.sold ? "Sold" : orderButtonLabel;
    if (!product.sold) {
      button.addEventListener("click", () => openOrderModal(product, currency));
    }
    info.appendChild(button);

    card.appendChild(imageWrap);
    card.appendChild(info);
    grid.appendChild(card);
  }
}

function openOrderModal(product, currency) {
  activeProduct = product;
  document.getElementById("order-product-name").textContent =
    `${product.name}${product.price ? ` — ${currency}${product.price}` : ""}`;
  document.getElementById("order-name").value = "";
  document.getElementById("order-quantity").value = 1;
  document.getElementById("order-notes").value = "";
  document.getElementById("order-form").hidden = false;
  document.getElementById("order-confirmation").hidden = true;
  document.getElementById("order-backdrop").hidden = false;
}

function closeOrderModal() {
  document.getElementById("order-backdrop").hidden = true;
  activeProduct = null;
}

function setupOrderModal() {
  document.getElementById("order-close").addEventListener("click", closeOrderModal);
  document.getElementById("order-done").addEventListener("click", closeOrderModal);

  document.getElementById("order-backdrop").addEventListener("click", (event) => {
    if (event.target.id === "order-backdrop") closeOrderModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOrderModal();
  });

  document.getElementById("order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeProduct) return;

    const customerName = document.getElementById("order-name").value.trim();
    const quantity = document.getElementById("order-quantity").value || "1";
    const notes = document.getElementById("order-notes").value.trim();
    const currency = shopConfig.currency || "";

    let message = `Hi! I'd like to order:\n${quantity} x ${activeProduct.name}`;
    if (activeProduct.price) message += ` (${currency}${activeProduct.price} each)`;
    message += `\n\nName: ${customerName}`;
    if (notes) message += `\nNotes: ${notes}`;

    const confirmationBox = document.getElementById("order-confirmation-message");
    confirmationBox.value = message;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(message).catch(() => {});
    }

    const link = shopConfig.instagramLink || "https://ig.me";
    window.open(link, "_blank", "noopener,noreferrer");

    document.getElementById("order-form").hidden = true;
    document.getElementById("order-confirmation").hidden = false;
  });
}

setupOrderModal();
loadShop();
