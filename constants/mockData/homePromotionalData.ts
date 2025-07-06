import { CATEGORY_IDS } from "./categories";

const homePromotionalData = [
  {
    id: 2,
    title: "Exclusive Offers",
    subTitle: "Check out our latest promotions on dresses.",
    categoryId: CATEGORY_IDS.DRESSES,
    bgColor: "#e67e22",
    textColor: "#ffffff",
    image: require("../../assets/homeCarousel/dress.png"),
  },
  {
    id: 3,
    title: "The electronics",
    subTitle: "Explore our range of headphones.",
    categoryId: CATEGORY_IDS.SPORTS,
    bgColor: "#3498db",
    textColor: "#ffffff",
    image: require("../../assets/homeCarousel/headphones.webp"),
  },
  {
    id: 4,
    title: "The latest in tech",
    subTitle: "Discover the newest smartphones.",
    categoryId: CATEGORY_IDS.WOMEN,
    bgColor: "#2c3e50",
    textColor: "#ffffff",
    image: require("../../assets/homeCarousel/phone.png"),
  },
  {
    id: 1,
    title: "Latest Shoes",
    subTitle: "Discover our new collection of shoes.",
    categoryId: CATEGORY_IDS.SHOES,
    bgColor: "#f39c12",
    textColor: "#ffffff",
    image: require("../../assets/homeCarousel/shoes.png"),
  },
];

export default homePromotionalData;
