import { fetchAPI } from "./fetchAPI.js";
import { ListCate } from "./variables.js";
import { selectedCategory } from "./category.js";
export const drawListCategory = (api) => {
  fetchAPI(api).then((data) => {
    const htmls = data.map((item) => {
      return `
    <div class="inner-category" data-category="${item}">${item}</div>
    `;
    });
    htmls.unshift(`<div class="inner-category active" id ="all-products" data-category = "all">All</div>`);
    ListCate.innerHTML = htmls.join("");
    selectedCategory();
  });
};
