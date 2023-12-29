const items = document.getElementById("items");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const getItemData = () => {
  items.innerHTML = itemDatas
    .map((item) => {
      const { id, name, desc, value, img } = item;
      let piece = basket.find((x) => x.id === id);

      return `<div class="item" id=item-id-${id}>
        <img src=${img} alt="" srcset="" class="image" />
        <div class="details">
          <h2>${name}</h2>
          <p>${desc}</p>
          <div class="cost-count">
            <h2>$${value}</h2>
            <div class="count">
              <i class="bi bi-dash-circle" onClick="decrement(${id})"></i>
              <div class="count-child" id=${id}>${
        piece === undefined ? 0 : piece.item
      }</div>
              <i class="bi bi-plus-circle" onClick="increment(${id})"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join("");
};

getItemData();

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
  console.log(basket);
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
  localStorage.setItem("data", JSON.stringify(basket));
  console.log(basket);
};

const update = (id) => {
  const obj = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = obj.item;
  calculation();
};

const calculation = () => {
  const newBasket = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  const basketValue = document.querySelector(".cartamount");
  basketValue.innerHTML = newBasket;
};
calculation();
