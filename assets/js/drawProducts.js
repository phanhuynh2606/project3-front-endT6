import { drawItemProduct } from "./drawItemProducts.js";
import { API_PRODUCT } from "./constant.js";
import { params } from "./variables.js";
export const drawProduct = () => {
  let api = `${API_PRODUCT}?_page=${params.page}&_limit=${params.limit}&title_like=${params.search}&_sort=${params.sort}&_order=${params.order}${params.category}`;
  drawItemProduct(api);
};
