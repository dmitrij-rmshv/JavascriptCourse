'use strict'
let obj = {};

function NumToObj(num) {

    obj = {}

    if (num > 999) {
        console.log("Число превышает 999 !")
        return;
    }

    obj.единицы = num % 10;
    num = (num - obj.единицы) / 10;
    obj.десятки = (num) % 10;
    num = (num - obj.десятки) / 10;
    obj.сотни = num;
    return;
}

var number = 592;

NumToObj(number);

for (var el in obj) {
    console.log(el + ": " + obj[el]);
}

number = 1469;

NumToObj(number);

for (var el in obj) {
    console.log(el + ": " + obj[el]);
}

number = 378;

NumToObj(number);

for (var el in obj) {
    console.log(el + ": " + obj[el]);
}
