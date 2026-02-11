/* ============================
   SHOPPING CART
============================ */

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(itemName) {
  cart.push(itemName);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Item added.');
}

// View cart modal
function viewCart() {
  const modal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Your cart is empty.';
    cartItems.appendChild(li);
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.classList.add('body-large');
      cartItems.appendChild(li);
    });
  }

  modal.style.display = 'block';
}

// Close cart modal
function closeCart() {
  const modal = document.getElementById('cartModal');
  modal.style.display = 'none';
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  document.getElementById('cartItems').innerHTML = '';
}

// Process order
function processOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your order!');
  clearCart();
  closeCart();
}

/* ============================
   FEEDBACK / CONTACT FORM
============================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const feedback = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString()
      };

      let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
      feedbacks.push(feedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

      alert(`Thank you for your feedback, ${feedback.name}!`);
      form.reset();
    });
  }

  // Subscribe form
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subscribe-email').value.trim();
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
  const modal = document.getElementById('cartModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
