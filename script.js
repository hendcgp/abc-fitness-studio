/* ============================
   SHOPPING CART
============================ */

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(itemName) {
  cart.push(itemName);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added.");
}

// Open cart modal
function openCart() {
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cartItems");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    cartList.appendChild(li);
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      cartList.appendChild(li);
    });
  }

  document.getElementById("cartModal").style.display = "block";
}

// Close cart modal
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  document.getElementById("cartItems").innerHTML = "<li>Your cart is empty.</li>";
}

// Process order
function processOrder() {
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const itemList = cart.join(", ");
  alert(
    "Thank you for your order!\n\nYour order of the following items has been processed:\n" + itemList
  );

  clearCart();
  closeCart();
}

/* ============================
   SUBSCRIBE FORM
============================ */

document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribe-form");
  const subscribeEmail = document.getElementById("subscribeEmail");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = subscribeEmail.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert(`Thank you for subscribing, ${email}!`);
      subscribeForm.reset();
    });
  }
});

/* ============================
   CLICK OUTSIDE MODAL TO CLOSE
============================ */

window.onclick = function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
