import { drawListCategory } from "./drawCategory.js";
import { API_CATEGORY, API_PRODUCT } from "./constant.js";
import { ListCate, params, getTotalProducts } from "./variables.js";
import { drawProduct } from "./drawProducts.js";
import { API_SEARCH } from "./product.js";
// Gọi hàm vẽ cate
drawListCategory(API_CATEGORY);

// hết Gọi hàm vẽ cate

// Lọc sản phẩm theo danh mục

export const selectedCategory = () => {
  const selectCate = ListCate.querySelectorAll(".inner-category");
  selectCate.forEach((item) => {
    item.addEventListener("click", function (e) {
      params.page = 1;
      if (item.dataset.category == "all") {
        params.category = "";
        getTotalProducts(`${API_SEARCH}`);
      } else {
        params.category = `&category=${item.dataset.category}`;
        let API_COUNT_PRODUCT_CATEGORY = `${API_SEARCH}?${params.category}`;
        getTotalProducts(API_COUNT_PRODUCT_CATEGORY);
      }
      drawProduct();
      selectCate.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
};
// Lọc sản phẩm theo danh mục
