import dresses from "../constants/mockData/productData/dresses";
import sneakers from "../constants/mockData/productData/sneakers";
import mensWear from "../constants/mockData/productData/mensWear";
import sportsWear from "../constants/mockData/productData/sportsWear";
import womenWear from "../constants/mockData/productData/womenWear";

class ProductService {
  async getAllProducts() {
    const products = [];
    for (let i = 0; i < 8; i++) {
      !!dresses[i] && products.push(dresses[i]);
      !!sneakers[i] && products.push(sneakers[i]);
      !!mensWear[i] && products.push(mensWear[i]);
      !!sportsWear[i] && products.push(sportsWear[i]);
      !!womenWear[i] && products.push(womenWear[i]);
    }
    return products;
  }
}

export default new ProductService();
