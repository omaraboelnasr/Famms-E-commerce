var xhr = new XMLHttpRequest();
xhr.open('get', 'products.json')
xhr.send()
var data
var cartCounter = document.getElementById('numberInCart')

xhr.addEventListener('load', function () {
    if (xhr.status == 200) {
        data = JSON.parse(xhr.response);
        renderProducts(data)
        cartCount()
    }
})

function creatProductCard(product) {
    var productCard = document.createElement('div')
    productCard.className = 'product-card'

    var productCardFront = document.createElement('div')
    productCardFront.className = "card-front"

    var productImg = document.createElement('img')
    productImg.src = product.imagePath
    productImg.alt = product.name;

    var productName = document.createElement('p')
    productName.textContent = product.name

    var productPrice = document.createElement("p");
    productPrice.innerHTML = "<span>$" + product.price + "</span>";

    productCardFront.appendChild(productImg)
    productCardFront.appendChild(productName)
    productCardFront.appendChild(productPrice)

    var productCardBack = document.createElement('div')
    productCardBack.className = 'card-back'

    var addToCartButton = document.createElement("button");
    addToCartButton.className = "add-to-cart";

    addToCartButton.addEventListener('click', function () {
        addToCart(product);
        addToCartButton.style.pointerEvents = "none";
        addToCartButton.style.backgroundColor = "#51b854"
        addToCartButton.textContent = "Item in cart";
        cartCount()
    });
    var cartData = JSON.parse(localStorage.getItem('cart')) || [];
    var isProductInCart = cartData.some(function (item) {
        return item.id === product.id;
    });
    if (isProductInCart) {
        addToCartButton.style.pointerEvents = "none";
        addToCartButton.style.backgroundColor = "#51b854"
        addToCartButton.textContent = "Item in cart";
    } else {
        addToCartButton.textContent = "Add to cart";
    }
    productCardBack.appendChild(addToCartButton)
    productCard.appendChild(productCardFront)
    productCard.appendChild(productCardBack)
    return productCard
}

function renderProducts(data) {
    var cardsContainerMen = document.getElementById('productCardMen')
    var cardsContainerWomen = document.getElementById('productCardWomen')
    var cardsContainerKid = document.getElementById('productCardKid')
    for (const product of data) {
        if (product.category === "men") {
            var menSec = creatProductCard(product)
            cardsContainerMen.appendChild(menSec)
        } else if (product.category === "women") {
            var womenSec = creatProductCard(product)
            cardsContainerWomen.appendChild(womenSec)
        } else if (product.category === "kids") {
            var kidSec = creatProductCard(product)
            cardsContainerKid.appendChild(kidSec)
        }
    }
}

function addToCart(product) {
    var cartData = JSON.parse(localStorage.getItem('cart')) || [];
    cartData.push(product);
    localStorage.setItem('cart', JSON.stringify(cartData));
    cartCount()
}

function cartCount() {
    var arrayFromStroage = JSON.parse(localStorage.getItem("cart")) || [];
    var arrayLength = arrayFromStroage.length;
    cartCounter.textContent = arrayLength
}
