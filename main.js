// 1
let carts = document.querySelectorAll('.addToCart');

// 3
let products = [
    {
        name: 'SAMSUNG TV',
        tag: 'product1',
        price: 500000,
        inCart: 0
    },
    {
        name: 'PIXEL 4a',
        tag: 'product2',
        price: 250000,
        inCart: 0
    },
    {
        name: 'PS5',
        tag: 'product3',
        price: 300000,
        inCart: 0
    },
    {
        name: 'MACBOOK AIR',
        tag: 'product4',
        price: 800000,
        inCart: 0
    },
    {
        name: 'APPLE WATCH',
        tag: 'product5',
        price: 95000,
        inCart: 0
    },
    {
        name: 'AIRPODS',
        tag: 'product6',
        price: 80000,
        inCart: 0
    },
]

// 2
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// 5: To check if the number in local storage exist
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cta span').textContent = productNumbers;
    }
}

// 4: To know the number of items in the cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cta span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cta span').textContent = 1;
    }

    setItems(product);
}

// 6. Creating setItems function and parse in product
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// 7: Creating a totalCost function
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

onLoadCartNumbers();

