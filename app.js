
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const originalPrice = parseFloat(card.querySelector('.original-price').textContent);
        const discount = 0.2; // 20% discount
        const discountedPrice = originalPrice * (1 - discount);
        card.querySelector('.crossed-out-price').textContent = `₹${originalPrice.toFixed(2)}`;
        card.querySelector('.discounted-price').textContent = discountedPrice.toFixed(2);
    });

    // Create an empty cart array to store cart items
    const cart = [];

    // Function to add an item to the cart
    function addToCart(title, price) {
        const item = { title, price };
        cart.push(item);
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartItemsElement = document.getElementById("cart-items");
        const cartTotalElement = document.getElementById("cart-total");
        const showPrice = true; // Set this to false if you want to hide prices

        // Calculate the total price
        let total = 0;

        // Clear the cart display
        cartItemsElement.innerHTML = "";

        // Iterate through the cart items and display them
        for (const item of cart) {
            const listItem = document.createElement("li");
            if (showPrice) {
                listItem.textContent = `${item.title}: ₹${item.price}`;
            } else {
                listItem.textContent = `${item.title}`;
            }
            cartItemsElement.appendChild(listItem);

            total += parseFloat(item.price);
        }

        // Update the cart items count
        cartItemsElement.textContent = cart.length;

        // Update the total price
        cartTotalElement.textContent = total.toFixed(2);
    }

    // Add event listeners to the "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
            const titleElement = document.querySelectorAll(".card-title")[index];
            const priceElement = document.querySelectorAll(".discounted-price")[index];
            const title = titleElement.textContent;
            const price = priceElement.textContent;
            addToCart(title, price);
        });
    });
