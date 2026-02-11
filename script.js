/* ============================
   SHOPPING CART
============================ */

// Get cart from sessionStorage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(itemName) {
  if (!itemName || itemName.trim() === "") {
    alert("Invalid item.");
    return;
  }

  const cart = getCart();
  cart.push(itemName.trim());
  saveCart(cart);
  alert(`${itemName} has been added to your cart.`);
}

// Open cart modal
function openCart() {
  const cart = getCart();
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
  sessionStorage.removeItem("cart");
  const cartList = document.getElementById("cartItems");
  if (cartList) cartList.innerHTML = "";
  alert("Cart has been cleared.");
  closeCart();
}

// Process order with validation
function processOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  alert("Thank you for your order!");
  sessionStorage.removeItem("cart");
  closeCart();
}

/* ============================
   SUBSCRIBE FORM (POPUP)
============================ */
document.addEventListener("DOMContentLoaded", function () {
  const subscribeForm = document.getElementById("subscribe-form");
  const subscribeEmail = document.getElementById("subscribeEmail");

  if (!subscribeForm || !subscribeEmail) return;

  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const emailInput = subscribeEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput)) {
      showSubscribePopup("Please enter a valid email address.");
      return;
    }

    showSubscribePopup(`Thank you for subscribing, ${emailInput}!`);
    subscribeEmail.value = "";
  });
});

/* ============================
   SUBSCRIBE POPUP FUNCTIONS
============================ */
function showSubscribePopup(message) {
  const popup = document.getElementById("subscribePopup");
  const popupMessage = document.getElementById("popupMessage");

  if (!popup || !popupMessage) return;

  popupMessage.textContent = message;
  popup.style.display = "flex";
}

function closeSubscribePopup() {
  const popup = document.getElementById("subscribePopup");
  if (!popup) return;
  popup.style.display = "none";
}

/* ============================
   CLICK OUTSIDE MODAL TO CLOSE
============================ */
window.onclick = function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/* ============================
   Client Feedback & Custom Orders
============================ */
document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackMessage = document.getElementById("feedbackMessage");

  if (!feedbackForm || !feedbackMessage) return;

  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const zip = document.getElementById("zip").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation patterns
    const namePattern = /^[A-Za-z\s'-]{1,30}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    const zipPattern = /^\d{5}(-\d{4})?$/;
    const addressPattern = /^.{1,100}$/;
    const cityPattern = /^[A-Za-z\s]{1,50}$/;
    const statePattern = /^[A-Za-z\s]{1,50}$/;
    const messagePattern = /^.{1,500}$/;

    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
      feedbackMessage.textContent = "Please enter valid first and last names (letters only, max 30 characters).";
      feedbackMessage.style.color = "red";
      return;
    }

    if (!emailPattern.test(email)) {
      feedbackMessage.textContent = "Please enter a valid email address.";
      feedbackMessage.style.color = "red";
      return;
    }

    if (!phonePattern.test(phone)) {
      feedbackMessage.textContent = "Please enter a valid phone number (e.g., 123-456-7890).";
      feedbackMessage.style.color = "red";
      return;
    }

    if (!addressPattern.test(address) || !cityPattern.test(city) || !statePattern.test(state) || !zipPattern.test(zip)) {
      feedbackMessage.textContent = "Please enter valid address, city, state, and zip code.";
      feedbackMessage.style.color = "red";
      return;
    }

    if (!messagePattern.test(message)) {
      feedbackMessage.textContent = "Message is required and cannot exceed 500 characters.";
      feedbackMessage.style.color = "red";
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

    feedbackMessage.textContent = `Thank you for your message, ${firstName} ${lastName}!`;
    feedbackMessage.style.color = "green";
    feedbackForm.reset();
  });
});
