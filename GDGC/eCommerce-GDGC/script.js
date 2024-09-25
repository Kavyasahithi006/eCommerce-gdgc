const apiURL = "https://fakestoreapi.com/products";
let cart = [];
let items = [];

// Fetch items from Fake Store API and display them
fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            // Adjust the price to something more realistic, e.g., multiply by 5
            return { ...item, price: (item.price * 5).toFixed(2) };
        });
        displayItems(items);
    });

// Function to display items dynamically on the page
function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Rs.${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        container.appendChild(itemDiv);
    });
}

// Function to add item to the cart
function addToCart(id) {
    const item = items.find(item => item.id === id);
    const cartItem = cart.find(cartItem => cartItem.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.title} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    totalPrice.innerText = total.toFixed(2);
}

// Function to remove item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery));
    displayItems(filteredItems);
});