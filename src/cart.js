let label = document.querySelector(".label");
let shopcart = document.querySelector(".shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  const newBasket = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  let basketValue = document.querySelector(".cartamount");
  basketValue.innerHTML = newBasket;
};
calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    shopcart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = itemDatas.find((x) => x.id === id) || [];
        let { desc, img, name, value, id: searchId } = search;

        return (shopcart.innerHTML = ` <div class="cart-item">
            <img src=${img} width=100 alt="" />
                <div class="details">
                    <div class="title-price-x"> 
                       <h4>${name}</h4>
                       <p class="cartvalue">$ ${value}</p>
                       <i class="bi bi-x-circle" onclick="removeItem(${searchId})"></i>
                    </div>
                    <div class="count">
                        <i class="bi bi-dash-circle" onClick="decrement(${searchId})"></i>
                        <div class="count-child" id=${searchId}>${item}</div>
                        <i class="bi bi-plus-circle" onClick="increment(${searchId})"></i>
                    </div>
                    <h3>$ ${value * item}</h3>
                </div>
        </div>`);
      })
      .join("");
  } else {
    shopcart.style.display = "none";
    label.innerHTML = `<h2>You have no items</h2>
    <a href="index.html"> <button class="homebutton">Return Homepage</button> </a>`;
  }
};
generateCartItems();

const increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item++;
  }
  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};
const decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) {
    return;
  } else {
    search.item--;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

const update = (id) => {
  const obj = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = obj.item;
  calculation();
  totalBill();
};

const removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  calculation();
  totalBill();
  localStorage.setItem("data", JSON.stringify(basket));
};

const totalBill = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        const { id, item } = x;
        let search = itemDatas.find((x) => x.id === id) || [];
        return search.value * item;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2>Total Bill $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button class="removeall" onclick="removeAllIttems()" >Remove All</button>`;
  } else return;
};
totalBill();

const removeAllIttems = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
