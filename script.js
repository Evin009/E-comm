document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 8.99 },
    { id: 3, name: "Product 3", price: 15.99 },
  ];

  let cart = [];

  //save task to local storage
  function saveTask() {
    localStorage.setItem("items_key", JSON.stringify(cart));
  }

  //load task from local storage
  function loadTask() {
    const storedTask = localStorage.getItem("items_key");
    if (storedTask) {
      cart = JSON.parse(storedTask);
      renderItem();
    }
  }

  const productList = document.getElementById("product-list");
  const cartItem = document.getElementById("cart-item");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotaldisplay = document.getElementById("cart-total");
  const cartTotalVal = document.getElementById("total-price");
  const checkoutbtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button data-id="${product.id}">Add item</button>
      `;
    productList.appendChild(productDiv);
  });

  loadTask();

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      const productChoosen = products.find((p) => p.id === productID);

      addtoCart(productChoosen);
      saveTask();
    }
  });

  function addtoCart(product) {
    cart.push(product);
    renderItem();
  }

  function renderItem() {
    cartItem.innerHTML = "";
    let totalprice = 0;
    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotaldisplay.classList.remove("hidden");

      cart.forEach((i, index) => {
        totalprice += i.price;

        const cartitem = document.createElement("div");
        cartitem.innerHTML = `
        ${i.name} - $${i.price.toFixed(2)}
        <button class="remove-bt" data-index="${index}">Remove</button>
        `;
        cartItem.appendChild(cartitem);
        cartTotalVal.innerHTML = `$${totalprice.toFixed(2)}`;
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
      cartTotaldisplay.classList.add("hidden");
    }
  }

  cartItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-bt")) {
      const idx = parseInt(e.target.getAttribute("data-index"));
      cart.splice(idx, 1); // remove item from array
      saveTask();
      renderItem(); // re-render cart & total
    }
  });

  checkoutbtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully!");
    saveTask();
    renderItem();
  });
});
