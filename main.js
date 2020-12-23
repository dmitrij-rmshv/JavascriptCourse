const products = [
    {id: 1, title: 'Notebook', price: 2000, picture: '"https://ia.wampi.ru/2020/12/23/depositphotos_37849579-stock-illustration-vector-sketch-illustration-laptop.jpg" alt="notebook" border="0"'},
    {id: 2, title: 'Mouse', price: 20, picture: '"https://ia.wampi.ru/2020/12/23/7d3a19afbd1664debc75b4153f3d0382.jpg" alt="mouse" border="0"'},
    {id: 3, title: 'Keyboard', price: 200, picture: '"https://ia.wampi.ru/2020/12/23/bcccf7444d698f8dcd97b077c813.jpg" alt="keyboard" border="0"'},
    {id: 4, title: 'Gamepad', price: 50, picture: '"https://ia.wampi.ru/2020/12/23/sketch-style-gamepad.jpg" alt="gamepad" border="0"'},
];
//Функция для формирования верстки каждого товара
const renderProduct = prod_obj => `<div class="product-item">
  <img src=${prod_obj.picture}>
  <h3>${prod_obj.title}</h3>
  <p>${prod_obj.price}</p>
  <button class="buy-btn">Купить</button>
  </div>`;
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);