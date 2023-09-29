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
  id: number;
  name: string;
  image_id?: string;
  tractor: boolean;
  createdAt: string;
  updatedAt: string;
}
