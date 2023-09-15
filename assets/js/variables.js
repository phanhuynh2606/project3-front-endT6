export const params = {
  totalProducts: 0,
  search: "",
  page: 1,
  limit: 4,
  sort: "",
  order: "",
  category: "",
};
export const currentElement = document.querySelector("#pageCurrent");
export const prevButton = document.querySelector("#prev");
export const nextButton = document.querySelector("#next");

export var listProducts = document.querySelector("#list-products");
export const sort = document.querySelector("#sort");

export const Valuesearch = document.querySelector("#search");
export const btnSearch = document.querySelector("#btnSearch");
export var ListCate = document.querySelector("#listCategory");

export const disablePrevAndNext = (prev, next) => {
  prevButton.disabled = prev;
  nextButton.disabled = next;
};

export const getTotalProducts = async (API) => {
  const res = await fetch(API);
  const data = await res.json();
  params.totalProducts = data.length;
  disablePrevAndNext(true, false);
  if (params.totalProducts == 0) {
    disablePrevAndNext(true, true);
  }
  if (params.totalProducts <= params.limit) {
    disablePrevAndNext(true, true);
  }
};
