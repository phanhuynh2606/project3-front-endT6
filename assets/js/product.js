import { drawProduct } from "./drawProducts.js";
import { API_PRODUCT } from "./constant.js";
import {
  params,
  prevButton,
  currentElement,
  nextButton,
  sort,
  disablePrevAndNext,
  getTotalProducts,
  Valuesearch,
  btnSearch,
} from "./variables.js";

// Gọi hàm vẽ item

getTotalProducts(API_PRODUCT);
drawProduct();
if (params.totalProducts == 0 || params.totalProducts <= itemsPerPage) {
  disablePrevAndNext(true, true);
}

// Hết gọi vẽ item

// Pagination

const paginate = (page = 1) => {
  var endPage = Math.ceil(parseInt(params.totalProducts) / parseInt(params.limit));

  if (page == 1) {
    prevButton.disabled = true;
  }
  if (page == endPage) {
    nextButton.disabled = true;
  }
  params.page = `${page}`;
  currentElement.innerHTML = page;
  drawProduct();
};

prevButton.addEventListener("click", () => {
  nextButton.disabled = false;
  paginate(parseInt(params.page) - 1);
});

nextButton.addEventListener("click", () => {
  prevButton.disabled = false;
  paginate(parseInt(params.page) + 1);
});
// End Pagination

// Tìm kiếm sản phẩm
const search = () => {
  let value = Valuesearch.value.trim();
  if (value != "") {
    params.search = `${value}`;
    drawProduct();
  } else {
    params.search = "";
    drawProduct();
  }
};
export let API_SEARCH = `${API_PRODUCT}`;
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  params.page = 1;
  search();
  API_SEARCH = `${API_PRODUCT}?title_like=${params.search}`;
  getTotalProducts(API_SEARCH);
});
// Hết tìm kiếm sản phẩm

// Filter

sort.addEventListener("change", (e) => {
  params.page = 1;
  switch (e.target.value) {
    case "default":
      params.sort = "";
      params.order = "";
      break;
    case "price&_order=asc":
      params.sort = `price`;
      params.order = `asc`;
      break;
    case "price&_order=desc":
      params.sort = `price`;
      params.order = `desc`;
      break;
    case "discountPercentage&_order=desc":
      params.sort = `discountPercentage`;
      params.order = `desc`;
      break;
    default:
      break;
  }
  drawProduct();
});
