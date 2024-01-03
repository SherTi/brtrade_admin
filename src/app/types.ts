export interface GalleryItem {
  id: string;
  name: string;
  width: number;
  height: number;
  size: string;
  src: string;
  selected?: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface ServerResponse<T = null> {
  status: boolean;
  data: T | null;
  message: string;
}

export interface Message {
  id: string;
  message: string;
  error: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  image_id?: string;
  tractor: boolean;
  selected?: boolean;
  is_open?: boolean;
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  index?: number | null;
  category_id?: string;
  sub_categories?: CategoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface SettingsResponseData {
  id: string;
  phone_1: string;
  phone_2: string;
  telegram: string;
  facebook: string;
  instagram: string;
  certificates: string[];
  staff_main: string;
  staff: string[];
  partners: string[];
  recommended_categories: {
    id: string;
    name: string;
    image: string;
  }[];
}
