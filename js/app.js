const products = [
  [
    {
      name: "Samsung Galaxy S23 Ultra",
      cost: 2700,
      chipset: "Snapdragon 8 Gen 2",
      count: 1,
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      cost: 4000,
      chipset: "Snapdragon 8 Gen 3",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
  ],
  [
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
  ],
  [
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
  ],
  [
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
    {
      name: "Samsung Galaxy S22",
      cost: 1700,
      chipset: "Exynoss 2200",
      count: 1,
    },
  ],
];

const productList = document.querySelector("#products");
const productsPerPage = 4;
let currentPage = 0;

function addProducts() {
  productList.innerHTML = "";

  const startIndex = currentPage * productsPerPage;
  const endIndex = Math.min(
    startIndex + productsPerPage,
    products.flat().length
  );

  for (let i = startIndex; i < endIndex; i++) {
    const product = products.flat()[i];
    productList.innerHTML += getProductHTML(product, i);
  }

  attachEventListeners();
}

function getProductHTML(product, index) {
  return `
    <div class="card mt-5" style="width: 24rem">
      <img src="./img/img-${index}.jpeg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">
          <p class="name">Samsung</p>
          <p><span class="cost">${product.cost}</span> AZN</p>
          <p class="chip">${product.chipset}</p>
        </p>
        <div class="btns d-flex justify-content-between align-items-center">
          <button class="btn btn-primary plus" data-index="${index}">+</button>
          <span class="quantity">${product.count}</span>
          <button class="btn btn-success minus" data-index="${index}">-</button>
        </div>
        <div class="btns d-flex justify-content-between mt-4">
          <button class="btn btn-primary add" data-index="${index}" style="width: 24rem">Add to card</button>
        </div>
      </div>
    </div>`;
}

function attachEventListeners() {
  // Quantity Inreaser
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  const quantitySpans = document.querySelectorAll(".quantity");

  plusButtons.forEach((plusButton, index) => {
    plusButton.addEventListener("click", function () {
      const currentCount = products.flat()[index].count;
      products.flat()[index].count = currentCount + 1;
      quantitySpans[index].textContent = products.flat()[index].count;
    });
  });

  minusButtons.forEach((minusButton, index) => {
    minusButton.addEventListener("click", function () {
      const currentCount = products.flat()[index].count;
      if (currentCount > 0) {
        products.flat()[index].count = currentCount - 1;
        quantitySpans[index].textContent = products.flat()[index].count;
      }
    });
  });

  const addButtons = document.querySelectorAll(".add");

  addButtons.forEach((addButton, index) => {
    addButton.addEventListener("click", function () {
      const selectedProduct = products.flat()[index];
      const totalCost = selectedProduct.count * selectedProduct.cost;
      totalCount += selectedProduct.count;
      totalCountElement.textContent = totalCount;
      basketArr.push(selectedProduct);
      console.log(basketArr);

      basketList.innerHTML += `
        <div class="element d-flex align-items-center justify-content-around bg-success-subtle mt-2">
          <img src="./img/img-${index}.jpeg" id="elImg" alt="" style="width: 10rem" />
          <p id="model">${selectedProduct.name}</p>
          <p>Quantity: <span class="end-quantity">${selectedProduct.count}</span></p>
          <p>Total: <span class="total">${totalCost}</span> AZN</p>
          <button class="btn btn-danger ms-3 delete">Delete</button>
        </div>`;

      const deleteButtons = basketList.querySelectorAll(".delete");
      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", function () {
          const parentDiv = deleteButton.parentElement;
          const productIndex = basketArr.findIndex(
            (product) => product === selectedProduct
          );
          basketArr.splice(productIndex, 1);
          totalCount -= selectedProduct.count;
          totalCountElement.textContent = totalCount;
          parentDiv.remove();
          console.log("Ok");
        });
      });
    });
  });
}

const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

next.addEventListener("click", function () {
  if ((currentPage + 1) * productsPerPage < products.flat().length) {
    currentPage++;
    addProducts();
  }
});

prev.addEventListener("click", function () {
  if (currentPage > 0) {
    currentPage--;
    addProducts();
  }
});

const basketList = document.querySelector(".basket-list");
const totalCountElement = document.querySelector("#count");
const basketArr = [];
let totalCount = 0;

const basketBtn = document.querySelector(".basket");
const blur = document.querySelector(".blurred");
const closeBtn = document.querySelector(".close");

basketBtn.addEventListener("click", function () {
  blur.style.display = `block`;
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    blur.style.display = "none";
  }
});

closeBtn.addEventListener("click", function () {
  blur.style.display = "none";
});

addProducts();
