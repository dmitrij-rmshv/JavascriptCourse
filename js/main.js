const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


//----------------------------------------------------------


class CartContent {
    constructor(container = '.cart') {
        this.container = container;
        this.purchases = [];//массив покупок
        // this.allPurchases = [];//массив объектов
        this._getPurchases()
            .then(data => { //data - объект js
                this.purchases = [...data.contents];
                this.render()
            });
    }

    _getPurchases() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('afterBegin', '<h3>Корзина:</h3>');
        for (let item of this.purchases) {
            const cartObj = new CartItem(item);
            // this.allPurchases.push(cartObj);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }

    }
}


class CartItem {
    constructor(cart, img = 'https://placehold.it/200x150') {
        this.title = cart.product_name;
        this.price = cart.price;
        this.qty = cart.quantity;
        this.img = img;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} ₽</p>
                    <p>Количество: ${this.qty}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}
document.querySelector('.btn-cart').addEventListener('click', () => {
    let cart = new CartContent();
    document.querySelector('.cart').style.border = '2px solid blueviolet';
})

