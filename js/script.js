window.addEventListener("DOMContentLoaded", () => {
  const loadContent = async (url, callback) => {
    await fetch(url)
      .then((response) => response.json())
      .then((json) => createElement(json.goods));

    callback();
  };

  function createElement(arr) {
    const goodsWrapper = document.querySelector(".goods__wrapper");

    arr.forEach(function (item) {
      let card = document.createElement("div");
      card.classList.add("goods__item");

      card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">${item.title}</div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
      `;
      goodsWrapper.appendChild(card);
    });
  }

  loadContent("js/db.json", () => {
    const btnCart = document.querySelector("#cart"),
      modalCart = document.querySelector(".cart"),
      closeCart = document.querySelector(".cart__close"),
      goodsBtn = document.querySelectorAll(".goods__btn"),
      products = document.querySelectorAll(".goods__item"),
      confirm = document.querySelector(".confirm"),
      badge = document.querySelector(".nav__badge"),
      totalCost = document.querySelector(".cart__total > span"),
      titles = document.querySelectorAll(".goods__title"),
      cartWrapper = document.querySelector(".cart__wrapper"),
      empty = cartWrapper.querySelector(".empty");

    btnCart.addEventListener("click", () => {
      modalCart.style.display = "block";
      document.body.style.overflow = "hidden";
    });
    closeCart.addEventListener("click", () => {
      modalCart.style.display = "none";
      document.body.style.overflow = "";
    });

    goodsBtn.forEach(function (btn, i) {
      btn.addEventListener("click", () => {
        let item = products[i].cloneNode(true),
          trigger = item.querySelector("button"),
          removeBtn = document.createElement("div");
          

        trigger.remove();
        showConfirm();

        removeBtn.classList.add("goods__item-remove");
        removeBtn.innerHTML = "&times";
        item.appendChild(removeBtn);

        cartWrapper.appendChild(item);
        if (empty) {
          empty.style.display = "none";
        }

        calcCoods();
        calcTotal();
        removeFromCart();
      });
    });

    function sliceTitle() {
      titles.forEach(function (item) {
        if (item.textContent.length < 70) {
          return;
        } else {
          const str = `${item.textContent.slice(0, 71)}...`;
          item.textContent = str;
        }
      });
    }

    sliceTitle();

    function showConfirm() {
      confirm.style.display = "block";
      let counter = 100;
      const id = setInterval(frame, 10);

      function frame() {
        if (counter == 10) {
          clearInterval(id);
          confirm.style.display = "none";
        } else {
          counter--;
          confirm.style.transform = `translateY(-${counter}px)`;
          confirm.style.opacity = "." + counter;
        }
      }
    }

    function calcCoods() {
      const items = cartWrapper.querySelectorAll(".goods__item");
      badge.textContent = items.length;
      console.log(badge);
      if(badge.textContent == 0){
        empty.style.display = "block";
      }
    }

    function calcTotal() {
      const prices = document.querySelectorAll(
        ".cart__wrapper > .goods__item > .goods__price > span"
      );
      let total = 0;

      prices.forEach(function (item) {
        total += +item.textContent;
      });
      totalCost.textContent = total;
    }

    function removeFromCart() {
      const removeBtn = cartWrapper.querySelectorAll(".goods__item-remove");

      removeBtn.forEach(function (btn) {
        btn.addEventListener("click", () => {
          btn.parentElement.remove();

          calcCoods();
          calcTotal();
        });
      });
    }
  });
});

/* 
const example = {username: 'Tolebi'};

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: "POST",
  body: JSON.stringify(example)
})
  .then(response => response.json())
  .then(json => console.log(json))
  
*/
