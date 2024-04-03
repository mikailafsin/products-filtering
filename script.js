const products = [
    {
        name: "Sony Playstation 5",
        url: "images/playstation-5.png",
        category: "games",
        price: 499.99,
    },
    {
        name: "Samsung Galaxy",
        url: "images/samsung-galaxy.png",
        category: "smartphones",
        price: 399.99,
    },
    {
        name: "Cannon EOS Camera",
        url: "images/cannon-eos-camera.png",
        category: "cameras",
        price: 749.99,
    },
    {
        name: "Sony A7 Camera",
        url: "images/sony-a7-camera.png",
        category: "cameras",
        price: 1999.99,
    },
    {
        name: "LG TV",
        url: "images/lg-tv.png",
        category: "televisions",
        price: 799.99,
    },
    {
        name: "Nintendo Switch",
        url: "images/nintendo-switch.png",
        category: "games",
        price: 299.99,
    },
    {
        name: "Xbox Series X",
        url: "images/xbox-series-x.png",
        category: "games",
        price: 499.99,
    },
    {
        name: "Samsung TV",
        url: "images/samsung-tv.png",
        category: "televisions",
        price: 1099.99,
    },
    {
        name: "Google Pixel",
        url: "images/google-pixel.png",
        category: "smartphones",
        price: 499.99,
    },
    {
        name: "Sony ZV1F Camera",
        url: "images/sony-zv1f-camera.png",
        category: "cameras",
        price: 799.99,
    },
    {
        name: "Toshiba TV",
        url: "images/toshiba-tv.png",
        category: "televisions",
        price: 499.99,
    },
    {
        name: "iPhone 14",
        url: "images/iphone-14.png",
        category: "smartphones",
        price: 999.99,
    },
];

// Select DOM Elements
const productsWrapper = document.getElementById("products-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

// Inıt cart item count
let cartItemCount = 0;

// Inıt product element array
const productElements = [];

filtersContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

// Loop over products and create an element
products.forEach((product) => {
    const productElement = createProductElement(product);
    productElements.push(productElement);
    productsWrapper.appendChild(productElement);
});

function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.className = "item space-y-2";
    productElement.innerHTML = `
        <div class="group relative flex cursor-pointer justify-center overflow-hidden rounded-xl border bg-gray-100">
            <img src="${product.url}" alt="${product.name}" class="h-full w-full object-cover" />
            <button
                class="status absolute bottom-0 left-0 right-0 translate-y-full bg-black py-2 text-center text-white transition group-hover:translate-y-0"
            >
                Add to Cart
            </button>
        </div>
        <p class="text-xl">${product.name}</p>
        <strong>${product.price.toLocaleString()}</strong>
    `;

    productElement.querySelector(".status").addEventListener("click", updateCart);

    return productElement;
}

function updateCart(e) {
    const statusEl = e.target;

    if (statusEl.classList.contains("added")) {
        // Remove from cart
        statusEl.classList.remove("added");
        statusEl.innerText = "Add to Cart";
        statusEl.classList.remove("bg-red-600");
        statusEl.classList.add("bg-black");

        cartItemCount--;
    } else {
        // Add to cart
        statusEl.classList.add("added");
        statusEl.innerText = "Remove from Cart";
        statusEl.classList.remove("bg-black");
        statusEl.classList.add("bg-red-600");

        cartItemCount++;
    }

    // Update cart item count
    cartCount.innerText = cartItemCount.toString();
}

// Filter products by checkboxes and search input
function filterProducts() {
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkboxes)
        .filter((check) => check.checked)
        .map((check) => check.id);

    // Loop over products and check for matches
    productElements.forEach((productElement, index) => {
        const product = products[index];

        // Check to see if the product matches the search or the checked categories
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
        const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

        // Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory) {
            productElement.classList.remove("hidden");
        } else {
            productElement.classList.add("hidden");
        }
    });
}
