const fetchAPI = async (API) => {
  const res = await fetch(API);
  const data = await res.json();
  return data;
};
// Pagination
const currentElement = document.querySelector("#pageCurrent");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

var listProducts = document.querySelector("#list-products");
const sort = document.querySelector("#sort");

var currentPage = 1;
var totalProducts = 0;
const itemsPerPage = 4;
var cate;
const getTotalProducts = async (API) => {
  const res = await fetch(API);
  const data = await res.json();
  totalProducts = data.length;
  disablePrevAndNext(true, false);
  if (totalProducts == 0) {
    disablePrevAndNext(true, true);
  }
  if (totalProducts <= itemsPerPage) {
    disablePrevAndNext(true, true);
  }
};
getTotalProducts("http://localhost:3000/products");

const disablePrevAndNext = (prev, next) => {
  prevButton.disabled = prev;
  nextButton.disabled = next;
};
const display = (API) => {
  console.log(API);
  fetchAPI(API).then((dataProduct) => {
    listProducts.innerHTML = "";
    const productHtml = dataProduct.map((item) => {
      return `
      <div class="inner-product">
      <img src="${item.thumbnail}">
      <div class= "inner-desc">
      <div class="inner-name">${item.title}</div>
      <div class="inner-price">${item.price}$</div>
                   <div class="inner-stock">Còn lại: ${item.stock} sp</div>
               </div>
            </div>
            `;
    });
    if (productHtml.length != 0) {
      listProducts.innerHTML = productHtml.join("");
    } else {
      listProducts.innerHTML = "<h2>Không có sản phẩm</h2>";
    }
    currentElement.innerHTML = currentPage;
  });
  if (totalProducts == 0) {
    disablePrevAndNext(true, true);
  }
  if (totalProducts <= itemsPerPage) {
    disablePrevAndNext(true, true);
  }
};
// Start
display(`http://localhost:3000/products?_page=${currentPage}&_limit=${itemsPerPage}`);

var ListCate = document.querySelector("#listCategory");
fetchAPI("http://localhost:3000/db")
  .then((data) => {
    const cate = document.createElement("div");
    const htmls = data.category.map((item) => {
      return `
    <div class="inner-category">${item}</div>
    `;
    });
    ListCate.innerHTML = htmls.join("");
    return data;
  })
  .then((dataProduct) => {
    const selectCate = ListCate.querySelectorAll(".inner-category");
    selectCate.forEach((item) => {
      item.addEventListener("click", (e) => {
        getTotalProducts(`http://localhost:3000/products?category=${e.target.innerHTML}`);
        currentPage = 1;
        currentElement.innerHTML = currentPage;
        selectCate.forEach((button) => {
          button.classList.remove("active");
          // set lại giá trị tìm kiếm vào sort
          Valuesearch.value = "";
          sort.selectedIndex = 0;
        });
        item.classList.add("active");
        cate = `category=${e.target.innerHTML}&`;
        display(
          `http://localhost:3000/products?category=${e.target.innerHTML}&_page=${currentPage}&_limit=${itemsPerPage}`
        );

        disablePrevAndNext(true, false);

        // Sắp xếp khi chọn category----------
        sort.addEventListener("change", (event) => {
          disablePrevAndNext(true, false);
          currentPage = 1;
          display(
            `http://localhost:3000/products?category=${e.target.innerHTML}&_sort=${event.target.value}&_page=${currentPage}&_limit=${itemsPerPage}`
          );
          cate = `category=${e.target.innerHTML}&_sort=${event.target.value}&`;
        });
      });
    });
  });

// Sắp xếp
sort.addEventListener("change", (e) => {
  currentPage = 1;
  display(`http://localhost:3000/products?_page=${currentPage}&_limit=${itemsPerPage}&_sort=${e.target.value}`);
  cate = `_sort=${e.target.value}&`;
  disablePrevAndNext(true, false);
});

// Tìm kiếm
const Valuesearch = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", (e) => {
  // Xóa active ở category
  const selectCate = ListCate.querySelectorAll(".inner-category");
  selectCate.forEach((button) => {
    button.classList.remove("active");
  });
  currentPage = 1;
  e.preventDefault();
  var textSearch = Valuesearch.value;
  disablePrevAndNext(true, false);

  getTotalProducts(`http://localhost:3000/products?title_like=${Valuesearch.value}`);
  display(`http://localhost:3000/products?title_like=${Valuesearch.value}&page=${currentPage}&_limit=${itemsPerPage}`);
  cate = `title_like=${Valuesearch.value}&`;

  sort.addEventListener("change", (event) => {
    disablePrevAndNext(true, false);
    display(
      `http://localhost:3000/products?title_like=${Valuesearch.value}&_sort=${event.target.value}&page=${currentPage}&_limit=${itemsPerPage}`
    );
    cate = `title_like=${Valuesearch.value}&_sort=${event.target.value}&`;
  });
});

// prevPage
const prevPage = (category = "", currentPage = 1) => {
  if (currentPage == 1) {
    prevButton.disabled = true;
  }
  display(`http://localhost:3000/products?${category}_page=${currentPage}&_limit=${itemsPerPage}`);
  currentElement.innerHTML = currentPage;
};

// next Page

const nextPage = (total, category, currentPage = 1) => {
  category = category || "";
  var endPage = Math.ceil(total / itemsPerPage);
  if (currentPage === endPage) {
    nextButton.disabled = true;
  }
  display(`http://localhost:3000/products?${category}_page=${currentPage}&_limit=${itemsPerPage}`);
  currentElement.innerHTML = currentPage;
};

// Sự kiện pagination
prevButton.addEventListener("click", () => {
  nextButton.disabled = false;
  currentPage--;
  prevPage(cate || "", currentPage);
});

nextButton.addEventListener("click", () => {
  prevButton.disabled = false;
  currentPage++;
  nextPage(totalProducts, cate || "", currentPage);
});
