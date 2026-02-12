/* ============================
   SHOPPING CART
============================ */

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(itemName) {
  cart.push(itemName);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert(`${itemName} has been added to your cart.`);
}

// View cart modal
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
  cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("There is no item in your cart.");
    return;
  }

  // Clear cart
  cart = [];
  sessionStorage.removeItem("cart");

  // Update cart display if modal is open
  const cartList = document.getElementById("cartItems");
  if (cartList) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  }

  alert("Your cart has been cleared.");
  closeCart();
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
    `Thank you for your order!\n\nYour order of the following items has been processed:\n${itemList}`
  );

  // Clear after order
  cart = [];
  sessionStorage.removeItem("cart");
  closeCart();
}

/* ============================
   SUBSCRIBE FORM
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("subscribeEmail");
      const email = emailInput.value.trim();

      if (email) {
        alert(`Thank you for subscribing, ${email}!`);
        subscribeForm.reset();
      }
    });
  }
});

/* ============================
   MODAL CLICK OUTSIDE TO CLOSE
============================ */
window.onclick = function(event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ============================
// CLIENT FEEDBACK FORM
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("emailAddress").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const state = document.getElementById("state").value.trim();
      const zip = document.getElementById("zip").value.trim();
      const message = document.getElementById("message").value.trim();

      const namePattern = /^[A-Za-z\s'-]{1,30}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
      const zipPattern = /^\d{5}(-\d{4})?$/;
      const addressPattern = /^.{1,100}$/;
      const cityPattern = /^[A-Za-z\s]{1,50}$/;
      const statePattern = /^[A-Za-z\s]{1,50}$/;
      const messagePattern = /^.{1,500}$/;

      if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        alert("Please enter valid first and last names (letters only, max 30 characters).");
        return;
      }

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (e.g., 123-456-7890).");
        return;
      }

      if (!addressPattern.test(address) || !cityPattern.test(city) || !statePattern.test(state) || !zipPattern.test(zip)) {
        alert("Please enter valid address, city, state, and zip code.");
        return;
      }

      if (!messagePattern.test(message)) {
        alert("Message is required and cannot exceed 500 characters.");
        return;
      }

      const feedbackData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        message
      };

      localStorage.setItem("clientFeedback", JSON.stringify(feedbackData));
      alert(`Thank you for your message, ${firstName} ${lastName}!`);
      feedbackForm.reset();
    });
  }
});
