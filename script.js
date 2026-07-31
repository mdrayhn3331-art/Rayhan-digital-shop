// ======================================
// Rayhan Digital Shop
// script.js - Part 1
// ======================================

let cart = [];

// Add Product
function selectProduct(productName, price = "") {

    cart.push({
        name: productName,
        price: price
    });

    saveCart();
    renderCart();
}

// Render Cart
function renderCart(){

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if(cart.length===0){
        cartItems.innerHTML="<li>No product selected.</li>";
        updateOrderLink();
        return;
    }

    cart.forEach((item,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
            <strong>${item.name}</strong>
            ${item.price ? `<br>৳${item.price}` : ""}
            <br>
            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(li);

    });

    updateOrderLink();

}

// Remove Item
function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

// Save Cart
function saveCart(){

    localStorage.setItem(
        "rayhan_cart",
        JSON.stringify(cart)
    );

}

// Load Cart
function loadCart(){

    const data=localStorage.getItem("rayhan_cart");

    if(data){

        cart=JSON.parse(data);

    }

    renderCart();

}

// Start
window.onload=loadCart;
// ======================================
// Rayhan Digital Shop
// script.js - Part 2
// ======================================

// Messenger Order Link
function updateOrderLink(){

    const orderBtn = document.getElementById("orderBtn");

    if(!orderBtn) return;

    let message = "🛍️ Rayhan Digital Shop Order\n\n";

    if(cart.length===0){

        message += "No product selected.";

    }else{

        cart.forEach((item,index)=>{

            message += `${index+1}. ${item.name}`;

            if(item.price){
                message += ` - ৳${item.price}`;
            }

            message += "\n";

        });

    }

    orderBtn.href =
    "https://m.me/rayhan.editz.2?ref=" +
    encodeURIComponent(message);

}


// Product Search
const searchInput = document.getElementById("search");

if(searchInput){

searchInput.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const cards=document.querySelectorAll(".card");

    cards.forEach(card=>{

        const title=card.querySelector("h3")
        .innerText.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

}
// ======================================
// Rayhan Digital Shop
// script.js - Part 3 (Final)
// ======================================

// Clear Cart
function clearCart() {
    if (!confirm("সব প্রোডাক্ট Cart থেকে মুছে ফেলতে চান?")) {
        return;
    }

    cart = [];
    saveCart();
    renderCart();

    alert("✅ Cart পরিষ্কার করা হয়েছে।");
}

// Order Button Click
const orderBtn = document.getElementById("orderBtn");

if (orderBtn) {

    orderBtn.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("⚠️ আগে অন্তত একটি Product Select করুন।");

            return false;
        }

    });

}

// Card Button Animation
document.querySelectorAll(".card button").forEach(btn => {

    btn.addEventListener("click", function () {

        this.innerHTML = "✔ Selected";
