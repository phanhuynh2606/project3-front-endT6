const fetchAPI = async (API) => {
  const res = await fetch(API);
  const data = await res.json();
  return data;
};

const url = "https://json-server-vercel-data.vercel.app/products";
// Pagination
const currentElement = document.querySelector("#pageCurrent");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

var listProducts = document.querySelector("#list-products");
const sort = document.querySelector("#sort");

var currentPage = 1;
var totalProducts = 0;
const itemsPerPage = 4;
var cate = "";
var textURI = "";
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
getTotalProducts(`${url}`);

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
// display(`${url}?_page=${currentPage}&_limit=${itemsPerPage}`);
const displayAllproduct = () => {
  currentPage = 1;
  display(`${url}?_page=${currentPage}&_limit=${itemsPerPage}`);
  getTotalProducts(`${url}`);
  document.querySelector("#all-products").classList.add("active");
};
var ListCate = document.querySelector("#listCategory");
fetchAPI("https://json-server-vercel-data.vercel.app/db")
  .then((data) => {
    const cate = document.createElement("div");
    const htmls = data.category.map((item) => {
      return `
    <div class="inner-category">${item}</div>
    `;
    });
    htmls.unshift(`<div class="inner-category" id = "all-products">All</div>`);
    ListCate.innerHTML = htmls.join("");
    return data;
  })
  .then((dataProduct) => {
    const selectCate = ListCate.querySelectorAll(".inner-category");
    displayAllproduct();
    selectCate.forEach((item) => {
      item.addEventListener("click", (e) => {
        currentPage = 1;
        if (e.target.innerHTML == "All") {
          displayAllproduct();
        } else {
          getTotalProducts(`${url}?category=${e.target.innerHTML}`);
          currentElement.innerHTML = currentPage;
          selectCate.forEach((button) => {
            button.classList.remove("active");
            // set lại giá trị tìm kiếm vào sort
          });
          item.classList.add("active");
          cate = `category=${e.target.innerHTML}&`;
          textURI = `category=${e.target.innerHTML}`;
          display(`${url}?category=${e.target.innerHTML}&_page=${currentPage}&_limit=${itemsPerPage}`);

          disablePrevAndNext(true, false);
        }
        Valuesearch.value = "";
        sort.selectedIndex = 0;
      });
    });
  });

// Sắp xếp
const displaySort = (urlSort) => {
  currentPage = 1;
  display(`${url}?${cate}${urlSort}&_page=${currentPage}&_limit=${itemsPerPage}`);
  disablePrevAndNext(true, false);
  textURI = `${cate}${urlSort}`;
};

sort.addEventListener("change", (e) => {
  textURI = cate;
  const txtSearch = `_sort=${e.target.value}`;
  displaySort(txtSearch);
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

  getTotalProducts(`${url}?title_like=${textSearch}`);
  display(`${url}?title_like=${textSearch}&_page=${currentPage}&_limit=${itemsPerPage}`);
  cate = `title_like=${textSearch}&`;
  textURI = `title_like=${textSearch}`;
});

// prevPage
const prevPage = (category = "", currentPage = 1) => {
  if (currentPage == 1) {
    prevButton.disabled = true;
  }
  display(`${url}?${category}&_page=${currentPage}&_limit=${itemsPerPage}`);
  currentElement.innerHTML = currentPage;
};

// next Page

const nextPage = (total, category, currentPage = 1) => {
  category = category || "";
  var endPage = Math.ceil(total / itemsPerPage);
  if (currentPage === endPage) {
    nextButton.disabled = true;
  }
  display(`${url}?${category}&_page=${currentPage}&_limit=${itemsPerPage}`);
  currentElement.innerHTML = currentPage;
};

// Sự kiện pagination
prevButton.addEventListener("click", () => {
  nextButton.disabled = false;
  currentPage--;
  prevPage(textURI || "", currentPage);
});

nextButton.addEventListener("click", () => {
  prevButton.disabled = false;
  currentPage++;
  nextPage(totalProducts, textURI || "", currentPage);
});
