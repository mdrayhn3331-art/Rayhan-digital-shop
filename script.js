// ================================
// Rayhan Digital Shop
// Complete script.js
// ================================

let cart = [];

// Load cart when page opens
window.onload = function () {
    const saved = localStorage.getItem("rayhan_cart");

    if (saved) {
        cart = JSON.parse(saved);
    }

    renderCart();
};

// Select Product
function selectProduct(name, price = "") {

    cart.push({
        name: name,
        price: price
    });

    saveCart();
    renderCart();

    alert(name + " added to cart.");
}

// Save Cart
function saveCart() {
    localStorage.setItem("rayhan_cart", JSON.stringify(cart));
}

// Remove Product
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Clear Cart
function clearCart() {

    if (confirm("Clear all products?")) {
        cart = [];
        saveCart();
        renderCart();
    }

}

// Render Cart
function renderCart() {

    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<li>No product selected.</li>";

    } else {

        cart.forEach((item, index) => {

            cartItems.innerHTML += `
            <li>
                <b>${item.name}</b><br>
                ${item.price ? "৳" + item.price : ""}
                <br>
                <button onclick="removeItem(${index})">
                Remove
                </button>
            </li>
            `;

        });

    }

    updateOrderLink();

}

// Messenger Order
function updateOrderLink() {

    const btn = document.getElementById("orderBtn");

    if (!btn) return;

    let msg = "🛍️ Rayhan Digital Shop Order\n\n";

    if (cart.length == 0) {

        msg += "No product selected.";

    } else {

        cart.forEach((item, i) => {

            msg += (i + 1) + ". " + item.name;

            if (item.price) {
                msg += " - ৳" + item.price;
            }

            msg += "\n";

        });

    }

    btn.href =
        "https://m.me/rayhan.editz.2?ref=" +
        encodeURIComponent(msg);

}

// Search
const search = document.getElementById("search");

if (search) {

    search.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            let text = card.querySelector("h3").innerText.toLowerCase();

            if (text.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}

console.log("Rayhan Digital Shop Ready ✅");
