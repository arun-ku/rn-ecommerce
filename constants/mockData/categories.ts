export const CATEGORY_IDS = {
  SHOES: "1",
  DRESSES: "2",
  MEN: "5",
  WOMEN: "6",
  SPORTS: "7",
  ALL: "9",
};

const categories = [
  {
    id: CATEGORY_IDS.ALL,
    title: "All",
    subTitle: "Explore all categories",
    icon: "view-grid",
    iconActive: "view-grid-outline",
  },
  {
    id: CATEGORY_IDS.SHOES,
    title: "Shoes",
    subTitle: "Footwear for all occasions",
    icon: "shoe-heel",
    iconActive: "shoe-heel",
  },
  {
    id: CATEGORY_IDS.DRESSES,
    title: "Dresses",
    subTitle: "Stylish outfits for every event",
    icon: "hanger",
    iconActive: "hanger",
  },
  {
    id: CATEGORY_IDS.MEN,
    title: "Men",
    subTitle: "Clothing and accessories for men",
    icon: "human-male",
    iconActive: "human-male",
  },
  {
    id: CATEGORY_IDS.WOMEN,
    title: "Women",
    subTitle: "Clothing and accessories for women",
    icon: "human-female",
    iconActive: "human-female",
  },
  {
    id: CATEGORY_IDS.SPORTS,
    title: "Sports",
    subTitle: "Equipment and gear for athletes",
    icon: "basketball",
    iconActive: "basketball",
  },
];

export default categories;
