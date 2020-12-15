
var product = [
    { name: "Awl", unit: "piece", price: 119.99 },
    { name: "Soap", unit: "piece", price: 37.50 },
    { name: "Nails", unit: "kilo", price: 487.00 }
];

function ctlg_draw() {
    var catalogue = document.getElementById('catalog');
    catalogue.style.border = '2px solid grey';
    let i = 0;
    for (ctlg_items of product) {
        good_card = document.createElement('div');
        good_card.style.width = '30%';
        good_card.style.display = 'inline-block';
        good_card.style.border = '1px solid green';
        good_card.style.margin = '4px';
        var header = document.createElement('h3');
        var price = document.createElement('h5');
        price.innerHTML = 'price: ' + ctlg_items.price + '₽';
        var buy_btn = document.createElement('button');
        buy_btn.innerText = 'BUY';
        buy_btn.setAttribute('id', i);
        good_card.append(header);
        good_card.append(price);
        good_card.append(buy_btn);
        header.append(ctlg_items.name);
        catalogue.appendChild(good_card);
        i++;
    }
}

function countBasketPrice(basket) {
    let total_price = 0;
    for (var items in basket) {
        total_price += basket[items][0].price * basket[items][1];
    }
    return total_price;
}

function countBasketItems(basket) {
    let item_nums = 0;
    for (var items in basket) {
        item_nums += basket[items][1];
    }
    return item_nums;
}

function basket_redraw(eventObj) {
    if (basket[product[eventObj.target.id].name]) {
        basket[product[eventObj.target.id].name][1] += 1;
    } else {
        basket[product[eventObj.target.id].name] = [product[eventObj.target.id], 1];
    }
    var basketON = JSON.stringify(basket);
    sessionStorage.setItem('key', basketON);

    if (countBasketItems(basket)) {
        new_content = "В корзине: " + countBasketItems(basket) + " товаров на сумму " + countBasketPrice(basket) + " рублей";
    } else {
        new_content = "Корзина пуста";
    }
    document.getElementById('basket_content').innerText = new_content;
}

function basket_edit() {
    for (goods in basket) {
        var good_el = document.createElement('div');
        good_el.setAttribute('id', 'good_ed');
        price = basket[goods][1] * basket[goods][0].price;
        good_el.innerHTML = goods + '   ';
        var btn_mns = document.createElement('button');
        btn_mns.innerText = '-'
        btn_mns.setAttribute('id', goods);
        good_el.appendChild(btn_mns);
        var qty = document.createElement('h5');
        qty.setAttribute('id', goods);
        qty.style.display = 'inline';
        qty.innerHTML = basket[goods][1];
        good_el.appendChild(qty);
        var btn_pls = document.createElement('button');
        btn_pls.innerText = '+';
        btn_pls.setAttribute('id', goods);
        good_el.appendChild(btn_pls);
        var intermediate = document.createElement('h6');
        intermediate.setAttribute('id', goods);
        intermediate.style.display = 'inline';
        intermediate.innerHTML = price;
        good_el.innerHTML += basket[goods][0].unit + '   ';
        good_el.appendChild(intermediate);
        good_el.innerHTML += '   ' + 'rub';
        basket_ed.appendChild(good_el);
    }
    var summary = document.createElement('div');
    if (countBasketItems(basket)) {
        var summa = document.createElement('h4');
        summa.setAttribute('id', 'ttl');
        summa.style.display = "inline";
        summa.innerHTML = countBasketPrice(basket);
        summary.innerHTML = "Итого:  ";
        summary.appendChild(summa);
        summary.innerHTML += "   ₽";
    } else {
        summary.innerHTML = "Корзина пуста";
    }
    basket_ed.appendChild(summary);
    document.getElementById('basket').appendChild(basket_ed);

    var ch_buttons = document.getElementsByTagName("button");
    for (var i = 0; i < ch_buttons.length; i++) {
        if (ch_buttons[i].innerText == '-') {
            ch_buttons[i].onclick = reduceQtty;
        };
        if (ch_buttons[i].innerText == '+') {
            ch_buttons[i].onclick = increaseQtty;
        };
    }
}

