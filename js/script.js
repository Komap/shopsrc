
window.addEventListener('DOMContentLoaded', function(){
  const loadContent = async (url, callback) => {
    await fetch(url) // обещание
    .then(response => response.json())
    .then(json => createElement(json.goods));
  // фетч асинхронная функция
    callback();
    //async - асинхронность
    //await после того как отработает фетч(карточки товара), заработает колбэк
  }

  function createElement(arr) {
    const goodsWrapper = document.querySelector('.goods__wrapper');
    arr.forEach(function(item) {
      let card = document.createElement('div');
      card.classList.add('goods__item');
      card.innerHTML = `
      <img class="goods__img" src="${item.url}" alt="phone">
      <div class="goods__colors">Доступно цветов: 4</div>
      <div class="goods__title">
          ${item.title}
      </div>
      <div class="goods__price">
          <span>${item.price}</span> руб/шт
      </div>
      <button class="goods__btn">Добавить в корзину</button>
      `;
      goodsWrapper.appendChild(card); // сформированная карточка добавленная в '.goods_wrapper'
    });
  }
  loadContent('js/db.json', ()=>{
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
    titles = document.querySelectorAll('.goods__title'),
    empty = cartWrap.querySelector('.empty');//корзина пуста


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
          removeBtn = document.createElement('div'); //создаем тег для удаления товара из корзины

          trigger.remove();// удаление кнопки

          showConfirm();
          calcGoods(1);

          removeBtn.classList.add('goods__item-remove'); //добавить класс в див
          removeBtn.innerHTML = '&times';
          item.appendChild(removeBtn); //добавить в блок товара див с классом
          cartWrap.appendChild(item); //добавить в корзину клон товара
          calcTotal(); // сумма всех товаров при добавлении
          removeFromCart();
      }); //  btn.addEventListener
    }); // goodsBtn.forEach



    //
    function sliseTitle() {
      titles.forEach(function(item) {
          if(item.textContent.length < 100){
            return;
          }
          else{
            const str = item.textContent.slice(0, 51) + '...';
             // const str = `${item.textContent.slice(0, 71)}...`;
             item.textContent = str;
          }
      })
    }
    sliseTitle();


    //Анимация
    function showConfirm() {
      confirm.style.display = 'block';
      let counter = 100;
      const id = setInterval(frame, 10)
      function frame(){
        if(counter == 10){
          clearInterval(id);
          confirm.style.display = 'none';
        }else{
          counter--;
          confirm.style.transform = `transLateY(-${counter}px)`;
          confirm.style.opacity = '.' + counter;
        }
      }
    }


    //количество товаров в корзине
    function calcGoods(i) {
      const items = cartWrap.querySelectorAll('.goods__item')
      badge.textContent = items.length + i;
      if(items.length > 0) {
                empty.style.display = 'none';
            } else {
                empty.style.display = 'block';
            }
    }

    //итог суммы товаров
    function calcTotal() {
      const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
       let total = 0;
       prices.forEach(function(item) {
         total += +item.textContent;//+ превращает строку в число
       });
       totalCost.textContent = total;
    }

    function removeFromCart() {
      const removeBtn = cartWrap.querySelectorAll('.goods__item-remove');
      removeBtn.forEach(function (btn) {
        btn.addEventListener('click', ()=>{
          btn.parentElement.remove();
          calcGoods(0); //аннулирует стоимость при удалении товара
          calcTotal();
        });
      });
    }
    // setInterval
    // setTimeout(sliseTitle, 100)
  });
}); //window.addEventListener






// const example = {username: "WEWE"};
//
//
// fetch('https://jsonplaceholder.typicode.com/posts',
// {
//   method : "POST",
//   body: JSON.stringify(example)
// })
//   .then(response => response.json())
//   .then(json => console.log(json))
