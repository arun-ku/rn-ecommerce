export interface Variant {
  variantId: string;
  variantColor: {
    name: string;
    value: string;
  };
  variantPrice: number;
}

export interface Tag {
  prefixIcon: string;
  postfixIcon: string;
  prefixIconColor: string;
  postFixIconColor: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export interface Product {
  name: string;
  description: string;
  images: string[];
  productId: string;
  categoryIds: number[];
  variants: Variant[];
  availableQuantity: number;
  maxAllowedQuantity: number;
  tags: Tag[];
}