function reduceQtty(eventObj) {
    if (basket[eventObj.target.id][1] > 0) {
        basket[eventObj.target.id][1]--;
        var qtys = document.getElementsByTagName('h5');
        for (var i = 0; i < qtys.length; i++) {
            if (qtys[i].id == basket[eventObj.target.id][0].name) {
                qtys[i].innerHTML = basket[eventObj.target.id][1];
            }
        }
        var imdts = document.getElementsByTagName('h6');
        for (i = 0; i < imdts.length; i++) {
            if (imdts[i].id == basket[eventObj.target.id][0].name) {
                imdts[i].innerHTML = basket[eventObj.target.id][1] * basket[eventObj.target.id][0].price;
            }
        }
        document.getElementById('ttl').innerHTML = countBasketPrice(basket);
    }
}

function increaseQtty(eventObj) {
    basket[eventObj.target.id][1]++;
    var qtys = document.getElementsByTagName('h5');
    for (var i = 0; i < qtys.length; i++) {
        if (qtys[i].id == basket[eventObj.target.id][0].name) {
            qtys[i].innerHTML = basket[eventObj.target.id][1];
        }
    }
    var imdts = document.getElementsByTagName('h6');
    for (i = 0; i < imdts.length; i++) {
        if (imdts[i].id == basket[eventObj.target.id][0].name) {
            imdts[i].innerHTML = basket[eventObj.target.id][1] * basket[eventObj.target.id][0].price;
        }
    }
    document.getElementById('ttl').innerHTML = countBasketPrice(basket);
}

function address_fill() {
    var addr_fl = document.createElement('div');
    addr_fl.setAttribute('id', 'addr');
    addr_fl.style.border = "2px solid brown";
    var region = document.createElement('input');
    region.setAttribute('type', 'text');
    region.setAttribute('placeholder', 'Тарабарская область');
    var city = document.createElement('input');
    city.setAttribute('type', 'text');
    city.setAttribute('placeholder', 'Трампосити');
    var street = document.createElement('input');
    street.setAttribute('type', 'text');
    street.setAttribute('placeholder', 'Заречная');
    var home = document.createElement('input');
    home.setAttribute('type', 'text');
    home.setAttribute('placeholder', '35');
    addr_fl.innerHTML = '<p>Ваш регион:<br></p>';
    addr_fl.appendChild(region);
    addr_fl.innerHTML += '<p>Город:<br></p>';
    addr_fl.appendChild(city);
    addr_fl.innerHTML += '<p>Улица:<br></p>';
    addr_fl.appendChild(street);
    addr_fl.innerHTML += '<p>Дом:<br></p>';
    addr_fl.appendChild(home);
    document.getElementById('basket').appendChild(addr_fl);
}

function next_step() {
    document.querySelector('h2').innerText = "Адрес доставки";
    document.getElementById('edit').style.display = 'none';
    address_fill();
    document.getElementById('next').onclick = nexxt_step;
}

function nexxt_step() {
    document.querySelector('h2').innerText = "Комментарий";
    document.getElementById('addr').style.display = 'none';
    var comments = document.createElement('div');
    comments.setAttribute('id', 'cmnts');
    comments.style.border = '2px solid black';
    comments.style.height = '55px';
    var comment = document.createElement('input');
    comment.setAttribute('type', 'text');
    comment.setAttribute('placeholder', 'Ваш комментарий...');
    comments.appendChild(comment);
    document.getElementById('basket').appendChild(comments);
    document.getElementById('next').innerHTML = 'к оплате';
    document.getElementById('next').onclick = pay;
}

function pay() {
  document.querySelector('h2').innerText = "Всё почти готово!";
  document.getElementById('cmnts').style.display = 'none';
  var end_joke = document.createElement('h3');
  end_joke.innerHTML = 'Переведите  ' + countBasketPrice(basket) + '  рублей на карту Сбер: 2465 6824 8215 7221';
  document.getElementById('basket').appendChild(end_joke);
  document.getElementById('next').style.display = 'none';
}