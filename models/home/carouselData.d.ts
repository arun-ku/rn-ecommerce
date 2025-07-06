import { ImageSourcePropType } from "react-native";

export interface CarouselData {
  id: number;
  title: string;
  subTitle: string;
  categoryId: string;
  bgColor: string;
  textColor: string;
  image: ImageSourcePropType;
}
