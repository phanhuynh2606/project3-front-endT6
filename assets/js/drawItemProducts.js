import { fetchAPI } from "./fetchAPI.js";
import { listProducts, currentElement, params } from "./variables.js";
export const drawItemProduct = (API) => {
  fetchAPI(API).then((dataProduct) => {
    listProducts.innerHTML = "";
    const productHtml = dataProduct.map((item) => {
      let sales = Math.ceil(item.discountPercentage);
      let priceOld = (((sales + 100) / 100) * item.price).toFixed(0);
      return `
      <div class="inner-product">
          <img src="${item.thumbnail}">
          <div class= "inner-desc">
            <div class="inner-name">${item.title}</div>
            <div class="inner-price">
            <span>Old Price: <del>${priceOld}$</del></span>
            New Price:<p>${item.price}$</p>
            </div>
            <div class="inner-stock">Còn lại: ${item.stock} sp</div>
          </div>
          <div class= "inner-sales">${Math.ceil(item.discountPercentage)}%</div>
        </div>
            `;
    });
    if (productHtml.length != 0) {
      listProducts.innerHTML = productHtml.join("");
    } else {
      listProducts.innerHTML = "<h2>Không có sản phẩm</h2>";
    }
  });
  currentElement.innerHTML = params.page;
};
