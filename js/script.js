


window.addEventListener('DOMContentLoaded', function(){
//Часто используемый на данное время, дает только первый элемент с таким классом
// const cartWrap = document.querySelectorAll('.cart__wrapper') для всех
const cartWrap = document.querySelector('.cart__wrapper'),
cart = document.querySelector('.cart'),
close = document.querySelector('.cart__close'),
open = document.querySelector('#cart'),
goodsBtn = document.querySelectorAll('.goods__btn'),
products = document.querySelectorAll('.goods__item'),
confirm = document.querySelector('.confirm'),
badge = document.querySelector('.nav__badge'), //количество товаров ниже
totalCost = document.querySelector('.cart__total > span'), //стоимость
titles = document.querySelectorAll('.goods__title');


function openCart() {
  cart.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
//открыть корзину
function closeCart() {
  cart.style.display = 'none';
  document.body.style.overflow = '';
}
//закрыть

open.addEventListener('click', openCart);
close.addEventListener('click', closeCart);


goodsBtn.forEach(function(btn, i){
  btn.addEventListener('click', () => {
    let item = products[i].cloneNode(true), //клонирует хтмл
      trigger = item.querySelector('button'), //выбераем элемент "кнопка"
      removeBtn = document.createElement('div'), //создаем тег для удаления товара из корзины
      empty = cartWrap.querySelector('.empty'); //корзина пуста
      trigger.remove();// удаление кнопки
      removeBtn.classList.add('goods__item-remove'); //добавить класс в див
      removeBtn.innerHTML = '&times';
      item.appendChild(removeBtn); //добавить в блок товара див с классом
      cartWrap.appendChild(item); //добавить в корзину клон товара

      if(empty){
        empty.remove();
      }
  }); //  btn.addEventListener
}); // goodsBtn.forEach
}); //window.addEventListener
